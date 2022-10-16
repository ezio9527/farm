<template>
  <div class="base-footer">
    <!--切换-->
    <div class="base-footer_switch">
      <!--<div class="base-footer-switch_language">-->
      <!--  <svg class="icon icon-earth" aria-hidden="true">-->
      <!--    <use xlink:href="#icon-earth"></use>-->
      <!--  </svg>-->
      <!--  <span>中文</span>-->
      <!--</div>-->
      <a href="https://www.nuwaswap.vip/#/swap" class="base-footer-switch_buy">Buy NUWA</a>
    </div>
    <!--关于-->
    <div class="base-footer_about">
      <ul>
        <li>{{ $t('component.footer.about') }}</li>
        <li><a href="http://www.nuwa.top/" target="_blank">{{ $t('component.footer.home') }}</a></li>
        <li><a href="https://twitter.com/nuwashequ" target="_blank">{{ $t('component.footer.twitter') }}</a></li>
        <li><a href="https://t.me/nuwashequ" target="_blank">{{ $t('component.footer.telegram') }}</a></li>
        <li><a href="https://bscscan.com/token/0xad76Db17f7b3f641a930a3Ae7ae984da9452F1f3" target="_blank">NUWA Token</a></li>
      </ul>
      <!--<ul>-->
      <!--  <li>{{ $t('component.footer.support') }}</li>-->
      <!--  <li>{{ $t('component.footer.link') }}</li>-->
      <!--</ul>-->
      <ul>
        <li>{{ $t('component.footer.developers') }}</li>
        <li><a href="https://github.com/nuwaswap/contract" target="_blank">{{ $t('component.footer.documentation') }}</a></li>
      </ul>
    </div>
    <!--友链-->
    <!--<div class="base-footer_link">-->
    <!--  <svg class="icon icon-twitter" aria-hidden="true">-->
    <!--    <use xlink:href="#icon-twitter"></use>-->
    <!--  </svg>-->
    <!--  <svg class="icon icon-telegram" aria-hidden="true">-->
    <!--    <use xlink:href="#icon-telegram"></use>-->
    <!--  </svg>-->
    <!--  <svg class="icon icon-github" aria-hidden="true">-->
    <!--    <use xlink:href="#icon-github"></use>-->
    <!--  </svg>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'BaseFooter'
}
</script>

<style lang="less" scoped>
.base-footer, .keep-px {
  display: flex;
  flex-direction: column;
  padding: 90px 16px 40px 16px;
  background-color: rgb(39,38,44);
  a:hover {
    color: rgb(245,194,42);
    border-bottom: 2px solid rgb(245,194,42);
  }
  //切换
  .base-footer_switch {
    padding: 24px 0;
    display: flex;
    flex-direction: column-reverse;
    border-top: 1px solid rgb(56,50,65);
    border-bottom: 1px solid rgb(56,50,65);
    .base-footer-switch_language {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: rgb(143,146,161);
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
    .base-footer-switch_buy {
      align-self: flex-end;
      align-items: center;
      border: 0px;
      border-radius: 16px;
      box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
      cursor: pointer;
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
      width: 142px;
      height: 32px;
      padding: 0px 16px;
      background-color: rgb(245,194,42);
      color: white;
      margin-bottom: 24px;
    }
  }
  //关于
  .base-footer_about {
    padding-top: 24px;
    ul {
      margin-bottom: 40px;
      li:first-child {
        color: rgb(245,194,42);
        font-weight: 600;
        text-transform: uppercase;
      }
      li {
        color: rgb(246,246,247);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 8px;
      }
    }
  }
  //友链
  .base-footer_link {
    padding: 42px 0;
    border-bottom: 1px solid rgb(56,50,65);
    svg {
      color: rgb(143, 146, 161);
      font-size: 20px;
      margin-right: 24px;
    }
  }
}
@media screen and (min-width: 576px) {
  .base-footer, .keep-px {
    align-items: center;
    padding: 56px 40px 32px;
    //切换
    .base-footer_switch {
      width: 100%;
      max-width: 1200px;
      order: 3;
      padding: 24px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid rgb(56,50,65);
      border-bottom: none;
      .base-footer-switch_language {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: rgb(143,146,161);
        display: flex;
        align-items: center;
        svg {
          margin-right: 10px;
        }
      }
      .base-footer-switch_buy {
        align-items: center;
        border: 0px;
        border-radius: 16px;
        box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
        cursor: pointer;
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
        width: 142px;
        height: 32px;
        padding: 0px 16px;
        background-color: rgb(245,194,42);
        color: white;
        margin-bottom: 0px;
        a:hover {
          color: white;
          border: none;
        }
      }
    }
    //关于
    .base-footer_about {
      width: 100%;
      max-width: 1200px;
      order: 1;
      padding-top: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      ul {
        margin-bottom: 0;
        li:first-child {
          color: rgb(245,194,42);
          font-weight: 600;
          text-transform: uppercase;
        }
        li {
          color: rgb(246,246,247);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          margin-bottom: 8px;
        }
      }
    }
    //友链
    .base-footer_link {
      width: 100%;
      max-width: 1200px;
      order: 2;
    }
  }
}
</style>
