import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            numOne: null,
            numTwo: null,
            operation: 'sum'
        }
    },
    computed: {
        result() {
            switch (this.operation) {
                case 'sum':
                    return this.numOne + this.numTwo;                    
                case 'subtract':
                    return this.numOne - this.numTwo;                   
                case 'multiply':
                    return this.numOne * this.numTwo;                    
                case 'divide':
                    return this.numOne / this.numTwo;
                default:
                    return 0;                 
            }
        }
    }
});
app.mount('#app');
