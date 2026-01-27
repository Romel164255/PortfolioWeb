import api from "./api";

export const login = (email, password) =>
  api.post("/api/login", { email, password });

export const logout = () =>
  api.post("/api/logout");

export const refresh = () =>
  api.post("/api/refresh");

export const adminData = (token) =>
  api.get("/api/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
