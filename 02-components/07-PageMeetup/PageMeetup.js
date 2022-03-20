import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';

import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  data() {
    return {
      meetup: null,
      state: null,
      error: ''
    }
  },
  watch: {
    meetupId: {
      immediate: true,
      handler(newValue) {
        this.state = 0;
        fetchMeetupById(newValue)
        .then((response) => {
          this.meetup = response;
          this.state = 1;
        },(error) => {
          console.dir(error);
          this.state = 2;
          this.error = error.message;
        });
      }
    }
  },
  template: `
    <div class="page-meetup">
      <meetup-view :meetup="meetup" v-if="state === 1" />

      <ui-container v-else-if="state === 0">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="state === 2">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
