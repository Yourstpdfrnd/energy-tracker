<template>
  <el-card class="practice-card">
    <div class="practice-header">
      <span>Время для практики</span>
    </div>

    <div class="practice-timer">{{ formattedTime }}</div>

    <div class="practice-controls">
      <el-button @click="showSoundSelector = true" circle>
        <el-icon><Headset /></el-icon> 
      </el-button>

      <el-button @click="toggleTimer" circle type="primary">
        <el-icon>
          <component :is="isRunning ? VideoPause : VideoPlay" />
        </el-icon>
      </el-button>

      <el-button @click="resetTimer" circle>
        <el-icon><Refresh /></el-icon>
      </el-button>
    </div>

    <el-dialog v-model="showSoundSelector" title="Выбери звук">
      <el-select v-model="selectedSound" placeholder="Звук медитации">
        <el-option label="Тибетские чаши" value="bowls.mp3" />
        <el-option label="Шум леса" value="forest.mp3" />
        <el-option label="Ом" value="om.mp3" />
      </el-select>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { VideoPlay, VideoPause, Refresh, Headset } from '@element-plus/icons-vue'

const totalTime = ref(600) // 10 минут
const timeLeft = ref(totalTime.value)
const isRunning = ref(false)
let interval: number | null = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

const toggleTimer = () => {
  if (isRunning.value) {
    clearInterval(interval!)
    interval = null
  } else {
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(interval!)
        interval = null
        isRunning.value = false
        // можно воспроизвести звук окончания
      }
    }, 1000)
  }
  isRunning.value = !isRunning.value
}

const resetTimer = () => {
  clearInterval(interval!)
  interval = null
  timeLeft.value = totalTime.value
  isRunning.value = false
}

const showSoundSelector = ref(false)
const selectedSound = ref('')

onBeforeUnmount(() => {
  clearInterval(interval!)
})
</script>

<style scoped>
@import './TimerCard.scss';
</style>