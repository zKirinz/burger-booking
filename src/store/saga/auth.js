import {delay} from "redux-saga/effects";
import {put, call, all} from "redux-saga/effects";

import {authApi, authType} from "../../apis/auth";
import * as actions from "../actions/index";

export function* authCheckStateSaga(action) {
  const token = yield call([localStorage, "getItem"], "token");

  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      yield call([localStorage, "getItem"], "expirationDate"),
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield call([localStorage, "getItem"], "userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000,
        ),
      );
    }
  }
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  try {
    let response;
    if (action.isSignup) {
      response = yield authApi(authType.SIGNUP).post("", authData);
    } else {
      response = yield authApi(authType.SIGNIN).post("", authData);
    }

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000,
    );

    yield all([
      call([localStorage, "setItem"], "token", response.data.idToken),
      call([localStorage, "setItem"], "expirationDate", expirationDate),
      call([localStorage, "setItem"], "userId", response.data.localId),
    ]);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId),
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.log(error);
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.logout());
}

export function* logoutSaga(action) {
  yield all([
    call([localStorage, "removeItem"], "token"),
    call([localStorage, "removeItem"], "expirationDate"),
    call([localStorage, "removeItem"], "userId"),
  ]);
  yield put(actions.logoutSucceed());
}
