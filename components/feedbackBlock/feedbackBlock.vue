<template>
  <view class="reason">
    <!-- 小图片 -->
    <image :src="img"></image>
    <!-- 理由 -->
    <text>{{ reason }}</text>

    <!-- 理由详情 -->
    <view>{{ detailReason }}</view>
  </view>
</template>

<script setup>
import { defineProps } from "vue";

// 使用 defineProps 定义组件的 props
const props = defineProps({
  img: {
    type: String,
    default: "",
  },
  reason: {
    type: String,
    default: "",
  },
  detailReason: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.reason {
  height: 10vh;
  background-color: white;
  margin: 2vh 2vw;
  background-color: #eeeeef;
  border-radius: 15rpx;

  image {
    width: 40rpx;
    height: 40rpx;
    margin: 15rpx 0 0 10rpx;
  }

  text {
    line-height: 40rpx; /* 修正：修改为和图片高度一致 */
    font-size: 35rpx;
    display: inline-block;
    transform: translate(5rpx, -7rpx); /* 修正：垂直居中对齐 */
    font-weight: bold; /* 加粗文本 */
  }

  view {
    margin: 1rpx 0 0 10rpx;
    color: #999999;
  }
}
</style>
