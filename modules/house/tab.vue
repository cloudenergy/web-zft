<template>
    <div class="secondary-side">
        <div class="buttons">
            <el-radio-group v-model="type" size="mini">
                <el-radio-button label="1">整租</el-radio-button>
                <el-radio-button label="2">合租</el-radio-button>
                <el-radio-button label="3">独栋</el-radio-button>
            </el-radio-group>
        </div>
        <div class="filters">
            <el-select v-model="filters.city" clearable placeholder="请选择城市">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="filters.area" clearable placeholder="请选择区域">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="list">
            
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          type: 1,
          filters: {
            city: "",
            area: ""
          },
          options: []
        };
      }
    };
</script>

<style lang="less" scoped>
    .secondary-side {
      width: 240px;
      text-align: center;

      .filters {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;

        .el-select {
          width: 48%;
        }
      }
    }
</style>
