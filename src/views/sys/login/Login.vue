<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <!-- 纯 CSS 动态炫酷背景：漂浮光斑 + 赛博网格 -->
    <div :class="`${prefixCls}-bg`" aria-hidden="true">
      <span :class="`${prefixCls}-bg__grid`"></span>
      <span :class="[`${prefixCls}-bg__orb`, `${prefixCls}-bg__orb--violet`]"></span>
      <span :class="[`${prefixCls}-bg__orb`, `${prefixCls}-bg__orb--cyan`]"></span>
      <span :class="[`${prefixCls}-bg__orb`, `${prefixCls}-bg__orb--pink`]"></span>
    </div>

    <div class="relative z-10 h-full">
      <div class="flex items-center absolute right-4 top-4">
        <AppLocalePicker
          class="text-white enter-x"
          :show-text="false"
          v-if="!sessionTimeout && showLocale"
        />
      </div>

      <span class="-enter-x xl:hidden">
        <AppLogo :alwaysShowTitle="true" />
      </span>

      <div class="container relative h-full py-2 mx-auto sm:px-10">
        <div class="flex h-full">
          <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
            <AppLogo class="-enter-x" />
            <div class="my-auto">
              <!-- 纯 CSS 绘制装饰：双星环 + 光核 -->
              <div :class="[`${prefixCls}-decor`, '-enter-x', '-mt-16']" aria-hidden="true">
                <i :class="[`${prefixCls}-decor__ring`, `${prefixCls}-decor__ring--outer`]">
                  <b :class="`${prefixCls}-decor__satellite`"></b>
                </i>
                <i :class="[`${prefixCls}-decor__ring`, `${prefixCls}-decor__ring--inner`]">
                  <b
                    :class="[`${prefixCls}-decor__satellite`, `${prefixCls}-decor__satellite--2`]"
                  ></b>
                </i>
                <i :class="`${prefixCls}-decor__core`"></i>
              </div>
              <div class="mt-8 font-medium text-white -enter-x">
                <span class="inline-block mt-4 text-3xl"> {{ t('sys.login.signInTitle') }}</span>
              </div>
              <div class="mt-4 font-normal text-white -enter-x">
                {{ t('sys.login.signInDesc') }}
              </div>
            </div>
          </div>
          <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
            <div
              :class="`${prefixCls}-form`"
              class="relative w-full mx-auto my-auto xl:ml-16 sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
            >
              <LoginForm />
              <ForgetPasswordForm />
              <RegisterForm />
              <MobileForm />
              <QrCodeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AppLogo, AppLocalePicker } from '/@/components/Application';
  import LoginForm from './LoginForm.vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';
  import RegisterForm from './RegisterForm.vue';
  import MobileForm from './MobileForm.vue';
  import QrCodeForm from './QrCodeForm.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('login');
  const { t } = useI18n();
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';

  // 暗色主题下登录卡片内输入控件的配色
  html[data-theme='dark'] {
    .@{prefix-cls} {
      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      input.fix-auto-fill,
      .fix-auto-fill input {
        -webkit-text-fill-color: #c9d1d9 !important;
        box-shadow: inherit !important;
      }
    }
  }

  .@{prefix-cls} {
    position: relative;
    min-height: 100%;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.88);
    background-color: #070a1d;
    background-image: radial-gradient(55% 45% at 16% 8%, rgba(109, 40, 217, 0.45), transparent 70%),
      radial-gradient(45% 40% at 88% 92%, rgba(8, 145, 178, 0.32), transparent 72%),
      linear-gradient(135deg, #060a1f 0%, #0c1338 48%, #190f33 100%);

    /* ===== 纯 CSS 动态背景层：漂浮光斑 + 渐隐网格 ===== */
    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;

      &__grid {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(124, 144, 255, 0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124, 144, 255, 0.07) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse 90% 80% at 35% 35%, #000 20%, transparent 75%);
        mask-image: radial-gradient(ellipse 90% 80% at 35% 35%, #000 20%, transparent 75%);
      }

      &__orb {
        position: absolute;
        border-radius: 50%;
        opacity: 0.55;
        filter: blur(90px);
        will-change: transform;

        &--violet {
          top: -18vw;
          left: -14vw;
          width: 46vw;
          height: 46vw;
          background: radial-gradient(circle at 35% 35%, #7c3aed 0%, rgba(124, 58, 237, 0) 68%);
          animation: vben-login-drift-a 18s ease-in-out infinite alternate;
        }

        &--cyan {
          right: -12vw;
          bottom: -16vw;
          width: 42vw;
          height: 42vw;
          background: radial-gradient(circle at 60% 60%, #06b6d4 0%, rgba(6, 182, 212, 0) 68%);
          animation: vben-login-drift-b 22s ease-in-out infinite alternate;
        }

        &--pink {
          top: 14%;
          left: 42%;
          width: 34vw;
          height: 34vw;
          opacity: 0.38;
          background: radial-gradient(circle at 50% 50%, #ec4899 0%, rgba(236, 72, 153, 0) 66%);
          animation: vben-login-drift-c 16s ease-in-out infinite alternate;
        }
      }

      @media (max-width: 767px) {
        &__orb {
          filter: blur(64px);
          opacity: 0.45;
        }
      }
    }

    /* ===== 玻璃拟态登录卡片 ===== */
    &-form {
      position: relative;
      padding: 30px 34px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      background: rgba(15, 23, 58, 0.55);
      box-shadow: 0 18px 60px rgba(2, 6, 23, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
      backdrop-filter: blur(18px) saturate(150%);

      h2 {
        color: #f1f5f9;
      }

      .ant-checkbox-wrapper {
        color: rgba(255, 255, 255, 0.82);
      }

      .ant-btn-link {
        color: #93c5fd;
      }

      .ant-divider {
        border-top-color: rgba(255, 255, 255, 0.15);
      }
    }

    /* ===== 左侧 CSS 装饰：双星环 + 光核 ===== */
    &-decor {
      position: relative;
      width: 30vw;
      max-width: 420px;
      aspect-ratio: 1;

      &__ring {
        --decor-size: 100%;
        --decor-thick: 13px;

        position: absolute;
        top: calc((100% - var(--decor-size)) / 2);
        left: calc((100% - var(--decor-size)) / 2);
        width: var(--decor-size);
        height: var(--decor-size);
        border-radius: 50%;
        -webkit-mask: radial-gradient(
          farthest-side,
          transparent calc(100% - var(--decor-thick)),
          #000 calc(100% - var(--decor-thick))
        );
        mask: radial-gradient(
          farthest-side,
          transparent calc(100% - var(--decor-thick)),
          #000 calc(100% - var(--decor-thick))
        );

        &--outer {
          background: conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0) 0deg,
            #22d3ee 45deg,
            #a78bfa 150deg,
            rgba(255, 255, 255, 0) 240deg
          );
          animation: vben-login-spin 28s linear infinite;
          filter: drop-shadow(0 0 7px rgba(129, 140, 248, 0.85));
        }

        &--inner {
          --decor-size: 64%;
          --decor-thick: 9px;

          background: conic-gradient(
            from 180deg,
            rgba(255, 255, 255, 0) 0deg,
            #f472b6 60deg,
            #fbbf24 170deg,
            rgba(255, 255, 255, 0) 260deg
          );
          animation: vben-login-spin 22s linear infinite reverse;
          filter: drop-shadow(0 0 6px rgba(244, 114, 182, 0.8));
        }
      }

      &__satellite {
        position: absolute;
        top: calc(var(--decor-thick) / 2);
        left: 50%;
        width: 10px;
        height: 10px;
        margin: -5px 0 0 -5px;
        border-radius: 50%;
        background: #e0f2fe;
        box-shadow: 0 0 10px 2px rgba(103, 232, 249, 0.9);
        animation: vben-login-twinkle 2.6s ease-in-out infinite;

        &--2 {
          background: #fce7f3;
          box-shadow: 0 0 10px 2px rgba(251, 207, 232, 0.9);
          animation-delay: 1.3s;
        }
      }

      &__core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 17%;
        height: 17%;
        border-radius: 50%;
        background: radial-gradient(
          circle at 35% 30%,
          #fff 0%,
          #c7d2fe 35%,
          #818cf8 70%,
          #6d28d9 100%
        );
        box-shadow: 0 0 46px 8px rgba(129, 140, 248, 0.7);
        animation: vben-login-pulse 3.2s ease-in-out infinite;
      }
    }

    /* ===== 页面内 Logo（32px / 48px 两种尺寸） ===== */
    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      .logo-icon {
        width: 32px;
        height: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
        }
      }
    }

    /* ===== 其它登录方式图标 ===== */
    &-sign-in-way {
      .anticon {
        color: rgba(255, 255, 255, 0.62);
        font-size: 22px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #7dd3fc;
        }
      }
    }

    .ant-divider-inner-text {
      color: rgba(255, 255, 255, 0.55);
      font-size: 12px;
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }
  }

  /* ===== 背景动画关键帧 ===== */
  @keyframes vben-login-drift-a {
    to {
      transform: translate3d(9vw, 7vh, 0) scale(1.12);
    }
  }

  @keyframes vben-login-drift-b {
    to {
      transform: translate3d(-8vw, -6vh, 0) scale(1.18);
    }
  }

  @keyframes vben-login-drift-c {
    to {
      transform: translate3d(5vw, -9vh, 0) scale(1.1);
    }
  }

  @keyframes vben-login-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes vben-login-pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(0.94);
      opacity: 0.92;
    }

    50% {
      transform: translate(-50%, -50%) scale(1.08);
      opacity: 1;
    }
  }

  @keyframes vben-login-twinkle {
    0%,
    100% {
      transform: scale(0.6);
      opacity: 0.35;
    }

    50% {
      transform: scale(1.15);
      opacity: 1;
    }
  }
</style>
