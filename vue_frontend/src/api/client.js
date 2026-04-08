import axios from "axios";
import { getApiBaseUrl } from "../apiBase.js";

const client = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

export { client };
