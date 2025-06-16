import lepidolite from '@/assets/images/lepidolit.png'
import ametist from '@/assets/images/ametist.png'
import moonstone from '@/assets/images/moonstone.webp'
import selenite from '@/assets/images/selenite.png'
import cetrine from '@/assets/images/cetrine.png'
import serdolic from '@/assets/images/serdolic.png'
import labradorite from '@/assets/images/labradorite.png'
import turmaline from '@/assets/images/turmaline.png'

export default {
    menu: {
      log: 'Трекер энергии',
      plan: 'Задачи дня',
      settings: 'Настройки',
    },
    language: {
      ru: 'Русский',
      en: 'Английский',
    },

    moonPhases: {
        'New Moon': 'Новолуние',
        'Waxing Crescent': 'Растущая луна (1-я фаза)',
        'First Quarter': 'Первая четверть',
        'Waxing Gibbous': 'Растущая луна (2-я фаза)',
        'Full Moon': 'Полнолуние',
        'Waning Gibbous': 'Убывающая луна (3-я фаза)',
        'Last Quarter': 'Последняя четверть',
        'Waning Crescent': 'Убывающая луна (4-я фаза)',
    },
    moonTips: {
        'New Moon': 'Планируй, закладывай намерения, медитируй. Это время для внутренней тишины.',
        'Waxing Crescent': 'Ставь цели, визуализируй, делай первые шаги. Сила растёт.',
        'First Quarter': 'Действуй решительно, преодолевай сомнения. Время пробиваться.',
        'Waxing Gibbous': 'Дорабатывай идеи, накапливай энергию. Осталось немного до пика.',
        'Full Moon': 'Высвобождай эмоции, заверши начатое, празднуй. Энергия на максимуме.',
        'Waning Gibbous': 'Анализируй, делись, благодарь. Подводи итоги.',
        'Last Quarter': 'Отпускай, очищай пространство и мысли. Убирай лишнее.',
        'Waning Crescent': 'Отдыхай, восстанавливайся, освобождайся. Готовься к новому началу.',
    },
    crystals: {
        'New Moon': {
          image: turmaline,
          name: 'Чёрный турмалин',
          description: 'Помогает очиститься от прошлого и задать новое намерение.',
          howToUse: 'Возьми в руки, сфокусируйся на цели месяца. Носи с собой или положи под подушку.',
        },
        'Waxing Crescent': {
          image: labradorite,
          name: 'Лабрадорит',
          description: 'Усиливает интуицию, поддерживает рост и проявление намерений.',
          howToUse: 'Медитируй с ним, представляя, как желания начинают прорастать.',
        },
        'First Quarter': {
          image: serdolic,
          name: 'Сердолик',
          description: 'Дает мотивацию и энергию для действий, помогает преодолевать сомнения.',
          howToUse: 'Держи рядом во время активных задач, носи в кармане или на запястье.',
        },
        'Waxing Gibbous': {
          image: cetrine,
          name: 'Цитрин',
          description: 'Усиливает уверенность, притягивает успех и ясность.',
          howToUse: 'Пропиши, что уже получилось, и поблагодари — кристалл зарядит на финальный рывок.',
        },
        'Full Moon': {
          image: selenite,
          name: 'Селенит',
          description: 'Помогает очиститься, отпустить лишнее и подключиться к интуиции.',
          howToUse: 'Делай очищающую медитацию, держи рядом во время сна или ванны.',
        },
        'Waning Gibbous': {
            image: moonstone,
            name: 'Лунный камень',
            description: 'Углубляет интуицию, помогает отпустить лишнее и сохранять внутренний баланс.',
            howToUse: 'Медитируй с ним вечером, выписывай благодарности и замедляйся.',
        },
        'Last Quarter': {
          image: ametist,
          name: 'Аметист',
          description: 'Помогает переосмыслить опыт, отпустить ошибки и подвести итоги.',
          howToUse: 'Веди дневник, положи кристалл рядом и просто позволь мыслям течь.',
        },
        'Waning Crescent': {
          image: lepidolite,
          name: 'Лепидолит',
          description: 'Снимает тревогу, способствует глубокому восстановлению.',
          howToUse: 'Отдыхай, положи кристалл под подушку или используй при вечерней медитации.',
        }
    },
    crystalsTitle: 'Рекомендованный кристалл',
    howToUse: 'Как использовать',
    plan: {
        title: 'Задачи дня',
        subtitle: 'Выбери, на что хочешь направить энергию сегодня',
    },
    settings: {
        "inProgress": "⚙️ Страница в разработке. Загляни позже!"
    },
    column: 'Добавить список',
    tasks: {
    work: 'Работа',
    health: 'Здоровье',
    body: 'Тело',
    home: 'Дом / уют',
    spirit: 'Дух',
    creativity: 'Творчество',
    study: 'Изучение нового',
    free: 'Разное',
    add: 'Добавить',
    next: 'Далее',
    back: 'Назад',
    tracker: 'Перейти в трекер энергии',
    selected: 'Выбранные фокусы:'
    },
    form: {
      title: 'Узнай свой уровень энергии сегодня',
      focuses: 'Твой фокус на сегодня:',
      selected: 'Выбрано:',
      completed: 'Выполнено задач:',
      data: 'Данные загружены',
      level: 'Твой уровень энергии:',
      additional: 'Дополнительные факторы, повлиявшие на твой день',
      positive: 'Позитивные',
      negative: 'Негативные',
      add: 'Добавить',
      back: 'Назад к задачам',
      save: 'Сохранить',
      finish: 'Завершить день',
      hideCustomFactor: 'Скрыть свой фактор',
      addCustomFactor: 'Добавить свой фактор',
      one: 'Отличный фокус! Это дало энергию',
      two: 'Первые шаги сделаны, продолжай!',
      three: 'Ты запланировал, но пока не отметил выполнение задач',
      advice: 'Сделай паузу и подыши свежим воздухом'
    },
    energy: {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      label: 'Уровень энергии'
    },
    factors: {
      sleep: "Недосып",
      bad_diet: "Плохое питание",
      stress: "Стресс",
      exercise: "Физическая активность",
      caffeine: "Много кофеина",
      screen_time: "Много экрана",
      fresh_air: "Прогулка на свежем воздухе",
      relaxation: "Медитация / отдых"
    },
    chart: {
      energyTitle: 'Уровень энергии по дням'
    }
}