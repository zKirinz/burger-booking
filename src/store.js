import { configureStore } from "@reduxjs/toolkit";
import burgerBuilderReducer from "./features/BurgerBuilder/BurgerBuilderSlice";
import orderReducer from "./features/Orders/OrdersSlice";
import authReducer from "./features/Auth/AuthSlice";

export default configureStore({
  reducer: {
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
  },
});
