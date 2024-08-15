<!-- 发布页页面待编辑 -->
<template>
  <!-- 顶部导航栏 -->
  <view class="top_nav">
    <view class="top">
      <!-- 顶部左侧部分 -->
      <label class="top_l">发布类别</label>
      <!-- 顶部右侧部分 -->
      <radio-group @change="current = $event.detail.value" class="top_r">
        <!-- for循环取种类 -->
        <label v-for="(item, index) in CategoryList">
          <!-- 单选框 -->
          <radio
            :value="index"
            :checked="index === current"
            color="#BF7777"
            class="radio" />
          <!-- 字段 -->
          <text>{{ item.category }}</text>
        </label>
      </radio-group>
    </view>

    <!-- 次级导航栏 -->

    <view class="nav">
      <picker
        mode="selector"
        :range="CategoryList[current].list"
        :value="NavIndex"
        @change="bindPickerChange"
        @click="IconType = 'up'"
        @cancel="IconType = 'down'">
        <view class="nav_content">
          <image :src="CategoryList[current].imgs[NavIndex]" mode="aspectFit" />
          <label>{{ CategoryList[current].list[NavIndex] }}</label>
          <uni-icons :type="IconType" size="14" color="white" />
        </view>
      </picker>
    </view>
  </view>
  <!-- 主要内容 -->
  <view v-show="contentShow == false" class="content">
    <view class="moduleShow">广告模块</view>
  </view>
  <view v-show="contentShow == true" class="content">
    <view class="contentView">
      <!-- 跑腿分模块-->
      <!-- 快递代取表单 -->
      <LauchFormsInCode
        v-show="current == 0 && NavIndex == 0"
        :category="CategoryList[0].list[0]" />
      <!-- 物品代买表单 -->
      <LauchFormsOutCode
        v-show="current == 0 && NavIndex == 1"
        :category="CategoryList[0].list[1]" />
      <!-- 文件代打表单 -->
      <LauchFormsInCode
        v-show="current == 0 && NavIndex == 2"
        :category="CategoryList[0].list[2]" />
      <!-- 行李代运表单 -->
      <LauchFormsOutCode
        v-show="current == 0 && NavIndex == 3"
        :category="CategoryList[0].list[3]" />
      <!-- 其他表单 -->
      <LauchFormsOutCode
        v-show="current == 0 && NavIndex == 4"
        :category="CategoryList[0].list[4]" />

      <!-- 二手分模块 -->

      <!-- 社区分模块 -->
    </view>
  </view>
</template>

<script setup>
import { withDirectives } from "vue";
import LauchFormsInCode from "@/components/LauchFormsInCode/LauchFormsInCode.vue";
import LauchFormsOutCode from "@/components/LauchFormsOutCode/LauchFormsOutCode.vue";
import tabBar from "@/components/tabbar/tabbar.vue";
import { ref, computed, onMounted } from "vue";

const contentShow = ref(true);
const title = ref("");
const current = ref(0);
const NavIndex = ref(0);
const IconType = ref("down");
const CategoryList = ref([
  {
    category: "跑腿",
    imgs: [
      "/static/image/index_img/跑腿板块/快递代取.png",
      "/static/image/index_img/跑腿板块/物品代买.png",
      "/static/image/index_img/跑腿板块/文件代打.png",
      "/static/image/index_img/跑腿板块/行李代运.png",
      "/static/image/index_img/跑腿板块/其他.png",
    ],
    list: ["物品代买", "快递代取", "文件代打", "行李代运", "其他"],
  },
  {
    category: "二手",
    imgs: [],
    list: [],
  },
]);

const bindPickerChange = (e) => {
  NavIndex = e.detail.value;
  IconType = "down";
};
</script>

<style lang="scss">
.top_nav {
  position: fixed;
  z-index: 999;
  height: 220rpx;
  margin: 0%;
  padding: 0%;
  top: 0rpx;
  background-color: white;
  width: 100%;
  // border: 1rpx solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .top {
    // position: fixed;

    width: 96%;
    // height:100rpx;
    margin-left: 2%;
    margin-right: 2%;
    height: $lauch-top-height; //120rpx
    font-weight: bold;
    .top_l {
      // animation: fadeInDown 1s;
      float: left;
      width: 30%;
      height: 100%;
      color: $lauch-top_l-color;
      background-color: $lauch-top_l-bgColor;
      border-radius: 15rpx 15rpx 0rpx 15rpx;
      text-align: center;
      // line-height: 100rpx;
      line-height: $lauch-top-height;
    }
    .top_r {
      animation: backInLeft 2s;
      float: right;
      height: 100%;
      width: 70%;
      background-color: $lauch-top_r-bgColor;
      color: $lauch-top_r-color;
      border-radius: 25rpx 25rpx 25rpx 0rpx;
      line-height: 100rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      // line-height: 100rpx;
      line-height: $lauch-top-height;
    }
  }

  .nav {
    // position: fixed;
    // margin-top: 10rpx;//10rpx
    animation: fadeInDown 1.5s;
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
    // height:100rpx;
    height: $lauch-nav-height; //80rpx
    font-size: 14px;
    color: $lauch-nav-color;
    border-radius: 50rpx;
    background-color: $lauch-nav-bgColor;
    font-weight: bold;

    picker {
      width: 100%;
      height: 100%;
      // border: 1rpx solid red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .nav_content {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        height: 100%;
        // border: 1rpx solid red;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        image {
          // border: 1rpx solid red;
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }
}

.content {
  // position: fixed;
  margin-top: 220rpx;
  bottom: 1000rpx;
  width: 96%;
  // text-align: center;
  margin-left: 2%;
  margin-right: 2%;
  // height: $lauch-content-height;//
  // height: fit-content;
  border-radius: 15rpx;
  // background-color: lightsteelblue;
  font-weight: bold;
  margin-bottom: 100rpx;
  // border: 1rpx solid red;
  .contentView {
    // border: 1rpx solid red;
    width: 94%;
    // text-align: center;
    margin-left: 3%;
    margin-right: 3%;
  }
}
</style>
