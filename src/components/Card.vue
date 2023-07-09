<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.card {border: 1px solid #EEE;padding: 0;border-radius: 5px;
  display: flex;flex-direction: column;height: 100%;

  .card-header {background: #FAFAFA;padding: 0 5px;}

  .card-content {padding: 0 5px;overflow: auto;flex-grow: 1;}

  .card-footer {background: #FAFAFA;padding: 2.5px 5px;}
}
</style>