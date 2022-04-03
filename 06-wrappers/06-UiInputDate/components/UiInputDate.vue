<template>
  <ui-input v-model="modelValueProxy" :type="type" ref="input">    
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>    
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import UiIcon from './UiIcon';
export default {
  name: 'UiInputDate',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    modelValue: {
      type: [String,Number],
      default: null
    }
  },
  computed: {
    modelValueProxy: {
      get() {
        return this.modelValue ? this.formatDate(this.modelValue, this.type) : null;     
      },
      set(value) {        
        value = value ? this.$refs['input'].$refs['input'].valueAsNumber : null;
        this.$emit('update:modelValue', value);
      }
    }    
  },
  methods: {
    formatDate(date, type) {
      let d = new Date(date);
      d = new Date(date + d.getTimezoneOffset() * 60 * 1000);
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      let year = d.getFullYear();
      let hours = d.getHours().toString();
      let minutes = d.getMinutes().toString();
      let seconds = d.getSeconds().toString();
      
      if (month.length < 2) {
        month = '0' + month;
      }
      if (hours.length < 2) {
        hours = '0' + hours;
      }
      if (minutes.length < 2) {
        minutes = '0' + minutes;
      }
      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      switch (type) {
        case 'date':
          return [year, month, day].join('-');
          break;
        case 'time':
          return [hours, minutes].join(':');
          break;
        case 'datetime-local':
          return [year, month, day].join('-') + 'T' + [hours, minutes].join(':');
          break;
      }
      return null;
    }
  },
  components: { UiInput, UiIcon },
};
</script>
