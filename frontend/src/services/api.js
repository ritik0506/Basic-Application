import axios from "axios";

const API = axios.create({
  baseURL: "/api", // proxied by vite to backend during dev
  headers: {
    "Content-Type": "application/json",
  },
});

export const postLogin = (data) => API.post("/auth/login", data);
export const postRegister = (data) => API.post("/auth/register", data);
export const uploadAssignment = (formData) => API.post("/assignments", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});

export default API;
export const fetchAssignments = () => API.get("/assignments");