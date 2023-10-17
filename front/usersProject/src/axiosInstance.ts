import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:2000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MmE0M2EyNjk5ZTBkYmU1OWUwMzYwMSIsInVzZXJuYW1lIjoiYXJub24iLCJwYXNzd29yZCI6IiQyYiQxMCRKem9rTVl2ZDQ4ck0wWjhxZUMuUHNlejQuUGdnQWQweFNvY0FyUTVMLmJKbHpPMVVGdlJIUyIsImVtYWlsIjoiYXJub25AYXJub24iLCJfX3YiOjB9LCJpYXQiOjE2OTc1MzY2MzZ9.htbXkeQ3tparUfSAzWAp_eH8cWwi6AKxVm3BEG1l_zk`,
    withCredentials: true,
  },
});
