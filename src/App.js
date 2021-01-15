import React, { useEffect } from "react";
import MainApp from "./containers/MainApp";
import { Router } from "react-router-dom";
// Helpers
import setAuthToken from "./helpers/setAuthToken";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";
import history from "./helpers/history";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <MainApp />
      </Router>
    </Provider>
  );
};

export default App;
