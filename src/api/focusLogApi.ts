import { supabase } from './supabase'

//получить фокус лог по дате
export const getFocusLogsByDate = async (date: string) => {
  const response = await supabase
    .from('focuses_log')
    .select('*')
    .eq('date', date)

  return response.data || []
}

// добавить фокус лог по дате и user_id
export const addFocusLog = async ({ date, focus_id }: { date: string; focus_id: string }) => {
  const response = await supabase
    .from('focuses_log')
    .insert([{ date, focus_id }])
    .select()
    .single()

  return response.data
}