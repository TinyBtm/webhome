<template>
  <div class="aside-block">
    <div class="aside-title">热门专家</div>
    <div class="aside-content" v-if="bLoading">
      <el-skeleton class="ske-loading" :rows="6" animated></el-skeleton>
    </div>
    <div class="aside-content" v-else>
      <el-link
        v-for="oExpert in aExpert"
        :href="`/expert_detail/article/${oExpert.id}`"
        :key="`expert_${oExpert.id}`"
        :underline="false"
        target="_blank"
      >
        <div class="aside-hot-view flex-row">
          <div class="hot-view-img _round">
            <el-image :src="oExpert.picture" fit="contain" />
          </div>
          <div class="hot-view-text">
            <el-tooltip :content="oExpert.name" placement="top" :disabled="oExpert.name.length <= 13">
              <div class="hot-view-title">
                {{ oExpert.name }}
              </div>
            </el-tooltip>
            <div class="hot-view-cont">{{ oExpert.introduce }}</div>
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
 * @desc AsideHotExpert.vue
 * @author caoyu
 * @CreatedTime 2021/7/14 9:50 上午
 **/
export default {
  name: "AsideHotExpert",
  props: {},
  components: {},
  data() {
    return {
      aExpert: [],
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
        url: "/portal/expertPage",
        method: "get",
        params: {
          page: 0,
          size: 3,
        },
      })
        .then(({ data }) => {
          this.aExpert = data.content;
          this.aExpert.forEach((oCase) => {
            oCase.picture = oCase.picture
              ? imgUrl + oCase.picture
              : require("@/assets/images/views/list/avartar_default_rect.png");
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
        path: `/expert_detail/${row.id}`,
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
