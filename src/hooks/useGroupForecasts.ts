import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchDailyForecast } from "../store/slices/daily-forecast";
import { List } from "../types";
import { getForecastGroupKey } from "../utils";

export const useGroupedForecasts = () => {
  const dispatch = useAppDispatch();

  const dailyForecast = useAppSelector(state => state.dailyForecast);
  const unit = useAppSelector(state => state.temperatureUnit);
  const city = useAppSelector(state => state.selectedCity);

  const groupedForecasts = useMemo(() => dailyForecast?.data?.list ? dailyForecast?.data?.list.reduce<Record<string, Array<List>>>((acc, value) => {
    const key = getForecastGroupKey(value);

    if (acc[key]) {
      acc[key].push(value)
    } else {
      acc[key] = [value]
    }
    return acc;

  }, {}) : {}, [dailyForecast?.data]);

  useEffect(() => {
    dispatch(fetchDailyForecast({ unit: unit.type, city: city.value }))
  }, [unit.type, city.value]);

  return groupedForecasts;
}