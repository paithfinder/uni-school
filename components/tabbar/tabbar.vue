<template>
    <view class="tab">
         <view v-for="(item,index) in list" :key="index" class="tab-item" @click="switchTab(item, index)">
            <image class="tab_img" :src="currentIndex == index ? item.selectedIconPath : item.iconPath"></image>
            <view class="tab_text" :style="{color: currentIndex == index ? selectedColor : color}">{{item.text}}</view>
        </view>
    </view>
</template>

<script setup>
	
import { ref,onMounted } from 'vue'
import {useStore} from 'vuex'
// 未选中颜色
let color = ref('grey')
// 别选中颜色
let selectedColor = ref('#bf7777')
let list = ref([])
let currentIndex = ref(0)
let store = useStore()
let userType = store.state.loginedUser.userType

let props = defineProps({
	selectedIndex:{
		default:0
	}
})
onMounted(()=>{
	currentIndex.value = props.selectedIndex
	console.log(userType);
	if(userType==0){
		list.value = [
				{
					"pagePath": "/pages/index/index",
					"text": "首页",
					"iconPath": "/static/image/tabBar/首页默认.png",
					"selectedIconPath": "/static/image/tabBar/首页.png"
				},
				{
					"pagePath":"/pages/lauch/index",
					"text":"发布",
					"iconPath": "/static/image/tabBar/发布默认.png",
					"selectedIconPath": "/static/image/tabBar/发布.png"
				},
				{
					"pagePath":"/pages/community/index",
					"text": "社区",
					"iconPath": "/static/image/tabBar/接单默认.png",
					"selectedIconPath": "/static/image/tabBar/接单.png"
				},
				{
					"pagePath": "/pages/person/index",
					"text": "我的",
					"iconPath": "/static/image/tabBar/个人默认.png",
					"selectedIconPath": "/static/image/tabBar/个人.png"
				}
			]
	}
	else if(userType==1){
		list.value = [
				
				{
					"pagePath":"/managePages/pages/list/index",
					"text": "接单管理",
					"iconPath": "/static/image/tabBar/接单默认.png",
					"selectedIconPath": "/static/image/tabBar/接单.png"
				},
				{
					"pagePath": "/managePages/pages/person/index",
					"text": "我的",
					"iconPath": "/static/image/tabBar/个人默认.png",
					"selectedIconPath": "/static/image/tabBar/个人.png"
				}
			]
	}
	
})

const switchTab = (item, index)=>{
	currentIndex.value = index
	console.log(item.pagePath);
	uni.reLaunch({
		url:item.pagePath
	})
}
</script>

<style lang="scss" scoped>
.tab {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部

	.tab-item {
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.tab_img {
			width: 45rpx;
			height: 45rpx;
		}
		.tab_text {
			font-size: 25rpx;
			margin: 9rpx 0;
			font-weight: bold;
		}
	}
}
</style>
