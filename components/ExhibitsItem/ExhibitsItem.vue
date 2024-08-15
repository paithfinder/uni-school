<template>
  <view class="wrapper">
    <view class="time">发布时间</view>
    <view class="item">
      <view class="left">
        <view class="img"></view>
      </view>
      <view class="right">
        <view class="right_bottom">
          <view class="content">
            <label>
              取件地->目的地：
              <text style="color: red">图书馆->竹轩</text>
            </label>
            <label>未招募/已招募：1/3人</label>
            <label>
              跑腿赏金:
              <text style="color: red">5</text>
              ￥
            </label>
            <label>xx时间内送达</label>
          </view>
          <view class="tab">
            <uni-icons type="star" size="25" style="margin-left: auto" />
            <view class="redirectTo">
              <label style="color: #0f5cf7" @click="goDetail()">查看详情</label>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const goDetail = () => {
  uni.navigateTo({
    url: "/subPackage/sub_home_pages/detailRun/index",
  });
};
</script>

<style lang="scss">
.wrapper {
  background-color: rgba(193, 122, 122, 0.3);
  border-top: 5px solid #bf7777;
  border-radius: 30rpx;
  width: 95%;
  margin: 0 auto;
  margin-top: 50rpx;

  .item {
    width: 100%;

    // border: 1rpx solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .left {
      width: 15%;
      height: 250rpx;
      // border: 1rpx solid red;
      .img {
        // border: 1rpx solid red;
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        float: right;
        background-image: url(/static/image/others/头像.jpg);
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .right {
      width: 85%;
      height: 250rpx;
      // border: 1rpx solid red;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .right_bottom {
        // border: 1rpx solid red;
        width: 95%;
        height: 60%;
        border-radius: 0rpx 25rpx 0rpx 25rpx;
        background-color: lightgray;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        .firstImg {
          width: 150rpx;
          height: 150rpx;
          border: 1rpx solid black;
          margin-left: 10rpx;
        }
        .content {
          height: 100%;
          // border: 1rpx solid red;
          font-size: 20rpx;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          padding: 10rpx;
          box-sizing: border-box;
        }
        .tab {
          width: 30%;
          height: 90%;
          overflow: hidden;
          padding: 5rpx;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .redirectTo {
            font-size: 20rpx;
            text-align: right;
            // border: 1rpx solid red;
          }
        }
      }
    }
  }
  .time {
    text-align: center;
    height: 10%;
    font-size: 20rpx;
    // background-color: #bf7777;
  }
}
</style>
