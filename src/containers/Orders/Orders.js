import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";

import Order from "../../components/Order/Order";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Orders.css";
import orderApi from "../../apis/order";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
  const ordersList = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  const onFetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    [dispatch],
  );

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let orders = <Spinner />;
  if (!loading) {
    if (ordersList.length === 0) {
      orders = (
        <p className={classes.OrdersEmptyMessage}>
          Look like you haven't order any burgers yet! Start ordering some!
        </p>
      );
    } else {
      orders = ordersList.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
  }
  return <div className={classes.Orders}>{orders}</div>;
};

export default WithErrorHandler(Orders, orderApi);
