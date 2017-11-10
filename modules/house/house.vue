<template>
  <div class="house-cell">
    <h3>B</h3>
    <p>$ 200</p>
    <p>主卧 13平 西</p>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .house-cell {
    padding: 15px;
    width: 160px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid @light;
    border-left: 4px solid @primary;

    h3 {
      margin-bottom: 16px;
    }

    p {
      margin-bottom: 4px;
      color: @gray;
    }
  }
</style>
