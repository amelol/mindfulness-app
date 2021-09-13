import http from './base-api-service';

const list = () => http.get('/articles');

const service = {
  list
};
export default service;