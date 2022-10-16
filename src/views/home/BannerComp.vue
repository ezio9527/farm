<template>
  <div class="home-banner-comp">
    <h1>{{ $t('homeView.farm')}}</h1>
    <h2>{{ $t('homeView.stake')}}</h2>
  </div>
</template>

<script>
export default {
  name: 'BannerComp'
}
</script>

<style lang="less" scoped>
.home-banner-comp, .keep-px {
  padding: 32px 24px;
  height: 168px;
  background: linear-gradient(107.11deg,rgb(255,254,247) 52.49%,rgb(255,241,193) 100%);
  h1 {
    font-size: 48px;
    font-weight: 600;
    line-height: 1.1;
    color: rgb(245,194,42);
    margin-bottom: 24px;
  }
  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.1;
    color: rgba(30,30,32,0.8);
  }
}

@media screen and (min-width: 576px) {
  .home-banner-comp, .keep-px {
    height: 185px;
    h1 {
      font-size: 64px;
    }
  }
}
</style>
