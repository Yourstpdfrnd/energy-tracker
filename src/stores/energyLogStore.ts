import { defineStore } from 'pinia'
import { getEnergyLogByDate, updateEnergyLog, addEnergyLog} from '@/api/energyLogApi'
import { useUserStore } from '@/stores/useUserStore'

export interface EnergyLog {
  id?: string
  date: string
  energyLevel: number
  comment?: string
}

export const useEnergyLogStore = defineStore('energyLogStore', {
  state: () => ({
    currentLog: null as EnergyLog | null
  }),
  actions: {
    // Загружает лог энергии для заданной даты и текущего пользователя
    async loadLog(date: string) {
      const userStore = useUserStore()
      const userId = userStore.userId

      if (!userId) {
        this.currentLog = null
        return
      }

      const log = await getEnergyLogByDate(date, userId)
      this.currentLog = log
    },

    // Сохраняет лог энергии для текущей даты/пользользвателя
    async saveLog(log: { date: string, energyLevel: number, comment?: string }) {
      const userStore = useUserStore()
      const userId = userStore.userId

      if (!userId) {
        console.warn('Нет userId, лог не будет сохранён')
        return
      }

      if (this.currentLog?.id) {
        // Лог есть — обновляем запись
        await updateEnergyLog(this.currentLog.id, {
          score: log.energyLevel,
          comment: log.comment
        })
      } else {
        // Лога нет — создаём новый
        const { data } = await addEnergyLog({
          date: log.date,
          score: log.energyLevel,
          comment: log.comment,
          user_id: userId,
        })
        this.currentLog = data?.[0] ?? null
      }
    }

  }
})