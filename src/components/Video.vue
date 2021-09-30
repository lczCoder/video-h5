<template>
  <div class="video-warp" @click="gotoApp">
    <wx-open-launch-app
      id="launch-btn"
      appid="wx4fe9e8736512f1c3"
      extinfo='{postId:"1185557037568",postType:"2",shareTime:"1631861441588",shareType:"weixin",shareUserId:"1314933030144"}'
    >
      <script type="text/wxtag-template">
        <style>.btn {
            width: 450px;
            height: 150px;
            font-size: 45px;
            padding: 12px;
            font-family: PingFangSC-Medium, sans-serif;
        }</style>
        <button class="btn">打开搞笑星球APP</button>
      </script>
    </wx-open-launch-app>
    <!-- <div class="modal" id="modal" v-show="showModal" @touchmove.prevent>
      <div class="modal-content">
        <div class="title">打开搞笑星球APP</div>
        <div class="share">查看分享内容</div>
      </div>
      <div class="modal-btn">
        <div class="cancel" @click="closeModal">取消</div>
        <div class="confirm" id="xx3l">确定</div>
      </div>
    </div> -->
    <div class="video-header" v-show="bannerShow">
      <img
        :src="shareUserData.avatar || userDefault"
        alt="用户头像"
        width="50px"
        height="50px"
        style="border-radius: 50%"
      />
      <div class="user-info">
        <span class="name">{{ shareUserData.nickname }}</span>
        <span class="fixed-text"
          >我在<span style="color: #ff632e">搞笑星球</span
          >,快来一起开心呀!</span
        >
      </div>
      <img
        width="80px"
        height="55px"
        src="../assets/open-look.gif"
        class="to-button"
      />
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
        :x5-video-player-fullscreen="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @ended="onPlayerEnded($event)"
        @click="videoClickHandler"
      >
      </video-player>
      <!-- 模拟视频蒙版播放按钮 -->
      <div class="mock-video-mask">
        <img
          v-if="showPalyIcon && videoData.postType !== 2"
          width="60px"
          height="60px"
          src="../assets/play-icon.png"
          @click="playClickHandler"
        />
      </div>
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
        <div class="icon-item-box" @click="wxShare">
          <img
            src="../assets/wx-icon.gif"
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
        src="../assets/down-more.gif"
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
        <div
          class="video-img-item"
          v-for="(item, idx) in hotData"
          :key="idx"
          @click="hotClickHanlder(item.postId, $event)"
        >
          <span class="open-app">打开app</span>
          <img
            style="
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              object-fit: cover;
            "
            width="100%"
            height="215px"
            :src="item.thumb"
          />
          <div class="item-info-warp">
            <div class="item-content">{{ item.title }}</div>
            <div class="item-user">
              <img
                style="border-radius: 50%; margin-left: 12px"
                width="24px"
                height="24px"
                :src="item.avatar || userDefault"
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
    <transition name="slide-fade">
      <!-- 底部横幅 固定定位 -->
      <div class="video-bottom" v-show="!bannerShow">
        <img
          :src="shareUserData.avatar || userDefault"
          alt="用户头像"
          width="50px"
          height="50px"
          style="border-radius: 50%"
        />
        <div class="user-info">
          <span class="name">{{ shareUserData.nickname }}</span>
          <span class="fixed-text"
            >我在<span style="color: #ff632e">搞笑星球</span
            >,快来一起开心呀!</span
          >
        </div>
        <!-- <div class="to-button">打开看看</div> -->
        <img
          width="80px"
          height="60px"
          src="../assets/open-look.gif"
          class="to-button"
        />
      </div>
    </transition>

    <!-- wx分享蒙版 -->
    <div
      class="mask-warp"
      style="color: #fff"
      v-if="showMask"
      @click="maskClickHandler"
    >
      <div class="mask-box">
        <span style="flex: 1; text-align: right; font-size: 18px"
          >点击右上角分享给好友哦</span
        >
        <img width="80px" height="80px" src="../assets/mask-tips.gif" alt="" />
      </div>
    </div>
    <!-- 视频蒙版 -->
    <div
      class="video-mask-warp"
      v-if="showVideoMask"
      @click="videoClickHandler"
    ></div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import qs from "qs";
