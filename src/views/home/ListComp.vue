<template>
  <div class="home-list-comp">
    <div class="home-list-item" v-loading="loading">
      <!--logo和标题-->
      <div class="home-list-item_header">
        <div class="list-item-header_logo">
          <img src="@img/usdt.png"/>
          <img src="@img/nuwa.png"/>
        </div>
        <span>NUWA-USDT</span>
      </div>
      <!--已赚取和收益率-->
      <div class="home-list-item_details">
        <div>
          <span>{{ $t('homeView.earned')}}</span>
          <span>{{ farmList[0].income }}</span>
        </div>
        <div>
          <span>{{ $t('homeView.apr')}}</span>
          <span>180%</span>
        </div>
        <!--倍数-->
        <!--<div>-->
        <!--  <span>{{ $t('homeView.multiplier')}}</span>-->
        <!--  <div>-->
        <!--    <span>29x</span>-->
        <!--    <svg class="icon icon-question" aria-hidden="true">-->
        <!--      <use xlink:href="#icon-question"></use>-->
        <!--    </svg>-->
        <!--  </div>-->
        <!--</div>-->
        <!--资金池-->
        <div>
          <span>{{ $t('homeView.liquidity')}}</span>
          <div>
            <span>${{ farmList[0].total }}</span>
            <!--<svg class="icon icon-question" aria-hidden="true">-->
            <!--  <use xlink:href="#icon-question"></use>-->
            <!--</svg>-->
          </div>
        </div>
        <div @click="collapse=!collapse">
          <span>{{ $t('homeView.details') }}</span>
          <svg class="icon icon-arrow-down" aria-hidden="true" v-show="collapse">
            <use xlink:href="#icon-arrow-down"></use>
          </svg>
          <svg class="icon icon-arrow-up" aria-hidden="true" v-show="!collapse">
            <use xlink:href="#icon-arrow-up"></use>
          </svg>
        </div>
      </div>
      <!--操作-->
      <div :class="{hidden: collapse}" class="home-list-item_operation">
        <!--收获-->
        <div class="list-item-operation_harvest">
          <div>{{ $t('homeView.earned') }}</div>
          <div>
            <span>{{ farmList[0].income }}</span>
            <button @click="pickup" :disabled="farmList[0].income<=0 || pickupStatus">{{ $t('homeView.harvest') }}</button>
          </div>
        </div>
        <!--授权-->
        <div class="list-item-operation_enable" v-if="!enabled">
          <span>{{ $t('homeView.enableFarm') }}</span>
          <button @click="approve">{{ $t('homeView.enable')}}</button>
        </div>
        <!--质押-->
        <div class="list-item-operation_pledge" v-else-if="farmList[0].pledgeAmount<=0">
          <span>{{ $t('homeView.pledge', { symbol: 'LP' }) }}</span>
          <button @click="$emit('pledge')">{{ $t('homeView.pledge') }}</button>
        </div>
        <!--解除质押-->
        <div class="list-item-operation_redeem" v-else>
          <div>LP已质押</div>
          <div>
            <span>{{ farmList[0].pledgeAmount }}</span>
            <div>
              <button @click="$emit('redeem')" :disabled="redeemStatus">-</button>
              <button @click="$emit('pledge')" :disabled="pledgeStatus">+</button>
            </div>
          </div>
        </div>
        <!--信息-->
        <div :class="{hidden: collapse}" class="home-list-item_info">
          <!--年化利率-->
          <div>
            <span>{{ $t('homeView.apr')}}</span>
            <div>
              <span>180 %</span>
              <svg class="icon icon-calculate" aria-hidden="true">
                <use xlink:href="#icon-calculate"></use>
              </svg>
            </div>
          </div>
          <!--倍数-->
          <!--<div>-->
          <!--  <span>{{ $t('homeView.multiplier')}}</span>-->
          <!--  <span>-->
          <!--    <span>29x</span>-->
          <!--    <svg class="icon icon-question" aria-hidden="true">-->
          <!--      <use xlink:href="#icon-question"></use>-->
          <!--    </svg>-->
          <!--  </span>-->
          <!--</div>-->
          <!--资金池-->
          <div>
            <span>{{ $t('homeView.liquidity')}}</span>
            <div>
              <span>${{ farmList[0].total }}</span>
              <!--<svg class="icon icon-question" aria-hidden="true">-->
              <!--  <use xlink:href="#icon-question"></use>-->
              <!--</svg>-->
            </div>
          </div>
          <!--获得LP-->
          <div>
            <a href="https://www.nuwaswap.vip/#/pool" target="_blank">
              <span>{{ $t('homeView.get')}} NUWA-USDT LP</span>
              <svg class="icon icon-share" aria-hidden="true">
                <use xlink:href="#icon-share"></use>
              </svg>
            </a>
          </div>
          <!--查看合约-->
          <div>
            <a href="https://bscscan.com/address/0xad76Db17f7b3f641a930a3Ae7ae984da9452F1f3" target="_blank">
              <span>{{ $t('homeView.viewContract')}}</span>
              <svg class="icon icon-share" aria-hidden="true">
                <use xlink:href="#icon-share"></use>
              </svg>
            </a>
          </div>
          <!--查看交易对信息-->
          <div>
            <a href="https://bscscan.com/address/0xbbDeabFA33C0c4bABA4a2908200da66DE7e8Af18" target="_blank">
              <span>{{ $t('homeView.seePair')}}</span>
              <svg class="icon icon-share" aria-hidden="true">
                <use xlink:href="#icon-share"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import { mapGetters } from 'vuex'
