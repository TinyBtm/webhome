<template>
  <div class="aside-block">
    <div class="aside-title">热门解读</div>
    <div class="aside-content" v-if="bLoading">
      <el-skeleton class="ske-loading" :rows="6" animated></el-skeleton>
    </div>
    <div class="aside-content" v-else>
      <el-link
        v-for="oPolicy in aPolicy"
        :key="`case_${oPolicy.id}`"
        :href="`/expert_detail/article/${oPolicy.id}`"
        :underline="false"
        target="_blank"
      >
        <div class="aside-hot-view flex-row">
          <div class="hot-view-img">
            <el-image :src="oPolicy.articleImg" fit="cover" :preview-src-list="[oPolicy.articleImg]" />
          </div>
          <div class="hot-view-text">
            <el-tooltip :content="oPolicy.articleTitle" placement="top" :disabled="oPolicy.articleTitle.length <= 13">
              <div class="hot-view-title">
                {{ oPolicy.articleTitle }}
              </div>
            </el-tooltip>
            <div class="hot-view-cont">{{ oPolicy.articleDescription }}</div>
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
 * @desc AsideHotRead.vue
 * @author caoyu
 * @CreatedTime 2021/7/14 9:48 上午
 **/
export default {
  name: "AsideHotRead",
  props: {},
  components: {},
  data() {
    return {
      aPolicy: [],
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
          articleType: "expert",
        },
      })
        .then(({ data }) => {
          this.aPolicy = data.content;
          this.aPolicy.forEach((oPolicy) => {
            oPolicy.articleImg = imgUrl + oPolicy.articleImg;
          });
          this.bLoading = false;
        })
        .catch(() => {
          this.bLoading = false;
        });
    },
    //跳转详情页面
    fGoToDetail(row) {
      const oRoute = this.$router.resolve({
        path: `/article/${row.id}`,
      });
      // this.$store.commit("common/updateRoutPathName", "expert");
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
