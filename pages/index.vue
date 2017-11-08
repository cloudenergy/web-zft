<template>
    <div class="page">
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          options: [{ label: "选项一", value: "1" }]
        };
      },
      created() {
        this.$model.home().then(data => {
          console.log("data: ", data);
        });
      }
    };
</script>
<style lang="less" scoped>
    .page {
      padding: 30px;
    }
</style>