import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import orderApi from "../../apis/order";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export const initIngredients = createAsyncThunk(
  "burgerBuilder/initIngredients",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await orderApi.get("/ingredients.json");
      dispatch(burgerBuilderSlice.actions.setIngredients(response.data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const burgerBuilderSlice = createSlice({
  name: "burgerBuilder",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = {};
      for (const ingredient in action.payload) {
        state.ingredients[ingredient] = action.payload[ingredient];
      }
      state.totalPrice = 4;
      state.error = false;
      state.building = false;
    },
    addIngredient: (state, action) => {
      const ingredientName = action.payload;
      state.ingredients[ingredientName] = state.ingredients[ingredientName] + 1;
      state.totalPrice = state.totalPrice + INGREDIENT_PRICES[ingredientName];
      state.building = true;
    },
    removeIngredient: (state, action) => {
      const ingredientName = action.payload;
      state.ingredients[ingredientName] = state.ingredients[ingredientName] - 1;
      state.totalPrice = state.totalPrice - INGREDIENT_PRICES[ingredientName];
      state.building = true;
    },
  },
  extraReducers: {
    [initIngredients.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const { setIngredients, addIngredient, removeIngredient } =
  burgerBuilderSlice.actions;
export default burgerBuilderSlice.reducer;
