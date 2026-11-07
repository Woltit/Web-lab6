import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { checkCredentials, saveAuth, isAuthenticated } from '../auth.js';

export default function Login({ history, location }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (isAuthenticated()) return <Redirect to="/dashboard" />;

  const validate = () => {
    const e = {};
    if (!login.trim()) e.login = 'Введіть логін';
    if (!password) e.password = 'Введіть пароль';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    if (!checkCredentials(login.trim(), password)) {
      return setErrors({ form: 'Невірний логін або пароль' });
    }
    saveAuth(login.trim());
    const target = location.state?.from?.pathname || '/dashboard';
    history.push(target);
  };

  return (
    <main className="center">
      <form className="login" onSubmit={handleSubmit} noValidate>
        <h1>Вхід</h1>

        <label htmlFor="login">Логін</label>
        <input
          id="login"
          value={login}
          autoComplete="username"
          onChange={(e) => { setLogin(e.target.value); setErrors({}); }}
          aria-invalid={!!errors.login}
        />
        {errors.login && <span className="error">{errors.login}</span>}

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
          aria-invalid={!!errors.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        {errors.form && <div className="error form-error" role="alert">{errors.form}</div>}

        <button type="submit">Увійти</button>
      </form>
    </main>
  );
}
