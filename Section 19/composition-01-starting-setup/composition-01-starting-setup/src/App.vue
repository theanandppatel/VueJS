<template>
  <section class="container">
    <h2>{{ title }}</h2>
    <h2>{{ uName.name }}</h2>
    <h2>{{ uName.age }}</h2>
  </section>
</template>

<!-- //Method - 1 -->
<!-- <script>
import {ref} from 'vue';

export default {
  setup() {
    let uName = ref({
      name: 'Anand',
      age: 21
    });
    
    setTimeout(() => {
      uName.value.name = 'Prakash',
      uName.value.age = 23
    }, 2000);
    // return { userName: uName.value.name, userAge: uName.value.age}; this will not works

    return {user: uName};
  },
}; 
</script> -->

<!-- Method - 2 New Syntax-->
<script setup>
import {ref} from 'vue'; // any data string, object..
import {reactive} from 'vue'; //It must be used with object only

const title = ref('Modal');
const uName = reactive({name: 'Anand', age: 21});


setTimeout(() => {
    uName.name = 'Prakash',
    uName.age = 43 //no need to use value
  }, 2000);
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

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>