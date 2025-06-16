<template>
  <div
    class="task-category-card"
    :class="{ selected }"
    :style="selected && focusColorMap[category] ? { backgroundColor: focusColorMap[category] } : {}"
    @click="$emit('toggle')"
  >
    <img :src="icon" alt="" class="icon" />
    <p>{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { focusColorMap } from '@/data/focusColors'

const props = defineProps<{
  icon: string,
  label: string,
  selected: boolean,
  category: string
}>()

const emit = defineEmits(['toggle'])
</script>

<style scoped>
@import './TaskCategoryCard.scss';

</style>