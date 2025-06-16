export const categories = (t: (key: string) => string) => [
  {
    id: 'work',
    label: 'Работа',
    icon: new URL('@/assets/icons/plan/work.png', import.meta.url).href,
  },
  {
    id: 'health',
    label: 'Здоровье',
    icon: new URL('@/assets/icons/plan/health.png', import.meta.url).href,
  },
  {
    id: 'body',
    label: 'Спорт',
    icon: new URL('@/assets/icons/plan/body.png', import.meta.url).href,
  },
  {
    id: 'home',
    label: 'Дом / Уют',
    icon: new URL('@/assets/icons/plan/home.png', import.meta.url).href,
  },
  {
    id: 'spirit',
    label: 'Дух',
    icon: new URL('@/assets/icons/plan/spirit.png', import.meta.url).href,
  },
  {
    id: 'creativity',
    label: 'Творчество',
    icon: new URL('@/assets/icons/plan/creativity.png', import.meta.url).href,
  },
  {
    id: 'study',
    label: 'Изучение нового',
    icon: new URL('@/assets/icons/plan/study.png', import.meta.url).href,
  },
    {
    id: 'free',
    label: 'Разное',
    icon: new URL('@/assets/icons/plan/free.png', import.meta.url).href,
  },
]