import config from '@/assets/data/config'
export default {
  name: 'ListComp',
  data () {
    return {
      loading: true,
      enabled: false, // 是否授权
      collapse: true
    }
  },
  computed: {
    ...mapGetters({
      farms: 'contract/getFarms',
      farmContract: 'contract/getFarmContract',
      ercContract: 'contract/getErcContract',
      account: 'wallet/getAddress',
      pickupStatus: 'transaction/getPickup',
      pledgeStatus: 'transaction/getPledge',
      redeemStatus: 'transaction/getRedeem'
    }),
    farmList () {
      if (this.farms.length > 0) {
        return this.farms
      } else {
        return [{ yearRate: 0, income: 0, total: 0, pledgeAmount: 0 }]
      }
    }
  },
  watch: {
    farms: {
      immediate: true,
      handler (val) {
        this.loading = val.length <= 0
      }
    },
    ercContract: {
      immediate: true,
      handler (val) {
        // 查授权
        if (val) {
          this.allowance()
        }
      }
    }
  },
  methods: {
    balanceOf () {
      return new Promise(resolve => {
        // 查余额
        this.ercContract.getBalanceInfo().then(balance => {
          if (balance >= 0) {
            // 余额足够
          } else {
            // 余额不足
          }
          resolve()
        }).catch(e => {
          // 余额查询失败
          resolve()
        })
      })
    },
    allowance () {
      // 查询授权
      const address = config.contract.Farm.address
      let number = 99999999
      this.ercContract.allowance(address).then(num => {
        console.log(num)
        number = Web3.utils.toWei(number.toString())
        number = Web3.utils.toBN(number.toString())
        num = Web3.utils.toBN(num.toString())
        if (num.gte(number)) {
          // 额度足够
          console.log('额度足够')
          this.enabled = true
        } else {
          // 额度不足
          console.log('额度不足')
          this.enabled = false
        }
      }).catch(e => {
        // 额度查询失败
      })
    },
    // 授权
    approve () {
      const address = config.contract.Farm.address
      const number = 999999999999999
      this.ercContract.approve(address, number).then(() => {
        // 授权成功
        this.enabled = true
      }).catch(e => {
        // 授权失败
        this.enabled = false
      })
    },
    // 提取收益
    pickup () {
      this.$store.commit('transaction/setPickup', true)
      this.farmContract.pickup().then(hash => {
        this.farmContract.getTransactionReceipt(hash).then(result => {
          if (result) {
            this.$store.commit('transaction/setPickup', false)
          } else {
            this.$store.commit('transaction/setPickup', false)
          }
        })
      }).catch(e => {
        this.$store.commit('transaction/setPickup', false)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-list-comp{
  width: 325px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  filter: drop-shadow(rgba(25,19,38,0.15) 0px 1px 4px);
  background: rgb(255,255,255);
  margin: 16px auto;
  overflow: hidden;
  .home-list-item {
    padding: 24px 0;
    //logo和标题
    .home-list-item_header {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 24px;
      .list-item-header_logo {
        position: relative;
        margin-right: 10px;
        img:first-child {
          width: 12px;
          position: absolute;
          top: -3px;
          left: -3px;
          z-index: 1;
        }
        img:last-child {
          width: 20px;
          position: relative;
          z-index: 2;
        }
      }
    }
    //已赚取和年化利率
    .home-list-item_details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      >div {
        display: flex;
        flex-direction: column;
        span {
          font-size: 12px;
          color: rgb(143,146,161);
          margin-bottom: 6px;
        }
        span:last-child {
          font-size: 16px;
          color: rgba(30,30,32,0.8)
        }
      }
      >div:nth-child(3) {
        display: none;
      }
      >div:last-child {
        align-items: center;
        flex-direction: row;
        color: rgb(31,199,212);
        span {
          margin-bottom: 0;
          margin-right: 6px;
          color: rgb(31,199,212);
          font-size: 16px;
        }
        svg {
          font-size: 12px;
        }
      }
    }
    //操作
    .home-list-item_operation {
      height: 500px;
      padding: 24px;
      background: rgb(250,249,250);
      overflow: hidden;
      transition: all 300ms;
      &.hidden {
        height: 0;
        padding: 0 24px;
      }
      //收获&授权&质押&赎回
      .list-item-operation_harvest, .list-item-operation_enable, .list-item-operation_pledge, .list-item-operation_redeem {
        padding: 16px;
        border: 2px solid rgb(238,234,244);
        border-radius: 16px;
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-basis: 0px;
        margin-bottom: 16px;
        button {
          background-color: transparent;
          border: 2px solid rgb(245,194,42);
          box-shadow: none;
          color: rgb(245,194,42);
          -webkit-box-align: center;
          align-items: center;
          border-radius: 16px;
          display: inline-flex;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          -webkit-box-pack: center;
          justify-content: center;
          letter-spacing: 0.03em;
          line-height: 1;
          opacity: 1;
          outline: 0px;
          transition: background-color 0.2s ease 0s,opacity 0.2s ease 0s;
          height: 48px;
          padding: 0px 24px;
          margin-left: 4px;
          cursor: pointer;
          &:disabled {
            background-color: rgb(233,234,235);
            border: none;
            color: rgb(189,194,196);
            cursor: not-allowed;
          }
        }
      }
      //收取
      .list-item-operation_harvest {
        >div:first-child {
          color: rgb(143,146,161);
          font-weight: 600;
          line-height: 1.5;
          text-transform: uppercase;
          font-size: 12px;
        }
        >div:last-child {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          span {
            color: rgba(30,30,32,0.8);
            font-size: 20px;
            font-weight: 600;
            line-height: 1.1;
          }
        }
      }
      //赎回
      .list-item-operation_redeem {
        >div:first-child {
          color: rgb(143,146,161);
          font-weight: 600;
          line-height: 1.5;
          text-transform: uppercase;
          font-size: 12px;
        }
        >div:last-child {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          span {
            flex-grow: 1;
            color: rgba(30,30,32,0.8);
            font-size: 12px;
            font-weight: 600;
            line-height: 1.1;
          }
        }
      }
      //授权&质押
      .list-item-operation_enable, .list-item-operation_pledge {
        span {
          color: rgb(143,146,161);
          font-weight: 600;
          line-height: 1.5;
          text-transform: uppercase;
          font-size: 12px;
        }
        button {
          width: 100%;
        }
      }
      //信息
      .home-list-item_info {
        padding: 24px;
        overflow: hidden;
        >div {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          svg {
            margin-left: 6px;
          }
        }
        >div:nth-child(3), >div:nth-child(4), >div:nth-child(5) {
          display: block;
          color: rgb(31,199,212);
        }
      }
    }
  }
}
@media screen and (min-width: 576px) {
  .home-list-comp, .keep-px{
    max-width: 1152px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    filter: drop-shadow(rgba(25,19,38,0.15) 0px 1px 4px);
    background: rgb(255,255,255);
    margin: 16px auto;
    overflow: hidden;
    .home-list-item {
      padding: 24px 0;
      //logo和标题
      .home-list-item_header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 24px;
        .list-item-header_logo {
          position: relative;
          margin-right: 10px;
          img:first-child {
            width: 12px;
            position: absolute;
            top: -3px;
            left: -3px;
            z-index: 1;
          }
          img:last-child {
            width: 20px;
            position: relative;
            z-index: 2;
          }
        }
      }
      //已赚取和年化利率
      .home-list-item_details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;
        >div {
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
            color: rgb(143,146,161);
            margin-bottom: 6px;
          }
          span:last-child {
            font-size: 16px;
            color: rgba(30,30,32,0.8)
          }
        }
        >div:nth-child(3), >div:nth-child(4) {
          display: flex;
        }
        >div:last-child {
          align-items: center;
          flex-direction: row;
          color: rgb(31,199,212);
          cursor: pointer;
          span {
            margin-bottom: 0;
            margin-right: 6px;
            color: rgb(31,199,212);
            font-size: 16px;
          }
          svg {
            font-size: 12px;
          }
        }
      }
      //操作
      .home-list-item_operation {
        height: 160px;
        padding: 24px;
        background: rgb(250,249,250);
        overflow: hidden;
        transition: all 300ms;
        &.hidden {
          height: 0;
          padding: 0 24px;
        }
        display: flex;
        flex-direction: row;
        align-items: center;
        //收获&授权&质押&赎回
        .list-item-operation_harvest, .list-item-operation_enable, .list-item-operation_pledge,  .list-item-operation_redeem {
          order: 3;
          padding: 16px;
          border: 2px solid rgb(238,234,244);
          border-radius: 16px;
          -webkit-box-flex: 1;
          flex-grow: 1;
          flex-basis: 0px;
          margin-bottom: 16px;
          margin-left: 10px;
          button {
            background-color: transparent;
            border: 2px solid rgb(245,194,42);
            box-shadow: none;
            color: rgb(245,194,42);
            -webkit-box-align: center;
            align-items: center;
            border-radius: 16px;
            display: inline-flex;
            font-family: inherit;
            font-size: 16px;
            font-weight: 600;
            -webkit-box-pack: center;
            justify-content: center;
            letter-spacing: 0.03em;
            line-height: 1;
            opacity: 1;
            outline: 0px;
            transition: background-color 0.2s ease 0s,opacity 0.2s ease 0s;
            height: 48px;
            padding: 0px 24px;
            margin-left: 4px;
            cursor: pointer;
            &:disabled {
              background-color: rgb(233,234,235);
              border: none;
              color: rgb(189,194,196);
              cursor: not-allowed;
            }
          }
        }
        //收取
        .list-item-operation_harvest {
          >div:first-child {
            color: rgb(143,146,161);
            font-weight: 600;
            line-height: 1.5;
            text-transform: uppercase;
            font-size: 12px;
          }
          >div:last-child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
              color: rgba(30,30,32,0.8);
              font-size: 20px;
              font-weight: 600;
              line-height: 1.1;
            }
          }
        }
        //授权&质押
        .list-item-operation_enable, .list-item-operation_pledge {
          span {
            color: rgb(143,146,161);
            font-weight: 600;
            line-height: 1.5;
            text-transform: uppercase;
            font-size: 12px;
          }
          button {
            width: 100%;
          }
        }
        //赎回
        .list-item-operation_redeem {
          >div:first-child {
            color: rgb(143,146,161);
            font-weight: 600;
            line-height: 1.5;
            text-transform: uppercase;
            font-size: 12px;
          }
          >div:last-child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
              color: rgba(30,30,32,0.8);
              font-size: 20px;
              font-weight: 600;
              line-height: 1.1;
            }
            button {
              width: 50px;
              font-size: 28px;
            }
          }
        }
        //信息
        .home-list-item_info {
          padding: 24px;
          overflow: hidden;
          >div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
            svg {
              margin-left: 6px;
            }
          }
          >div:nth-child(1), >div:nth-child(2) {
            display: none;
          }
          >div:nth-child(4), >div:nth-child(5), >div:nth-child(6) {
            display: block;
            color: rgb(31,199,212);
          }
        }
      }
    }
  }
}
</style>
