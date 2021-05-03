import {all, takeLatest} from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order";

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeLatest(actionTypes.AUTH_USER, authUserSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeLatest(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield all([
    takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeLatest(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
  ]);
}
