<template>
  <uni-forms
    class="forms"
    labelPosition="top"
    labelAlign="left"
    labelWidth="96%"
    :modelValue="form"
    :rules="rules"
    ref="form">
    <!-- 公共模块：
			标题、手机号、会合地点、会合时间...
		 -->

    <!-- 标题 -->
    <uni-forms-item label="标题" name="title" required="true">
      <uni-easyinput
        :prefix-icon="TitlePrefixIconType"
        v-model="form.title"
        placeholder="填写title"
        @blur="TitlePrefixIconType = 'flag'"
        @focus="TitlePrefixIconType = 'flag-filled'" />
    </uni-forms-item>
    <!-- 手机号 -->

    <uni-forms-item label="手机号" name="phone" required="true">
      <uni-easyinput
        :prefix-icon="PhonePrefixIconType"
        v-model="form.phoneNumber"
        placeholder="默认用户登录绑定的号码"
        maxlength="11"
        @blur="PhonePrefixIconType = 'phone'"
        @focus="PhonePrefixIconType = 'phone-filled'" />
    </uni-forms-item>

    <!-- 取件码 -->

    <uni-forms-item label="取件码" name="itemCode" required="true">
      <uni-easyinput
        :prefix-icon="ItemCodePrefixIconType"
        v-model="form.itemCode"
        placeholder="请输入取件码"
        @blur="ItemCodePrefixIconType = 'fire'"
        @focus="ItemCodePrefixIconType = 'fire-filled'" />
    </uni-forms-item>

    <!-- 会合地点 -->

    <uni-forms-item label="会合地点" name="location" required="true">
      <uni-easyinput
        :prefix-icon="LocationPrefixIconType"
        v-model="form.meetLocation"
        placeholder="默认用户个人信息填写的宿舍地址"
        @blur="LocationPrefixIconType = 'location'"
        @focus="LocationPrefixIconType = 'location-filled'" />
    </uni-forms-item>

    <!-- 会合时间 -->
    <uni-forms-item label="会合时间" name="time" required="true">
      <uni-datetime-picker
        type="datetime"
        return-type="timestamp"
        v-model="form.meeTimeSingle" />
    </uni-forms-item>
    <!-- 需求人数 -->

    <uni-forms-item label="需求人数" required="true">
      <view class="requiredNumberSwitch">
        <label>自定义人数范围</label>
        <switch
          :checked="form.requiredChecked"
          style="transform: scale(0.7)"
          @change="form.requiredChecked = !form.requiredChecked"
          color="#BF7777" />
      </view>
      <view class="requiredNumber" v-show="!form.requiredChecked">
        <view class="womanRequiredNumber">
          <view class="requiredNumberItem">
            <label>设置女生人数</label>
            <uni-number-box v-model="form.womenNumber" width="100" />
          </view>
        </view>
        <view class="menRequiredNumber">
          <view class="requiredNumberItem">
            <label>设置男生人数</label>
            <uni-number-box v-model="form.menNumber" width="100" />
          </view>
        </view>
      </view>
      <view class="requiredNumber" v-show="form.requiredChecked">
        <view class="womanRequiredNumber">
          <view class="requiredNumberItem">
            <label>设置女生最少人数</label>
            <uni-number-box
              v-model="form.womenMinNumber"
              width="100"
              @change="bindMinNumberChange($event, index)" />
          </view>
          <view class="requiredNumberItem">
            <label>设置女生最多人数</label>
            <uni-number-box v-model="form.womenMaxNumber" width="100" />
          </view>
        </view>
        <view class="menRequiredNumber">
          <view class="requiredNumberItem">
            <label>设置男生最少人数</label>
            <uni-number-box
              v-model="form.menMinNumber"
              width="100"
              @change="bindMinNumberChange($event, index)" />
          </view>
          <view class="requiredNumberItem">
            <label>设置男生最多人数</label>
            <uni-number-box v-model="form.menMaxNumber" width="100" />
          </view>
        </view>
      </view>
    </uni-forms-item>

    <!-- 悬赏金额 -->

    <uni-forms-item label="跑腿金额" required="true">
      <view class="money">
        <view class="item">
          <label>设置跑腿金额</label>
          <uni-number-box v-model="form.money" step="0.01" width="100" />
        </view>
      </view>
    </uni-forms-item>

    <!-- 信誉分 -->

    <!-- 信誉分要求 -->
    <uni-forms-item label="信誉分要求" required="true">
      <view class="requiredNumberSwitch"></view>
      <view class="requiredNumber" v-show="!form.requiredChecked">
        <view class="womanRequiredNumber">
          <view class="requiredNumberItem">
            <label>设置最低信誉分</label>
            <uni-number-box
              v-model="form.clientNum"
              width="100"
              :min="5"
              :max="10"
              :step="0.5" />
          </view>
        </view>
      </view>
    </uni-forms-item>

    <!-- 需求填写 -->

    <uni-forms-item label="需求填写" name="requireMsg" required="true">
      <uni-easyinput
        type="textarea"
        v-model="form.requireMsg"
        placeholder="请输入内容" />
    </uni-forms-item>
    <!-- 筛选标签选择 -->
    <uni-forms-item label="选择取件地标签" required="true">
      <uni-section type="line">
        <uni-data-select
          v-model="value"
          :localdata="range"
          @change="change"></uni-data-select>
      </uni-section>
    </uni-forms-item>
    <uni-forms-item label="选择目的地标签" required="true">
      <uni-section type="line">
        <uni-data-select
          v-model="value2"
          :localdata="range2"
          @change="change"></uni-data-select>
      </uni-section>
    </uni-forms-item>

    <!-- 上传照片 -->

    <uni-forms-item
      label="照片上传"
      name="uploadImageTempPathList"
      required="true">
      <!-- {{item.uploadImageTempPathList}} -->
      <uni-file-picker
        mode="grid"
        v-model="form.imageValue"
        limit="9"
        file-mediatype="image"
        @delete="del($event, index)"
        @select="select($event, index)" />
    </uni-forms-item>

    <button type="submit" @click="validateForm">确认发布</button>
  </uni-forms>
