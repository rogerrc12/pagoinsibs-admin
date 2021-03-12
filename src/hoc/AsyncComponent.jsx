import React, { Suspense } from "react";

import Spinner from "../components/UI/Spinner";

const AsyncComponent = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default AsyncComponent;
