<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{'image-uploader__preview-loading':isLoading}" :style="style">
      <span class="image-uploader__text">{{ btnText }}</span>
      <input type="file" accept="image/*" class="image-uploader__input" v-bind="$attrs" @click="clickHandler" @change="selectFile" ref="input" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function
  },
  data() {
    return {
      isLoading: false,
      icon: this.preview
    }
  },
  methods: {
    clickHandler(event) {
      if (this.state === 'filled') {
        event.preventDefault();
        this.icon = undefined;
        this.$refs['input'].value = null;
        this.$emit('remove');
      }      
    },
    selectFile(event) {
      let file = event.target.files[0];
      this.$emit('select', file);
      this.icon = URL.createObjectURL(file);

      if (this.uploader) {
        this.isLoading = true;
        this.uploader(file).then(response => {
          this.$emit('upload', response);
        }, error => {
          this.icon = undefined;
          this.$refs['input'].value = null;
          this.$emit('error', error);
        }).finally(() => {
          this.isLoading = false;          
        });
      }
    }
  },
  computed: {
    state() {
      if (this.isLoading) {
        return 'loading'
      } else if (this.icon) {
        return 'filled'
      } else {
        return 'empty';
      }
    },
    btnText() {
      switch (this.state) {
        case 'empty':
          return 'Загрузить изображение';
          break;
        case 'loading':
          return 'Загрузка...';
          break;
        case 'filled':
          return 'Удалить изображение';
          break;
      }
    },
    style() {      
      if (this.icon) {
        return `--bg-url: url(${this.icon})`;
      } 
      return null;
    }    
  }  
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
