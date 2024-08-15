<template>
	<movable-area>
		<view style="text-align:center;line-height:100rpx;position: relative;z-index: 0;">{{ delaction }}</view>
		<movable-view direction="all" @change="handleChange" v-if="props.status !== 'done'">
			<icon type="success" size="23" />
		</movable-view>
		<view class="box">
			<view class="mask" :style="`width: ${mx + 10}px;background:${color}`">
				<!-- <view class="text">正在处理</view> -->
			</view>
		</view>
	</movable-area>
</template>

<script setup>
import { ref } from 'vue'
function handleChange(event) {
	// event.detail包含了当前的位置信息，如{ x: number, y: number }  
	// 注意：这里的x和y是直接从event.detail中获取的，但我们需要更新我们的响应式数据  
	mx.value = event.detail.x; // 更新x的值  
}
const mx = ref(0);
const props = defineProps({
	status: {
		type: String,
		default: 'doing'
	}
})
let color = ref('rgb(122,194,60)')
let delaction = ref('上传凭证')
if (props.status === 'readying') {
	color.value = 'rgb(164,50,50)'
	delaction.value = '上传凭证'
} else if (props.status === 'doing') {
	color.value = 'rgb(122,194,60)'
	delaction.value = '正在配送'
} else if (props.status === 'done') {
	color.value = 'rgb(122,194,60)'
	delaction.value = '配送完成'
}

</script>

<style lang="less" scoped>
movable-area {
	background: rgb(184, 181, 181);
	width: 100%;
	height: 100rpx;
	position: relative;
}

movable-view {
	width: 100rpx;
	height: 100%;
	background: #fff;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.mask {
	width: 0;
	height: 100%;
	background: rgb(122, 194, 60);
	line-height: 100rpx;
	z-index: 1;
}

.text {
	position: absolute;
	left: 300rpx;
	top: 0;
	line-height: 100rpx;
}
</style>