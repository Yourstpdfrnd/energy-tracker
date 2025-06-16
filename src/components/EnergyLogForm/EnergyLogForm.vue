<template>
  <el-card class="energy-log-form" shadow="always">
    <h2 class="row"><img class="form-icon-top" :src="icons.vector" alt="">Energy Tracker</h2>
    <p class="row subtitle">Узнай свой уровень энергии сегодня 
      <img class="form-icon" :src="icons.energy" alt="">
    </p>

    <!-- Задачи и выбранные фокусы -->
    <div class="form-section">
      <h3 class="row">
        <img class="form-icon" :src="icons.goal" alt="">
       Твой фокус на сегодня:
      </h3>
    
      <strong>Выбрано:</strong>
      <div v-for="cat in selectedCategories" :key="cat" class="focus-tag">{{ getLabel(cat) }}</div>
  
      <p class="form-section-total row">
        <img class="form-icon" :src="icons.done" alt=""> Выполнено задач: {{ completedTasks }} из {{ totalTasks }} ({{ completionPercent }}%)
      </p>
      
      <p class="row" v-if="completionPercent >= 70">
        <img class="form-icon" :src="icons.top" alt="">
       Отличный фокус! Это дало энергию
      </p>

      <p class="row" v-else-if="completionPercent > 0">
        <img class="form-icon" :src="icons.step" alt=""> 
        Первые шаги сделаны, продолжай!
      </p>

      <p class="row" v-else><img class="form-icon" :src="icons.pin" alt=""> 
       Ты запланировал, но пока не отметил выполнение задач
      </p>

    </div>

    <!-- Дата -->
    <div class="form-section">
      <h3>Данные загружены:</h3>
      <p>{{ selectedDate }}</p>
    </div>

    <!-- Уровень энергии -->
    <div class="form-section">
      <div class="energy-text__title">Твой уровень энергии:</div>
      <EnergyResult :score="energyLevel" />
      <p class="energy-text__tip" v-if="energyAdvice">Сделай паузу и подыши свежим воздухом </p>
    </div>

    <!-- Причины -->
    <div class="form-section">
      <div class="energy-text__title">Дополнительные факторы, повлиявшие на твой день</div>
      <EnergyFactors v-model="modelValue" />
      <div class="form-section">
      <el-button @click="showCustom = !showCustom">
        {{ showCustom ? 'Скрыть свой фактор': 'Добавить свой фактор' }}
      </el-button>

      <div v-if="showCustom" class="custom-reason-block">
        <el-input
          v-model="customReason"
          placeholder="Напиши"
          class="custom-reason-input"
        />

        <el-radio-group v-model="customEmoji">
          <el-radio-button label="positive">Позитивные</el-radio-button>
          <el-radio-button label="negative">Негативные</el-radio-button>
        </el-radio-group>

        <el-button class="el-custom" type="success" @click="addCustomReason">Добавить</el-button>
      </div>
    </div>
    </div>

    <!-- Комментарий и кнопка -->
    <div class="form-section">
      <el-input v-model="comment" type="textarea" placeholder="Комментарий" rows="3" />
    </div>

    <div class="form-section button-group">
      <el-button type="primary" class="nav-button-back" @click="goBackToTasks">Назад к задачам</el-button>
      <el-button type="primary" class="nav-button" @click="handleSubmit" :disabled="!isFormValid">Сохранить</el-button>
      <el-button type="warning" class="nav-button-done" @click="finishDay">Завершить день</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { icons } from '@/data/icons'
import { useRouter } from 'vue-router'

import { useEnergyFactorsStore } from '@/stores/energyFactors'
import { useEnergyLogStore } from '@/stores/energyLogStore'
import { useTaskBoardStore } from '@/stores/taskBoardStore'
import EnergyFactors from '@/components/EnergyFactors/EnergyFactors.vue'
import EnergyResult from '@/components/EnergyResult/EnergyResult.vue'
import { categories as getCategories } from '@/data/tasksCategories'

