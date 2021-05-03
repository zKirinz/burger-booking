import React from "react";

import Modal from "../../components/UI/Modal/Modal";

import useHttpErrorHandler from "../../hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent, axios) => {
  return function WithErrorHandler(props) {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default WithErrorHandler;
