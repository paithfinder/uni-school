<template>
  <view class="container">
    <view class="selfColumn">
      <!-- 作者 -->
      <view class="author">
        <img
          src="/static/image/others/头像.jpg"
          alt=""
          style="width: 80rpx; height: 80rpx; border-radius: 50%" />
        <view style="margin-left: 10rpx; font-size: 25rpx">我是小美</view>
      </view>
      <view class="action">
        <button
          type="primary"
          size="mini"
          plain="true"
          style="
            color: #bf7777;
            border: 1px solid #bf7777;
            transform: scale(0.8);
          ">
          聊天
        </button>
        <!-- 收藏 -->
        <img
          src="/static/image/sub_image/213收藏-线性.png"
          alt=""
          style="width: 50rpx; height: 50rpx" />
      </view>
    </view>
    <!-- 轮播 -->
    <view class="uni-margin-wrap">
      <swiper
        class="swiper"
        circular
        indicator-active-color="#e06c61"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration">
        <swiper-item v-for="(item, index) in bannerList" :key="item.id">
          <view class="swiper-item">
            <image :src="item.url" style="width: 100%"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="main">
      <uni-section title="卡片分组" type="line">
        <uni-group title="帮忙带一份鸡公煲" mode="card">
          <view>我要大门的鸡公煲，中辣</view>
        </uni-group>
      </uni-section>
      <view class="demend">
        <img
          src="/static/image/sub_image/要求.png"
          alt=""
          style="width: 40rpx; height: 40rpx" />
        <view class="">其他要求</view>
      </view>
      <view class="title">配送路线</view>
      <view class="route">
        <view class="item">
          <img
            src="/static/image/sub_image/起点-copy.png"
            alt=""
            style="width: 70rpx; height: 70rpx" />
          <view class="routeText">取件点：大门</view>
        </view>
        <img
          src="/static/image/sub_image/横线.png"
          alt=""
          style="width: 50%; height: 5%" />
        <view class="item">
          <img
            src="/static/image/sub_image/旗帜.png"
            alt=""
            style="width: 70rpx; height: 70rpx" />
          <view class="routeText">终点：松轩K666</view>
        </view>
      </view>
      <view class="title">未招募人数：1人</view>
      <view class="title">
        跑腿金额：
        <text style="color: red">5</text>
        ￥
      </view>
      <view class="title">性别限制：暂无</view>
      <view class="title">信誉分限制：5分及以上</view>
      <view class="title">xx时间内送达</view>
    </view>

    <uni-section title="对话框示例" type="line" class="hideOnPc">
      <view class="example-body box">
        <button
          class="button popup-success"
          @click="dialogToggle(jieflag)"
          type="primary"
          style="
            background-color: #bf7777;
            font-size: 27rpx;
            margin-top: 15rpx;
          ">
          <text class="button-text success-text">立即接单</text>
        </button>
      </view>
    </uni-section>
    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog
          :type="msgType"
          cancelText="关闭"
          confirmText="查看订单"
          title="已接单"
          content="恭喜你,符合接单条件,接单成功!"
          @confirm="dialogConfirm"
          @close="dialogClose"></uni-popup-dialog>
      </uni-popup>
    </view>
    <view>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="message" type="message">
        <uni-popup-message
          :type="msgType"
          :message="messageText"
          :duration="2000"></uni-popup-message>
      </uni-popup>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const messageText = ref("这是一条成功提示");
const msgType = ref("success");
const alertDialog = ref(null); // 初始化为 null
const message = ref(null); // 初始化为 null
// 接单的状态
const jieflag = ref("success");
const dialogToggle = (type) => {
  msgType.value = type;
  alertDialog.value.open(); // 使用 alertDialogRef.value
};

const dialogConfirm = () => {
  console.log("点击确认");
  messageText.value = `点击确认了 ${msgType.value} 窗口`;
  // message.value.open();
  uni.navigateTo({
    url: "/subPackage/sub_trade_pages/trade/index",
  });
};

const dialogClose = () => {
  console.log("点击关闭");
};
const bannerList = ref([
  {
    url: "/static/image/others/轮播风景.jpg",
    content: "内容 A",
  },
  {
    url: "/static/image/others/轮播风景.jpg",
    content: "内容 B",
  },
  {
    url: "/static/image/others/轮播风景.jpg",
    content: "内容 C",
  },
]);
const indicatorDots = ref(true);
const autoplay = ref(true);
const interval = ref(2000);
const duration = ref(500);
</script>

<style lang="less" scoped>
.container {
  background-color: #f8f8f8;

  .main {
    .demend {
      display: flex;
      padding: 30rpx;
      box-sizing: border-box;
    }
    .title {
      font-size: 25rpx;
      margin-left: 30rpx;
      margin-top: 20rpx;
    }
    .route {
      display: flex;
      justify-content: center;
      align-items: baseline;
      transform: scale(0.8);
      .routeText {
        font-size: 25rpx;
        // width: 150rpx;
        margin-top: 10rpx;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  .selfColumn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;

    .author {
      display: flex;
      align-items: center;
      padding: 15rpx;
      box-sizing: border-box;
    }
    .action {
      display: flex;
      align-items: center;
      padding: 15rpx;
      box-sizing: border-box;
    }
  }
  .uni-margin-wrap {
    width: 100%;

    .swiper {
      height: 300rpx;

      .swiper-item {
        display: block;
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
      }
    }
  }
}
</style>
