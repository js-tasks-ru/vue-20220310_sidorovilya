<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="remove">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="innerAgendaItem.type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input type="time" placeholder="00:00" name="startsAt" v-model="innerAgendaItem.startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" placeholder="00:00" name="endsAt" v-model="innerAgendaItem.endsAt" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleName">
      <ui-input name="title" v-model="innerAgendaItem.title" />
    </ui-form-group>
    <ui-form-group label="Докладчик" v-if="innerAgendaItem.type === 'talk'">
      <ui-input name="speaker" v-model="innerAgendaItem.speaker" />
    </ui-form-group>
    <ui-form-group label="Описание" v-if="innerAgendaItem.type === 'talk' || innerAgendaItem.type === 'other'">
      <ui-input multiline name="description" v-model="innerAgendaItem.description" />
    </ui-form-group>
    <ui-form-group label="Язык" v-if="innerAgendaItem.type === 'talk'">
      <ui-dropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="innerAgendaItem.language" />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      innerAgendaItem: {...this.agendaItem},
      duration: 0
    }
  },

  emits: ['remove', 'update:agendaItem'],

  methods: {
    remove() {
      this.$emit('remove');
    },
    getDateByTime(time) {
      let hours = Number(time.split(':')[0]);
      let minutes = Number(time.split(':')[1]);
      let date = new Date()
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setMilliseconds(0);
      return date;
    }
  },

  watch: {  
    'innerAgendaItem.startsAt'(newValue, oldValue) {
      if (!newValue || !oldValue) {
        return;
      }
      let dateEnd = this.getDateByTime(this.innerAgendaItem.endsAt);
      let dateStart = this.getDateByTime(oldValue);        
      let duration = dateEnd.getTime() - dateStart.getTime();

      let dateStartNew = this.getDateByTime(newValue);          
      let dateEndNew = new Date( dateStartNew.getTime() + duration );

      let localeTime = dateEndNew.toLocaleString('en-US', {    
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      this.innerAgendaItem.endsAt = localeTime.split(':')[0] + ':' + localeTime.split(':')[1];
    }, 
    innerAgendaItem: {     
      deep: true, 
      handler(newValue) {
        this.$emit('update:agendaItem', {...newValue});
      }
    }
  },

  computed: {
    titleName() {
      switch (this.innerAgendaItem.type) {
        case 'talk':
          return 'Тема';
          break;
        case 'other':
            return 'Заголовок';
            break;
        default:
            return 'Нестандартный текст (необязательно)';
      }
    }
  }
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
