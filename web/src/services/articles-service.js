import http from './base-api-service';

const list = (search) => http.get('/articles', {params: {search}});

const detail = (id) => http.get(`/articles/${id}`);

const articlesService = {
  list,
  detail
};
export default articlesService;