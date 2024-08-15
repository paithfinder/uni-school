<script>

	export default {
		onLaunch: function() {
			console.log('App Launch')
			// if(this.$store.state.loginedUser.userType==0){
			// 	uni.redirectTo({
			// 		url:"/userPages/pages/index/index"
			// 	})
			// }else{
			// 	uni.redirectTo({
			// 		url:"/managePages/pages/list/index"
			// 	})
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	body{
		width: 750rpx;
	}
</style>
