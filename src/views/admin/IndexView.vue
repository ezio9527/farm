<template>
  <el-container class="admin-view">
    <el-header>
      <base-header></base-header>
    </el-header>
    <el-main>
      <banner-comp></banner-comp>
      <div class="admin-view_content">
        <div>
          <span>当前年化收益率</span>
          <span>{{ farmList[0].yearRate }}%</span>
        </div>
        <input v-model="rate" placeholder="新的年化收益率" />
        <button @click="submit">修改</button>
      </div>
    </el-main>
    <el-footer>
      <base-footer></base-footer>
    </el-footer>
  </el-container>
</template>

<script>
import BannerComp from '@views/home/BannerComp'
import { mapGetters } from 'vuex'
export default {
  name: 'IndexView',
  components: {
    BannerComp
  },
  data () {
    return {
      rate: 0
    }
  },
  computed: {
    ...mapGetters({
      farms: 'contract/getFarms',
      farmContract: 'contract/getFarmContract'
    }),
    farmList () {
      if (this.farms.length > 0) {
        return this.farms
      } else {
        return [{ yearRate: 0, income: 0, total: 0, pledgeAmount: 0 }]
      }
    }
  },
  methods: {
    submit () {
      this.farmContract.setRate({ rate: this.rate }).then(hash => {
        this.farmContract.getTransactionReceipt(hash).then(result => {
          // if (result) {
          // } else {
          // }
        })
      }).catch(e => {
        // 修改失败
      })
    }
  }
}
</script>

<style lang="less" scoped>
.admin-view {
  .el-header, .el-footer, .el-main {
    padding: 0;
  }
  .admin-view_content {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    >div, >input, >button {
      margin-bottom: 20px;
    }
    >div {
      span {
        font-size: 24px;
        color: rgb(31,199,212);
      }
    }
    button, input {
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
}
@media screen and (min-width: 576px) {
  .admin-view, .keep-px {
    .el-header, .el-footer, .el-main {
      padding: 0;
    }
    .admin-view_content {
      width: 50%;
      margin: auto;
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      >div, >input, >button {
        margin-bottom: 20px;
      }
      >div {
        span {
          font-size: 24px;
          color: rgb(31,199,212);
        }
      }
      button, input {
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
  }
}
</style>
