import axios from "axios";

const orderApi = axios.create({
  baseURL: "https://burger-booking-react-default-rtdb.firebaseio.com/",
});

export default orderApi;
