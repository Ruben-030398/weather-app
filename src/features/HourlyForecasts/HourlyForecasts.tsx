import { useMemo } from 'react'
import { useAppSelector } from '../../store'
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

import styles from './hourlyForecasts.module.sass'
import { useGroupedForecasts } from '../../hooks/useGroupForecasts';
import { getForecastGroupKey } from '../../utils';

const HourlyForecasts = () => {
  const dailyForecast = useAppSelector(state => state.dailyForecast);
  const selectedDate = useAppSelector(state => state.selectedDate);

  const groupedForecasts = useGroupedForecasts();

  const currentWeatherData = useMemo(() => {
    return dailyForecast.data?.list.find(item => item.dt_txt === selectedDate.value)
  }, [dailyForecast, selectedDate.value])

  const groupKey = currentWeatherData ? getForecastGroupKey(currentWeatherData) : '';

  const data = groupedForecasts[groupKey]

  if (!data && !dailyForecast.loading) return null;

  return (
    <ul className={styles.weather_list}>
      {
        data?.map(item => (
          <li className={styles.title_3} key={item.dt_txt}>
            {item.dt_txt}
            <WeatherIcon iconKey={item?.weather[0].icon} />
          </li>
        ))
      }
    </ul>
  )
}

export default HourlyForecasts