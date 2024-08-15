<template>
  <view class="container">
    <!-- 上方：地点+公告栏区域 -->
    <view class="top">
      <!-- 地点区域 -->
      <view class="topBox">
        <!-- 左边：图标+显示校区 -->
        <view class="area">
          <picker mode="selector" :range="areaList" @change="onPickerChange">
            <image src="/static/image/index_img/地点.png" class="place"></image>
            <text class="picker">{{ selectedArea }}</text>
            <image
              src="/static/image/index_img/下拉按钮.png"
              class="select"></image>
          </picker>
        </view>

        <!-- 右边：搜索关键字和聊天 -->
        <view class="right" style="display: flex; align-items: center">
          <rudon-rowMenuDotDotDot
            :localdata="options"
            @change="menuAction($event, '10086')">
            <view style="color: #fff">已接/买订单</view>
          </rudon-rowMenuDotDotDot>
          <image
            src="/static/image/index_img/搜索.png"
            class="search"
            @click="toSearch"
            style="margin-left: 22rpx"></image>
        </view>
      </view>
      <!-- 下方：公告栏 -->
      <uni-notice-bar
        scrollable
        showIcon
        single
        text="跑腿完成一单信誉分自动+0.5,失信一单会扣除1分,低于2分者将永久失去接单资格,请跑腿人员诚信接单"></uni-notice-bar>
    </view>
    <!-- 首页轮播图 -->
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
            <image :src="item.url"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 跑腿板块 -->
    <view class="runner">
      <view class="title">—— 跑腿专区 ——</view>

      <view class="runnerBox">
        <LittleBox
          v-for="(item, index) in itemList"
          :key="index"
          :picture="item.picture"
          :name="item.name"
          :id="item.id"
          @select="handleSelect(index)"></LittleBox>
      </view>
    </view>
  </view>
</template>
<script setup>
import LittleBox from "@/components/LittleBox/LittleBox.vue";
import tabBar from "@/components/tabbar/tabbar.vue";
import { useSchoolStore } from "@/store/index.js";
import { useUserStore } from "@/store/index.js";
import { ref, computed, onMounted } from "vue";
const schoolStore = useSchoolStore();
const userStore = useUserStore();
const selectedArea = computed({
  get() {
    return schoolStore.selectedArea; // 使用学校选区来获取选定区域
  },
  set(value) {
    schoolStore.selectedArea = value; // 直接修改区域列表的值
  },
});
const areaList = computed(() => schoolStore.areaList);

const nickName = ref("我是无敌大帅比");
const avatarUrl = ref("/static/image/person_img/默认头像.png");
const yes = ref(true);
const headerUrl = ref("");
const timerId = ref(1);
const isLogin = ref(false);
const bannerList = ref([
  {
    url: "/static/image/others/banner.png",
    content: "内容 A",
  },
  {
    url: "/static/image/others/banner.png",
    content: "内容 B",
  },
  {
    url: "/static/image/others/banner.png",
    content: "内容 C",
  },
]);
const userInfo = ref({});
const itemList = ref([
  {
    id: 1,
    picture: "/static/image/index_img/跑腿板块/物品代买.png",
    name: "物品代买",
    address: "buy",
  },
  {
    id: 2,
    picture: "/static/image/index_img/跑腿板块/快递代取.png",
    name: "快递代取",
    address: "goods",
  },
  {
    id: 3,
    picture: "/static/image/index_img/跑腿板块/文件代打.png",
    name: "文件代打",
    address: "file",
  },
  {
    id: 4,
    picture: "/static/image/index_img/跑腿板块/行李代运.png",
    name: "行李代运",
    address: "luggage",
  },
  {
    id: 5,
    picture: "/static/image/index_img/跑腿板块/其他.png",
    name: "其他",
    address: "run_others",
  },
  {
    id: 6,
    picture: "",
    name: "",
  },
]);
const indicatorDots = ref(true);
const autoplay = ref(true);
const interval = ref(2000);
const duration = ref(500);
const options = ref([
  {
    value: "跑腿骑手",
    text: "跑腿骑手",
  },
  {
    value: "二手买家",
    text: "二手买家",
  },
]);
const menuAction = (action, rowId) => {
  // 忽略初始化时的传入的空操作
  if (action === "") {
    return;
  }

  // 打印看参数
  console.log(action, rowId);
  if (action === "跑腿骑手") {
    uni.navigateTo({
      url: "/subPackage/sub_trade_pages/trade/index",
    });
  } else {
    uni.navigateTo({
      url: "/subPackage/sub_ershou_pages/ershou/index",
    });
  }
};
onMounted(async () => {
  //await this.getBannerList();
  if (!isLogin.value) {
    login();
  }
});

