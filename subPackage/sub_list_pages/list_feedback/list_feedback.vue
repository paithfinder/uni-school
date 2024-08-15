<template>
	<view class="background">
		<view class="block">
			<!-- 还未完善 -->
			<view class="chose">选择订单原因</view>		
			<feedbackBlock :img="'../../static/image/tabBar/个人.png'" :reason="'货物问题'" :detailReason="'该物品并不存在等'"></feedbackBlock>
			
			<feedbackBlock :img="'../../static/image/tabBar/个人.png'" :reason="'个人问题'" :detailReason="'因个人原因无法配送等'"></feedbackBlock>
			
			<feedbackBlock :img="'../../static/image/tabBar/个人.png'" :reason="'描述问题'" :detailReason="'描述模糊等'"></feedbackBlock>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.background{
		height: 100vh;
		width: 100vw;
		background-color: #eeeeef;
	}
	
	.block{
		height: 42vh;
		width: 96vw;
		background-color: white;
		margin: 0rpx 2vw;
		border-radius: 40rpx;
	}
	
	.chose{
		font-weight: bold;
		padding: 10rpx 0 0 12rpx;
	}
	
	
</style>
