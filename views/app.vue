<template>
    <div :is="view">
    </div>
</template>

<script>
    const app = {
        render() {
            return (
                <div class="app">
                    <div class="sider">
                        <site-nav />
                    </div>
                    <div class="main">
                        <router-view />
                    </div>
                </div>
            );
        }
    };

    const login = {
        render() {
            return (
                <div class="login">
                    <router-view />
                </div>
            );
        }
    };

    const loader = {
        render() {
            return <div class="loader" />;
        }
    };

    export default {
        components: {
            loader,
            login,
            app
        },
        data() {
            return {
                view: 'app'
            };
        }
    };
</script>

<style lang="less">

</style>

<style lang="less" scoped>

</style>

