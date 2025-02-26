<template>
  <div id="app">
    <FileBrowser />
  </div>
</template>

<script>
import FileBrowser from './components/FileBrowser.vue';

export default {
  name: 'App',
  components: {
    FileBrowser,
  },
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
