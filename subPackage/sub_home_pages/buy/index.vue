<template>
  <view class="container">
    <DaDropdown
      :dropdownMenu="dropdownMenuList"
      themeColor="#007aff"
      textColor="#333333"
      :duration="300"
      fixedTop
      @confirm="handleConfirm"
      @close="handleClose"
      @open="handleOpen">
      <template #slot1="{ item, index }">
        <view style="padding: 40px">自定义插槽内容</view>
      </template>
    </DaDropdown>
    <view v-for="(item, index) in 3" :key="index">
      <ExhibitsItem></ExhibitsItem>
    </view>
  </view>
</template>

<script>
import ExhibitsItem from "@/components/ExhibitsItem/ExhibitsItem.vue";
import { defineComponent, ref } from "vue";

import DaDropdown from "@/components/da-dropdown/index.vue";

export default defineComponent({
  components: { DaDropdown, ExhibitsItem },
  setup() {
    const dropdownMenuList = ref([
      {
        title: "筛选",
        type: "filter",
        prop: "god4",
        // 默认选中单选2、多选2、3、滑动30
        // value: { ft1: '2', ft2: ['2', '3'], ft3: 30 },
        options: [
          {
            title: "取件地",
            type: "checkbox",
            prop: "ft2",
            options: [
              { label: "食堂", value: "1" },
              { label: "校外", value: "2" },
              { label: "其他", value: "2" },
            ],
          },
          {
            title: "目的地",
            type: "checkbox",
            prop: "ft1",
            options: [
              { label: "宿舍", value: "1" },
              { label: "教室", value: "2" },
              { label: "图书馆", value: "2" },
              { label: "实验室", value: "2" },
              { label: "操场", value: "2" },
              { label: "其他", value: "2" },
            ],
          },
        ],
      },
      {
        title: "价格高低",
        type: "sort",
        prop: "god3",
        // value: 'asc', // 默认升序
      },
      {
        title: "时间排序",
        type: "cell",
        prop: "god1",
        // showAll: true,
        showIcon: true,
        // value: '2', // 默认内容2
        options: [
          { label: "会合时间", value: "1", suffix: "从早到晚" },
          { label: "发布时间", value: "1", suffix: "最新优先" },
        ],
      },
    ]);
    function handleConfirm(v) {
      console.log("handleConfirm ==>", v);
    }
    function handleClose(v) {
      console.log("handleClose ==>", v);
    }
    function handleOpen(v) {
      console.log("handleOpen ==>", v);
    }
    return {
      dropdownMenuList,
      handleConfirm,
      handleClose,
      handleOpen,
    };
  },
});
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
