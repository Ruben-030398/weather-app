import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchCurrentWeather } from '../../store/slices/current-weather';
import styles from './currentWeather.module.sass'
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';
import { TemperatureUnitEnum } from '../../types';

const CurrentWeather = () => {
  const dispatch = useAppDispatch();
  const currentWeatherData = useAppSelector(state => state.currentWeather);
  const unit = useAppSelector(state => state.temperatureUnit);
  const city = useAppSelector(state => state.selectedCity);


  useEffect(() => {
    dispatch(fetchCurrentWeather({ city: city.value, unit: unit.type }));
  }, [unit.type, city.value])


  const { data, error } = currentWeatherData;

  return (

    <div className={styles.current_weather_container}>
      {
        currentWeatherData.loading ? (
          <div>Loading...</div>
        ) : error || (
          <>
            <h2 className={styles.title_1}>{data?.name}</h2>
            <WeatherIcon iconKey={data?.weather[0].icon} />
            <p className={styles.title_3}>{data?.weather[0].description}</p>
            <p className={styles.title_3}>Temperature: {data?.main.temp}{ unit.type === TemperatureUnitEnum.Imperial ? '°F' : '°C'}</p>
          </>
        )
      }
    </div>
  )
}

export default CurrentWeather