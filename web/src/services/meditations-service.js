import http from "./base-api-service";

const list = () => http.get("/meditations");

const service = {
  list,
};
export default service;