</template>

<script>
export default {
  name: "UniFormsView",
  props: ["category"],
  data() {
    return {
      value: "",
      range: [
        { value: 0, text: "不限" },
        { value: 1, text: "食堂" },
        { value: 2, text: "校外" },
        { value: 3, text: "其他" },
      ],
      value2: "",
      range2: [
        { value: 0, text: "宿舍" },
        { value: 1, text: "教室" },
        { value: 2, text: "图书馆" },
        { value: 3, text: "实验室" },
        { value: 4, text: "操场" },
        { value: 5, text: "其他" },
      ],
      rules: {
        title: {
          rules: [{ required: true, errorMessage: "标题不能为空" }],
        },
        phoneNumber: {
          rules: [
            { required: true, errorMessage: "手机号不能为空" },
            { minLength: 11, errorMessage: "手机号长度为11位" },
          ],
        },
        itemCode: {
          rules: [{ required: true, errorMessage: "取件码不能为空" }],
        },
        meetLocation: {
          rules: [{ required: true, errorMessage: "会和地址不能为空" }],
        },
        meeTimeSingle: {
          rules: [{ required: true, errorMessage: "请选择会和时间" }],
        },
        money: {
          rules: [{ required: true, errorMessage: "请设置悬赏金额" }],
        },
        requireMsg: {
          rules: [{ required: true, errorMessage: "请填写需求" }],
        },
        imageValue: {
          rules: [{ required: true, errorMessage: "请上传至少一张图片" }],
        },
      },
      form: {
        // 标题
        title: "",
        // 默认手机号
        phoneNumber: 12345678912,
        // 取件码
        itemCode: "",
        // 会和地址
        meetLocation: "",
        // 当前时间
        meeTimeSingle: Date.now(),
        // 是否自定义范围 false-固定 true-设置最小和最大
        requiredChecked: false,
        // 设置女生人数
        womenNumber: 0,
        // 设置男生人数
        menNumber: 0,
        // 设置女生最少人数
        womenMinNumber: 0,
        // 设置女生最多人数
        womenMaxNumber: 1,
        // 设置男生最少人数
        menMinNumber: 0,
        // 设置男生最多人数
        menMaxNumber: 1,
        // 信誉分最低
        clientNum: 5,
        // 悬赏金额
        money: 0,
        // 信誉分
        score: 1,
        // 需求填写
        requireMsg: "",
        // 图片回显value
        imageValue: [],
        // 选择上传的图片临时路径
        uploadImageTempPathList: [],
      },

      // IconType
      TitlePrefixIconType: "flag",
      PhonePrefixIconType: "phone",
      LocationPrefixIconType: "location",
      ItemCodePrefixIconType: "fire",
    };
  },
  methods: {
    validateForm(e) {
      console.log(this.$props.category + ":", this.form);
      let that = this;
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },

    onSubmit(e) {
      console.log(this.$props.category + ":", this.form);
    },

    // 设置最小人数不能>=最大人数
    bindMinNumberChange(e) {
      if (this.form.womenMinNumber >= this.form.womenMaxNumber) {
        this.form.womenMaxNumber = this.form.womenMinNumber + 1;
      }

      if (this.form.menMinNumber >= this.form.menMaxNumber) {
        this.form.menMaxNumber = this.form.menMinNumber + 1;
      }
    },
    // 选择图片
    select(e) {
      for (var i = 0; i < e.tempFilePaths.length; i++) {
        this.form.uploadImageTempPathList.push({
          path: e.tempFilePaths[i],
          name: e.tempFiles[i].name,
        });
      }
    },
    // 删除图片
    del(e) {
      this.form.uploadImageTempPathList =
        this.form.uploadImageTempPathList.filter((item) => {
          return item.path !== e.tempFilePath;
        });
    },
  },
};
</script>

<style lang="scss">
.requiredNumberSwitch {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // border: 1rpx solid red;
  font-weight: bold;
  color: gray;
  // background-color: lightgray;
  // border-radius: 25rpx 25rpx 0rpx 0rpx ;
  border-radius: 25rpx;
}

.requiredNumber {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-weight: bold;
  color: gray;
  // background-color: #bf7777;
  border-radius: 0rpx 0rpx 25rpx 25rpx;

  .womanRequiredNumber {
    animation: backInLeft 1.5s;
    margin-top: 10rpx;
    margin-left: 2%;
    margin-right: 2%;
    // border: 1rpx solid gray;
    background-color: lightgray;
    border-radius: 25rpx;
  }
  .menRequiredNumber {
    animation: backInRight 1.5s;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 2%;
    margin-right: 2%;
    background-color: lightgray;
    border-radius: 25rpx;
  }

  .requiredNumberItem {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }
}

.money {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  margin-left: 2%;
  margin-right: 2%;
  background-color: lightgray;
  border-radius: 25rpx;
  color: gray;

  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }
}
.animate__animated.animate__fadeInDown {
  animation-duration: 1.5s;
}

button {
  bottom: 10rpx;
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  background-color: #bf7777;
  outline-color: rebeccapurple;
  color: lighten($color: #bf7777, $amount: 40);
  font-weight: bold;
}
</style>
