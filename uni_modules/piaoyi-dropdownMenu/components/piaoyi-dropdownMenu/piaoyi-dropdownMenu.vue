<template>
	<view class="">
		<view class="screen">
			<view class="screen-item" @tap="showModel" :class="{'active' : modelFlag}">
				<text class="text">{{modelStr ? modelStr : '类型'}}</text>
				<image v-if="modelFlag" :src="require('./top.png')"></image>
				<image v-else :src="require('./bottom.png')"></image>
			</view>
			<view class="screen-item" :class="{'actives' : nearbyFlag}" @tap="showNearby">
				<text>{{nearbyStr}}</text>
				<image v-if="nearbyFlag" :src="require('./top.png')"></image>
				<image v-else :src="require('./bottom.png')"></image>
			</view>
			<view @tap="showSearch" class="screen-item" :class="{'actives' : searchFlag}">
				<text>{{searchStr}}</text>
				<image v-if="searchFlag" :src="require('./top.png')"></image>
				<image v-else :src="require('./bottom.png')"></image>
			</view>
			<view class="screen-item" :class="{'actives' : screenFlag}" @tap="showScreen">
				<text>筛选</text>
				<image v-if="screenFlag" :src="require('./top.png')"></image>
				<image v-else :src="require('./bottom.png')"></image>
			</view>

		</view>
		<view @tap="close" @touchmove.stop.prevent
			:class="modelFlag || nearbyFlag || searchFlag || screenFlag ? 'pupop-model' : 'pupop-models'"></view>
		<!-- 筛选类型 -->
		<view class="pupop">
			<view class="popup-box" :animation="modelAnimationData">
				<scroll-view class="modelscroll" enhanced :show-scrollbar="false" :scroll-y="true">
					<view class="modelscroll-item" v-for="(item, index) in modelList" :key="index">
						<view class="title">{{item.title}}</view>
						<view class="itembox">
							<view @tap="changeModel({title: item.title, value: itemName.value})" class="item"
								:class="itemName.flag ? 'itemActive' : ''" v-for="(itemName, idx) in item.children"
								:key="idx">{{itemName.name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="btns">
					<view class="btn-item" @tap="searchReset">重置</view>
					<view class="btn-item" @tap="searchFinish">完成</view>
				</view>
			</view>
		</view>
		<!-- 附近 -->
		<view class="pupop">
			<view class="popup-box" :animation="disAnimationData">
				<scroll-view class="popupboxbox" :scroll-y="true" enhanced :show-scrollbar="false">
					<view class="popupbox-item">
						<view class="title">
							范围
						</view>
						<view class="itembox">
							<view @tap="changeDis({type: 'distince', id: item.id})" class="item"
								:class="item.id == distince ? 'active' : ''" v-for="(item, index) in disList"
								:key="index">{{item.name}}</view>
						</view>
					</view>
					<view class="popupbox-item">
						<view class="title">行政区</view>
						<view class="itembox">
							<view class="item" :class="item.id == city ? 'active' : ''"
								@tap="changeDis({type: 'city', id: item.id})" v-for="(item, index) in cityList"
								:key="index">
								<view>{{item.name}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 排序 -->
		<view class="pupop">
			<view class="popup-box" :animation="searchAnimationData">
				<view class="sortbox">
					<view @tap="changesSearch(index)" class="sort-item" :class="index == searchIndex ? 'active' : ''"
						v-for="(item, index) in searchList" :key="index">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 筛选 -->
		<view class="pupop">
			<view class="popup-box" :animation="labelAnimationData">
				<scroll-view class="popupboxbox" :scroll-y="true" enhanced :show-scrollbar="false">
					<view class="popupbox-item">
						<view class="title">标签</view>
						<view class="itembox">
							<view @tap="changeLabel(item)" class="item" :class="item.flag ? 'active' : ''"
								v-for="(item, index) in labelList" :key="index">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="btns">
					<view class="btn-item" @tap="searchReset">重置</view>
					<view class="btn-item" @tap="searchFinish">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modelFlag: false,
				modelStr: '',
				models: [],
				nearbyFlag: false,
				nearbyStr: '附近',
				searchFlag: false,
				searchStr: '智能排序',
				screenFlag: false,
				distince: '',
				city: '',
				labels: [],
				searchIndex: 0,
				location: '',
				modelAnimationData: {},
				disAnimationData: {},
				searchAnimationData: {},
				labelAnimationData: {}
			}
		},
		props: {
			modelList: {
				type: Array,
				default: () => []
			},
			disList: {
				type: Array,
				default: () => []
			},
			cityList: {
				type: Array,
				default: () => []
			},
			searchList: {
				type: Array,
				default: () => []
			},
			labelList: {
				type: Array,
				default: () => []
			},
		},
		methods: {
			// 打开类型弹框
			showModel() {
				if (this.modelFlag) {
					this.modelFlag = false
				} else {
					this.searchFlag = false
					this.nearbyFlag = false
					this.screenFlag = false
					this.modelFlag = true
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
			},
			changeModel(e) {
				var value = e.value
				var models = this.models
				if (models.indexOf(value) > -1) {
					models.splice(models.indexOf(value), 1)
				} else {
					models.push(value)
				}
				this.models = models
				this.activeModel()
			},
			onModelClose() {
				this.modelFlag = false
			},
			activeModel() {
				var modelList = this.modelList
				modelList.forEach(item => {
					item.children.forEach(list => {
						if (this.models.indexOf(list.value) > -1) {
							list.flag = true
						} else {
							list.flag = false
						}
					})
				})
				this.$emit("update:modelList", [...modelList]);
			},
			searchReset() {
				if (this.modelFlag) {
					this.modelFlag = false
					this.modelStr = ''
					this.models = []
					this.activeModel()
				} else {
					this.screenStr = ''
					this.labels = []
					this.classs = []
					this.discounts = []
					this.screenFlag = false
					this.labelModel()
					this.discountModel()
					this.classModel()
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
				var result = this.getResult()
				this.$emit('searchFinish', result)
			},
			searchFinish() {
				if (this.modelFlag) {
					var modelStr = ''
					var models = this.models
					var modelList = this.modelList
					modelList.forEach(item => {
						item.children.forEach(list => {
							if (models.indexOf(list.value) > -1) {
								modelStr = modelStr + `${item.title}/${list.name}`
							}
						})
					})
					this.modelFlag = false
					this.modelStr = modelStr
				} else {
					this.screenFlag = false
					this.screenStr = 11111
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
				var result = this.getResult()
				this.$emit('searchFinish', result)
			},
			showSearch() {
				if (this.searchFlag) {
					this.searchFlag = false
				} else {
					this.searchFlag = true
					this.modelFlag = false
					this.screenFlag = false
					this.nearbyFlag = false
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
			},
			showNearby() {
				if (this.nearbyFlag) {
					this.nearbyFlag = false
				} else {
					this.searchFlag = false
					this.modelFlag = false
					this.screenFlag = false
					this.nearbyFlag = true
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
			},
			changeDis(e) {
				var type = e.type
				var value = e.id
				if (type == 'distince') {
					this.location = ''
					var disList = this.disList
					var nearbyStr = ''
					disList.forEach(item => {
						if (item.id == value) {
							nearbyStr = item.name
						}
					})
					this.nearbyStr = nearbyStr
					this.city = ''
				} else {
					var nearbyStr = ''
					var cityList = this.cityList
					cityList.forEach(item => {
						if (item.id == value) {
							nearbyStr = item.name
						}
					})
					this.nearbyStr = nearbyStr
					this.distince = ''
				}
				this.nearbyFlag = false
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
				this[type] = value
				var result = this.getResult()
				this.$emit('searchFinish', result)
			},
			showScreen() {
				if (this.screenFlag) {
					this.screenFlag = false
				} else {
					this.searchFlag = false
					this.nearbyFlag = false
					this.screenFlag = true
					this.modelFlag = false
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
			},
			labelModel() {
				var labelList = this.labelList
				labelList.forEach(item => {
					if (this.labels.indexOf(item.name) > -1) {
						item.flag = true
					} else {
						item.flag = false
					}
				})
				this.$emit("update:labelList", [...labelList]);
			},
			discountModel() {
				var discountList = this.discountList
				discountList.forEach(item => {
					if (this.discounts.indexOf(item.value) > -1) {
						item.flag = true
					} else {
						item.flag = false
					}
				})
				this.discountList = [...discountList]
			},
			// 动画
			changeActive(type) {
				var active = '-1000px'
				if (this[type]) {
					active = 0
				}
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'linear'
				})
				animation.top(active).step()
				if (type == 'modelFlag') {
					this.modelAnimationData = animation.export()
				} else if (type == 'nearbyFlag') {
					this.disAnimationData = animation.export()
				} else if (type == 'searchFlag') {
					this.searchAnimationData = animation.export()
				} else if (type == 'screenFlag') {
					this.labelAnimationData = animation.export()
				}
			},
			changesSearch(index) {
				var searchList = this.searchList
				if (this.searchIndex == index) {
					return
				} else {
					this.searchFlag = false
					this.searchStr = searchList[index].name
					this.searchIndex = index
				}
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
				var result = this.getResult()
				this.$emit('searchFinish', result)
			},
			changeLabel(item) {
				var value = item.name
				var labels = this.labels
				if (labels.indexOf(value) > -1) {
					labels.splice(labels.indexOf(value), 1)
				} else {
					labels.push(value)
				}
				this.labels = labels
				this.labelModel()
			},
			getResult() {
				var obj = {}
				var modelStr = this.modelStr
				if (modelStr) {
				  var models = this.models
				  if (models.length) {
					obj.models = models.join(',')
				  }
				}
				var distince = this.distince
				var city = this.city
				if (distince) {
				  obj.distince = distince
				} else if (city) {
				  obj.areaCode = city
				}
				obj.searchIndex = this.searchIndex + 1
				if (this.screenStr) {
				  var labels = this.labels
				  if (labels.length) {
					obj.labels = labels.join(',')
				  }
				}
				return obj
			},
			close() {
				this.searchFlag = false
				this.nearbyFlag = false
				this.screenFlag = false
				this.modelFlag = false
				this.changeActive('modelFlag')
				this.changeActive('nearbyFlag')
				this.changeActive('screenFlag')
				this.changeActive('searchFlag')
			},
			changeData() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.screen {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 27upx 30upx;
		background: #fff;
		position: relative;
		z-index: 10000;
	}

	.screen .screen-item {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 30upx;
		line-height: 30upx;
		font-weight: 500;
		color: #666;
	}

	.screen .active {
		font-weight: 700;
		color: #333;
	}

	.screen .screen-item image {
		width: 16upx;
		height: 12upx;
		margin-left: 6upx;
	}

	.screen .screen-item .text {
		width: 122upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.screen .actives text {
		font-weight: 700;
		color: #333;
	}

	.pupop {
		position: absolute;
		left: 0;
		top: 56upx;

		.popup-box {
			position: absolute;
			width: calc(100vw - 64upx);
			padding: 0 32upx;
			left: 0;
			top: -1000px;
			z-index: 99;
			background: #fff;
			padding-bottom: 20px;
			padding-top: 12upx;

			.pupop-btn {
				height: 40px;
				display: flex;
				align-items: center;
				padding: 0 30upx;
				justify-content: space-between;
			}
		}

	}

	.popup-box {}

	.popupboxActive {
		padding-bottom: 40upx;
	}

	.popup-box .btns {
		display: flex;
		align-items: center;
		padding: 30upx 0;
		justify-content: space-between;
	}

	.popup-box .btns .btn-item {
		flex: 1;
		text-align: center;
		width: 40%;
		height: 97upx;
		line-height: 97upx;
		border-radius: 97upx;
		font-size: 30upx;
		color: #333;
		background: #F9F9F9;
		font-weight: 400;
	}

	.popup-box .btns .btn-item:nth-child(2) {
		color: #fff;
		background: #05DB9B;
	}

	.popup-box .modelscroll {}

	.popup-box .modelscroll .modelscroll-item .title {
		font-weight: 700;
		color: #323333;
		padding-top: 27upx;
		font-size: 32upx;
		margin-bottom: 31upx;
	}

	.popup-box .modelscroll .modelscroll-item .itembox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.popup-box .modelscroll .modelscroll-item .itembox .item {
		width: 319upx;
		height: 80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 80upx;
		font-size: 30upx;
		color: #333;
		background: #F5F5F5;
		margin-bottom: 22upx;
	}

	.popup-box .modelscroll .modelscroll-item .itembox .itemActive {
		color: #05DB9B;
		background: #E0FCF6;
	}

	.popup-box .sortbox {
		padding: 12upx 0 41upx;
	}

	.popup-box .sortbox .sort-item {
		font-size: 30upx;
		line-height: 30upx;
		color: #646666;
		padding: 41upx 0;
		font-weight: 400;
	}

	.popup-box .sortbox .active {
		color: #323333;
		font-weight: 500;
	}

	.popupboxbox {
		// height: 640upx;
	}

	.popupboxbox .title {
		color: #323333;
		font-size: 32upx;
		font-weight: 700;
		margin-bottom: 30upx;
		padding-top: 31upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.popupboxbox .title_right {
		display: flex;
		align-items: center;
		color: #05DB9B;
		line-height: 30upx;
		font-weight: 500;
	}

	.popupboxbox .title_right image {
		margin-right: 7upx;
		width: 23upx;
		height: 30upx;
	}

	.popupboxbox .itembox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.popupboxbox .itembox .item {
		width: 220upx;
		height: 70upx;
		text-align: center;
		line-height: 70upx;
		border-radius: 70upx;
		font-size: 30upx;
		margin-bottom: 22upx;
		color: #333;
		background: #F5F5F5;
		margin-right: 13upx;
	}

	.popupboxbox .itembox .active {
		color: #05DB9B;
		background: #E0FCF6;
	}

	.popupboxbox .itembox .item:nth-child(3),
	.popupboxbox .itembox .item:nth-child(6),
	.popupboxbox .itembox .item:nth-child(9),
	.popupboxbox .itembox .item:nth-child(12),
	.popupboxbox .itembox .item:nth-child(15),
	.popupboxbox .itembox .item:nth-child(18),
	.popupboxbox .itembox .item:nth-child(21),
	.popupboxbox .itembox .item:nth-child(24),
	.popupboxbox .itembox .item:nth-child(27),
	.popupboxbox .itembox .item:nth-child(30) {
		margin-right: 0;
	}

	.popupboxbox .itembox .item>view {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 10upx;
	}
	.pupop-model {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 90;
		background: rgba(0, 0, 0, .5);
	}
	
	.pupop-models {
		display: none !important;
	}
</style>
