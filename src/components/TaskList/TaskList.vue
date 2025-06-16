<template>
  <div class="task-list" :style="{ backgroundColor: focusColorMap[id] + '30' }">
    <div class="task-list__header">
      <h3 class="title">{{ title }}</h3>

      <el-dropdown v-if="isCustom" trigger="click">
        <span class="menu-icon">⋯</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="deleteList">Удалить список</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- Все задачи в списке -->
    <div class="task-cards">
      <TaskCard
        class="task-card"
        v-for="task in props.tasks"
        :key="task.id"
        :task="task"
        @delete="onDelete"
        @edit="onEdit"
        @toggle="onToggle"
      />
    </div>

    <!-- Ввод новой задачи -->
    <textarea
      v-model="newTask"
      class="task-list__input"
      placeholder="Добавьте задачу"
      @keyup.enter.prevent="addTask"
      rows="2"
    ></textarea>

    <div class="task-list__actions">
      <el-button class="task-button" size="small" type="primary" @click="addTask">
        Добавить
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useI18n } from 'vue-i18n'

import TaskCard from '@/components/TaskCard/TaskCard.vue'

import { useTaskBoardStore } from '@/stores/taskBoardStore'
import { focusColorMap } from '@/data/focusColors'

const props = defineProps<{
  id: string
  title: string
  tasks: { id: string, text: string, completed: boolean }[]
}>()

const { t } = useI18n()
const store = useTaskBoardStore()
const emit = defineEmits(['add', 'toggle', 'delete', 'edit', 'delete-list'])

const newTask = ref('')

const isCustom = computed(() =>
  typeof props.id === 'string' && props.id.startsWith('free-') || !!store.customListLabels[props.id]
)

const addTask = () => {
  const text = newTask.value.trim()
  if (!text) return
  emit('add', text)
  newTask.value = ''
}

const onToggle = (id: string) => emit('toggle', id)
const onDelete = (id: string) => emit('delete', id)
const onEdit = (payload: { id: string; text: string }) => emit('edit', payload)
const deleteList = () => emit('delete-list', props.id)

</script>

<style scoped>
@import './TaskList.scss';
</style>
