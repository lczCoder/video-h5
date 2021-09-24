<template>
  <div id="app">
    <Video></Video>
  </div>
</template>

<script>
import Video from "./components/Video.vue";
export default {
  name: "App",
  components: {
    Video,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
