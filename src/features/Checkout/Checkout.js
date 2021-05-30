import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const purchased = useSelector((state) => state.order.purchased);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      {ings ? (
        <>
          {purchased ? <Redirect to="/" /> : null}
          <CheckoutSummary
            ingredients={ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Checkout;
