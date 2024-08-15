<template>
  <view class="container">
    <!-- 个人资料板块 -->
    <view class="profile">
      <!-- 左半部分 -->
      <view class="intro">
        <image src="/static/image/others/头像.jpg" class="head"></image>

        <view>
          <text>{{ nickName }}</text>
          <view class="ziliao">
            点击查看资料
            <img
              src="/static/image/person_img/下一步.png"
              alt=""
              style="width: 20rpx; height: 20rpx" />
          </view>
        </view>
      </view>
      <!-- 右半部分 -->
      <view class="change">
        <view class="address">
          <image
            src="/static/image/person_img/宿舍地址.png"
            class="position"></image>
          <text>菊轩L666</text>
        </view>
        <button size="mini" style="margin-top: 10rpx">更改地址</button>
      </view>
    </view>
    <!-- 主要功能区 -->
    <view class="top">
      <view class="topBox">
        <view style="font-weight: bold">666666￥</view>
        <view style="font-size: 25rpx">成交金额</view>
      </view>
      <view class="topBox">
        <view style="font-weight: bold">1000</view>
        <view style="font-size: 25rpx">我的金币</view>
      </view>
      <view class="topBox">
        <view style="font-weight: bold">6</view>
        <view style="font-size: 25rpx">平均信誉分</view>
      </view>
    </view>
    <!-- 任务板块 -->
    <view class="task">
      <LittleBox
        v-for="(item, index) in listThree"
        :key="index"
        :picture="item.picture"
        :name="item.name"
        :id="item.id"
        @select="handleSelect(index)"></LittleBox>
      <view
        style="
          width: 700rpx;
          height: 100rpx;
          line-height: 100rpx;
          background-color: bisque;
          text-align: center;
        ">
        <text class="xuan">看视频</text>
        <image
          src="/static/image/person_img/视频.png"
          mode=""
          style="width: 40rpx; height: 40rpx; vertical-align: middle"></image>
        <text class="xuan">赚金币</text>
        <image
          src="/static/image/person_img/金币.png"
          mode=""
          style="width: 40rpx; height: 40rpx; vertical-align: middle"></image>
      </view>
    </view>
  </view>

  <image src="" class="message"></image>
  <button @click="getCode">获取code</button>
</template>

<script setup>
import { ref } from "vue";
import LittleBox from "@/components/LittleBox/LittleBox.vue";
import tabBar from "@/components/tabbar/tabbar.vue";
const avatarUrl = ref("");
const nickName = ref("我是小美");
const listThree = ref([
  {
    id: 1,
    picture: "/static/image/person_img/消息.png",
    name: "消息通知",
    address: "message",
  },

  {
    id: 2,

    picture: "/static/image/person_img/社区发布.png",
    name: "发布追踪",
    address: "message",
  },
]);
const onChooseAvatar = (e) => {
  console.log(e);
  const { avatarUrl } = e.detail;
  this.avatarUrl = avatarUrl;
};
const handleSelect = (id) => {
  const item = listThree.value[id];

  uni.navigateTo({
    url: `/subPackage/sub_person_pages/${item.address}/index`,
  });
};

const getCode = (e) => {
  uni.login({
    provider: "weixin",
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      const { code } = event;
      console.log("code:", code);

      // 调用后端login接口传入code
      uni.request({
        url: "", //api接口
        method: "GET",
        data: {
          code: code,
        },
        success(e) {
          console.log(e);
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: 2000rpx;
  background-color: #f8f8f8;
  .top {
    height: 100rpx;
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .topBox {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .task {
    margin: 0 auto;
    width: 700rpx;
    height: 250rpx;
    background-color: #fff;
    // border: 2px solid #e59393;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    margin-top: 10rpx;
    align-items: center;
    flex-wrap: wrap;
  }
  .profile {
    height: 200rpx;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .intro {
      display: flex;
      height: 100rpx;
      align-items: center;
      // background-color: pink;
      margin-left: 40rpx;

      .head {
        height: 100rpx;
        width: 100rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .ziliao {
        font-size: 12px;
        color: #8a8a8a;
        margin-top: 5rpx;
      }
    }
    .change {
      height: 80rpx;
      button {
        font-size: 10px;
        background-color: #bf7777;
        color: white;
      }

      .address {
        display: flex;
        height: auto;
        justify-content: center;
        text {
          height: 30rpx;
          line-height: 30rpx;
          font-size: 10px;
        }
        .position {
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
  }
}
</style>
