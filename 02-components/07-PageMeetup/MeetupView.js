import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupCover from './MeetupCover.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgenda from './MeetupAgenda.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <meetup-cover :title="meetup.title" :image="meetup.image"></meetup-cover>

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description" />

            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda" v-if="meetup.agenda && meetup.agenda.length"/>
            <ui-alert v-else>Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
