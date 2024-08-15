<template>
	<view class="box">
		<!-- 导航栏 -->
		<view class="navbar">
			<view v-for="(tab, index) in tabs" :key="index" class="nav-item" @click="selectedTab = index">
				<text class="tab">{{ tab.label }}</text>
			</view>
			<view class="indicator" :style="{ left: `${24 + (selectedTab) * 187.5}rpx` }"></view>
		</view>
	</view>
	<view class="orderForm">
		<view class="order-item" v-for="(item, index) in orderList" :key="item.orderId">
			<view class="top">
				<span class='time'>{{ item.beginTime }}前到取件处--{{ item.endTime }}内送达</span>
			</view>
			<view class="middle">
				<view class="detail">
					<view class="begin">{{ item.beginPlace }}</view>
					<uni-icons type="arrow-right" size="30"></uni-icons>
					<view class="end">{{ item.endPlace }}</view>
					<navigator url="../../sub_list_pages/list_detail/list_detail" class="btn">查看详情</navigator>
				</view>
				<Progress :status="item.orderStatus"></Progress>
				<span class='money'>跑腿费:￥{{ item.money }}元</span>
			</view>
		</view>
		<view v-if="orderList.length === 0" class="empty">
			<image src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></image>
			<view>您还没有相关订单</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, provide, watch } from "vue";
import { Progress } from "../../../components/sub_progress/sub_progress"



const selectedTab = ref(0); // 初始选中的tab 
const tabs = reactive([
	{ value: 'newTask', label: '全部 ' },
	{ value: 'readying', label: '待处理' },
	{ value: 'done', label: '配送中' },
	{ value: 'doing', label: '已完成' },
])
let orderList = [
	{ orderId: 1, orderStatus: 'readying', money: '12', beginTime: '12:00', endTime: '12:01', beginPlace: '超市a', endPlace: 'A1' },
	{ orderId: 2, orderStatus: 'readying', money: '13', beginTime: '12:00', endTime: '13:02', beginPlace: '超市b', endPlace: 'B2' },
	{ orderId: 3, orderStatus: 'doing', money: '14', beginTime: '12:00', endTime: '14:03', beginPlace: '超市c', endPlace: 'C3' },
	{ orderId: 4, orderStatus: 'done', money: '15', beginTime: '12:00', endTime: '15:04', beginPlace: '超市d', endPlace: 'D4' },
]

let originList = [
	{ orderId: 1, orderStatus: 'readying', money: '12', beginTime: '12:00', endTime: '12:01', beginPlace: '超市a', endPlace: 'A1' },
	{ orderId: 2, orderStatus: 'readying', money: '13', beginTime: '12:00', endTime: '13:02', beginPlace: '超市b', endPlace: 'B2' },
	{ orderId: 3, orderStatus: 'doing', money: '14', beginTime: '12:00', endTime: '14:03', beginPlace: '超市c', endPlace: 'C3' },
	{ orderId: 4, orderStatus: 'done', money: '15', beginTime: '12:00', endTime: '15:04', beginPlace: '超市d', endPlace: 'D4' },
]
// 传递订单信息
provide('orderList', orderList)
// 更新选中导航栏
watch(selectedTab, (ne, ol) => {
	console.log(selectedTab.value);
	if (selectedTab.value === 0) {
		orderList = originList.filter(item => {
			return true
		})
	}
	else if (selectedTab.value === 1) {
		orderList = originList.filter(item => {
			console.log(item);
			return item.orderStatus === 'readying'
		})
	} else if (selectedTab.value === 2) {
		orderList = originList.filter(item => {
			return item.orderStatus === 'doing'
		})
	} else if (selectedTab.value === 3) {
		orderList = originList.filter(item => {
			return item.orderStatus === 'done'
		})
	}
})
// 状态确认的改变
function verifyResult(event) {
	// 执行逻辑
}
// 你可以在这里添加其他逻辑或生命周期钩子  
onMounted(() => {
	// x.value = 10;
	// y.value = 20;
});  
</script>

<style lang="scss">
.box {
	width: 750rpx;
	// background-color: #eeeeef;
}

.navbar {
	width: 750rpx;
	border-bottom: 1rpx solid #666;

	display: flex;

	position: relative;

	.nav-item {
		flex: 1;
		line-height: 100rpx;
		text-align: center;
	}

	.indicator {
		height: 2rpx;
		width: 140rpx;
		background-color: #000;
		position: absolute;
		left: 24rpx;
		bottom: 10rpx;
		transition: all 0.2s linear;
	}
}

.orderForm {
	.order-item {
		width: 650rpx;
		height: 400rpx;
		border: 1rpx solid #000;
		margin: 20rpx auto;
	}

	.top {
		display: flex;
		justify-content: space-around;
		font-size: 28rpx;
		line-height: 60rpx;
		border-bottom: 1rpx solid #bababa;

		.time {}


	}

	.middle {
		width: 100%;
		height: 270rpx;
		position: relative;


		.detail {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			margin: 50rpx 0;
		}

		.money {
			font-size: 25rpx;
			position: absolute;
			right: 20rpx;
			bottom: 0rpx;
		}

	}
}

.empty {
	width: 750rpx;
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.btn {
	padding: 0;
	margin: 0;
	line-height: 50rpx;
	width: 150rpx;
	height: 50rpx;
	font-size: 24rpx;
	text-align: center;
}
</style>
