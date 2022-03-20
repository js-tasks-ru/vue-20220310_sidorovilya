import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    click() {
      let count = this.count ?  this.count : 0;
      this.$emit('update:count', ++count);
    }
  },
  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="click">{{ count }}</button>`,
});
