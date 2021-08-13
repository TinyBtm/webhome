<template>
  <div class=""></div>
</template>

<script>
/**
 * @desc CaseList.vue
 * @author caoyu
 * @CreatedTime 2021/7/20 9:54 上午
 **/
export default {
  name: "CaseList",
  props: {},
  components: {},
  data() {
    return {
      sCurIndustry: "CaseList",
    };
  },
  computed: {},
  created() {
    this.$store.commit("common/updateBreadcrumb", [{ name: "case", title: "方案库" }]);
    this.$router.push({ name: "case_electricity" });
  },
  mounted() {},
  methods: {},
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
::v-deep {
}
</style>