const onPickerChange = (event) => {
  const { value } = event.detail;
  // console.log(selectedArea.value);
  // console.log(areaList.value[value]);
  selectedArea.value = areaList.value[value];
  schoolStore.area(areaList.value[value]);
};

const handleSelect = (id) => {
  console.log(id);
  const item = itemList.value[id];
  uni.navigateTo({
    url: `/subPackage/sub_home_pages/${item.address}/index`,
  });
};
const login = () => {
  show();
};
const show = () => {
  uni.showModal({
    mask: true,
    title: "温馨提示",
    content: "授权微信登录后正常使用小程序的功能",
    success(res) {
      if (res.confirm) {
        let userInfo = {
          avatarUrl: avatarUrl.value, // 直接使用变量
          nickName: nickName.value, // 直接使用变量
        };
        if (yes.value) {
          getUserOpenId(userInfo);
          console.log(isLogin.value);
          userStore.getUsers();
          uni.navigateTo({
            url: "/subPackage/sub_home_pages/login/index",
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "获取信息失败，请重试",
          });
          console.log(isLogin.value);
        }
      } else if (res.cancel) {
        console.log(isLogin.value);
      }
    },
  });
};
const getUserOpenId = (newUserInfo) => {
  // 初始化 userInfo 如果它还没有被初始化
  if (!userInfo.value) {
    userInfo.value = {};
  }
  // 设置 isLogin 为 true
  isLogin.value = true;
  console.log(newUserInfo);
  // 使用 Vue 3 的响应式系统添加属性
  userInfo.value.openid = "1";
  console.log(userInfo.value);
};

const toSearch = () => {
  uni.navigateTo({
    url: "/subPackage/sub_home_pages/search/index",
  });
};

const goTrade = () => {
  uni.navigateTo({
    url: "/subPackage/sub_trade_pages/trade/index",
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  background-color: #f8f8f8;
  height: 2000rpx;

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

  .runner {
    width: 80%;
    height: 300rpx;
    background-color: #d9b5a2;
    margin: 50rpx auto 0;
    border-radius: 30rpx;

    .title {
      height: 50rpx;
      font-size: 16px;
      color: white;
      text-align: center;
      padding-top: 20rpx;
      font-weight: bold;
    }

    .runnerBox {
      height: 200rpx;
      display: flex;
      flex-flow: wrap;
      justify-content: space-evenly;
    }
  }

  .topBox {
    height: 110rpx;
    display: flex;
    background-color: #bf7777;
    align-items: center;

    .area {
      margin: 0 auto 0 20rpx;

      text {
        font-size: 14px;
        color: white;
        text-align: center;
      }

      .place {
        width: 40rpx;
        height: 40rpx;
        margin-right: 5rpx;
        vertical-align: bottom;
      }

      .select {
        width: 30rpx;
        height: 30rpx;
        margin-left: 10rpx;
        vertical-align: bottom;
      }
    }

    .right {
      .message {
        width: 35rpx;
        height: 35rpx;
        vertical-align: bottom;
      }

      .search {
        width: 35rpx;
        height: 35rpx;

        vertical-align: bottom;
      }
    }
  }

  .topBox {
    height: 110rpx;
    display: flex;
    background-color: #bf7777;
    align-items: center;

    .area {
      margin: 0 auto 0 20rpx;

      text {
        font-size: 14px;
        color: white;
        text-align: center;
      }

      .place {
        width: 35rpx;
        height: 35rpx;
        margin-right: 5rpx;
        vertical-align: bottom;
      }

      .select {
        width: 30rpx;
        height: 30rpx;
        margin-left: 10rpx;
        vertical-align: bottom;
      }
    }

    .right {
      margin: 0 10rpx 0 auto;

      .message {
        width: 35rpx;
        height: 35rpx;
        vertical-align: bottom;
      }

      .search {
        width: 35rpx;
        height: 35rpx;
        margin-right: 20rpx;
        vertical-align: bottom;
      }
    }
  }
}
</style>
<style>
/deep/ .uni-select__selector-item[data-v-ca4f149a] {
  padding: 10rpx 10rpx !important;
  font-size: 20rpx !important;
}
</style>
