<template>
  <div class="content-block">
    <footer class="footer">
      <!--Copyright © {{new Date().getFullYear()}} -->
      {{ this.$appInfo.title }}
    </footer>
  </div>
</template>

<style lang="scss">
@import '../themes/generated/variables.base.scss';

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>
