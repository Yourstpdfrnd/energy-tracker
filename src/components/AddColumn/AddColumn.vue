<!-- Компонент добавления кастомной колонки -->
<template>
  <div class="add-column" @click="open = true" v-if="!open">
    +  {{ t('column') }} + 
  </div>

  <div class="add-column-form" v-else>
    <el-input
      v-model="newTitle"
      placeholder="Название списка"
      size="small"
      @keyup.enter="submit"
      autofocus
    />
    <div class="add-column-form__actions">
      <el-button class="task-button" size="small" @click="cancel">Отмена</el-button>
      <el-button class="task-button" type="primary" size="small" @click="submit">Добавить</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskBoardStore } from '@/stores/taskBoardStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const open = ref(false)
const newTitle = ref('')
const store = useTaskBoardStore()

// Сохраняем кастомный список
const submit = () => {
  const title = newTitle.value.trim()
  if (!title) return
  const id = `free-${Date.now()}`
  store.addCustomList(id, title)
  newTitle.value = ''
  open.value = false
}

const cancel = () => {
  newTitle.value = ''
  open.value = false
}
</script>

<style scoped>
@import './AddColumn.scss';
</style>