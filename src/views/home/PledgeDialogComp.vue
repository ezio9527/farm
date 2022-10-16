<template>
  <van-overlay class="base-dialog" :show="show" :lock-scroll="false">
    <div class="base-dialog_wrapper" @click.stop>
      <div class="base-dialog_header">
        <span>质押LP代币</span>
        <svg @click="close" class="icon icon-close" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
      <div class="base-dialog_body">
        <div class="base-dialog-body_input">
          <div><span>质押</span><span>余额:{{ balance }}</span></div>
          <div>
            <input v-model="number"/>
            <div><button @click="number=balance">最大</button><span>LP</span></div>
          </div>
        </div>
        <div class="base-dialog-body_button">
          <button @click="close">取消</button>
          <button @click="submit" :disabled="disabled">确认</button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PledgeDialogComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      number: 0
    }
  },
  computed: {
    ...mapGetters({
      farmContract: 'contract/getFarmContract',
      balance: 'contract/getBalance'
    }),
    disabled () {
      return isNaN(this.number) || Number(this.number) <= 0 || Number(this.number) > this.balance
    }
  },
  watch: {
    visible (val) {
      this.show = val
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submit () {
      // 质押
      this.$store.commit('transaction/setPledge', true)
      this.$emit('update:visible', false)
      this.farmContract.pledge({ number: this.number }).then(hash => {
        this.farmContract.getTransactionReceipt(hash).then(result => {
          if (result) {
            this.$store.commit('transaction/setPledge', false)
          } else {
            this.$store.commit('transaction/setPledge', false)
          }
        })
      }).catch(e => {
        // 质押失败
        this.$store.commit('transaction/setPledge', false)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.base-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  .base-dialog_wrapper {
    width: 320px;
    overflow: hidden;
    border-radius: var(--base-border-radius-large);
    background-color: var(--base-background-color-white);
    padding: 16px;
    //标题头
    .base-dialog_header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      span:first-child {
        color: rgb(245,194,42);
        font-size: 24px;
        font-weight: bold;
      }
      svg:last-child {
        color: rgb(31,199,212);
      }
    }
    //弹窗内容
    .base-dialog_body {
      //输入
      .base-dialog-body_input {
        background: #faf9fa;
        padding: 16px;
        >div {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        input {
          border: none;
          background: transparent;
        }
        button {
          background: rgb(31,199,212);
          border-radius: 12px;
          padding: 4px 8px;
          border: none;
          color: white;
          font-size: 14px;
          margin-right: 8px;
        }
      }
      //确认取消
      .base-dialog-body_button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        button {
          width: 120px;
          padding: 4px;
          background: transparent;
          border: 2px solid rgb(31,199,212);
          color: rgb(31,199,212);
          border-radius: 12px;
          margin-top: 24px;
          &:disabled {
            background: rgb(143,146,161);
            border: 2px solid rgb(143,146,161);
            color: white;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 576px) {
  .base-dialog, .keep-px {
    display: flex;
    align-items: center;
    justify-content: center;
    .base-dialog_wrapper {
      width: 480px;
      overflow: hidden;
      border-radius: var(--base-border-radius-sm);
      background-color: var(--base-background-color-white);
      padding: 30px;
      //标题头
      .base-dialog_header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        span:first-child {
          color: rgb(245,194,42);
          font-size: 24px;
          font-weight: bold;
        }
        svg:last-child {
          cursor: pointer;
          color: rgb(31,199,212);
        }
      }
      //弹窗内容
      .base-dialog_body {
        //输入
        .base-dialog-body_input {
          background: #faf9fa;
          padding: 16px;
          >div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          input {
            border: none;
            background: transparent;
          }
          button {
            cursor: pointer;
            background: rgb(31,199,212);
            border-radius: 12px;
            padding: 6px 12px;
            border: none;
            color: white;
            font-size: 14px;
            margin-right: 8px;
          }
        }
        //确认取消
        .base-dialog-body_button {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          button {
            cursor: pointer;
            width: 180px;
            padding: 4px;
            background: transparent;
            border: 2px solid rgb(31,199,212);
            color: rgb(31,199,212);
            border-radius: 12px;
            margin-top: 24px;
            &:disabled {
              background: rgb(143,146,161);
              border: 2px solid rgb(143,146,161);
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>
