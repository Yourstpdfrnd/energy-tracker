import { defineStore } from 'pinia'

export interface EnergyFactor {
  label: string
  value: string
  weight: number
  emoji: string
}

export const useEnergyFactorsStore = defineStore('energyFactors', {
  state: () => ({
    factors: [
      // Базовые факторы 
      { value: 'sleep', weight: -4, emoji: '😞' },
      { value: 'bad_diet', weight: -3, emoji: '😞' },
      { value: 'stress', weight: -5, emoji: '😞' },
      { value: 'exercise', weight: 3, emoji: '😊' },
      { value: 'caffeine', weight: -2, emoji: '😞' },
      { value: 'screen_time', weight: -2, emoji: '😞' },
      { value: 'fresh_air', weight: 2, emoji: '😊' },
      { value: 'relaxation', weight: 3, emoji: '😊' },
    ] as EnergyFactor[]
  }),

  actions: {
    // Добавить свой кастомный фактор
    addCustomFactor(emoji: string, label: string) {
        const id = `custom_${Date.now()}`;
        const weight = emoji === '😊' ? 2 : emoji === '😞' ? -2 : 0;
      
        const newFactor = {
          value: id,
          label,
          emoji,
          weight,
        };
      
        this.factors.push(newFactor);

        this.saveCustomFactors()
    },

    // Удалить кастомный фактор
    removeCustomFactor(value: string) {
      this.factors = this.factors.filter(f => f.value !== value)
      this.saveCustomFactors()
    },

    // Сохранить все кастомные факторы в localStorage
    saveCustomFactors() {
      const customFactors = this.factors.filter(f => f.value.startsWith('custom_'));
      localStorage.setItem('customFactors', JSON.stringify(customFactors));
    },

    // Удалить все кастомные факторы
    clearCustomFactors() {
      this.factors = this.factors.filter(f => !f.value.startsWith('custom_'))
      localStorage.removeItem('customFactors')
    },

    // Загрузить кастомные факторы из localStorage
    loadCustomFactors() {
      const saved = localStorage.getItem('customFactors')
      if (saved) {
        const parsed: EnergyFactor[] = JSON.parse(saved)
        this.factors.push(...parsed)
      }
    }
  },
  getters: {
    positiveFactors: (state) => state.factors.filter(f => f.emoji === '😊'),
    negativeFactors: (state) => state.factors.filter(f => f.emoji === '😞'),
    customFactors: (state) => state.factors.filter(f => f.value.startsWith('custom_')),
  }
})
