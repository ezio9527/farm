<template>
  <div class="base-header">
    <!--网络切换-->
    <div class="base-header_switch">
      <div>
        <svg class="icon icon-card" aria-hidden="true">
          <use xlink:href="#icon-card"></use>
        </svg>
      </div>
      <div v-if="account">
        <span class="line-word-hidden">{{ slice[0] }}</span>
        <span>{{ slice[1] }}</span>
      </div>
      <span @click="wallet.enable" v-else>{{ $t('homeView.connect') }}</span>
      <!--<svg class="icon icon-arrow-down" aria-hidden="true">-->
      <!--  <use xlink:href="#icon-arrow-down"></use>-->
      <!--</svg>-->
    </div>
    <!--设置-->
    <!--<svg class="icon icon-settings" aria-hidden="true">-->
    <!--  <use xlink:href="#icon-settings"></use>-->
    <!--</svg>-->
    <!--语言-->
    <!--<el-dropdown @command="languageSelect">-->
    <!--  <svg class="icon icon-earth" aria-hidden="true">-->
    <!--    <use xlink:href="#icon-earth"></use>-->
    <!--  </svg>-->
    <!--  <template #dropdown>-->
    <!--    <el-dropdown-menu>-->
    <!--      <el-dropdown-item command="zh">简体中文</el-dropdown-item>-->
    <!--      <el-dropdown-item command="en">English</el-dropdown-item>-->
    <!--    </el-dropdown-menu>-->
    <!--  </template>-->
    <!--</el-dropdown>-->
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseHeader',
  computed: {
    ...mapGetters({
      account: 'wallet/getAddress',
      wallet: 'wallet/getWallet'
    }),
    slice () {
      const str = this.account
      const length = str.length
      const half = parseInt((length * 0.9).toString())
      return [str.slice(0, half), str.slice(half, length)]
    }
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale
    }
  },
  mounted () {
    const interval = setInterval(() => {
      if (this.account) {
        clearInterval(interval)
      } else {
        this.wallet.enable()
      }
    }, 200)
  },
  methods: {
    // 语言切换
    languageSelect (command) {
      switch (command) {
        case 'zh':
          localStorage.setItem('language', 'zh')
          this.locale = 'zh'
          // Locale.use('zh-CN', zhCN)
          break
        default:
          localStorage.setItem('language', 'en')
          this.locale = 'en'
          // Locale.use('en-US', enUS)
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base-header {
  border-bottom: 1px solid rgb(231,227,235);
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  >svg, .el-dropdown svg, .keep-px {
    margin-left: 20px;
    font-size: 20px;
    color: rgb(143,146,161);
    cursor: pointer;
  }
  .el-dropdown svg {
    margin-left: 0;
  }
  >svg:hover, .el-dropdown svg:hover, >div:hover {
    opacity: 0.65;
  }
  .base-header_switch, .keep-px {
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
    height: 32px;
    align-items: center;
    background-color: rgb(239,244,245);
    border-radius: 16px;
    box-shadow: rgb(0 0 0 / 10%) 0px -2px 0px inset;
    cursor: pointer;
    display: inline-flex;
    padding-left: 50px;
    padding-right: 14px;
    position: relative;
    color: rgb(31,199,212);
    >div:first-child {
      width: 40px;
      height: 40px;
      background-color: rgb(250,249,250);
      border: 2px solid rgb(31,199,212);
      border-radius: 50%;
      color: rgb(31,199,212);
      left: 0;
      position: absolute;
      top: -4px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    >div:last-child {
      max-width: 200px;
      span:first-child {
        display: inline-block;
        width: 70%;
      }
      span:last-child {
        display: inline-block;
        width: 30%;
        margin-left: -2px;
      }
    }
  }
}
</style>
