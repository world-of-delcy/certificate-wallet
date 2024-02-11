import http from "./http";

export const isLoggedIn = () => http.get("/users/me");

export const login = (email, password) =>
  http.post("/auth/login", { email, password });

export const signup = (name, email, password) =>
  http.post("/auth/signup", { name, email, password });

export const logout = () => http.post("/auth/logout");

export const getMyCertificates = () => http.get("/certificates");

export const getCertificate = (id) => http.get(`/certificates/${id}`);

export const getMyImportantCertificates = () => http.get("/importants");

export const toggleImportant = (id) =>
  http.post(`/certificates/${id}/important`);

export const getCategories = () => http.get("/category");

export const getCategory = (id) => http.get(`/category/${id}`);

export const createCertificate = (certificate) =>
  http.formdata("/certificates", certificate);

export const downloadCertificate = (id) =>
  http.getDownload(`/certificates/${id}/download`);

export const deleteCertificate = (id) => http.delete(`/certificates/${id}`);
