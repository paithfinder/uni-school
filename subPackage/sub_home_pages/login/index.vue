<template>
  <view>
    <form @submit="handleSubmit">
      <view class="item">
        <label>
          <view>*</view>
          <text>选择学校</text>
          <picker
            mode="selector"
            :range="getSchoolName()"
            @change="onSchoolChange"
            class="picker">
            <text class="picker">{{ selectedSchool }}</text>
          </picker>
        </label>
        <hr />
        <label>
          <view>*</view>
          <text>选择校区</text>
          <picker
            mode="selector"
            :range="getAreaList()"
            @change="onAreaChange"
            class="picker">
            <text class="picker">{{ selectedArea }}</text>
          </picker>
        </label>
        <hr />
        <label>
          <view>*</view>
          <text>所属宿舍</text>
          <input type="text" v-model="dorm" placeholder="填写宿舍名" />
        </label>
        <hr />
        <label>
          <view>*</view>
          <text>详细地址</text>
          <input
            type="text"
            v-model="place"
            placeholder="填写详细的楼栋/门牌号" />
        </label>
        <hr />
        <label>
          <text>设置为默认地址</text>
          &nbsp;&nbsp;
          <switch checked="true" color="#bf7777" />
        </label>
        <hr />
        <label>
          <radio-group>
            性别：
            <radio value="男" class="sex" color="#bf7777">男</radio>
            &nbsp;&nbsp;
            <radio value="女" checked class="sex" color="#bf7777">女</radio>
          </radio-group>
        </label>
        <hr />
        <label>
          <view>*</view>
          <text>联系电话</text>
          <input type="text" v-model="phone" placeholder="填写电话" />
        </label>
      </view>
      <button type="submit" @click="saveForm">保存</button>
    </form>
  </view>
</template>

<script setup>
import { useSchoolStore } from "@/store/index.js";
import { ref, computed, onMounted } from "vue";
import { nextTick } from "vue";
const username = ref("");
const password = ref("");
const dorm = ref("");
const place = ref("");
const phone = ref("");

const schoolStore = useSchoolStore();
const getSchoolName = schoolStore.getSchoolName;
const schoolList = computed(() => schoolStore.schoolList);
const areaList = computed(() => schoolStore.areaList);
const selectedArea = computed(() => schoolStore.selectedArea);
const selectedSchool = computed(() => schoolStore.selectedSchool);
const getAreas = computed(() => schoolStore.getAreas);
const getAreaList = computed(() => schoolStore.getAreaList);

// 生命周期钩子
onMounted(() => {
  // console.log(selectedSchool.value);
});

// 方法
const handleSubmit = (event) => {
  event.preventDefault();
  // 处理表单提交逻辑
};

const onSchoolChange = async (event) => {
  const { value } = event.detail;
  schoolStore.name(getSchoolName()[value]);
  console.log(selectedSchool.value);
};

const onAreaChange = async (event) => {
  const { value } = event.detail;
  console.log(areaList.value);
  schoolStore.area(areaList.value[value]);
  console.log(selectedArea.value);
};

const saveForm = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.item {
  margin-left: 20rpx;
  background-color: #ffffff;
  label {
    display: flex;
    height: 100rpx;
    align-items: center;
    view {
      color: red;
    }
    input {
      margin-left: 50rpx;
    }
    .picker {
      margin-left: 50rpx;
    }
  }

  hr {
    border: none;
    height: 1px;
    background-color: #efefef;
  }
}
button {
  width: 90%;
  background-color: #bf7777;
  color: white;
  font-weight: bold;
}
</style>
