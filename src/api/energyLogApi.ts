import { supabase } from './supabase'

// Получить energy log по дате и user_id
export const getEnergyLogByDate = async (date: string, user_id: string) => {
  const { data, error } = await supabase
    .from('energy_logs')
    .select('*')
    .eq('date', date)
    .eq('user_id', user_id)
    .limit(1)

  if (error) {
    console.error('Ошибка получения energy log:', error)
    return null
  }

  return data?.[0] ?? null
}

// Получить все energy logs по user_id 
export const getAllEnergyLogs = async (user_id: string) => {
  if (!user_id) return []

  const { data, error } = await supabase
    .from('energy_logs')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: true })

  if (error) {
    console.error('Ошибка при загрузке energy logs:', error)
    return []
  }

  return data
}

// Добавить energy log 
export const addEnergyLog = async ({
  date,
  score,
  comment,
  user_id
}: {
  date: string
  score: number
  comment?: string
  user_id: string
}) => {
  const { data, error } = await supabase
    .from('energy_logs')
    .insert([{ date, score, comment, user_id }])
    .select()

  if (error) {
    console.error('Ошибка при добавлении energy log:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Обновить energy log
export const updateEnergyLog = async (
  id: string,
  {
    score,
    comment
  }: {
    score: number
    comment?: string
  }
) => {
  const { error } = await supabase
    .from('energy_logs')
    .update({ score, comment })
    .eq('id', id)

  if (error) {
    console.error('Ошибка при обновлении energy log:', error)
  }

  return { error }
}
