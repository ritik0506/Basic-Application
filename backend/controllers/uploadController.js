import csv from "csv-parser";
import multer from "multer";
import fs from "fs";
import path from "path";
import Agent from "../models/agentModel.js";
import DistributedItem from "../models/distributedItemModel.js";

// configure multer storage (temp)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".csv", ".xlsx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single("file");

function parseCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}

// Distribute items equally among first 5 agents found
export const uploadAndDistribute = async (req, res) => {
  uploadMiddleware(req, res, async function (err) {
    if (err) return res.status(400).json({ message: "Upload failed", error: err.message });
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const filePath = req.file.path;
    try {
      // Parse CSV (expects header columns: FirstName, Phone, Notes) - case-insensitive
      const rows = await parseCsvFile(filePath); // array of objects

      // Validate format quickly: each row must have FirstName and Phone
      const normalizedRows = rows.map((r, idx) => {
        const keys = Object.keys(r);
        // try to find firstname and phone by header names
        const firstNameKey = keys.find(k => /first\s*name/i.test(k)) || keys.find(k => /firstname/i.test(k)) || keys.find(k => /first/i.test(k));
        const phoneKey = keys.find(k => /phone/i.test(k) || /mobile/i.test(k));
        const notesKey = keys.find(k => /note/i.test(k)) || keys.find(k => /notes/i.test(k));
        return {
          firstName: (firstNameKey && r[firstNameKey]) ? r[firstNameKey].trim() : "",
          phone: (phoneKey && r[phoneKey]) ? r[phoneKey].trim() : "",
          notes: (notesKey && r[notesKey]) ? r[notesKey].trim() : "",
          originalRow: idx + 1
        };
      });

      // basic validation
      const invalid = normalizedRows.find(r => !r.firstName || !r.phone);
      if (invalid) return res.status(400).json({ message: "CSV format invalid. Required columns: FirstName, Phone" });

      // fetch agents (we distribute among exactly 5 agents as per requirement)
      const agents = await Agent.find().limit(5);
      if (agents.length < 1) return res.status(400).json({ message: "No agents found. Create agents first." });

      // If fewer than 5 agents exist, distribute among existing agents (still sequential)
      const nAgents = Math.min(5, agents.length);
      // Distribution algorithm:
      // - baseCount = Math.floor(total / nAgents)
      // - remainder assigned sequentially to first remainder agents
      const total = normalizedRows.length;
      const baseCount = Math.floor(total / nAgents);
      let remainder = total % nAgents;

      // Build assignment arrays
      const assignments = Array.from({ length: nAgents }, () => []);
      let cursor = 0;
      for (let i = 0; i < nAgents; ++i) {
        let take = baseCount + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
        const itemsSlice = normalizedRows.slice(cursor, cursor + take);
        cursor += take;
        assignments[i] = itemsSlice;
      }

      // Save distributed items in DB and associate with agents
      const savedItems = [];
      for (let i = 0; i < nAgents; ++i) {
        const agent = agents[i];
        const itemsForAgent = assignments[i];
        for (const item of itemsForAgent) {
          const saved = await DistributedItem.create({
            firstName: item.firstName,
            phone: item.phone,
            notes: item.notes,
            assignedTo: agent._id,
            originalRow: item.originalRow
          });
          savedItems.push(saved);
        }
      }

      // Remove the uploaded file (optional)
      fs.unlink(filePath, () => {});

      return res.json({ message: "Distributed successfully", total, distributedCount: savedItems.length });

    } catch (error) {
      fs.unlink(filePath, () => {});
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// Get distributed lists grouped by agent
export const getDistributedByAgent = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    // for each agent fetch items
    const result = [];
    for (const ag of agents) {
      const items = await DistributedItem.find({ assignedTo: ag._id }).select("-__v").lean();
      result.push({ agent: ag, items });
    }
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
