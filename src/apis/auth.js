import axios from "axios";

const authApi = (type) => {
  let url;
  switch (type) {
    case authType.SIGNIN:
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        process.env.REACT_APP_API_KEY;
      break;
    case authType.SIGNUP:
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.REACT_APP_API_KEY;
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

export {authApi, authType};
