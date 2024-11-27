import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1500,
  headers: { "X-Custom-Header": "foobar" },
});
