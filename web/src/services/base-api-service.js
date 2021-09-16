import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;
    switch (status) {
      case 401:
        if (
          window.location.pathname !== "/signup" &&
          window.location.pathname !== "/login"
        ) {
          localStorage.removeItem("user");
          window.location.replace("/login");
        }
        break;
      case 404:
        window.location.replace("/404");
        break;
      default:
    }
    return Promise.reject(error);
  }
);

export default http;
