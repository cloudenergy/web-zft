<template>
	<div class="recharge">
		<div class="container">
      <span>充值页面</span>
    </div>
	</div>
</template>

<script>
	import {
		add,
		format
	} from '~/utils/date';
	import _ from 'lodash';
	export default {
		data() {
			return {
				user: {keepAlive:false},
				type:null
			};
		},
		methods: {
			keyLogin(el) {
				if(el.keyCode===13){
					this.login()
				}
			},
		}
	};
</script>
<style lang="less" scoped>
	.login {
		width: 100%;
		height: 100%;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');

		// h4 {
		// 	padding: 10px 0 0;
		// 	color: @dark;
		// 	text-align: center;

		// 	span {
		// 		display: inline-block;
		// 		letter-spacing: 20px;
		// 		text-indent: 20px;
		// 		border-bottom: 3px solid @primary;
		// 		padding-bottom: 10px;
		// 		margin-bottom: 20px;
		// 	}
		// }


		.container {
			width: 700px;
			height: 450px;
			background: #fff;
			box-shadow: 0 0 15px #999;
			border-radius: 8px;
			.logo-image {
				background: #F5F8FC;
				padding:20px 0;
				margin-bottom:60px;
			}
			.lofin-form{
				width: 300px;
				margin:0 auto;
			}
		}

		.bottom-btn {
			margin-bottom: 0px;

			button {
				box-shadow: 0 0 10px @primary;
			}
		}
	}
</style>


