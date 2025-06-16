<template>
  <div class="log-page">
    <div class="main-inner">
      <div class="form-wrapper">
        <EnergyLogForm />
      </div>
      <div class="right-block">
        <div class="dashboard-wrapper">
          <EnergyDashboard />
        </div>
        <div class="information-block__row">
          <LunarPhaseCard />
          <CrystalCard :currentPhase="phaseName" />
        </div>
        <TimerCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { fetchMoonPhase } from '@/services/lunarService'
import { getTasksByFocusAndDate } from '@/api/tasksApi'

import { useTaskBoardStore } from '@/stores/taskBoardStore'
import { useUserStore } from '@/stores/useUserStore'

import EnergyLogForm from '@/components/EnergyLogForm/EnergyLogForm.vue'
import EnergyDashboard from '@/components/EnergyDashboard/EnergyDashboard.vue'
import LunarPhaseCard from '@/components/LunarPhaseCard/LunarPhaseCard.vue'
import CrystalCard from '@/components/CrystalCard/CrystalCard.vue'
import TimerCard from '@/components/TimerCard/TimerCard.vue'


const store = useTaskBoardStore()
const userStore = useUserStore()
const { selectedDate, selectedCategories } = storeToRefs(store)

const phaseName = ref('')


onMounted(async () => {
  try {
    // Лунная фаза
    const moonData = await fetchMoonPhase()
    phaseName.value = moonData.phaseName

    // Задачи по выбранным фокусам
    const date = selectedDate.value
    const userId = userStore.userId

    for (const focusId of selectedCategories.value) {
      const tasks = await getTasksByFocusAndDate({ date, focus_id: focusId, user_id: userId })
      store.setTasksForFocus(focusId, tasks)
    }
  } catch (err) {
    console.error('Ошибка инициализации лог-страницы:', err)
  }
})
</script>

<style scoped>
.log-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 0;
  box-sizing: border-box;
}

.main-inner {
  display: flex;
  gap: 22px;
  align-items: flex-start;
}

.form-wrapper,
.dashboard-wrapper {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.form-wrapper {
      min-width: 620px;
}

.dashboard-wrapper {
    height: 410px;
    display: block;
    background-color: var(--color-white);
}

.information-block__row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 20px;
  margin-bottom: 12px;
}
</style>