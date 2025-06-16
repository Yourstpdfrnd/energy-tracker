import { supabase } from './supabase'

export interface Task {
  id: string
  text: string
  focus_id: string
  date: string
  completed: boolean
  created_at: string
  user_id: string
}

// Получить задачи по дате
export const getTasksByFocusAndDate = async ({
  date,
  focus_id,
  user_id
}: { date: string, focus_id: string, user_id: string }) => {
  console.log('API getTasksByFocusAndDate:', { date, focus_id, user_id })

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('date', date)
    .eq('focus_id', focus_id)
    .eq('user_id', user_id)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ Supabase error in getTasksByFocusAndDate:', error)
  }

  return data || []
}

// Добавить новую задачу
export const addTask = async ({
  text,
  date,
  focus_id,
  user_id,
  completed = false,
}: {
  text: string
  date: string
  focus_id: string
  user_id: string
  completed?: boolean
}): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ text, date, focus_id, user_id, completed }])
    .select()
    .single()

  if (error) {
    console.error('Ошибка при добавлении задачи:', error)
    throw error
  }

  return data
}

// Редактировать текст задачи
export const editTask = async ({
  id,
  text
}: {
  id: string
  text: string
}): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ text })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Ошибка при редактировании задачи:', error)
    throw error
  }

  return data
}

// Удалить задачу
export const deleteTask = async (id: string): Promise<{ error: any }> => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Ошибка при удалении задачи:', error)
  }

  return { error }
}

// Обновить статус задачи (completed)
export const toggleTaskStatus = async ({
  id,
  completed
}: {
  id: string
  completed: boolean
}) => {
  const { error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id)

  if (error) {
    console.error('Ошибка при обновлении completed:', error)
  }

  return { error }
}
