import axios from "axios";
import { config } from "@/config";

export const $client = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
