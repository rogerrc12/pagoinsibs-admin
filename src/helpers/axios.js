import axios from "axios";

let baseURL;

if (process.env.NODE_ENV !== "production") {
  baseURL = process.env.REACT_APP_TEST_BACKEND_URL;
} else {
  baseURL = process.env.REACT_APP_BACKEND_URL;
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error.response);
    console.warn("Error status", error.response.status);
    if (error.response) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
