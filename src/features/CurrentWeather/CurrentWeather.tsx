import { useMemo } from 'react'
import { useAppSelector } from '../../store'
import styles from './currentWeather.module.sass'
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';
import { TemperatureUnitEnum } from '../../types';

const CurrentWeather = () => {
  const dailyForecast = useAppSelector(state => state.dailyForecast);
  const unit = useAppSelector(state => state.temperatureUnit);
  const selectedDate = useAppSelector(state => state.selectedDate);

  const currentWeatherData = useMemo(() => {
    return dailyForecast.data?.list.find(item => item.dt_txt === selectedDate.value)
  }, [dailyForecast, selectedDate.value]);  

  return (

    <div className={styles.current_weather_container}>
      {
        dailyForecast.loading ? (
          <div>Loading...</div>
        ) : dailyForecast.error || (
          <>
            <h2 className={styles.title_1}>{dailyForecast.data?.city.name}</h2>
            <WeatherIcon iconKey={currentWeatherData?.weather[0].icon} />
            <p className={styles.title_3}>{currentWeatherData?.weather[0].description}</p>
            <p className={styles.title_3}>Temperature: {currentWeatherData?.main.temp}{unit.type === TemperatureUnitEnum.Imperial ? '°F' : '°C'}</p>
          </>
        )
      }
    </div>
  )
}

export default CurrentWeather