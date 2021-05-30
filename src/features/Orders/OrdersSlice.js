import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import orderApi from "../../apis/order";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const purchaseBurger = createAsyncThunk(
  "orders/purchase",
  async (order, { rejectWithValue }) => {
    try {
      const response = await orderApi.post(
        "/orders.json?auth=" + order.token,
        order.orderData
      );

      return { orderId: response.data.name, orderData: order.orderData };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (user, { rejectWithValue }) => {
    try {
      const queryParams =
        "?auth=" +
        user.token +
        '&orderBy="userId"&equalTo="' +
        user.userId +
        '"';
      const response = await orderApi.get("/orders.json" + queryParams);

      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }

      return fetchedOrders;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    purchaseInit: (state) => {
      state.purchased = false;
    },
  },
  extraReducers: {
    [purchaseBurger.pending]: (state) => {
      state.loading = true;
    },
    [purchaseBurger.fulfilled]: (state, action) => {
      action.payload.orderData.id = action.orderId;
      state.purchased = true;
      state.orders = state.orders.concat(action.payload.orderData);
      state.loading = false;
    },
    [purchaseBurger.rejected]: (state) => {
      state.loading = false;
    },
    [fetchOrders.pending]: (state) => {
      state.loading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    [fetchOrders.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { purchaseInit } = ordersSlice.actions;
export default ordersSlice.reducer;
