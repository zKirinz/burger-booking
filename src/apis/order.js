import axios from "axios";

const orderApi = axios.create({
  baseURL: process.env.REACT_APP_REALTIME_DB_API_URL,
});

export default orderApi;
