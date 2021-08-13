<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <div class="container-left flex-col">
          <div class="list-plate">
            <el-table :data="aList" :show-header="false" v-loading="bLoading">
              <el-table-column prop="label">
                <template slot-scope="{ row }">
                  <list-plate
                    :title="row.articleTitle"
                    :content="row.articleDescription"
                    :date="row.articleDatetime"
                    :tags="row.articleKeywordList"
                    :href="`/policy_detail/${row.id}`"
                  ></list-plate>
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
          <layout-aside in-page="policy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutAside from "@/layout/components/LayoutAside";
import ListPlate from "@/components/list/list-plate";
import store from "@/store";

/**
 * @description list.vue
 * @author handle、
 * @CreatedTime 2021/7/12 16:08
 **/
export default {
  name: "list",
  props: {},
  components: { ListPlate, LayoutAside },
  data() {
    return {
      aList: [],
      nCurrentPage: 1,
      nPageSize: 8, //每页限制条数
      nTotalCount: 0, //数据总数
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
    this.fGetList();
    this.$store.commit("common/updateBreadcrumb", [{ name: "policy", title: "政策法规" }]);
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
    //跳转详情页面
    fGoToDetail(row) {
      const oRoute = this.$router.resolve({
        path: `/policy_detail/${row.id}`,
      });
      window.open(oRoute.href, "_blank");
    },
    fGetList() {
      this.bLoading = true;
      this.$axios({
        url: "/portal/articlePage",
        method: "get",
        params: {
          page: this.nCurrentPage - 1,
          size: this.nPageSize,
          articleType: "policy",
          condition: this.searchKey,
        },
      })
        .then(({ data }) => {
          this.aList = data.content;
          this.nTotalCount = data.totalElements;
          this.bLoading = false;
        })
        .catch(() => {
          this.bLoading = false;
        });
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
.list {
}
</style>
<style lang="less">
.list {
}
</style>
