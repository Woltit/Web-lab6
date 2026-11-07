// WMO weather codes (Open-Meteo)
export function describeCode(code) {
  if (code === 0) return { icon: '☀️', text: 'Ясно' };
  if (code <= 2) return { icon: '⛅', text: 'Мінлива хмарність' };
  if (code === 3) return { icon: '☁️', text: 'Хмарно' };
  if (code <= 48) return { icon: '🌫️', text: 'Туман' };
  if (code <= 57) return { icon: '🌦️', text: 'Мряка' };
  if (code <= 67) return { icon: '🌧️', text: 'Дощ' };
  if (code <= 77) return { icon: '❄️', text: 'Сніг' };
  if (code <= 82) return { icon: '🌦️', text: 'Злива' };
  if (code <= 86) return { icon: '🌨️', text: 'Снігопад' };
  return { icon: '⛈️', text: 'Гроза' };
}
