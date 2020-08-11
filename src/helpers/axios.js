import axios from "axios";

// let baseURL;

// if (process.env.NODE_ENV !== "production") {
//   baseURL = process.env.REACT_APP_BACKEND_URL;
// } else {
//   baseURL = process.env.REACT_APP_TEST_BACKEND_URL;
// }

// const axiosInstance = axios.create({
//   baseURL,
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log("config", config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use((res) => {
//   console.log(res);
//   return res;
// });

const axiosInstance = axios;

export default axiosInstance;
