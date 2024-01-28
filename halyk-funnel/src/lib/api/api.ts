import axios from "axios";

export const api = axios.create({
  baseURL: "https://halyq-life-funnel-app.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
})