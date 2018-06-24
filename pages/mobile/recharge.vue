<template>
  <div class="recharge">
    <div class="container">
      <p>充值金额(元)</p>
      <el-row type="flex" class="amount-row" justify="center" align="middle">
        <el-col :span="8" v-for="amount in selections1" :key="amount.value">
          <el-button class="amount-selection" @click="select(amount.value)">{{amount.value}}
          </el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="amount-row" justify="center" align="middle">
        <el-col :span="8" v-for="amount in selections2" :key="amount.value">
          <el-button :span="6" class="amount-selection" @click="select(amount.value)">{{amount.value}}
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <label for="input-number">其他金额</label>
        <el-col>
          <el-input-number id="input-number" class="input-amount" :controls="false" :step="1" placeholder="请输入金额，单位元"
                           :precision="0" v-model="otherAmount"></el-input-number>
        </el-col>
      </el-row>
      <el-row class="payment-row">
        <label>当前充值金额{{selectAmount}}元</label>
        <el-button class="payment-button" @click="pay(selectAmount)">支付</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import fp from 'lodash/fp';

  export default {
    data() {
      return {
        selections1: [{value: 10}, {value: 50}, {value: 100}],
        selections2: [{value: 200}, {value: 500}, {value: 1000}],
        otherAmount: 0,
        selectAmount: 0,
      };
    },
    methods: {
      select(amount) {
        this.selectAmount = amount;
      },
      pay(amount) {
        this.$message.success(`使用微信公众号支付${amount}元。`);
      }
    },
    watch: {
      otherAmount(newVal, oldVal) {
        this.selectAmount = newVal;
      }
    },
    created() {
      fp.isUndefined(this.$store.state.userInfo.user.auth) ? this.$forward('/mobile/login') : '';
    }
  };
</script>
<style lang="less" scoped>
  .container {
    margin: 20px;
  }

  .amount-selection {
    margin: 5px;
    height: 45px;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
  }

  .payment-button {
    width: 100%;
    color: #fff;
    margin: 10px auto;
    font-size: 16px;
    background-color: #84aee7;
    border-radius: 5px;
  }

  .payment-row {
    position: absolute;
    bottom: 150px;
    padding: 20px;
    width: 90%;
  }

  .input-amount {

  }
</style>


