<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <el-checkbox v-model="localCompleted" />

    <div class="task-content">
      <template v-if="isEditing">
        <input
          type="text"
          v-model="editedText"
          @blur="confirmEdit"
          @keyup.enter="confirmEdit"
          class="task-edit-input"
        />
      </template>
      <template v-else>
        <span>{{ task.text }}</span>
      </template>
    </div>

    <!-- Меню Дропдаун -->
    <el-dropdown trigger="click" popper-class="task-dropdown-menu">
      <span class="menu-icon">⋯</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="startEdit">Редактировать</el-dropdown-item>
          <el-dropdown-item @click="handleDelete" divided>Удалить</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  task: { id: string; text: string; completed: boolean }
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
  (e: 'edit', payload: { id: string; text: string }): void
}>()

const localCompleted = ref(props.task.completed)
const isEditing = ref(false)
const editedText = ref(props.task.text)

const startEdit = () => {
  isEditing.value = true
  editedText.value = props.task.text
}

const handleDelete = () => {
  emit('delete', props.task.id)
}

const confirmEdit = () => {
  if (editedText.value.trim() && editedText.value !== props.task.text) {
    emit('edit', { id: props.task.id, text: editedText.value.trim() })
  }
  isEditing.value = false
}

// Следим за изменением task.completed и обновляем
watch(() => props.task.completed, (newVal) => {
  localCompleted.value = newVal
})


watch(localCompleted, (newVal) => {
  if (newVal !== props.task.completed) {
    emit('toggle', props.task.id)
  }
})

</script>

<style scoped>
@import './TaskCard.scss';
</style>
