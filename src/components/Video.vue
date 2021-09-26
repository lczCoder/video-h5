<template>
  <div class="video-warp" @click="gotoApp">
    <div class="video-header" v-show="bannerShow">
      <img
        :src="shareUserData.avatar"
        alt="用户头像"
        width="40px"
        height="40px"
        style="border-radius: 50%"
      />
      <div class="user-info">
        <span class="name">{{ shareUserData.nickname }}</span>
        <span class="fixed-text"
          >我在<span style="color: #ff632e">搞笑星球</span
          >,快来一起开心呀!</span
        >
      </div>
      <div class="to-button">打开看看</div>
    </div>
    <div class="video-box">
      <div class="image-box" v-if="videoData.postType == 2">
        <img
          width="100%"
          style="display: inline-block; vertical-align: middle"
          :src="videoData.thumb"
        />
      </div>
      <video-player
        v-else
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        style="object-fit: cover"
        :playsinline="true"
        :options="playerOptions"
         @ended="onPlayerEnded($event)"
         @click="gotoApp"
      >
      </video-player>
      <!-- 视频右侧按钮区域 -->
      <div class="video-right-box">
        <div class="user-focus">
          <img
            :src="videoData.avatar"
            alt="用户头像"
            width="50px"
            height="50px"
            style="border-radius: 50%; margin-bottom: 10px"
          />
          <img
            src="../assets/focus.png"
            alt="关注"
            width="20px"
            height="20px"
            style="margin-top: -22px"
          />
        </div>
        <!-- 用户头像 -->
        <div class="icon-item-box">
          <img
            src="../assets/wx-icon.png"
            alt="用户头像"
            width="35px"
            height="35px"
            style="border-radius: 50%"
          />
          <span class="icon-text">分享</span>
        </div>
        <!-- 点赞 -->
        <div class="icon-item-box">
          <img
            src="../assets/good-icon.png"
            alt="点赞"
            width="35px"
            height="35px"
            style="border-radius: 50%"
          />
          <span class="icon-text">{{ videoData.likeCount }}w</span>
        </div>
        <!-- 点踩 -->
        <div class="icon-item-box">
          <img
            src="../assets/step-icon.png"
            alt="踩"
            width="35px"
            height="35px"
            style="border-radius: 50%"
          />
          <span class="icon-text">踩</span>
        </div>
        <!-- 搞笑星球 -->
        <div class="icon-item-box">
          <img
            src="../assets/planet-icon.png"
            alt="搞笑星球"
            width="35px"
            height="35px"
            style="border-radius: 50%"
          />
          <span class="icon-text">打开搞笑星球</span>
        </div>
      </div>
      <!-- 视频底部文案区 -->
      <div class="video-bottom-box">
        <p>@{{ videoData.nickname }}</p>
        <p class="text-content">
          {{ videoData.title }}
        </p>
      </div>
    </div>
    <!-- 评论展示区 -->
    <div class="comments-more">
      <img
        width="49px"
        height="46px"
        src="../assets/down-more.png"
        alt="下拉更多"
      />
      <div class="comments-btn">
        <span>打开搞笑星球查看评论</span>
        <img
          width="15px"
          height="15px"
          src="../assets/to-right-icon2.png"
          alt="右侧箭头"
        />
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="hot-video" style="color: #fff">
      <!-- 顶部标题 -->
      <div class="hot-video-title-box">
        <span>热门推荐</span>
        <div>
          <span style="color: #999999">查看更多</span>
          <img
            width="13px"
            height="13px"
            src="../assets/to-right-icon.png"
            alt="右侧箭头图标"
          />
        </div>
      </div>
      <!-- 视频内容 -->
      <div class="video-img-warp">
        <div class="video-img-item" v-for="(item, idx) in hotData" :key="idx">
          <img
            style="border-radius: 10px"
            width="100%"
            height="167px"
            :src="item.thumb"
          />
          <div class="item-info-warp">
            <div class="item-content">{{ item.title }}</div>
            <div class="item-user">
              <img
                style="border-radius: 50%; margin-left: 12px"
                width="24px"
                height="24px"
                :src="item.avatar"
              />
              <span
                class="user-name"
                style="font-size: 12px; color: #999; margin-left: 6px"
                >{{ item.nickname }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部横幅 固定定位 -->
    <div class="video-bottom" v-show="!bannerShow">
      <img
        :src="shareUserData.avatar"
        alt="用户头像"
        width="40px"
        height="40px"
        style="border-radius: 50%"
      />
      <div class="user-info">
        <span class="name">{{ shareUserData.nickname }}</span>
        <span class="fixed-text"
          >我在<span style="color: #ff632e">搞笑星球</span
          >,快来一起开心呀!</span
        >
      </div>
      <div class="to-button">打开看看</div>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import json from "./data.json";
import Ajax from "../ajax";
export default {
  components: {
    videoPlayer,
  },
  data() {
    return {
      bannerShow: true, //顶部显示
      hotData: [], //热门推荐数据
      videoData: {}, //视频内容数据
      shareUserData: {},
      // 视频配置属性
      playerOptions: {
        autoplay: false,
        preload: "auto", //立即开始加载视频（如果浏览器支持）
        aspectRatio: "9:16",
        fluid: true, // 按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "", // 视频地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false,
      },
    };
  },
  created(options) {
    console.log(window.location.href);
    // 获取落地页内容数据接口
    // Ajax.get("http://192.168.1.5:3000/share/showPost", (res) => {
    //   this.videoData = res.sharedPostBaseVO;
    //   this.hotData = res.otherPosts; //模拟接口热门分享数据
    //   this.shareUserData = res.sharingUser;
    //   this.playerOptions.sources[0].src = res.sharedPostBaseVO.url;
    //   this.playerOptions.poster = res.sharedPostBaseVO.thumb;
    // });
    // TODO 模拟数据接口
    this.videoData = json.data.sharedPostBaseVO;
    this.hotData = json.data.otherPosts; //模拟接口热门分享数据
    this.shareUserData = json.data.sharingUser;
    this.playerOptions.sources[0].src = this.videoData.url;
    this.playerOptions.poster = this.videoData.thumb;
    // 设置视频的屏占比
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
    // 视频播放结束回调
    onPlayerEnded(e){
      console.log('end',e);
    },
    gotoApp(){
      console.log('aaxx');
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
