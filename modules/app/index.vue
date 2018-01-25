<template>
    <div class="app">
        <div class="sider">
            <site-nav />
        </div>
        <div class="main">
            <slot />
        </div>
        <app-modal ref="modal"></app-modal>
    </div>
</template>
<script>
import site_nav from './site-nav';

export default {
	name: 'app',
	components: {
		'site-nav': site_nav
	}
};
</script>

<style lang="less">
@top-height: 60px;

.app {
	display: flex;
}
.main {
	overflow-y: scroll;
}
.app,
.main {
	position: relative;
	width: 100%;
	height: 100%;
}
.app > .sider {
	z-index: 2;
	width: 120px;
	background-color: #2f3c4d;
	flex: 0 0 256px;
	max-width: 256px;
	min-width: 256px;
	width: 256px;
}
</style>

<style lang="less" scoped>

</style>
