import axios from "axios";

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_APP_API_URL || "https://api.quicklah.com/api/v1",
   headers: {
      "Content-Type": "application/json",
   },
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("quicklah_token");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response && error.response.status === 401) {
         localStorage.removeItem("quicklah_token");
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
