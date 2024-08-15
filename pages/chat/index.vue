<template>
  <view class="">
    <!-- 搜索框 -->
    <view class="search">
      <uni-search-bar
        class="uni-mt-10"
        radius="5"
        placeholder="搜索聊天记录"
        v-model="searchValue"
        clearButton="auto"
        cancelButton="none"
        @confirm="search()" />
      <button
        type="default"
        size="mini"
        @click="goSearch()"
        style="color: white; background-color: #bf7777">
        搜索
      </button>
    </view>
  </view>
</template>

<script>
import tabBar from "@/components/tabbar/tabbar.vue";
export default {
  components: {
    tabBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  margin: 30rpx;

  .uni-mt-10 {
    width: 85%;
    padding: 0;
    border-radius: 5rpx 0 0 5rpx 5rpx;
  }
  button {
    height: 70rpx;
    line-height: 70rpx;
    width: 15%;
    text-align: center;
    border-radius: 0 5rpx 5rpx 0;
    padding: 0;
  }
}
</style>
