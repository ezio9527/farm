<template>
  <el-container class="home-view">
    <el-header>
      <base-header></base-header>
    </el-header>
    <el-main>
      <banner-comp></banner-comp>
      <operation-comp></operation-comp>
      <list-comp @pledge="pledgeDialog=true" @redeem="redeemDialog=true"></list-comp>
      <pledge-dialog-comp v-model:visible="pledgeDialog"></pledge-dialog-comp>
      <redeem-dialog-comp v-model:visible="redeemDialog"></redeem-dialog-comp>
    </el-main>
    <el-footer>
      <base-footer></base-footer>
    </el-footer>
  </el-container>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'
import BaseFooter from '@/components/BaseFooter'
import BannerComp from './BannerComp'
import OperationComp from './OperationComp'
import ListComp from './ListComp'
import PledgeDialogComp from '@/views/home/PledgeDialogComp'
import RedeemDialogComp from '@/views/home/RedeemDialogComp'
export default {
  name: 'IndexView',
  components: { BaseHeader, BaseFooter, BannerComp, OperationComp, ListComp, PledgeDialogComp, RedeemDialogComp },
  data () {
    return {
      pledgeDialog: false,
      redeemDialog: false
    }
  }
}
</script>

<style lang="less" scoped>
.home-view {
  .el-header, .el-footer, .el-main {
    padding: 0;
  }
}
</style>
