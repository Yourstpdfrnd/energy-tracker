// services/lunarService.ts
import { getCurrentLocation } from '@/utils/location'
import newMoon from '@/assets/moon_phases/new_moon.png'
import waxingCrescent from '@/assets/moon_phases/waxing_crescent.png'
import firstQuarter from '@/assets/moon_phases/first_quarter.png'
import waxingGibbous from '@/assets/moon_phases/waxing_gibbous.png'
import fullMoon from '@/assets/moon_phases/full_moon.png'
import waningGibbous from '@/assets/moon_phases/waning_gibbous.png'
import waningCrescent from '@/assets/moon_phases/waning_crescent.png'
import lastQuarter from '@/assets/moon_phases/last_quarter.png'

export type MoonPhase =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent'

  export async function fetchMoonPhase(): Promise<{
    phaseName: MoonPhase
    imageUrl: string
  }> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const { latitude, longitude } = await getCurrentLocation()
  
    const date = new Date().toISOString().split('T')[0]
    const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${latitude},${longitude}&dt=${date}`
  
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Не удалось получить данные луны')
    }
  
    const data = await res.json()
    const phase = data.astronomy.astro.moon_phase.trim() as MoonPhase
  
    return {
      phaseName: phase,
      imageUrl: getMoonImageByPhase(phase),
    }
  }

// Функция возвращает URL иконки по названию фазы луны
function getMoonImageByPhase(phase: string): string {
  console.log('Фаза из API:', `"${phase}"`) 

  const images: Record<string, string> = {
    'New Moon': newMoon, 
    'Waxing Crescent': waxingCrescent, 
    'First Quarter': firstQuarter,  
    'Waxing Gibbous': waxingGibbous, 
    'Full Moon': fullMoon, 
    'Waning Gibbous': waningGibbous, 
    'Last Quarter': lastQuarter,
    'Waning Crescent': waningCrescent,  
  }

  return images[phase.trim()] ?? '/moon_phases/default.png'
}