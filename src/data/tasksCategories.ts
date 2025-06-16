export const categories: Record<string, {
  label: string
  icon: string
}> = {
  work: {
    label: 'Работа',
    icon: new URL('@/assets/icons/plan/work.png', import.meta.url).href,
  },
  health: {
    label: 'Здоровье',
    icon: new URL('@/assets/icons/plan/health.png', import.meta.url).href,
  },
  body: {
    label: 'Спорт',
    icon: new URL('@/assets/icons/plan/body.png', import.meta.url).href,
  },
  home: {
    label: 'Дом / Уют',
    icon: new URL('@/assets/icons/plan/home.png', import.meta.url).href,
  },
  spirit: {
    label: 'Дух',
    icon: new URL('@/assets/icons/plan/spirit.png', import.meta.url).href,
  },
  creativity: {
    label: 'Творчество',
    icon: new URL('@/assets/icons/plan/creativity.png', import.meta.url).href,
  },
  study: {
    label: 'Изучение нового',
    icon: new URL('@/assets/icons/plan/study.png', import.meta.url).href,
  },
  free: {
    label: 'Разное',
    icon: new URL('@/assets/icons/plan/free.png', import.meta.url).href,
  }
}
