import { describeCode } from '../weatherCodes.js';

// Один компонент для всіх днів — різні значення приходять через props
export default function WeatherCard({ label, icon, text, max, min, wind, rainChance }) {
  return (
    <article className="card">
      <h2>{label}</h2>
      <div className="icon" role="img" aria-label={text}>{icon}</div>
      <p className="desc">{text}</p>
      <p className="temp">
        <strong>{Math.round(max)}°</strong> <span>{Math.round(min)}°</span>
      </p>
      <dl>
        <dt>Вітер</dt><dd>{Math.round(wind)} км/год</dd>
        <dt>Опади</dt><dd>{rainChance ?? 0}%</dd>
      </dl>
    </article>
  );
}

export { describeCode };
