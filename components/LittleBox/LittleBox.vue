<template>
  <view class="littleBox" @touchend="handleTouch(id)">
    <image :src="picture" class="pic"></image>
    <view class="name">{{ name }}</view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  picture: {
    type: String,
    default: null,
    required: true,
  },
  name: {
    type: String,
    default: null,
    required: true,
  },
  id: {
    type: Number,
    default: null,
    required: true,
  },
});

const emit = defineEmits(["select"]);

const handleTouch = () => {
  emit("select", props.id);
};
</script>

<style lang="scss" scoped>
.littleBox {
  width: 200rpx;
  height: 80rpx;

  .pic {
    width: 50rpx;
    height: 50rpx;
    display: block;
    margin: 0 auto;
  }
  .name {
    width: 150rpx;
    height: 20rpx;
    margin: 0 auto;
    font-size: 12px;
    text-align: center;
  }
}
</style>
