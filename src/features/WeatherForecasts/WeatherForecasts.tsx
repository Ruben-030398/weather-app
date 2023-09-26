import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchWeatherForecast } from '../../store/slices/hourly-forecast';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

import styles from './weatherForecasts.module.sass'

const WeatherForecasts = () => {
  const dispatch = useAppDispatch();

  const forecastsData = useAppSelector(state => state.weatherForecast);
  const unit = useAppSelector(state => state.temperatureUnit);


  useEffect(() => {
    dispatch(fetchWeatherForecast({ city: '', unit: unit.type }));
  }, [unit.type]);

  if (forecastsData.loading) return <div>Loading...</div>

  const { data } = forecastsData;

  return (
      <ul className={styles.weather_list}>
        {
          data?.list.map(item => (
            <li className={styles.title_3} key={item.dt_txt}>
              {item.dt_txt}
              <WeatherIcon iconKey={item?.weather[0].icon} />
            </li>
          ))
        }
      </ul>
  )
}

export default WeatherForecasts