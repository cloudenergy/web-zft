<template>
    <div class="page"></div>
</template>
<script>
    export default {
      data() {
        return {
          value: "",
          options: [{ label: "选项一", value: "1" }]
        };
      },
      created() {}
    };
</script>
<style lang="less" scoped>
    .page {
      padding: 30px;
    }
</style>