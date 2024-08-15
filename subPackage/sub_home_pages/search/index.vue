<template>
  <view class="">
    <!-- 搜索框 -->
    <view class="search">
      <uni-search-bar
        class="uni-mt-10"
        radius="5"
        placeholder="输入订单关键字"
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
    <!-- 搜索历史 -->
    <view class="">
      <view class="searchBar">
        <view>近期搜索</view>
        <image
          src="/static/image/sub_image/垃圾桶.png"
          mode=""
          @click="clear"></image>
      </view>
    </view>
    <view class="itemList">
      <view class="item" v-for="item in searchList" :key="item">
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      searchList: [],
    };
  },
  methods: {
    goSearch() {
      if (this.searchValue.trim() !== "") {
        // 判断输入框的值是否为空
        this.searchList.unshift(this.searchValue); // 将输入框的值添加到搜索记录数组中
        this.searchValue = ""; // 清空输入框的值
        console.log(this.searchList);
      }
    },
    clear() {
      this.searchList = [];
    },
  },
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
.searchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40rpx 10rpx 40rpx;
  image {
    width: 30rpx;
    height: 30rpx;
  }
  view {
    font-size: 13px;
  }
}
.itemList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
  gap: 5%;
  .item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
