import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'global/routes';
import Login from './util/Login';
import ForgotPassword from './util/ForgotPassword';
import MainPage from './MainPage';
import { useSelector } from 'react-redux';

function AppWrapper() {
  const authorized = useSelector(state => state.userReducer.authorized);

  return (
    <Switch>
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        exact
      />

      <Route path={ROUTES.LOGIN} exact>
        {authorized ? <Redirect to={ROUTES.HOME_PAGE} /> : <Login />}
      </Route>

      <Route path={ROUTES.HOME_PAGE}>
        {!authorized ? <Redirect to={ROUTES.LOGIN} /> : <MainPage />}
      </Route>
    </Switch>
  );
}

export default AppWrapper;
