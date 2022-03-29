<template>
    <div class="toast" :class="toastClass"> {{id}}
        <ui-icon class="toast__icon" :icon="toastIcon" />
        <span>{{ message }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToast',
  props: {
      type: {
          type: String,
          default: 'success'
      },
      message: {
          type: String,
          default: ''
      },
      id: {
          type: Number,
          required: true
      },
      lifetime: {
          type: Number,
          default: 5000
      }
  },
  computed: {
      toastClass() {
          switch (this.type) {
              case 'success':
                  return 'toast_success';                  
              case 'error':
                  return 'toast_error';                                 
          }
      },
      toastIcon() {
          switch (this.type) {
              case 'success':
                  return 'check-circle';                  
              case 'error':
                  return 'alert-circle';
          }
      }
  },
  created() {
      setTimeout(() => {
          this.destroy();
      }, this.lifetime);
  },
  methods: {
      destroy() {          
          this.$emit('destroy', this.id);
      }
  },
  components: { UiIcon },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
