<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { createApp } from 'vue';
import router from './router';
const app = createApp({});
app.use(router);
app.unmount();
app.mount('#app');
export default {
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
