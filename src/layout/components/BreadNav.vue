<template>
  <el-breadcrumb class="bread-nav" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(oNav, i) in breadcrumb"
      :key="`${i < breadcrumb.length - 1 ? oNav.name : ''}`"
      :to="oNav"
      @click.stop="fOnNavClick(i)"
      >{{ oNav.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
/**
 * @description BreadNav.vue
 * @author handle、
 * @CreatedTime 2021/7/12 16:37
 **/
export default {
  name: "BreadNav",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    breadcrumb: {
      get() {
        return this.$store.state.common.breadcrumb;
      },
      set(val) {
        return this.$store.commit("common/updateBreadcrumb", val);
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    fOnNavClick(i) {
      this.breadcrumb = this.breadcrumb.slice(0, i);
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.bread-nav {
}

::v-deep {
  .el-breadcrumb__separator {
    color: @c_font;
  }
}
</style>
<style lang="less">
.bread-nav {
}
</style>
