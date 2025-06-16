import { defineStore } from 'pinia'
import { addTask as addTaskFromAPI, editTask as editTaskFromAPI, deleteTask as deleteTaskFromAPI, toggleTaskStatus as toggleTaskStatusFromAPI  } from '@/api/tasksApi'
import { useUserStore } from '@/stores/useUserStore'

const STORAGE_KEY = 'energy-task-board'

export interface Task {
  id: string
  text: string
  completed: boolean
}

type FocusKey = string
type FocusTasks = Record<FocusKey, Task[]>

interface TaskBoardState {
  selectedCategories: string[]
  customTasks: string[]
  tasksByDate: Record<string, FocusTasks>
  selectedDate: string
  customListLabels: Record<string, string>,
  step: number
}

export const useTaskBoardStore = defineStore('taskBoard', {
  state: (): TaskBoardState => ({
    selectedCategories: [],
    customTasks: [],
    tasksByDate: {},
    selectedDate: new Date().toISOString().slice(0, 10),
    customListLabels: {},
    step: 1
  }),

  actions: {
    // Фокус дня: добавить/убрать категорию
    toggleCategory(id: string) {
      if (this.selectedCategories.includes(id)) {
        this.selectedCategories = this.selectedCategories.filter(i => i !== id)
      } else {
        this.selectedCategories.push(id)
      }
    },
    
    // ДОСКА
    // Добавить новую задачу 
    addTask: async function (focus: string, text: string) {
      const date = this.selectedDate
      const userStore = useUserStore()
      const userId = userStore.userId

      const newTask = await addTaskFromAPI({
        date,
        focus_id: focus,
        text,
        completed: false,
        user_id: userId
      })

      if (!this.tasksByDate[date]) this.tasksByDate[date] = {}
      if (!this.tasksByDate[date][focus]) this.tasksByDate[date][focus] = []

      this.tasksByDate[date][focus].push({
        id: newTask.id,
        text: newTask.text,
        completed: newTask.completed 
      })
    },

    // Создать кастомный список для задач
    addCustomList(focusId: string, label: string) {
      const date = this.selectedDate

      if (!this.tasksByDate[date]) {
        this.tasksByDate[date] = {}
      }

      if (!this.selectedCategories.includes(focusId)) {
        this.selectedCategories.push(focusId)
        this.customListLabels[focusId] = label
        this.tasksByDate[date][focusId] = []
      }
    },

    // Удалить задачу 
    deleteTask: async function (focus: string, taskId: string) {
      console.log('Удаляем задачу:', taskId)

      const date = this.selectedDate
      const { error } = await deleteTaskFromAPI(taskId)

      if (error) {
        console.error('Ошибка при удалении задачи:', error)
        return
      }

      if (!this.tasksByDate[date] || !this.tasksByDate[date][focus]) return

      this.tasksByDate[date][focus] = this.tasksByDate[date][focus].filter(
        (task) => task.id !== taskId
      )
    },

    // Редактировать текст задачи
    editTask: async function (focus: string, payload: { id: string; text: string }) {
      const date = this.selectedDate
      const tasks = this.tasksByDate[date]?.[focus]
      if (!tasks) return

      try {
        const updatedTask = await editTaskFromAPI({
          id: payload.id,
          text: payload.text,
        })

        const task = tasks.find(t => t.id === payload.id)
        if (task) {
          task.text = updatedTask.text
        }
      } catch (error) {
        console.error('Ошибка при редактировании задачи:', error)
      }
    },

    // Переключить статус выполнения задачи
    toggleTaskDone: async function (focus: string, taskId: string) {
      const date = this.selectedDate
      const tasks = this.tasksByDate[date]?.[focus]
      if (!tasks) return

      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      task.completed = !task.completed

      const { error } = await toggleTaskStatusFromAPI({
        id: task.id,
        completed: task.completed
      })

      if (error) {
        console.error('Ошибка при обновлении статуса задачи:', error)
      }
    },

    // Удалить список и его задачи
    deleteList(focus: string) {
    this.selectedCategories = this.selectedCategories.filter(id => id !== focus)

    if (this.tasksByDate[this.selectedDate]?.[focus]) {
      delete this.tasksByDate[this.selectedDate][focus]
    }

    if (this.customListLabels[focus]) {
      delete this.customListLabels[focus]
    }

    this.saveToLocalStorage()
    },

    // Удалить все задачи за выбранную дату
    resetTasksForSelectedDate() {
      if (this.tasksByDate[this.selectedDate]) {
        delete this.tasksByDate[this.selectedDate]
        this.saveToLocalStorage()
      }
    },

    // Устанавливает задачи для конкретного фокуса и даты
    setTasksForFocus(focus: string, tasks: Task[]) {
      const date = this.selectedDate
      if (!this.tasksByDate[date]) this.tasksByDate[date] = {}
      this.tasksByDate[date][focus] = tasks.map(task => ({
        ...task,
        completed: !!task.completed 
      }))
    },

    // Синхронизация 
    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        customTasks: this.customTasks,
        tasksByDate: this.tasksByDate,
        customListLabels: this.customListLabels,
        step: this.step
      }))
    },

    setStep(val: number) {
      this.step = val
    },
  }
})
