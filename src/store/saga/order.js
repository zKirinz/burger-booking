import {put} from "redux-saga/effects";

import orderApi from "../../apis/order";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.purchaseBurgerStart());
    const response = yield orderApi.post(
      "/orders.json?auth=" + action.token,
      action.orderData,
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData),
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(actions.fetchOrdersStart());
    const queryParams =
      "?auth=" +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    const response = yield orderApi.get("/orders.json" + queryParams);

    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