import { getTasksByFocusAndDate } from '@/api/tasksApi'
import { useUserStore } from '@/stores/useUserStore'


const router = useRouter()
const { t } = useI18n()

// Stores
const store = useEnergyFactorsStore()
const logStore = useEnergyLogStore()
const userStore = useUserStore()
const taskStore = useTaskBoardStore()
const { selectedCategories, tasksByDate, selectedDate, customListLabels } = storeToRefs(taskStore)


// @ts-ignore
window.logStore = useEnergyLogStore()

const categories = computed(() => getCategories(t))


// Название категории  
const getLabel = (id: string) => {
  if (customListLabels.value[id]) {
    return customListLabels.value[id]
  }
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.label : id
}

// Общее число задач по выбранной дате
const totalTasks = computed(() => {
  const tasks = tasksByDate.value[selectedDate.value] || {}
  return Object.values(tasks).flat().length
})


const completedTasks = computed(() => {
  const tasks = tasksByDate.value[selectedDate.value] || {}
  return Object.values(tasks).flat().filter(task => task.completed).length
})

// Процент выполнения задач 
const completionPercent = computed(() => {
  return totalTasks.value === 0 ? 0 : Math.round((completedTasks.value / totalTasks.value) * 100)
})

// Уровень энергии на основе завершённых задач
const energyFromTasks = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 10)
})

// Выбраные доп энергетические факторы
const selectedFactors = computed(() =>
  store.factors.filter(f => modelValue.value.includes(f.value))
)

// Расчет 'веса' факторов
const factorWeights = computed(() => {
  const weights: Record<string, number> = {}
  store.factors.forEach(f => {
    weights[f.value] = f.weight
  })
  return weights
})

// Общий 'энергетич вклад' выбранных факторов
const totalImpact = computed(() =>
  selectedFactors.value.reduce((sum, f) => sum + f.weight, 0)
)

// Итоговый уровень энергии за день
const energyLevel = computed(() => {
  return energyFromTasks.value + totalImpact.value
})

// сообщение - совет
const energyAdvice = computed(() => {
  return energyLevel.value < 0 ? t('form.advice') : ''
})


// Форма и валидация
const comment = ref('')
const modelValue = ref<string[]>([])
const isFormValid = computed(() =>
  selectedFactors.value.length > 0
)

// Сохранение energy-log 
const handleSubmit = async () => {
  const logEntry = {
    date: selectedDate.value,
    energyLevel: energyLevel.value,
    comment: comment.value,
  }

  await logStore.saveLog(logEntry)
  comment.value = ''
}

// Кастомные факторы
const customReason = ref('')
const showCustom = ref(false)
const customEmoji = ref<'positive' | 'negative'>('positive')

const addCustomReason = () => {
  const trimmed = customReason.value.trim()
  if (!trimmed) return

  const emoji = customEmoji.value === 'positive' ? '😊' : '😞'
  store.addCustomFactor(emoji, trimmed)

  customReason.value = ''
  customEmoji.value = 'positive'
}

// Действия  
//Завершение дня
const finishDay = () => {
  store.clearCustomFactors()
  modelValue.value = []
  comment.value = ''
  taskStore.resetTasksForSelectedDate()
  console.log('День завершён. Всё очищено.')
}

// Возврат к доске
const goBackToTasks = () => {
  router.push({ path: '/plan', query: { step: '3' } })
}


onMounted(async () => {
  store.loadCustomFactors()
  const date = selectedDate.value
  logStore.loadLog(date)

  // Подгружаем задачи по всем выбранным фокусам
  const userId = userStore.userId
  for (const focusId of selectedCategories.value) {
    const tasks = await getTasksByFocusAndDate({ date, focus_id: focusId, user_id: userId })
    taskStore.setTasksForFocus(focusId, tasks)
  }
})

</script>
<style>
@import './EnergyLogForm.scss';
</style>