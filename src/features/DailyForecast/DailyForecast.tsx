import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchDailyForecast } from '../../store/slices/daily-forecast';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

import styles from './dailyForecast.module.sass';

const DailyForecast = () => {
  const dispatch = useAppDispatch();

  const dailyForecast = useAppSelector(state => state.dailyForecast);
  const unit = useAppSelector(state => state.temperatureUnit);

  useEffect(() => {
    dispatch(fetchDailyForecast({ unit: unit.type }))
  }, [unit.type]);

  if (dailyForecast.loading) return <div>Loading...</div>

  console.log(dailyForecast.data);

  return (
    <div className={styles.daily_forecast}>
      {
        dailyForecast.data?.list.map((item) => {
          return (
            <div className={styles.daily_forecast__item} key={item.dt_txt}>
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