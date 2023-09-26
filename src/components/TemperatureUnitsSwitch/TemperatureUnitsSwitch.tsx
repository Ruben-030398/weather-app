import { useAppDispatch, useAppSelector } from '../../store'
import { setTemperatureUnit } from '../../store/slices/temperature-unit';
import { TemperatureUnitEnum } from '../../types'

import styles from './temperature-units-switch.module.sass'

const TemperatureUnitsSwitch = () => {
  const dispatch = useAppDispatch();

  const unit = useAppSelector(state => state.temperatureUnit);  

  return (
    <div className={styles.unit_switch}>
      <div>
        <input
          checked={unit.type === TemperatureUnitEnum.Imperial}
          onChange={() => {
            dispatch(setTemperatureUnit(TemperatureUnitEnum.Imperial))}}
          type="radio"
          id={TemperatureUnitEnum.Imperial}
        />
        <label htmlFor={TemperatureUnitEnum.Imperial}>℉</label>
      </div>
      <div>
        <input
          onChange={() => dispatch(setTemperatureUnit(TemperatureUnitEnum.Metric))}
          checked={unit.type === TemperatureUnitEnum.Metric}
          type="radio"
          id={TemperatureUnitEnum.Metric}
        />
        <label htmlFor={TemperatureUnitEnum.Metric}>℃</label>
      </div>
    </div>
  )
}


export default TemperatureUnitsSwitch