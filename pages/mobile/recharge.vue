<template>
  <div class="recharge mobile-rechage">
    <div class="container">
      <p class="container-title">充值金额(元)</p>
      <div class="amount-row flexcenter">
        <div v-for="(amount, index) in selections1" :key="amount.value" class="select-button felxc" :class="{centerButton:index===1}">
          <button class="amount-selection" @click="select(amount.value)" :class="selectButton(amount)">{{amount.value}}
          </button>
        </div>
      </div>
      <div class="amount-row flexcenter selections2">
        <div v-for="(amount, index) in selections2" :key="amount.value" class="select-button felxc" :class="{centerButton:index===1}">
          <button class="amount-selection" @click="select(amount.value)" :class="selectButton(amount)">{{amount.value}}
          </button>
        </div>
      </div>

      <el-row class="select-other-num">
        <el-col>
          <el-input placeholder="请输入其他金额" v-model="inputPayNum">
            <template slot="prepend">其他金额:</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="payment-row">
        <label class="payment-option">当前充值金额: </label><span class="payment-num">{{selectAmount}}元</span>
        <el-button class="payment-button" @click="pay(selectAmount)">立即充值</el-button>
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
        selectAmount: 10,
        inputPayNum:''
      };
    },
    methods: {
      select(amount) {
        this.selectAmount = amount;
      },
      pay(amount) {
        this.$message.success(`使用微信公众号支付${amount}元。`);
      },
      selectButton(data) {
        return this.selectAmount===data.value?'button-active':'button-noneselect'
      },
    },
     watch: {
      inputPayNum(newVal, oldVal) {
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
    .container-title {
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 14px;
    }
  }

  .amount-selection {
    margin: 5px;
    height: 45px;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    outline: none;
    background: #fff;
    font-size: 16px;
    color: #4A4A4A;
  }
  .selections2 {
    margin: 14px 0;
  }
  .button-active {
    background: #7BAEE8;
    color: #fff;
  }
  .centerButton {
    margin: 0 5px;
  }
  .select-button {
    flex: 1;
    button {
      padding: 0;
      margin: 0;
      flex: 1
    }
  }

  .payment-button {
    width: 100%;
    color: #fff;
    margin: 10px auto;
    font-size: 16px;
    background: #7BAEE8;
    border-radius: 4px;
    height: 40px;
  }
  .other-pay-num {

  }
  

  .payment-row {
    position: absolute;
    bottom: 150px;
    width: 90%;
    .payment-option {
      font-size: 16px;
      color: #4a4a4a;
    }
    .payment-num {
      font-size: 16px;
      color: #F03D53;
    }
  }

  .input-amount {

  }
</style>

<style lang="less">
  .mobile-rechage {
    .select-other-num {
      margin-top: 10px;
      padding: 5px;
      background: #FFFFFF;
      border: 1px solid #CDCBCB;
      border-radius: 4px;
      .el-input-group__prepend {
        background-color: #fff;
        border: none;
        padding: 0 10px;
      }
      .el-input__inner{
        border: none;
        padding-left: 10px
      }

    }
  }
  
</style>



