import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            cnt: 0
        }
    }
});
app.mount('#app');
