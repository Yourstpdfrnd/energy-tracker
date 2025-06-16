<template>
  <div class="settings-page">
    <el-empty
      :description="t('settings.inProgress')"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.settings-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
}
</style>