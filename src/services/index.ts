import axios, { AxiosInstance } from "axios";

const courierToken: string = process.env.COURIER_TOKEN;

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.courier.com",
  headers: {
    Authorization: `Bearer ${courierToken}`,
  },
});

export default apiClient;
