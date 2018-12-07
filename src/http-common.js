import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://172.20.71.35:8080/"
});
