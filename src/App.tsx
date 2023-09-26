import styles from './sass/main.module.sass'
import Navbar from './components/Navbar/Navbar';
import CurrentWeather from './features/CurrentWeather/CurrentWeather';
import DailyForecast from './features/DailyForecast/DailyForecast';
import HourlyForecasts from './features/HourlyForecasts/HourlyForecasts';

function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.layout}>
        <CurrentWeather />
        <HourlyForecasts />
      </div>
      <DailyForecast />
    </div>
  )
}

export default App
