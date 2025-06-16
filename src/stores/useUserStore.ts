import { defineStore } from 'pinia'

const STORAGE_KEY = 'energy_user_id'
const NAME_KEY = 'energy_user_name'

export interface UserState {
  userId: string
  name: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: localStorage.getItem(STORAGE_KEY) || '',
    name: localStorage.getItem(NAME_KEY) || '',
  }),
  actions: {
    setUserName(name: string) {
      // Каждый раз при новом имени — генерируем новый userId!
      const newId = `${name}_${crypto.randomUUID()}`
      this.userId = newId
      this.name = name
      localStorage.setItem(STORAGE_KEY, newId)
      localStorage.setItem(NAME_KEY, name)
    },

    loadNameFromStorage() {
      this.name = localStorage.getItem(NAME_KEY) || ''
      this.userId = localStorage.getItem(STORAGE_KEY) || ''
    }
  }
})