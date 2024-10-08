<template>
  <view class="da-dropdown-daterange-box">
    <view class="da-dropdown-daterange">
      <view class="da-dropdown-daterange--date" :class="daterange.start ? 'is-actived' : ''">
        <picker mode="date" :value="daterange.start" @change="handleStartDate">
          {{ daterange.start || '请选择日期' }}
        </picker>
      </view>
      <view class="da-dropdown-daterange--separate">至</view>
      <view class="da-dropdown-daterange--date" :class="daterange.end ? 'is-actived' : ''">
        <picker
          mode="date"
          :value="daterange.end"
          :disabled="!daterange.start"
          :start="daterange.start"
          @change="handleEndDate">
          {{ daterange.end || '请选择日期' }}
        </picker>
      </view>
    </view>
    <view class="da-dropdown-daterange-tags" v-if="dropdownItem.showQuick">
      <block v-for="(tag, tagi) in dateTagList" :key="tagi">
        <view
          class="da-dropdown-tag"
          :class="datetag=== tag.value ? 'is-actived' : ''"
          @click="handleTagDate(tag.value)">
          <text class="da-dropdown-tag--text">{{ tag.label }}</text>
        </view>
      </block>
    </view>
    <PartDropdownFooter
      :resetText="dropdownItem.resetText"
      :confirmText="dropdownItem.confirmText"
      @reset="handleReset()"
      @confirm="handleConfirm()"></PartDropdownFooter>
  </view>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { deepClone, getRangeDate } from '../utils'
import PartDropdownFooter from './part-dropdown-footer.vue'

export default defineComponent({
  components: { PartDropdownFooter },
  props: {
    dropdownItem: {
      type: Object,
      default: null,
    },
    dropdownIndex: {
      type: Number,
    },
  },
  emits: ['success'],
  setup(props, { emit }) {
    const daterange = ref(null)
    const datetag = ref('')
    const dateTagList = ref([
      { value: '-7', label: '本周' },
      { value: '-14', label: '上周' },
      { value: '-30', label: '本月' },
      { value: '-60', label: '上月' },
      // { value: '-1', label: '昨日' },
      { value: '7', label: '近7天' },
      { value: '15', label: '近15天' },
      { value: '30', label: '近30天' },
    ])

    function initData(dropdownItem, clearValue = false) {
      const item = deepClone(dropdownItem || null)
      if (clearValue === true) {
        daterange.value = {
          start: '',
          end: '',
        }
        datetag.value = ''
      } else {
        daterange.value = {
          start: item.value?.start || '',
          end: item.value?.end || '',
        }
      }
    }

    function handleStartDate(item) {
      daterange.value.start = item.detail.value
      daterange.value.end = ''
      datetag.value = ''
    }
    function handleEndDate(item) {
      if (!daterange.value?.start) {
        return
      }
      daterange.value.end = item.detail.value
      datetag.value = ''
    }
    function handleTagDate(code) {
      daterange.value = getRangeDate(code)
      datetag.value = code
    }
    function handleReset() {
      initData(props.dropdownItem, true)
    }
    function handleConfirm() {
      if (props.dropdownItem?.prop) {
        const res = { [props.dropdownItem.prop]: deepClone(daterange.value) }
        emit('success', res, daterange.value, props.dropdownIndex)
      } else {
        console.error(`菜单项${props.dropdownItem.title}未定义prop，返回内容失败`)
      }
    }

    watch(
      () => props.dropdownItem,
      (v) => {
        initData(v)
      },
      { immediate: true },
    )

    return {
      daterange,
      datetag,
      dateTagList,
      handleStartDate,
      handleEndDate,
      handleTagDate,
      handleReset,
      handleConfirm,
    }
  },
})
</script>

<style lang="scss" scoped>
// 日期范围
.da-dropdown-daterange {
  display: flex;
  align-items: center;
  margin: 24rpx;
  background-color: #f5f5f5;
  border-radius: 999rpx;

  &--date {
    flex-grow: 1;
    height: 66rpx;
    padding: 0 24rpx;
    font-size: 26rpx;
    line-height: 66rpx;
    color: var(--dropdown-text-color);
    text-align: center;
    border-radius: 4rpx;

    &.is-actived {
      color: var(--dropdown-theme-color);
    }
  }

  &--separate {
    flex-shrink: 0;
    padding: 0 20rpx;
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 24rpx;
  }
}

.da-dropdown-tag {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 40rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  font-size: 28rpx;
  color: var(--dropdown-text-color);
  background-color: #f5f5f5;
  border-radius: 999rpx;

  &--text {
    position: relative;
    z-index: 1;
  }

  &.is-actived {
    color: var(--dropdown-theme-color);
    background-color: #fff;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      content: '';
      background-color: var(--dropdown-theme-color);
      opacity: 0.05;
    }
  }
}
</style>
