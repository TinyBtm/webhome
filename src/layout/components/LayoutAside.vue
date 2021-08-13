<template>
  <div class="layout-aside">
    <div class="layout-aside" v-if="inPage === 'case'">
      <aside-label key-type="solution" />
      <aside-hot-case />
    </div>
    <div class="layout-aside" v-if="inPage === 'expert'">
      <aside-label key-type="expert" />
      <aside-hot-read />
      <aside-hot-expert />
    </div>
    <div class="layout-aside" v-if="inPage === 'policy'">
      <aside-label key-type="policy" />
      <aside-hot-case />
      <aside-hot-expert />
    </div>
    <div class="layout-aside" v-if="inPage === 'case_detail'">
      <!--      <aside-label key-type="solution" />-->
      <aside-hot-case />
      <aside-hot-expert />
    </div>
    <div class="layout-aside" v-if="inPage === 'expert_detail'">
      <aside-expert-profile key-type="expert" />
      <aside-label />
      <aside-hot-case />
    </div>
    <div class="layout-aside" v-if="inPage === 'policy_detail'">
      <!--      <aside-label key-type="policy" />-->
      <aside-hot-case />
      <aside-hot-expert />
    </div>
    <div class="layout-aside" v-if="inPage === 'article'">
      <!--      <aside-label key-type="expert" />-->
      <aside-hot-case />
      <aside-hot-expert />
    </div>
  </div>
</template>

<script>
import AsideLabel from "@/layout/components/aside/AsideLabel";
import AsideHotCase from "@/layout/components/aside/AsideHotCase";
import AsideHotRead from "@/layout/components/aside/AsideHotRead";
import AsideHotExpert from "@/layout/components/aside/AsideHotExpert";
import AsideExpertProfile from "@/layout/components/aside/AsideExpertProfile";

/**
 * @description LayoutAside.vue
 * @author handle、
 * @CreatedTime 2021/7/12 15:04
 **/
export default {
  name: "LayoutAside",
  props: {
    // 当前所在页面
    inPage: { type: String, default: "" },
  },
  components: { AsideLabel, AsideHotCase, AsideHotRead, AsideHotExpert, AsideExpertProfile },
  data() {
    return {};
  },
  computed: {
    routPathName: {
      get() {
        return this.$store.state.common.routPathName;
      },
      set(val) {
        this.$store.commit("common/updateRoutPathName", val);
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.layout-aside {
}
</style>
<style lang="less">
.layout-aside {
}
</style>
