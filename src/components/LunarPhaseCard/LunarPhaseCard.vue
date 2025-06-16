<template>
  <el-card class="lunar-phase-card" shadow="always">
    <div v-if="loading">Загружаем фазу луны...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="lunar-phase-card__content">
      <img :src="moonImageUrl" alt="Фаза луны" class="lunar-phase-card__image" />
      <div class="lunar-phase-card__text">
        <div class="lunar-phase-card__name">
          {{ label }}
        </div>
        <div class="lunar-phase-card__note">
          {{ tip }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { moonPhases, moonTips } from '@/data/moonPhases'
import { fetchMoonPhase } from '@/services/lunarService'

const moonImageUrl = ref('')
const phaseName = ref('')
const loading = ref(true)
const error = ref('')

const label = computed(() => moonPhases[phaseName.value] || phaseName.value)
const tip = computed(() => moonTips[phaseName.value] || '')

onMounted(async () => {
  try {
    const data = await fetchMoonPhase()
    moonImageUrl.value = data.imageUrl
    phaseName.value = data.phaseName
  } catch (err) {
    error.value = 'Ошибка при загрузке фазы луны'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import './LunarPhaseCard.scss';
</style>