import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth.js';

// Без авторизації — редірект на /login
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}