import "video.js/dist/video-js.css";
import Ajax from "../ajax";
import { wxOpenApp, judgeClient, CloseWebPage, toAppOrDown } from "../utils";
export default {
  components: {
    videoPlayer,
  },
  data() {
    return {
      showModal: false, // 弹窗显示
      showMask: false, //遮罩显示
      showPalyIcon: true, //视频播放按钮
      showVideoMask: false, //视频遮罩
      bannerShow: true, //顶部显示
      hotData: [], //热门推荐数据
      videoData: {}, //视频内容数据
      shareUserData: {}, //分享用户信息
      userDefault: require("../assets/user-default.png"), // 用户默认头像
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
      client: "",
    };
  },
  created() {
    let urlQuery = qs.parse(window.location.search.split("?")[1]);
    // 获取落地页内容数据接口
    Ajax.post(
      "/share/showPost",
      {
        postId: urlQuery.postId,
        sharingUserId: urlQuery.shareUserId,
      },
      (res) => {
        this.videoData = res.sharedPostBaseVO;
        this.hotData = res.otherPosts; //模拟接口热门分享数据
        this.shareUserData = res.sharingUser;
        this.playerOptions.sources[0].src = res.sharedPostBaseVO.url;
        this.playerOptions.poster = res.sharedPostBaseVO.thumb;
      }
    );
    // 设置视频的屏占比
    let { Vwidth, Vheight } = this.getViewportSize();
    this.playerOptions.aspectRatio = `${Vwidth}:${Vheight}`;
    window.addEventListener("scroll", this.getScroll); //监听滚动条 显示底部引导框
  },
  mounted() {
    this.client = judgeClient(); //获取当前设备环境
    if (this.client === "Android" && ULink.isWechat) {
      //安卓 微信 环境
      this.show = false;
      let serverUrl =
        "http://share.gaoxiaoxingqiu.com/server/userLog/getWeChatShare";
      let data = JSON.stringify({ url: window.location.href });
      console.log("微信请求地址", data, serverUrl);
      Ajax.post(serverUrl, data, wxOpenApp);
    } else {
      toAppOrDown();
    }
  },

  methods: {
    // 判断底部信息栏展示
    getScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop >= 70 ? (this.bannerShow = false) : (this.bannerShow = true);
    },
    // 视频开始事件
    onPlayerPlay(e) {
      console.log("视频开始了", e);
      // this.showVideoMask = true;
    },
    // 视频播放结束回调
    onPlayerEnded(e) {
      console.log("end", e);
      this.showVideoMask = false;
      toAppOrDown();
    },
    // 关闭弹窗
    closeModal(e) {
      e.stopPropagation();
      this.showModal = false;
    },
    // 点击页面空余地方进行跳转
    gotoApp(e) {
      toAppOrDown();
    },
    // 微信分享
    wxShare(e) {
      e.stopPropagation();
      if (ULink.isWechat) {
        console.log("这是微信环境");
        this.showMask = true;
        // 打开蒙版引导分享
      } else {
        toAppOrDown();
      }
    },
    //分享遮罩点击事件
    maskClickHandler(e) {
      e.stopPropagation();
      this.showMask = false;
    },
    // 视频遮罩点击事件
    videoClickHandler(e) {
      e.stopPropagation();
      toAppOrDown();
    },
    // 视频蒙版播放按钮触发事件
    playClickHandler(e) {
      e.stopPropagation();
      this.showPalyIcon = false;
      this.$refs.videoPlayer.player.play();
    },
    // 精选内容分享跳转
    hotClickHanlder(postId, e) {
      e.stopPropagation();
      toAppOrDown({ postId });
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.getScroll);
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
