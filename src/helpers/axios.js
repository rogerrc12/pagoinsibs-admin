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
  (res) => {
    console.log(`received from ${res.config.url} at ${new Date().toISOString()}`);
    return res;
  },
  (error) => {
    console.warn(error.response.status);
    throw error;
  }
);

export default axiosInstance;
