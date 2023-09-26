import { List } from "./types";

export function getWeatherIconUrl(iconCode: string) {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
}

export const getForecastGroupKey = (value: List) => {
  const date = new Date(value.dt_txt);

  const key = `${date.getDay()}-${date.getMonth()}`;

  return key;
}