<template>
    <div class="page-bill-index">
        <Tab />
        <div class="bills">
            运营账单Body
        </div>
    </div>
</template>

<script>
    import { Tab } from "~/modules/house";
    export default {
        components: {
            Tab
        },
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
    .page-bill-index {
        display: flex;
    }
</style>
