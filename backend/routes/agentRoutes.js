import express from "express";
import { createAgent, listAgents } from "../controllers/agentController.js";
import { uploadAndDistribute, getDistributedByAgent } from "../controllers/uploadController.js";

const router = express.Router();

// Agent CRUD (create + list)
router.post("/", createAgent);
router.get("/", listAgents);

// Upload & distribute (multipart form: file field name "file")
router.post("/upload-distribute", uploadAndDistribute);

// Fetch distributed lists per agent
router.get("/distributed", getDistributedByAgent);

export default router;
