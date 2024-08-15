<template>
	<view class="background">
		<!-- 上半部分 -->
		<view class="top">
			<!-- 左半更改订单 -->
			<view class="left">
				<view class="circle active"></view>
				<view class="line"></view>
				<view class="circle"></view>
			</view>
			<!-- 右半处理用户基本信息 -->
			<view class="right">
				<view class="status">订单状态({{item.status}}) 01-25 15:37</view>
				<view class="msg">私有信息（取件码 12-34-5678）</view>
				<view class="location">送至 竹轩 A栋A11</view>
				<view class="basic">收件人的一些基本信息(张某)</view>
			</view>
		</view>
		<!-- 中间订单详细信息部分 -->
		<!-- 暂时先用着后续再改 -->
		<view class="middle">
			<view class="name">
			  <view class="top-left">◷</view>
			  <view class="top-right">订单名称 ></view>
			</view>
			<view class="main">
			  <image src="../../static/image/index_img/地点.png"></image>
			  <view class="describe">文字描述</view>
			</view>
			<view class="detail" v-if="!isShow">
				<view class="textplus">
					<text>跑腿费:元</text>
					<text>￥ cc.cc</text>
				</view>
			</view>
			<view class="detail" v-else>
				<view class="textplus">
					<text>跑腿费:</text>
					<text>￥ cc.cc</text>
				</view>
				<view class="textplus">
					<text>物品价格</text>
					<text>￥ cc.cc</text>
				</view>
				<view class="textplus">
					<text>合计</text>
					<text>￥ cc.cc</text>
				</view>
				<!-- 分割线 -->
				   <view class="divider"></view>
				
				<view class="textplus">
					<text>订单编号</text>
					<text>xxxxxxxxxxxxxx</text>
				</view>
				<view class="textplus">
					<text>发起时间</text>
					<text>xxxx-xx-xx xx:xx:xx</text>
				</view>
				<view class="textplus">
					<text>付款时间</text>
					<text>xxxx-xx-xx xx:xx:xx</text>
				</view>
				<view class="textplus">
					<text>送达时间</text>
					<text>xxxx-xx-xx xx:xx:xx</text>
				</view>
			</view>
			   
			
			
			<view class="show" @click="isShow = !isShow">{{ isShow ? '点击收起' : '查看更多' }}</view>
		</view>
		
		<!-- 下面悬浮窗部分 -->
		<view class="bottom">
			<view class="btn" @click="gotoFeedback()">订单反馈</view>
			<view class="btn">确认送达</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这个订单的各种信息
				item:{},
				// 是否已经展开了详细信息
				isShow: false,
				
			};
		},
		onLoad(options) {
			this.item = JSON.parse(options.item) || {};
			console.log(this.item)
		},
		methods:{
			// 跳转订单反馈页面
			gotoFeedback(){
					uni.navigateTo({
						url:'/sub_list/list_feedback/list_feedback'
					})
			},
		},
	}
</script>

<style lang="scss">
	.background{
		background-color: #eeeeef;
		width: 100vw;
		height: 100vh;
	}
	.top{
		margin-top: 40rpx;
		width: 100vw;
		background-color: white;
		display: flex;
		.left{
			width: 10%;
			height: 40vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// border: 1rpx solid black;
			
			.circle{
				border: 3rpx solid red;
				width: 24rpx;
				height: 24rpx;
				border-radius: 12rpx;
			}
			
			.line{
				height: 300rpx;
				width: 5rpx;
				background-color: red;
			}
			
			.active{
				background-color: red;
			}
		}
		.right{
			padding-left: 12rpx;
			.status{
				margin-top: 55rpx;
				height: 50rpx;
				color: darkred;
			}
			.msg{
				margin-top: 20rpx;
				height: 230rpx;
				display: flex;
				justify-items: center;
				align-items: center;
				background-color: #eeeeee;
			}
			.location{
				margin-top: 30rpx;
			}
			.basic{
				margin-top: 12rpx;
				font-size: 22rpx;
			}
		}
	}
	
	.middle{
		background-color: white;
		width: 94vw;
		margin: 2vh 2vw;
		.name{
			line-height: 80rpx;
			font-size: 30rpx;
			display: flex;
			.top-left{
				width: 100rpx;
				text-align: center;
				font-size: 60rpx;
			}
			
			.top-right{
				width: 600rpx;
				font-size: 30rpx;
				line-height: 80rpx;
			}
		}
		
		.main{
			display: flex;
			
			image{
				border: 1px solid black;
				width: 200rpx;
				height: 200rpx;
			}
			
			.describe {
			  width: 300rpx;
			  height: 200rpx;
			  line-height: 40rpx;
			  // border: 1px solid black;
			  font-size: 28rpx;
			  display: flex;
			  align-items: center;
			  justify-content: center;
			}
			
		}
		
		.detail{
			 .textplus {
			        display: flex;
			        justify-content: space-between;
					padding: 15rpx 10px;
					font-size: 25rpx;
			    }
			
			    .textplus text:nth-child(2) {
			        color: red;
			    }
				.divider {
				  height: 1px;
				  background-color: #ccc;
				  margin: 10px 0;
				}
		}
		
		.show{
			text-align: center;
			color: #999999;
			font-size: 25rpx;
			padding-bottom: 8vh;
		}
	}
	
	.bottom{
		background-color: white;
		height: 8vh;
		width: 100vw;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		
		.btn{
			height: 100%;
			width: 50%;
			line-height: 8vh;
			text-align: center;
			border: 1rpx solid black;
			border-radius: 5vh;
			transform: scale(60%);
		}
	}
	
	
</style>

