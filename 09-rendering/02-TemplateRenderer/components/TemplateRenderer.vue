<script>
import { compile } from 'vue';

export default {
  name: 'TemplateRenderer',
  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  render(...args) {
    this.$.components = this.components;
    const renderFunction = compile(this.template);
    return renderFunction.call(this, this, ...args);
  }  
 
};
</script>
