import styles from './navbar.module.sass';
import SearchBar from '../SearchBar/SearchBar';
import TemperatureUnitsSwitch from '../TemperatureUnitsSwitch/TemperatureUnitsSwitch';

const Navbar = () => {
  return (
    <nav className={styles.nav_bar}>
      <div className={styles.searchbar}>
        <SearchBar />
      </div>

      <TemperatureUnitsSwitch />
    </nav>
  )
}

export default Navbar