import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
//Component -> actions -> mutation
const store = createStore({
    state(){
        return{
            counter: 0
        };
    },
    actions:{ // allow to run asynchronous code
        increment(context, payload){
            setTimeout(() => {
                context.commit('increment', payload);
            }, 2000);
        }
    },
    mutations: { //must be synchronous code
        addOne(state){
            state.counter++;
        },
        increase(state, payload){
            state.counter = state.counter + payload;
        },
        increment(state, payload){
            state.counter = state.counter + payload.value;
        }
    },
    getters: {
        finalCounter(state){
            return state.counter;
        },
        validateCounter(state, getters){
            state.counter = getters.finalCounter + 1;
            return state.counter;
        }

    }
})
const app = createApp(App);
app.use(store);

app.mount('#app');
