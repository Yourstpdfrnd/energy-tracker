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
      log: 'Energy',
      plan: 'Analytics',
      settings: 'Settings',
    },
    language: {
      ru: 'Russian',
      en: 'English',
    },
    moonPhases: {
        'New Moon': 'New Moon',
        'Waxing Crescent': 'Waxing Crescent',
        'First Quarter': 'First Quarter',
        'Waxing Gibbous': 'Waxing Gibbous',
        'Full Moon': 'Full Moon',
        'Waning Gibbous': 'Waning Gibbous',
        'Last Quarter': 'Last Quarter',
        'Waning Crescent': 'Waning Crescent',
    },
    moonTips: {
        'New Moon': 'Plan, set intentions, meditate. A time for inner stillness.',
        'Waxing Crescent': 'Set goals, visualize, take first steps. Energy is building.',
        'First Quarter': 'Act with courage, push through doubts. Time to break through.',
        'Waxing Gibbous': 'Refine your plans, gather strength. Almost at the peak.',
        'Full Moon': 'Release emotions, complete projects, celebrate. Energy at its fullest.',
        'Waning Gibbous': 'Reflect, share, give thanks. Time to harvest insights.',
        'Last Quarter': 'Let go, clear your space and mind. Release the unnecessary.',
        'Waning Crescent': 'Rest, restore, surrender. Prepare for the new cycle.',
    },
    crystals: {
      'New Moon': {
        image: turmaline,
        name: 'Black Tourmaline',
        description: 'Helps cleanse the past and set new intentions.',
        howToUse: 'Hold it in your hands, focus on your monthly goal. Carry it with you or place it under your pillow.',
      },
      'Waxing Crescent': {
        image: labradorite,
        name: 'Labradorite',
        description: 'Enhances intuition and supports the growth and manifestation of intentions.',
        howToUse: 'Meditate with it while visualizing your desires beginning to sprout.',
      },
      'First Quarter': {
        image: serdolic,
        name: 'Carnelian',
        description: 'Gives motivation and energy for action, helps overcome doubts.',
        howToUse: 'Keep it close during active tasks, carry it in your pocket or wear it on your wrist.',
      },
      'Waxing Gibbous': {
        image: cetrine,
        name: 'Citrine',
        description: 'Boosts confidence, attracts success and clarity.',
        howToUse: 'Write down what you’ve achieved and express gratitude — the crystal will charge you for the final push.',
      },
      'Full Moon': {
        image: selenite,
        name: 'Selenite',
        description: 'Helps to cleanse, let go of the unnecessary, and connect to your intuition.',
        howToUse: 'Do a cleansing meditation, keep it near you while sleeping or during a bath.',
      },
      'Waning Gibbous': {
        image: moonstone,
        name: 'Moonstone',
  description: 'Deepens intuition, helps release the unnecessary and maintain inner balance.',
  howToUse: 'Meditate with it in the evening, journal your gratitude, and slow down.',
      },
      'Last Quarter': {
        image: ametist,
        name: 'Amethyst',
        description: 'Helps to reflect on experiences, release mistakes, and wrap things up.',
        howToUse: 'Keep a journal, place the crystal nearby and let your thoughts flow freely.',
      },
      'Waning Crescent': {
        image: lepidolite,
        name: 'Lepidolite',
        description: 'Relieves anxiety and supports deep restoration.',
        howToUse: 'Rest, place the crystal under your pillow or use it during an evening meditation.',
      }
    },
    crystalsTitle: 'Crystal Recommend',
    howToUse: 'How to Use',
    plan: {
      title: 'Daily Tasks',
      subtitle: 'Choose what to focus your energy on today',
    },
    settings: {
    "inProgress": "⚙️ Settings page is under construction. Come back later!"
    },
    column: 'Add column',
    tasks: {
      work: 'Work',
      health: 'Health',
      body: 'Body',
      home: 'Home',
      spirit: 'Spirit',
      creativity: 'Creativity',
      study: 'Study',
      free: 'All',
      add: 'Add',
      next: 'Next',
      back: 'Back',
      tracker: 'To Energy Tracker',
      selected: 'Selected focuses:'
    },
    form: {
      title: 'Find out your energy level today',
      focuses: 'Your focuses for today',
      selected: 'Selected:',
      completed: 'Tasks completed:',
      data: 'Data loaded',
      level: 'Your energy level:',
      additional: 'Additional factors that influenced your day',
      positive: 'Positive',
      negative: 'Negative',
      add: 'Add',
      back: 'Back to tasks',
      save: 'Save',
      finish: 'Finish Day',
      hideCustomFactor: 'Hide Custom Factor',
      addCustomFactor: 'Add Custom Factor',
      one: 'Great focus! That gave you energy.',
      two: 'First steps are done — keep going!',
      three: 'You’ve made a plan, but haven’t marked any tasks as done yet.',
      advice: 'Take a break and get some fresh air'
    },
    energy: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      label: "Energy level"
    },
    factors: {
      sleep: "sleep",
      bad_diet: "bad diet",
      stress: "stress",
      exercise: "workout / sport",
      caffeine: "to much coffee",
      screen_time: "over screentime",
      fresh_air: "fresh air",
      relaxation: "relaxation / meditation"
    },
    chart: {
      energyTitle: 'Energy Level by Day'
    }
  }