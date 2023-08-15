import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
