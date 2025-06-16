<template>
  <div class="task-board">
    <TaskList
      v-for="focus in selectedCategories"
      :key="focus"
      :title="getTitle(focus)"
      :id="focus"
      :tasks="tasksByDate[selectedDate]?.[focus] || []"
      @add="text => store.addTask(focus, text)"
      @toggle="id => store.toggleTaskDone(focus, id)"
      @delete="id => store.deleteTask(focus, id)"
      @edit="payload => store.editTask(focus, payload)"
      @delete-list="focus => store.deleteList(focus)"
    />
    <AddColumn />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import TaskList from '@/components/TaskList/TaskList.vue'
import AddColumn from '@/components/AddColumn/AddColumn.vue'

import { useTaskBoardStore } from '@/stores/taskBoardStore'
import { useUserStore } from '@/stores/useUserStore'

import { getTasksByFocusAndDate } from '@/api/tasksApi'

const { t } = useI18n()

const store = useTaskBoardStore()
const userStore = useUserStore()
const { selectedCategories, tasksByDate, selectedDate } = storeToRefs(store)

const getTitle = (id: string) => {
  if (store.customListLabels[id]) {
    return store.customListLabels[id]
  }

  const translated = t(`tasks.${id}`)
  return translated === `tasks.${id}` ? id : translated
}

onMounted(async () => {
  const date = selectedDate.value
  const userId = userStore.userId

  for (const focusId of selectedCategories.value) {
    const tasks = await getTasksByFocusAndDate({ date, focus_id: focusId, user_id: userId })
    store.setTasksForFocus(focusId, tasks)
  }
})

</script>

<style scoped>
@import './TaskBoard.scss';
</style>
