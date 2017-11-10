<template>
  <div class="page-house-index">
      <Tab />
      <div class="houses">
          houses
      </div>
  </div>
</template>

<script>
    import { Tab, House } from "~/modules/house";
    export default {
      components: {
        Tab,
        House
      },
      data() {
        return {};
      }
    };
</script>

<style lang="less" scoped>
    .page-house-index {
      display: flex;

      .houses {
        margin-left: 30px;
        flex: 1;
      }
    }
</style>

