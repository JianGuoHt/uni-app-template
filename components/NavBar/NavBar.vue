<template>
  <u-navbar leftText="返回" :title="title">
    <view class="u-nav-slot" slot="left">
      <u-icon name="arrow-left" size="19"></u-icon>
      <u-line direction="column" :hairline="false" length="16" margin="0 8px"></u-line>
      <u-icon name="home" size="20"></u-icon>
    </view>
  </u-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.u-nav-slot {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 0.5px;
  border-radius: 100px;
  border-color: #dadbde;
  padding: 3px 7px;
  opacity: 0.8;
}
</style>
