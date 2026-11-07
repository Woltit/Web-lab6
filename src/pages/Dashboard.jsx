import { useEffect, useState } from 'react';
import { clearAuth } from '../auth.js';
import WeatherCard from '../components/WeatherCard.jsx';
import { describeCode } from '../weatherCodes.js';

const KYIV = { latitude: 50.45, longitude: 30.52, name: 'Київ' };

// Геолокація з фолбеком на Київ (відмова користувача / немає підтримки)
function getPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(KYIV);
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ latitude: p.coords.latitude, longitude: p.coords.longitude, name: 'Ваше місцезнаходження' }),
      () => resolve(KYIV),
      { timeout: 5000 }
    );
  });
}

const dayLabel = (iso, i) =>
  i === 0
    ? 'Сьогодні'
    : new Date(iso).toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'long' });

export default function Dashboard({ history }) {
  const [days, setDays] = useState([]);
  const [place, setPlace] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const pos = await getPosition();
        const url =
          'https://api.open-meteo.com/v1/forecast' +
          `?latitude=${pos.latitude}&longitude=${pos.longitude}` +
          '&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_probability_max' +
          '&timezone=auto&forecast_days=5';
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { daily } = await res.json();

        setPlace(pos.name);
        setDays(
          daily.time.map((date, i) => ({
            date,
            code: daily.weathercode[i],
            max: daily.temperature_2m_max[i],
            min: daily.temperature_2m_min[i],
            wind: daily.windspeed_10m_max[i],
            rainChance: daily.precipitation_probability_max[i],
          }))
        );
      } catch (e) {
        if (e.name !== 'AbortError') setError('Не вдалося завантажити погоду. Спробуйте пізніше.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const logout = () => {
    clearAuth();
    history.push('/login');
  };

  return (
    <main className="dashboard">
      <header>
        <h1>Погода на 5 днів{place && <small>{place}</small>}</h1>
        <button className="ghost" onClick={logout}>Вийти</button>
      </header>

      {loading && <div className="loader" role="status" aria-label="Завантаження" />}
      {error && <div className="error form-error" role="alert">{error}</div>}

      {!loading && !error && (
        <section className="grid">
          {days.map((d, i) => {
            const { icon, text } = describeCode(d.code);
            return <WeatherCard key={d.date} label={dayLabel(d.date, i)} icon={icon} text={text} {...d} />;
          })}
        </section>
      )}
    </main>
  );
}
