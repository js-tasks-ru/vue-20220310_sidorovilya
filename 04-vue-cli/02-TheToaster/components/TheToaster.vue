<template>
  <div class="toasts">
    <the-toast v-for="tost in tosts" :type="tost.type" :message="tost.message" :id="tost.id" :key="tost.id" @destroy="destroy" />
  </div>
</template>

<script>
import TheToast from './TheToast';

export default {
  name: 'TheToaster',
  data() {
    return {
      id: 0,
      tosts: []
    };
  },
  methods: {
    success(message) {
      this.tosts.push({id: this.id++, type: 'success', message: message});      
    },
    error(message) {
      this.tosts.push({id: this.id++, type: 'error', message: message});      
    },
    destroy(id) {
       this.tosts = this.tosts.filter(elem => elem.id != id);
    }
  },
  components: { TheToast },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
