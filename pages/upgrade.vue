<template>
	<div class="login">
		<div class="container">
			<p class="topline">
				抱歉!您当前的浏览器不支持电小鸽管理系统,建议使用一下浏览器
			</p>
			<p class="bottomline">
				<span>为保证系统软件能够稳定运行，我们推荐以下款浏览器，请点击下载和使用</span>
			</p>
			<div class="browser flexcenter">
				<div class="google">
					<div class="flexc">
						<img src="../static/imgs/google.png" alt="">
						<div class="introduce">
							<p>Chrome</p>
							<p>谷歌浏览器</p>
						</div>
					</div>
					<p class="link">
						<a href="https://www.baidu.com/link?url=HG-B6-mXiwSWjbQ11e9ILl_fxDdRnaxA0Lhil0XbuLROdZGnL_qSTb2vO_LazBCkv0NhNLLlDbNcO6gq-zZYsKnFtTgsUnleAGtDlnAZi_e&wd=&eqid=9d8cc3f100005a0c000000055a756adc">下载</a>
					</p>
				</div>
				<div class="firefox">
					<div class="flexc">
						<img src="../static/imgs/firefox.png" alt="">
						<div class="introduce">
							<p>Firefix</p>
							<p>火狐浏览器</p>
						</div>
					</div>
					<p class="link">
						<a href="https://www.baidu.com/link?url=gXUZcq4JmR8SnP66pihwJfS4GdPVCpK4keOyM3FqyO1id9nr3swj7wNbKe1CS8IIdtdx8dw7sHyHBznKcCyz8zHbqjrRqdTISby3GAMffxi&wd=&eqid=bcdb9ae400005405000000055a756aff">下载</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
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
	background-color: rgba(0, 0, 0, 0.25);
	p {
		font-family: SimHei;
	}
	p.topline {
		font-size: 20px;
		margin-top: 40px;
	}
	p.bottomline {
		font-size: 14px;
		margin: 30px 0 60px 0;
	}
	p.link {
		margin-bottom: 10px;
		a {
			color: #68a5f5;
		}
	}
	.browser {
		width: 430px;
		margin: 0 auto;
		.google,
		.firefox {
			background-color: #fff;
			width: 200px;
			border-radius: 4px;
			box-shadow: 0 0 10px #bbb;
			img {
				width: 60px;
				height: 60px;
				margin: 10px 10px 0 10px;
			}
			.introduce {
				margin-top: 17px;
				p {
					text-align: left;
					font-size: 13px;
				}
			}
		}
	}

	.container {
		width: 800px;
		padding: 40px 60px;
		height: 450px;
		background: #e1ebf6;
		border-radius: 8px;
	}
}
</style>
