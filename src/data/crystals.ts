export const crystals: Record<string, {
  image: string
  name: string
  description: string
  howToUse: string
}> = {
  "New Moon": {
    image: new URL('@/assets/images/turmaline.png', import.meta.url).href,
    name: "Чёрный турмалин",
    description: "Помогает очиститься от прошлого и задать новое намерение.",
    howToUse: "Возьми в руки, сфокусируйся на цели месяца. Носи с собой или положи под подушку."
  },
  "Waxing Crescent": {
    image: new URL('@/assets/images/labradorite.png', import.meta.url).href,
    name: "Лабрадорит",
    description: "Усиливает интуицию, поддерживает рост и проявление намерений.",
    howToUse: "Медитируй с ним, представляя, как желания начинают прорастать."
  },
  "First Quarter": {
    image: new URL('@/assets/images/serdolic.png', import.meta.url).href,
    name: "Сердолик",
    description: "Дает мотивацию и энергию для действий, помогает преодолевать сомнения.",
    howToUse: "Держи рядом во время активных задач, носи в кармане или на запястье."
  },
  "Waxing Gibbous": {
    image: new URL('@/assets/images/cetrine.png', import.meta.url).href,
    name: "Цитрин",
    description: "Усиливает уверенность, притягивает успех и ясность.",
    howToUse: "Пропиши, что уже получилось, и поблагодари — кристалл зарядит на финальный рывок."
  },
  "Full Moon": {
    image: new URL('@/assets/images/selenite.png', import.meta.url).href,
    name: "Селенит",
    description: "Помогает очиститься, отпустить лишнее и подключиться к интуиции.",
    howToUse: "Делай очищающую медитацию, держи рядом во время сна или ванны."
  },
  "Waning Gibbous": {
    image: new URL('@/assets/images/moonstone.webp', import.meta.url).href,
    name: "Лунный камень",
    description: "Углубляет интуицию, помогает отпустить лишнее и сохранять внутренний баланс.",
    howToUse: "Медитируй с ним вечером, выписывай благодарности и замедляйся."
  },
  "Last Quarter": {
    image: new URL('@/assets/images/ametist.png', import.meta.url).href,
    name: "Аметист",
    description: "Помогает переосмыслить опыт, отпустить ошибки и подвести итоги.",
    howToUse: "Веди дневник, положи кристалл рядом и просто позволь мыслям течь."
  },
  "Waning Crescent": {
    image: new URL('@/assets/images/lepidolit.png', import.meta.url).href,
    name: "Лепидолит",
    description: "Снимает тревогу, способствует глубокому восстановлению.",
    howToUse: "Отдыхай, положи кристалл под подушку или используй при вечерней медитации."
  }
}