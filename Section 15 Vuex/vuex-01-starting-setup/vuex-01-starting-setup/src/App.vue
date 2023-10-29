<template>
  <base-container title="Vuex">
  <h3>{{ $store.state.counter }}</h3>
  <button @click="addOne">Add 1</button>
  <button @click="this.$store.commit('increase', 5)">Add 5</button>
  <button @click="this.$store.getters.validateCounter">Add 10</button>
  <button @click="runAsync">Async Add 10</button>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';

export default {
  components: {
    BaseContainer,
  },
  methods: {
    runAsync(){
      this.$store.dispatch('increment', {value: 2});
    },
    addOne(){
      this.$store.state.counter +=1;
    },
    doReset(){
      this.$store.commit('addOne');
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
button{
  margin: 1vh;
}
</style>