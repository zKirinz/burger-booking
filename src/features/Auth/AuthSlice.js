import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authApi, authType } from "../../apis/auth";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

export const auth = createAsyncThunk(
  "auth/auth",
  async (user, { dispatch, rejectWithValue }) => {
    const { email, password, isSignup } = user;
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      let response;
      if (isSignup) {
        response = await authApi(authType.SIGNUP).post("", authData);
      } else {
        response = await authApi(authType.SIGNIN).post("", authData);
      }

      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", response.data.localId);

      await dispatch(checkAuthTimeout(response.data.expiresIn));

      return { token: response.data.idToken, userId: response.data.localId };
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const checkAuthTimeout = createAsyncThunk(
  "auth/checkTimeout",
  async (expirationTime, { dispatch }) => {
    setTimeout(function () {
      dispatch(logout());
    }, expirationTime * 1000);
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    dispatch(authSlice.actions.authLogout());
  }
);

export const checkAuthState = createAsyncThunk(
  "auth/checkState",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      await dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        await dispatch(authSlice.actions.logout());
      } else {
        const userId = await localStorage.getItem("userId");
        await dispatch(authSlice.actions.authSuccess({ token, userId }));

        await dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthRedirectPath: (state, action) => {
      state.authRedirectPath = action.payload;
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    authLogout: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
  extraReducers: {
    [auth.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [auth.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
      state.loading = false;
    },
    [auth.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAuthRedirectPath, authSuccess, authLogout } =
  authSlice.actions;
export default authSlice.reducer;
