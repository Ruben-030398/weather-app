import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchDailyForecast } from '../../store/slices/daily-forecast';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

import styles from './dailyForecast.module.sass';
import { useGroupedForecasts } from '../../hooks/useGroupForecasts';
import clsx from 'clsx';
import { setSelectedDate } from '../../store/slices/selected-date';

const DailyForecast = () => {
  const dispatch = useAppDispatch();

  const dailyForecast = useAppSelector(state => state.dailyForecast);
  const unit = useAppSelector(state => state.temperatureUnit);
  const city = useAppSelector(state => state.selectedCity);
  const selectedDate = useAppSelector(state => state.selectedDate);

  const groupedForecasts = useGroupedForecasts();

  useEffect(() => {
    dispatch(fetchDailyForecast({ unit: unit.type, city: city.value }))
  }, [unit.type, city.value]);

  if (dailyForecast.loading) return <div>Loading...</div>

  return (
    <div className={styles.daily_forecast}>
      {
        Object.values(groupedForecasts).map(([item]) => {
          return (
            <div
              className={clsx(styles.daily_forecast__item, {
                [styles.daily_forecast__item__selected]: item.dt_txt === selectedDate.value
              })}
              onClick={() => dispatch(setSelectedDate(item.dt_txt))}
              key={item.dt_txt}
            >
              <h3 className={styles.title_3}>{item.dt_txt}</h3>
              <div>
                <h2>{item.main.temp}</h2>
                <WeatherIcon iconKey={item.weather[0].icon} />
              </div>
            </div>
          )

        })
      }
    </div>
  )
}

export default DailyForecast