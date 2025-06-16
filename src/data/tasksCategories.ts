export const categories = (t: (key: string) => string) => [
  {
    id: 'work',
    label: t('tasks.work'),
    icon: new URL('@/assets/icons/plan/work.png', import.meta.url).href,
  },
  {
    id: 'health',
    label: t('tasks.health'),
    icon: new URL('@/assets/icons/plan/health.png', import.meta.url).href,
  },
  {
    id: 'body',
    label: t('tasks.body'),
    icon: new URL('@/assets/icons/plan/body.png', import.meta.url).href,
  },
  {
    id: 'home',
    label: t('tasks.home'),
    icon: new URL('@/assets/icons/plan/home.png', import.meta.url).href,
  },
  {
    id: 'spirit',
    label: t('tasks.spirit'),
    icon: new URL('@/assets/icons/plan/spirit.png', import.meta.url).href,
  },
  {
    id: 'creativity',
    label: t('tasks.creativity'),
    icon: new URL('@/assets/icons/plan/creativity.png', import.meta.url).href,
  },
  {
    id: 'study',
    label: t('tasks.study'),
    icon: new URL('@/assets/icons/plan/study.png', import.meta.url).href,
  },
    {
    id: 'free',
    label: t('tasks.free'),
    icon: new URL('@/assets/icons/plan/free.png', import.meta.url).href,
  },
]
