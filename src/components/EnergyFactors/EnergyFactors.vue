<!-- Компонент с чекбоксами — пользователь выбирает, что на него повлияло. -->
<template>
  <div class="energy-factors">
    <el-checkbox-group class="energy-factors__inner" v-model="modelValue">
      <div class="energy-factors__column">
        <div class="column-inner">
          <h4 class="energy-factors__title">
            <img class="energy-factors__icon" :src="icons.positive" alt="">
            Позитивные</h4>
          <el-checkbox
            v-for="item in store.positiveFactors"
            :key="item.value"
            :label="item.value"
          >
            <span>
             {{ item.value.startsWith('custom_') ? item.label : getLabel(item.value) }}
              <el-icon
                v-if="item.value.startsWith('custom_')"
                @click.stop="remove(item.value)"
                class="delete-icon"
              >
                <Close />
              </el-icon>
            </span>
          </el-checkbox>
        </div>
      </div>

      <div class="energy-factors__column">
        <div class="column-inner">
          <h4 class="energy-factors__title"><img class="energy-factors__icon" :src="icons.negative" alt=""> Негативные</h4>
          <el-checkbox
            v-for="item in store.negativeFactors"
            :key="item.value"
            :label="item.value"
          >
            <span>
              {{ item.value.startsWith('custom_') ? item.label : getLabel(item.value) }}
              <el-icon
                v-if="item.value.startsWith('custom_')"
                @click.stop="remove(item.value)"
                class="delete-icon"
              >
                <Close />
              </el-icon>
            </span>
          </el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Close } from '@element-plus/icons-vue'

import { useEnergyFactorsStore } from '@/stores/energyFactors'
import { icons } from '@/data/icons'


const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits(['update:modelValue'])

const store = useEnergyFactorsStore()

const factors: Record<string, string> = {
  sleep: "Недосып",
  bad_diet: "Плохое питание",
  stress: "Стресс",
  exercise: "Физическая активность",
  caffeine: "Много кофеина",
  screen_time: "Много экрана",
  fresh_air: "Прогулка на свежем воздухе",
  relaxation: "Медитация / отдых"
}

const getLabel = (value: string) => factors[value] || value

const modelValue = computed({
  get: () => props.modelValue,
  set: (val: string[]) => emit('update:modelValue', val),
})

const positiveFactors = store.positiveFactors
const negativeFactors = store.negativeFactors

const remove = (value: string) => {
  modelValue.value = modelValue.value.filter(v => v !== value)
  store.removeCustomFactor(value)
}
</script>

<style lang="scss">
@import './EnergyFactors.scss';
</style>