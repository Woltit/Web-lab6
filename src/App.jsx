import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const NotFound = () => (
  <main className="center">
    <h1>404</h1>
    <p>Сторінку не знайдено.</p>
  </main>
);

export default function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}
