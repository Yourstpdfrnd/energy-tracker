<template>
  <div class="intro-screen">
    <video autoplay muted loop playsinline class="intro-video">
      <source src="/energy-vortex.mp4" type="video/webm" />
    </video>

    <p class="intro-text">Моя энергия — My SuperPower</p>

    <!-- Блок ввода имени -->
    <div v-if="!okClicked" class="name-input-wrapper">
      <label for="name">Как тебя зовут?</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Введите имя"
        aria-label="Имя пользователя"
        class="name-input"
      />
      <button @click="handleOk" :disabled="!name.trim()" class="ok-btn" aria-label="Подтвердить имя">ОК</button>
    </div>

    <!-- Кнопка НАЧАТЬ после ввода -->
    <router-link v-else to="/plan">
      <button class="start-btn">НАЧАТЬ</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore() 

const name = ref('')
const okClicked = ref(false)


const handleOk = () => {
  // Сохраняем имя
  const trimmedName = name.value.trim()
  if (!trimmedName) return

  userStore.setUserName(trimmedName)

  okClicked.value = true
}

</script>

<style scoped>
.name-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px; 
}

.name-input {
  margin-top: 8px;   
  padding: 8px 16px;  
  border-radius: 12px;
  border: 2px solid var(--color-purple);
  outline: none;
  font-size: 16px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.ok-btn {
  margin-top: 16px;
  background: var(--color-vio);
  padding: 8px 24px;  
  border-radius: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  color: var(--color-white);
}
.intro-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #ebe3ff, #e2f0ff);
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.intro-video {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(160, 120, 255, 0.5);
  animation: spin 30s linear infinite;
}

.intro-text {
  font-size: 22px;  
  color: var(--color-vio);
  margin-top: 22px;
}

.start-btn {
  margin-top: 19px;        
  padding: 14px 28px;     
  font-size: 16px;         
  border-radius: 10px;
  background: var(--color-purple);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background: var(--color-purple-hover);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>