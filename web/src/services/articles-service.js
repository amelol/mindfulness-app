import http from './base-api-service';

const list = (search, tops) => http.get('/articles', {params: {search, tops}});

const detail = (id) => http.get(`/articles/${id}`);

const remove = (id) => http.delete(`/articles/${id}`);

const articlesService = {
  list,
  detail,
  remove
};

export default articlesService;