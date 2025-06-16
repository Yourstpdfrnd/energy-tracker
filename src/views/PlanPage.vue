<template>
  <div class="plan-page">
    <div class="main-inner">
      <h1 class="plan-page__title">Задачи дня </h1>
      <p v-if="step === 1" class="plan-page__subtitle">Выбери, на что хочешь направить энергию сегодня</p>

      <!-- Шаг 1: Выбор фокусов -->
      <div v-if="step === 1">
        <div v-if="!isLoadingFocuses" class="categories-grid">
          <TaskCategoryCard
            v-for="category in categories"
            :key="category.id"
            :icon="category.icon"
            :label="category.label"
            :category="category.id"
            :selected="selectedCategories.includes(category.id)"
            @toggle="handleToggle(category.id)"
          />
        </div>
        <div class="button-end">
          <el-button
            class="nav-button"
            type="primary"
            :disabled="!selectedCategories.length"
            @click="handleSaveFocuses"
          >
           Далее
          </el-button>
        </div>
      </div>

      <!-- Шаг 2: подтверждение -->
      <div v-else-if="step === 2">
        <div class="plan-page__focuses mt-4">
          <h3>Выбранные фокусы:</h3>
          <div class="selected-categories">
            <div
              v-for="category in categoriesFiltered"
              :key="category.id"
              class="selected-category-tile"
              :style="{ backgroundColor: focusColorMap[category.id] }"
            >
              <img :src="category.icon" class="category-icon" />
              <span>{{ category.label }}</span>
            </div>
          </div>
          <div class="plan-page__focuses-actions">
            <el-button class="nav-button-back" type="primary" @click="step--">
             Назад
            </el-button>
            <el-button class="nav-button" type="primary" @click="step++">
             Далее
            </el-button>
          </div>
        </div>
      </div>

      <!-- Шаг 3: доска -->
      <div v-else-if="step === 3">
        <TaskBoard />
        <div class="plan-page__focuses-actions">
          <el-button type="primary" class="nav-button-back" @click="step--">
            Назад
          </el-button>
          <el-button
            class="nav-button"
            type="primary"
            @click="goToTracker"
            :disabled="!hasTasks"
          >
           Перейти в трекер энергии
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { categories as getCategories } from '@/data/tasksCategories'
import { focusColorMap } from '@/data/focusColors'

import { useTaskBoardStore } from '@/stores/taskBoardStore'

import { addFocusLog, getFocusLogsByDate } from '@/api/focusLogApi'

import TaskCategoryCard from '@/components/TaskCategoryCard/TaskCategoryCard.vue'
import TaskBoard from '@/components/TaskBoard/TaskBoard.vue'


const route = useRoute()
const router = useRouter();

// стор
const store = useTaskBoardStore()
const { selectedCategories } = storeToRefs(store)
const { toggleCategory } = store

const categories = computed(() => getCategories())

const isLoadingFocuses = ref(true)
const autoLoad = false 

const step = computed({
  get: () => {
    const raw = route.query.step
    return raw ? Number(raw) : 1
  },
  set: (val: number) => {
    router.replace({ query: { ...route.query, step: String(val) } })
  }
})

// действия
const handleSaveFocuses = async () => {
  const date = selectedDate.value
  for (const focusId of selectedCategories.value) {
    await addFocusLog({ date, focus_id: focusId })
  }
  step.value++
}

const handleToggle = (id: string) => {
  toggleCategory(id)
}

const getLabel = (id: string) => {
  const item = categories.value.find(cat => cat.id === id)
  return item ? item.label : id
}

const categoriesFiltered = computed(() =>
  categories.value.filter(cat => selectedCategories.value.includes(cat.id))
)
const { tasksByDate, selectedDate } = storeToRefs(store)

const hasTasks = computed(() => {
  const date = selectedDate.value
  return Object.keys(tasksByDate.value[date] || {}).length > 0
})

const goToTracker = () => {
  router.push('/log')
}

onMounted(async () => {

  if (autoLoad) {
    const date = selectedDate.value
    const logs = await getFocusLogsByDate(date)
    const alreadySelected = logs.map(log => log.focus_id)
    alreadySelected.forEach(id => {
      toggleCategory(id)
    })
  }

  isLoadingFocuses.value = false
})

</script>

<style scoped>
.plan-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 0;
  box-sizing: border-box;
}

.custom-input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  min-width: 240px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.button-end {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.selected-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 24px 0;
  flex-direction: column;
}

.selected-category-tile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--card-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  max-width: 222px;
}

.category-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.plan-page__focuses-actions {
  margin-top: 50px;
}
</style>