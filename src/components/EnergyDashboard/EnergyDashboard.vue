<!-- Компонент графика -->
<template>
  <div class="energy-dashboard">
    <div class="energy-dashboard row" v-if="logs.value.length === 0">
      График пока пуст. Заполни свою первую запись
      <img class="energy-dashboard__icon" :src="icons.chart" alt="">
    </div>
    <v-chart v-else :option="chartOptions" :key="chartKey" autoresize class="chart" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'

import dayjs from 'dayjs'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useI18n } from 'vue-i18n'

import { icons } from '@/data/icons'
import { getAllEnergyLogs } from '@/api/energyLogApi'
import { formatLogDate } from '@/utils/format'

import { useUserStore } from '@/stores/useUserStore'

const { t } = useI18n()

use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

const chartKey = ref(0)

interface EnergyLog {
  id?: string
  date: string
  score: number
  comment?: string
}

const logs = ref<EnergyLog[]>([])

const userStore = useUserStore()
const userId = userStore.userId

const enhancedLogs = computed<EnergyLog[]>(() => {
  const sorted = logs.value
    .filter(log => log.date && typeof log.score === 'number')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (sorted.length === 0) return []

  const firstDate = sorted[0].date
  const dayBefore = dayjs(firstDate).subtract(1, 'day').format('YYYY-MM-DD')

  return [
    { date: dayBefore, score: 0 },
    ...sorted
  ]
})

const formattedDates = computed(() =>
  enhancedLogs.value.map(log => formatLogDate(log.date))
)

const energyValues = computed(() =>
  enhancedLogs.value.map(log => log.score)
)

const chartOptions = computed(() => ({
  title: {
    text: t('chart.energyTitle'),
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: formattedDates.value,
  },
  yAxis: {
    type: 'value',
    min: -10,
    max: 10,
    interval: 2
  },
  series: [
    {
      name: 'Энергия',
      type: 'line',
      smooth: true,
      data: energyValues.value,
      itemStyle: {
        color: '#42b983'
      },
      areaStyle: {
        color: 'rgba(66, 185, 131, 0.2)'
      }
    }
  ]
}))

watch(enhancedLogs, () => {
  chartKey.value++
})

watchEffect(async () => {
  if (!userId) return
  const result = await getAllEnergyLogs(userId)
  logs.value = result as EnergyLog[]
})
</script>

<style scoped>
@import './EnergyDashboard.scss';
</style>

