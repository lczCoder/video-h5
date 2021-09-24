<template>
  <div class="video-warp">
    <div class="video-header" v-show="bannerShow">
      <img
        :src="userPhoto"
        alt="用户头像"
        width="50px"
        height="50px"
        style="border-radius: 50%"
      />
      <div class="user-info">
        <span class="name">用户昵称</span>
        <span class="fixed-text">我在搞笑星球,快来一起开心呀~</span>
      </div>
      <div class="to-button">打开看看</div>
    </div>
    <div class="video-box">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        style="object-fit: cover"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
      <!-- 视频右侧按钮区域 -->
      <div class="video-right-box">
        <div class="user-focus">
          <img
            :src="userPhoto"
            alt="用户头像"
            width="50px"
            height="50px"
            style="border-radius: 50%; margin-bottom: 10px"
          />
          <img :src="focusIcon" alt="关注" width="20px" height="20px" style="margin-top:-28px" />
        </div>
        <div class="icon-item-box" v-for="(item, idx) in iconList" :key="idx">
          <img
            :src="item.src"
            alt="用户头像"
            width="35px"
            height="35px"
            style="border-radius: 50%c"
          />
          <span class="icon-text">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div style="color: #fff">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore
      tenetur magni vitae culpa illum quo molestiae, consequuntur voluptatum eum
      voluptas, voluptatibus similique eligendi incidunt totam odio autem
      reprehenderit cumque? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Iure tempore tenetur magni vitae culpa illum quo molestiae,
      consequuntur voluptatum eum voluptas, voluptatibus similique eligendi
      incidunt totam odio autem
    </div>
    <!-- 底部横幅 固定定位 -->
    <div class="video-bottom" v-show="!bannerShow">
      <img
        :src="userPhoto"
        alt="用户头像"
        width="50px"
        height="50px"
        style="border-radius: 50%"
      />
      <div class="user-info">
        <span class="name">用户昵称</span>
        <span class="fixed-text">我在搞笑星球,快来一起开心呀~</span>
      </div>
      <div class="to-button">打开看看</div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  components: {
    videoPlayer,
  },
  data() {
    return {
      bannerShow: true, //顶部显示
      // 用户头像
      userPhoto:
        "https://img0.baidu.com/it/u=3928903079,1184629296&fm=26&fmt=auto",
      // 用户头像关注icon
      focusIcon: require("../assets/focus.png"),
      // 右侧图标数据
      iconList: {
        // 微信图标
        wxIcon: { src: require("../assets/wx-icon.png"), text: "分享" },
        // 点赞图标
        goodIcon: { src: require("../assets/good-icon.png"), text: "点赞" },
        // 点踩图标
        steupIcon: {
          src: require("../assets/step-icon.png"),
          text: "踩一下",
        },
        // 搞笑星球图标
        planetIcon: {
          src: require("../assets/planet-icon.png"),
          text: "打开搞笑星球",
        },
      },
      // 视频配置属性
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "9:16", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: require("../assets/7c818de5a0dfc77101bdda721c6adc65.mp4"), // url地址
            // src:"https://v-cdn.zjol.com.cn/276982.mp4"
          },
        ],
        poster:
          "https://img1.baidu.com/it/u=2233258828,3208113111&fm=26&fmt=auto", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false,
      },
    };
  },
  created() {
    let { Vwidth, Vheight } = this.getViewportSize();
    this.playerOptions.aspectRatio = `${Vwidth}:${Vheight}`;
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    getScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop >= 70 ? (this.bannerShow = false) : (this.bannerShow = true);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>