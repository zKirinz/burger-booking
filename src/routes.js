import React, { useEffect, Suspense, useCallback } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./features/BurgerBuilder/BurgerBuilder";
import Logout from "./features/Auth/Logout/Logout";
import * as authActions from "./features/Auth/AuthSlice";

const Checkout = React.lazy(() => {
  return import("./features/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./features/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./features/Auth/Auth");
});

const App = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const dispatch = useDispatch();
  const onTryAutoSignup = useCallback(
    () => dispatch(authActions.checkAuthState()),
    [dispatch]
  );
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
