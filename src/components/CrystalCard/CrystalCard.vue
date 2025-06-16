<!-- Компонент карточки с кристаллом -->
<template>
  <el-card class="crystal-card">
    <div class="crystal-card__title row">
      <img class="crystal-card__icon" :src="icons.crystal" alt=""> Рекомендованный кристалл
    </div>

    <div class="crystal-card__content">
      <el-image
        :src="crystal.image"
        fit="contain"
        class="crystal-card__image"
      />

      <div class="crystal-card__text">
        <h3 class="crystal-card__name">{{ crystal.name }}</h3>
        <p class="crystal-card__description">{{ crystal.description }}</p>
      </div>
    </div>

    <div class="crystal-card__usage">
      <strong>{{ t('howToUse') }}:</strong><br />
      {{ crystal.howToUse }}
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { icons } from '@/data/icons'
import { crystals} from '@/data/crystals'

const props = defineProps<{
  currentPhase: string
}>()

const { t } = useI18n()

const crystal = computed(() => {
  const data = crystals[props.currentPhase]

  if (!data || typeof data !== 'object') {
    return {
      name: 'Кристалл не найден',
      description: 'Нет описания для текущей фазы.',
      howToUse: 'Попробуйте позже.',
      image: '/images/placeholder.png',
    }
  }

  return data as {
    name: string
    description: string
    howToUse: string
    image: string
  }
})
</script>

<style scoped>
@import './CrystalCard.scss';
</style>