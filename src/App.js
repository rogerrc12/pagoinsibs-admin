import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// Helpers
import setAuthToken from './helpers/setAuthToken';
// Redux
import store from './store';
import { loadUser } from './store/actions/auth';
import history from './helpers/history';

import MainApp from './containers/MainApp';

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
