import styles from './sass/main.module.sass'
import Navbar from './components/Navbar/Navbar';
import CurrentWeather from './features/CurrentWeather/CurrentWeather';
import WeatherForecasts from './features/WeatherForecasts/WeatherForecasts';
import DailyForecast from './features/DailyForecast/DailyForecast';

function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.layout}>
        <CurrentWeather />
        <WeatherForecasts />
      </div>
      <DailyForecast />
    </div>
  )
}

export default App
