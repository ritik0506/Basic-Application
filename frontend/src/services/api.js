import axios from "axios";

const API = axios.create({
  baseURL: "/api", // make sure vite proxy is configured to your backend
});

// add auth header helper
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export const postLogin = (data) => API.post("/auth/login", data);
export const postRegister = (data) => API.post("/auth/register", data);

// Agents
export const createAgent = (data) => API.post("/agents", data);
export const getAgents = () => API.get("/agents");
export const uploadAndDistribute = (formData) => API.post("/agents/upload-distribute", formData, { headers: { "Content-Type": "multipart/form-data" }});
export const getDistributed = () => API.get("/agents/distributed");
