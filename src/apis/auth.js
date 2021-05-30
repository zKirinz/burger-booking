import axios from "axios";

const authApi = (type) => {
  let url;
  switch (type) {
    case authType.SIGNIN:
      url = process.env.REACT_APP_SIGN_IN_API_URL;
      break;
    case authType.SIGNUP:
      url = process.env.REACT_APP_SIGN_UP_API_URL;
      break;
    default:
      break;
  }

  return axios.create({
    baseURL: url,
  });
};

const authType = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

export { authApi, authType };
