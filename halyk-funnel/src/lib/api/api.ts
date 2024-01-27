import axios from "axios";

export const api = axios.create({
  baseURL: "https://acea-46-235-72-49.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
})