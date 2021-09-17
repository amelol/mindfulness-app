import http from "./base-api-service";

const list = (search, tops) =>
  http.get("/meditations", { params: { search, tops } });

const detail = (id) => http.get(`/meditations/${id}`);

const remove = (id) => http.delete(`/meditations/${id}`);

const meditationsService = {
  list,
  detail,
  remove,
};

export default meditationsService;
