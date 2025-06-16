<template>
  <el-config-provider>
    <div class="main-wrapper">
      <div class="container">
        
        <div v-if="$route.path !== '/'" class="top-bar">
        <el-menu mode="horizontal" router :default-active="$route.path" class="top-bar-menu">
          <el-menu-item index="/plan">Задачи дня</el-menu-item>
          <el-menu-item index="/log">Трекер энергии</el-menu-item>
          <el-menu-item index="/settings">Настройки</el-menu-item>
        </el-menu>

          <div class="top-bar-right">
            <span v-if="userStore.name" class="user-name">
              Привет, {{ userStore.name }} !🌞
            </span>
            <!-- <el-select v-model="locale" class="locale-switch" size="small" @change="switchLocale">
              <el-option label="RU" value="ru" />
              <el-option label="EN" value="en" />
            </el-select> -->
            <!-- <button class="start-btn">Выход</button> -->
          </div>
        </div>

        <router-view />
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

import { useUserStore } from '@/stores/useUserStore'

const { t, locale } = useI18n()
const userStore = useUserStore()

const switchLocale = (val: string) => {
  locale.value = val
}

watchEffect(() => {
  console.log('ACTIVE LOCALE:', locale.value)
  console.log('t', t('plan.title'))
})
</script>


<style scoped>
.main-wrapper {
  min-height: 100vh;
  background-color: var(--color-white);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color);
}

.top-bar-menu {
  flex: 1;
  min-width: 0;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.locale-switch {
  width: 80px;
}

.user-name {
  margin-right: 16px;
  font-weight: 500;
  color: var(--text-grey);
  white-space: nowrap;
}
</style>