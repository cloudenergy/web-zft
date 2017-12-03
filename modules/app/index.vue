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
    .app,
    .main {
    	position: relative;
    	display: table;
    	width: 100%;
    	height: 100%;
    }
    .app > .sider {
    	padding-top: @top-height;
    	position: absolute;
    	top: 0px;
    	bottom: 0px;
    	left: 0px;
    	z-index: 2;
    	width: 120px;
    	background-color: #2f3c4d;
    }
</style>

<style lang="less" scoped>

</style>