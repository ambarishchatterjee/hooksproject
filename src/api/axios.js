import axios from "axios";

const adminUrl = "https://wtsacademy.dedicateddevelopers.us/api/"

export const baseURL = adminUrl;

let axiosInstance = axios.create({ baseURL })

export const productImage = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    console.log(config)
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);


export default axiosInstance