<!-- Компонент, который автоматически показывает уровень энергии на основе выбранных факторов. -->
<template>
  <div class="energy-result">
    <el-progress
      :percentage="clampedScore"
      :color="energyInfo.color"
      :text-inside="true"
      :stroke-width="24"
      class="energy-bar"
    />
    <p class="label">
      {{ energyInfo.label }} Уровень энергии ({{ score }})
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Минимальное и максимальное значение баланса энергии
const MIN_SCORE = -10
const MAX_SCORE = 10

const props = defineProps<{ score: number }>()

// Возвращает метку и цвет для текущего уровня энергии
const getEnergyLevelLabel = (score: number) => {
  if (score <= -2) return { label: 'Низкий', color: '#f56c6c' }
  if (score <= 2) return { label: 'Средний', color: '#e6a23c' }
  return { label: 'Высокий', color: '#67c23a' }
}

const energyInfo = computed(() => getEnergyLevelLabel(props.score))

// Проценты для прогресс-бара
const scorePercent = computed(() => {
  return Math.round(((props.score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100)
})

// Ограничение процента для прогресс-бара
const clampedScore = computed(() => Math.min(100, Math.max(0, scorePercent.value)))
</script>

<style scoped>
@import './EnergyResult.scss';
</style>