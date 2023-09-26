import React from 'react'
import { getWeatherIconUrl } from '../../utils'


const WeatherIcon: React.FC<React.HTMLAttributes<HTMLImageElement> & { iconKey?: string }> = ({ className, iconKey }) => {

  const iconUrl = getWeatherIconUrl(iconKey || '')


  return (
    <img src={iconUrl} className={className} />
  )
}

export default WeatherIcon