const CREDENTIALS = { login: 'vlad3', password: 'vlad3' };
const COOKIE = 'auth';

export function checkCredentials(login, password) {
  return login === CREDENTIALS.login && password === CREDENTIALS.password;
}

export function saveAuth(login) {
  document.cookie = `${COOKIE}=${encodeURIComponent(login)}; max-age=86400; path=/; SameSite=Lax`;
}

export function isAuthenticated() {
  return document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE}=`));
}

export function clearAuth() {
  document.cookie = `${COOKIE}=; max-age=0; path=/`;
}
