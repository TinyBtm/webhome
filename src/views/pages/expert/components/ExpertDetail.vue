<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <div class="container-left flex-col">
          <div class="list-plate">
            <el-table :data="aExpertCase" :show-header="false">
              <el-table-column prop="label">
                <template slot-scope="{ row }">
                  <list-plate
                    :title="row.articleTitle"
                    :content="row.articleDescription"
                    :date="row.articleDatetime"
                    :tags="row.articleKeywordList"
                    :href="`article/${row.id}`"
                  />
                </template>
              </el-table-column>
              <template slot="empty">
                <el-image :src="require('@/assets/images/views/search/empty.png')"></el-image>
                <div class="empty-text">暂无结果</div>
              </template>
            </el-table>
            <el-pagination
              :current-page="nCurrentPage"
              :page-size="nPageSize"
              :total="nTotalCount"
              :hide-on-single-page="true"
              prev-text="上一页"
              next-text="下一页"
              background
              layout="slot, total, prev, pager, next"
              @size-change="fHandleSizeChange"
              @current-change="fHandleCurrentChange"
            />
          </div>
        </div>
        <div class="container-right">
          <layout-aside in-page="expert_detail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutAside from "@/layout/components/LayoutAside";
import ListPlate from "@/components/list/list-plate";
import store from "@/store";
// const { SITE_CONFIG } = require("/config/config.dev.js");

/**
 * @desc ExpertDetail.vue
 * @author caoyu
 * @CreatedTime 2021/7/16 10:25 上午
 **/
export default {
  name: "ExpertDetail",
  props: {},
  components: { ListPlate, LayoutAside },
  data() {
    return {
      sExpertId: "",
      aExpertCase: [],
      nCurrentPage: 1,
      nPageSize: 8, //每页限制条数
      nTotalCount: 0, //数据总数
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
    searchKey: {
      get() {
        return this.$store.state.common.searchKey;
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    store.commit("common/updateSearchKey", "");
    next();
  },
  created() {
    this.sExpertId = this.$route.params.id;
    this.fGetList();
  },
  mounted() {},
  methods: {
    fHandleSizeChange(val) {
      this.nPageSize = val;
      this.fGetList();
    },
    fHandleCurrentChange(val) {
      this.nCurrentPage = val;
      this.fGetList();
    },
    fGetList() {
      this.$axios({
        url: "/portal/articlePage",
        method: "get",
        params: {
          page: this.nCurrentPage - 1,
          size: this.nPageSize,
          articleType: "expert",
          expertId: this.sExpertId,
          condition: this.searchKey,
        },
      })
        .then(({ data }) => {
          this.aExpertCase = data.content;
          this.nTotalCount = data.totalElements;
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
      window.open(oRoute.href, "_blank");
      // this.$store.commit("common/updateRoutPathName", "article");
    },
  },
  filters: {},
  watch: {
    searchKey: {
      handler(sKey) {
        if (sKey) this.fGetList();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep {
}
</style>
<style lang="less"></style>
