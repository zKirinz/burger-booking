import {put} from "redux-saga/effects";

import orderApi from "../../apis/order";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
  try {
    const response = yield orderApi.get("/ingredients.json");
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed(error));
  }
}
