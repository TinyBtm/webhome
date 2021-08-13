<template>
  <el-container class="wrap-abs">
    <el-scrollbar class="main-scroll">
      <div ref="header" :class="['head-wrap', { _fixed: bHomepage && bFixed }, { _fixed1: !bHomepage && bFixed }]">
        <el-header :height="`${bHomepage ? (bFixed ? 90 : 526) : 90}px`">
          <layout-banner v-show="bHomepage && !bFixed" />
          <div class="container head-cont">
            <layout-subnav @nav-select="fOnNavSelect" />
          </div>
        </el-header>
        <div class="tab-wrap flex-col _centerver" v-if="!bHomepage">
          <div class="container">
            <div class="flex-row _centerhor">
              <div class="flex-col _flex0 _ml">当前位置:</div>
              <div class="flex-col _ml">
                <bread-nav />
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-container class="wrap" :style="{ minHeight: `${nHeight}px` }">
        <el-main>
          <router-view />
          <!--          <layout-content :is-homepage="bHomepage" />-->
        </el-main>
      </el-container>
      <el-footer ref="footer" height="40">Copyright © 无锡汉朵网络科技有限公司</el-footer>
    </el-scrollbar>
    <el-backtop target=".el-scrollbar__wrap"></el-backtop>
  </el-container>
</template>

<script>
import BreadNav from "@/layout/components/BreadNav";
import LayoutSubnav from "@/layout/components/LayoutSubnav";
import LayoutBanner from "@/layout/components/LayoutBanner";

let dScroll;

/**
 * @description LayoutMain.vue
 * @author caoyu
 * @CreatedTime 2021/6/28 13:46
 **/
export default {
  name: "LayoutMain",
  props: {},
  components: { BreadNav, LayoutSubnav, LayoutBanner },
  data() {
    return {
      bHomepage: false,
      bFixed: false,
      nHeight: 0,
    };
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
  mounted() {
    window.addEventListener("resize", this.fWinResize, false);
    this.$nextTick(() => {
      dScroll = document.querySelector(".el-scrollbar__wrap");
      dScroll.addEventListener("scroll", this.fHandleScroll, false);
      this.fWinResize({
        currentTarget: window,
      });
    });
  },
  methods: {
    fWinResize(e) {
      this.$nextTick(() => {
        this.nHeight = e.currentTarget.innerHeight - 88 - 88;
      });
    },
    fHandleScroll(e) {
      this.bFixed = e.target.scrollTop > (this.bHomepage ? 436 : 0);
    },
    fOnNavSelect() {
      dScroll.scrollTop = 0;
      this.fHandleScroll({ target: dScroll });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.fWinResize, false);
    dScroll.removeEventListener("scroll", this.fHandleScroll, false);
  },
  filters: {},
  watch: {
    routPathName: {
      handler(sNew) {
        this.bHomepage = sNew === "homepage";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/views/error/index");

.el-header {
  line-height: 90px;
  padding: 0;
  color: @c_white;
  background-color: @c_title_block;
}

.el-main {
  padding: 0;
  background-color: @c_white;
}

.el-footer {
  text-align: center;
  line-height: 40px;
  color: @c_white;
  background-color: @c_title_block;
}

::v-deep {
  .el-carousel__button {
    width: @s_mg_h;
    height: @s_mg_v;
    border-radius: @s_border_radius_big;
  }
}
</style>
