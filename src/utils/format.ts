import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export function formatLogDate(date: string, time?: string) {
  const dateTimeString = time ? `${date} ${time}` : date
  return dayjs(dateTimeString).format('D MMM')
}