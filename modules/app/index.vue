<template>
    <div class="app">
        <div class="sider">
            <site-nav/>
        </div>
        <div class="main">
            <slot/>
        </div>
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

</style>

<style lang="less" scoped>

</style>