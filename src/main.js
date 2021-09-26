import Vue from "vue";
import App from "./App.vue";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";

Vue.use(VideoPlayer);
Vue.config.ignoredElements = ["wx-open-launch-app"];
Vue.prototype.getViewportSize = function() {
  return {
    Vwidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    Vheight:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };
};
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
