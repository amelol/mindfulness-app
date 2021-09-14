import http from './base-api-service';

const list = (search) => http.get('/articles', {params: {search}});

const articlesService = {
  list,
};
export default articlesService;