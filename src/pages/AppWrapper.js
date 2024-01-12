import { ROUTES } from 'global/routes';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './util/Login';

function AppWrapper() {
  const authorized = useSelector(state => state.userReducer.authorized);

  return (
    <Switch>
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
