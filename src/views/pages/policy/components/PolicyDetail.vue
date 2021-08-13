<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <el-skeleton class="container-left flex-col" animated v-if="bLoading">
          <template slot="template">
            <div class="detail-block">
              <div class="flex-row _mt">
                <div class="aside-title _big">
                  <el-skeleton-item class="aside-title-in" variant="text" />
                </div>
              </div>
              <div class="flex-row _mt">
                <div class="flex-col _flex0 _ml">
                  <el-skeleton-item class="aside-title-in" variant="text" />
                </div>
                <div class="flex-col _flex0 _ml">
                  <div class="flex-row">
                    <el-skeleton-item class="aside-title-in" variant="text" />
                  </div>
                </div>
                <div class="flex-col _flex0 _ml">
                  <el-skeleton-item class="aside-title-in" variant="text" />
                </div>
              </div>
              <div class="flex-row _mt aside-content">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </div>
              <div class="flex-row _mt">
                <div class="flex-col _ml _centerhor">
                  <div class="flex-row _centerver">
                    <el-skeleton-item class="aside-title-in" variant="text" />
                    <el-skeleton-item class="aside-title-in" variant="text" />
                    <el-skeleton-item class="aside-title-in" variant="text" />
                  </div>
                </div>
                <div class="flex-col _flex0 _ml _centerver response-person">
                  <el-skeleton-item class="aside-title-in" variant="text" />
                </div>
              </div>
              <div class="flex-row _mt about-article">
                <div class="aside-title">相关文章</div>
              </div>
              <div class="flex-row _mt">
                <el-table :data="aAboutArticle" :show-header="false" empty-text="正在为您查询相关文章"></el-table>
              </div>
            </div>
          </template>
        </el-skeleton>
        <div class="container-left flex-col" v-else>
          <div class="detail-block">
            <div class="flex-row _mt">
              <div class="aside-title _big">
                <el-tooltip
                  :content="oArticle.articleTitle"
                  :disabled="oArticle.articleTitle ? oArticle.articleTitle.length < 37 : true"
                  placement="top"
                >
                  <div class="aside-title-in">{{ oArticle.articleTitle }}</div>
                </el-tooltip>
              </div>
            </div>
            <div class="flex-row _mt">
              <div class="flex-col _flex0 _ml">{{ oArticle.articleDatetime | fRtnDate }}</div>
              <div class="flex-col _flex0 _ml">
                <div class="flex-row">
                  来源：
                  <el-link :href="oArticle.articleUrl" target="_blank">{{ oArticle.articleSource }}</el-link>
                </div>
              </div>
              <div class="flex-col _flex0 _ml">查看：{{ oArticle.articleHit }}次</div>
            </div>
            <div class="flex-row _mt aside-content" v-html="oArticle.articleDetails"></div>
            <div class="flex-row _mt">
              <div class="flex-col _ml _centerhor">
                <div class="flex-row">
                  <div class="blue-label">标签</div>
                  <div class="article-tags">
                    <el-tooltip
                      v-for="(tag, i) in oArticle.articleKeywordList"
                      :key="`label_item_case_detail_${i}`"
                      :content="tag"
                      :disabled="tag.length <= 4"
                      placement="top"
                    >
                      <el-link :href="`/search?keyword=${encodeURIComponent(tag)}`" :underline="false" target="_blank">
                        <div class="aside-label-item _mini">
                          {{ tag }}
                        </div>
                      </el-link>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="flex-col _flex0 _ml _centerver response-person">责任编辑：{{ oArticle.articleAuthor }}</div>
            </div>
            <div class="flex-row _mt about-article">
              <div class="aside-title">相关文章</div>
            </div>
            <div class="flex-row _mt">
              <comp-article :about-article="aAboutArticle" />
            </div>
          </div>
        </div>
        <div class="container-right">
          <layout-aside in-page="policy_detail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutAside from "@/layout/components/LayoutAside";
import CompArticle from "@/components/detail/CompArticle";
import moment from "moment";

/**
 * @desc PolicyDetail.vue
 * @author caoyu
 * @CreatedTime 2021/7/16 9:38 上午
 **/
export default {
  name: "PolicyDetail",
  props: {},
  components: { LayoutAside, CompArticle },
  data() {
    return {
      sId: "",
      oArticle: {},
      aAboutArticle: [],
      bLoading: false,
    };
  },
  computed: {},
  created() {
    this.sId = this.$route.params.id;
    this.fGetDetail();
  },
  mounted() {},
  methods: {
    fOnTagClick(item) {
      const oRoute = this.$router.resolve({
        name: "search",
        query: {
          keyword: item,
        },
      });
      window.open(oRoute.href, "_blank");
    },
    fOnArticleRowClick(row) {
      console.log(row);
    },
    fGetDetail() {
      this.bLoading = true;
      this.$axios({
        url: `/portal/article/${this.sId}`,
        method: "get",
      })
        .then(({ data }) => {
          this.oArticle = data;
          this.fGetArticles({
            page: 0,
            size: 5,
            articleType: "policy",
            articleKeywordList: data.articleKeywordList.join(","),
            articleId: data.id,
          });
          this.$store.commit("common/updateBreadcrumb", [
            { name: "policy", title: "政策法规" },
            { name: "policy_detail", title: data.articleTitle },
          ]);
        })
        .catch(() => {
          this.bLoading = false;
          this.$store.commit("common/updateBreadcrumb", [{ name: "policy", title: "政策法规" }]);
        });
    },
    //查询相关文章
    fGetArticles(params) {
      this.$axios({
        url: `/portal/articlePage`,
        method: "get",
        params: params,
      })
        .then(({ data }) => {
          this.bLoading = false;
          this.aAboutArticle = data.content;
        })
        .catch(() => {
          this.bLoading = false;
        });
    },
  },
  filters: {
    fRtnDate(date) {
      return moment(date).format("yyyy-MM-DD");
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
::v-deep {
  .aside-content {
    padding: 12px 0 48px;

    .el-skeleton__item {
      margin-bottom: @s_mg_v;

      &:first-child {
        width: 30%;
      }

      &:last-child {
        width: 60%;
      }
    }
  }

  .aside-title-in.el-skeleton__item {
    width: 100px;
  }

  .aside-title-in.el-skeleton__item + .aside-title-in.el-skeleton__item {
    margin-left: @s_mg_h;
  }

  .blue-label {
    flex: none;
    flex-shrink: 0;
  }
}
</style>
<style lang="less"></style>
