<template>
  <div class="home-operation-comp">
    <!--预览模式-->
    <svg :class="{active: mode}" @click="mode=true" class="icon icon-preview" aria-hidden="true">
      <use xlink:href="#icon-preview"></use>
    </svg>
    <!--列表模式-->
    <svg :class="{active: !mode}" @click="mode=false" class="icon icon-list" aria-hidden="true">
      <use xlink:href="#icon-list"></use>
    </svg>
    <!--是否质押-->
    <el-switch v-model="status" :active-text="$t('homeView.Staked')"/>
    <!--完成状态-->
    <div class="home-operation-comp_switch">
      <span :class="{active: !completed}" @click="completed=false">{{ $t('homeView.live') }}</span>
      <span :class="{active: completed}" @click="completed=true">{{ $t('homeView.finished') }}</span>
    </div>
    <!--空白块-->
    <div class="home-operation-comp_fill"></div>
    <!--排序依据-->
    <div class="home-operation-comp_sort">
      <span>{{ $t('homeView.sort') }}</span>
      <div>{{ $t('homeView.hot') }}</div>
    </div>
    <!--搜索-->
    <div class="home-operation-comp_search">
      <span>{{ $t('homeView.search') }}</span>
      <input :placeholder="$t('homeView.searchPlaceholder')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationComp',
  data () {
    return {
      mode: true, // 浏览模式
      status: true, // 质押状态
      completed: false // 完成状态
    }
  }
}
</script>

<style lang="less">
.home-operation-comp {
  .el-switch {
    --el-switch-on-color: rgb(245,194,42);
  }
  .el-switch__label.is-active {
    color: rgb(245,194,42)
  }
}
</style>
<style lang="less" scoped>
.home-operation-comp, .keep-px {
  width: 325px;
  margin: 16px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  //模式
  .icon-preview, .icon-list {
    cursor: pointer;
    &.active {
      color: rgb(245,194,42)
    }
  }
  //完成状态
  .home-operation-comp_switch {
    cursor: pointer;
    background-color: rgb(239,244,245);
    border-radius: 16px;
    display: inline-flex;
    border: 1px solid rgb(233,234,235);
    width: auto;
    height: 32px;
    line-height: 32px;
    color: rgb(143,146,161);
    span {
      padding: 0 12px;
    }
    span.active {
      border-radius: 16px;
      height: 32px;
      padding: 0px 16px;
      background: rgb(245,194,42);
      color: #FFFFFF;
    }
  }
  //空白块
  .home-operation-comp_fill {
    display: none;
  }
  //排序
  .home-operation-comp_sort {
    >span {
      font-size: 12px;
    }
    >div {
      width: 136px;
      height: 40px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding: 0px 16px;
      box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
      border: 1px solid rgb(215,202,236);
      border-radius: 16px;
      background: rgb(238,234,244);
      transition: border-radius 0.15s ease 0s;
    }
  }
  //搜索
  .home-operation-comp_search {
    >span {
      font-size: 12px;
    }
    >input {
      width: 136px;
      height: 40px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding: 0px 16px;
      box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
      border: 1px solid rgb(215,202,236);
      border-radius: 16px;
      background: rgb(238,234,244);
      transition: border-radius 0.15s ease 0s;
    }
  }
}

@media screen and (min-width: 576px) {
  .home-operation-comp, .keep-px {
    width: auto;
    max-width: 1100px;
    //模式
    .icon-preview, .icon-list {
      margin-right: 10px;
    }
    //是否质押
    .el-switch {
      margin-right: 10px;
    }
    //完成状态
    .home-operation-comp_switch {
      margin-right: 10px;
    }
    //空白块
    .home-operation-comp_fill {
      flex: 1;
      display: block;
    }
    //排序
    .home-operation-comp_sort {
      margin-right: 10px;
    }
  }
}
</style>
