<template>
  <button @click="handleClick">{{ innerCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      innerCount: this.count
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:count', ++this.innerCount);
    }
  },
  watch: {
    count(newValue) {
      this.innerCount = newValue;
    }
  }
};
</script>
