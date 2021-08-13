<template>
  <div class="aside-block">
    <div class="aside-title">热门方案</div>
    <div class="aside-content" v-if="bLoading">
      <el-skeleton class="ske-loading" :rows="6" animated></el-skeleton>
    </div>
    <div class="aside-content" v-else>
      <el-link
        v-for="oCase in aCase"
        :href="`/case/case_detail/${oCase.id}`"
        :key="`case_${oCase.id}`"
        :underline="false"
        target="_blank"
      >
        <div class="aside-hot-view flex-row">
          <div class="hot-view-img">
            <el-image :src="oCase.articleImg" fit="cover" />
          </div>
          <div class="hot-view-text">
            <el-tooltip :content="oCase.articleTitle" placement="top" :disabled="oCase.articleTitle.length <= 13">
              <div class="hot-view-title">
                {{ oCase.articleTitle }}
              </div>
            </el-tooltip>
            <div class="hot-view-cont">{{ oCase.articleDescription }}</div>
          </div>
        </div>
      </el-link>
    </div>
  </div>
</template>

<script>
let imgUrl;
if (process.env.NODE_ENV === "development") {
  const { SITE_CONFIG } = require("/public/config/config.dev.js");
  imgUrl = SITE_CONFIG.imgUrl;
} else {
  imgUrl = window.SITE_OPTION.imgUrl;
}
/**
 * @desc AsideHotCase.vue
 * @author caoyu
 * @CreatedTime 2021/7/14 9:48 上午
 **/
export default {
  name: "AsideHotCase",
  props: {},
  components: {},
  data() {
    return {
      aCase: [],
      bLoading: false,
    };
  },
  computed: {
    breadcrumb: {
      get() {
        return this.$store.state.common.breadcrumb;
      },
      set(val) {
        this.$store.commit("common/updateBreadcrumb", val);
      },
    },
  },
  created() {
    this.fGetList();
  },
  mounted() {},
  methods: {
    fGetList() {
      this.bLoading = true;
      this.$axios({
        url: "/portal/articlePage",
        method: "get",
        params: {
          page: 0,
          size: 3,
          articleType: "solution",
        },
      })
        .then(({ data }) => {
          this.bLoading = false;
          this.aCase = data.content;
          this.aCase.forEach((oCase) => {
            oCase.articleImg = oCase.articleImg
              ? imgUrl + oCase.articleImg
              : require("@/assets/images/views/list/case_default.png");
          });
        })
        .catch(() => {
          this.bLoading = false;
        });
    },
    //跳转详情页面
    fGoToDetail(row) {
      const oRoute = this.$router.resolve({
        path: `/case_detail/${row.id}`,
      });
      window.open(oRoute.href, "_blank");
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.el-link.el-link--default {
  color: unset;
  cursor: default;
}

::v-deep {
}
</style>
