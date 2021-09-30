// 微信jssdk调用方法
function wxOpenApp(responseText) {
  // let obj = JSON.parse(responseText);
  // let wechatShare = obj.data.wechatShare;
  let wechatShare = responseText.wechatShare;
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    appId: "wx7468237ebf74703a", // 必填，公众号的唯一标识
    timestamp: wechatShare.timestamp, // 必填，生成签名的时间戳
    nonceStr: wechatShare.nonceStr, // 必填，生成签名的随机串
    signature: wechatShare.signature, // 必填，签名
    jsApiList: ["updateAppMessageShareData","chooseImage", "previewImage"], // 必填，需要使用的JS接口列表
    openTagList: ["wx-open-launch-app"], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
  });
  wx.ready(function() {
    let btnExtinfo = document
      .getElementById("launch-btn")
      .getAttribute("extinfo");
    if (btnExtinfo !== "error") {
      document
        .getElementById("launch-btn")
        .setAttribute("extinfo", JSON.stringify(ULink.getUriDecodeParams()));
    }
  });
  wx.error(function(res) {
    document.getElementById("launch-btn").setAttribute("extinfo", "error");
  });
  var launchBtn = document.getElementById("launch-btn");
  if (launchBtn) {
    launchBtn.addEventListener("launch", function(e) {
      // 尝试进行唤起 操作成功执行的函数
      console.log("success===>", e);
    });
    launchBtn.addEventListener("error", function(e) {
      // 尝试进行唤起 操作失败执行的函数	，可选择跳转 AppStore 或者下载引导页等
      console.log("fail===>", e.detail);
      window.location.href =
        "https://a.app.qq.com/o/simple.jsp?pkgname=com.sortinghat.funny";
    });
  }
}

// Ulink是否自动唤起app要根据客户端类型确定
function autoForType() {
  let client = judgeClient();
  if (client === "iOS") {
    if (ULink.isWechat) {
      return false;
    } else if (ULink.isQQ) {
      return true;
    } else {
      return true;
    }
  } else if (client === "Android") {
    if (ULink.isWechat) {
      return false;
    } else if (ULink.isQQ) {
      return true;
    } else {
      return true;
    }
  } else if (client === "PC") {
    if (ULink.isWechat) {
      return true;
    } else if (ULink.isQQ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/*判断客户端*/
function judgeClient() {
  let client = "";
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //判断iPhone|iPad|iPod|iOS
    client = "iOS";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    //判断Android
    client = "Android";
  } else {
    client = "PC";
  }
  return client;
}

// 关闭当前页
function CloseWebPage() {
  // 判断苹果手机内置浏览器
  var ua = navigator.userAgent.toLowerCase();
  if (window.WeixinJSBridge) {
    //这个可以关闭安卓系统的手机
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        WeixinJSBridge.call("closeWindow");
      },
      false
    );
    //这个可以关闭ios系统的手机
    WeixinJSBridge.call("closeWindow");
  } else if (
    navigator.userAgent.indexOf("Firefox") != -1 ||
    navigator.userAgent.indexOf("Chrome") != -1
  ) {
    window.location.href = "about:blank";
    window.opener = null;
    window.open("about:blank", "_self", "").close();
  } else if (
    ua.indexOf("applewebkit") > -1 &&
    ua.indexOf("mobile") > -1 &&
    ua.indexOf("safari") > -1 &&
    ua.indexOf("linux") === -1 &&
    ua.indexOf("android") === -1 &&
    ua.indexOf("chrome") === -1 &&
    ua.indexOf("ios") === -1 &&
    ua.indexOf("browser") === -1
  ) {
    window.location.href = "about:blank";
    window.opener = null;
    window.open("about:blank", "_self", "").close();
  } else {
    window.close();
  }
}

// 跳转app 或 下载
function toAppOrDown(parms) {
  console.log('ULink.getUriDecodeParams()',ULink.getUriDecodeParams());
  ULink([
    {
      id: "usr1kvb08854g0gd",
      data: parms || ULink.getUriDecodeParams(),
      selector: "#xx3l",
      // 可选高级功能，具体含义请看下方U-Link API文档
      auto: true,
      timeout: 3000,
      lazy: false,
      useOpenInBrowerTips: "default",
      useClipboard: function(clipboardToken) {
        return "用户自定义内容" + clipboardToken;
      },
      proxyOpenDownload: function(defaultAction, LinkInstance) {
        console.log('LinkInstance',LinkInstance);
        let clientStr =
          LinkInstance.solution.type +
          ";\n" +
          navigator.userAgent +
          ";\n" +
          LinkInstance.solution.downloadUrl +
          ";";
        if (LinkInstance.solution.type === "scheme") {
          let client = judgeClient();
          if (client === "iOS") {
            // qq或者微信环境特殊处理下
            if (ULink.isWechat) {
              // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
              // defaultAction();
              let a =
                "https://a.app.qq.com/o/simple.jsp?pkgname=com.sortinghat.funny&android_scheme=" +
                encodeURIComponent(LinkInstance.solution.wakeupUrl) +
                "#";
              window.location.href = a;
              // window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.sortinghat.funny"
            } else if (ULink.isQQ) {
              window.location.href = LinkInstance.solution.downloadUrl;
            } else {
              window.location.href = LinkInstance.solution.downloadUrl;
            }
          } else if (client === "Android") {
            // qq或者微信环境特殊处理下
            if (ULink.isWechat) {
              // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
              // defaultAction();
              let a =
                "https://a.app.qq.com/o/simple.jsp?pkgname=com.sortinghat.funny&android_scheme=" +
                encodeURIComponent(LinkInstance.solution.wakeupUrl) +
                "#";
              window.location.href = a;
              // window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.sortinghat.funny"
            } else if (ULink.isQQ) {
              window.location.href = LinkInstance.solution.downloadUrl;
            } else {
              window.location.href = LinkInstance.solution.downloadUrl;
            }
          } else if (client === "PC") {
            // qq或者微信环境特殊处理下
            if (ULink.isWechat) {
              window.location.href = LinkInstance.solution.downloadUrl;
            } else if (ULink.isQQ) {
              window.location.href = LinkInstance.solution.downloadUrl;
            } else {
              window.location.href = LinkInstance.solution.downloadUrl;
            }
          } else {
            window.location.href = LinkInstance.solution.downloadUrl;
          }
        } else if (LinkInstance.solution.type === "universalLink") {
          // universalLink 唤起应当由服务端提供一个带重定向到appstore的universallink地址。因此，此处不应写逻辑，友盟会在近期上线universalLink 重定向功能。
          // window.location.href = LinkInstance.solution.downloadUrl;
        }
      },
    },
  ]);
}

export { wxOpenApp, judgeClient, CloseWebPage, toAppOrDown };
