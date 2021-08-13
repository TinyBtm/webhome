<template>
  <div class="aside-block">
    <el-skeleton class="expert-profile" animated v-if="bLoading">
      <template slot="template">
        <div class="expert-profile-title">专家介绍</div>
        <div class="flex-row _mt">
          <el-skeleton-item variant="image" class="flex-col _flex0 _ml expert-profile-avatar" />
          <div class="flex-col _ml expert-profile-msg">
            <div class="flex-row _flex0 expert-profile-name">
              <el-skeleton-item variant="text" />
            </div>
            <div class="flex-row _flex0 expert-profile-rank">
              <el-skeleton-item variant="text" />
            </div>
            <div class="flex-row _flex0">
              <el-skeleton-item variant="text" />
            </div>
          </div>
        </div>
        <div class="flex-row _mt">
          <div class="flex-col">
            <div class="expert-summary-title">简介</div>
            <div class="expert-summary-cont">
              <el-scrollbar class="main-scroll">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </el-scrollbar>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
    <div class="expert-profile" v-else>
      <div class="expert-profile-title">专家介绍</div>
      <div class="flex-row _mt">
        <div class="flex-col _flex0 _ml expert-profile-avatar">
          <el-image :src="oProfile.picture" fit="cover" />
        </div>
        <div class="flex-col _ml expert-profile-msg">
          <div class="flex-row _flex0 expert-profile-name">{{ oProfile.name }}</div>
          <div class="flex-row _flex0 expert-profile-rank">
            <el-tooltip
              :content="oProfile.technicalTitle"
              :disabled="oProfile.technicalTitle ? oProfile.technicalTitle.length <= 13 : true"
              placement="top"
            >
              <div class="expert-profile-rankin">
                {{ oProfile.technicalTitle }}
              </div>
            </el-tooltip>
          </div>
          <div class="flex-row _flex0">
            <!--            <el-button type="info" icon="el-icon-check" v-if="oProfile.isFollowed">已关注</el-button>
                        <el-button type="primary" icon="el-icon-plus" v-else>关注</el-button>-->
          </div>
        </div>
      </div>
      <div class="flex-row _mt">
        <div class="flex-col">
          <div class="expert-summary-title">简介</div>
          <div class="expert-summary-cont">
            <el-scrollbar class="main-scroll">{{ oProfile.introduce }}</el-scrollbar>
          </div>
        </div>
      </div>
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
 * @desc AsideExpertProfile.vue
 * @author caoyu
 * @CreatedTime 2021/7/16 2:24 下午
 **/
export default {
  name: "AsideExpertProfile",
  props: {},
  components: {},
  data() {
    return {
      sExpertId: "",
      oProfile: {},
      bLoading: false,
    };
  },
  computed: {},
  created() {
    this.sExpertId = this.$route.params.id;
    this.fGetDetail();
  },
  mounted() {},
  methods: {
    fGetDetail() {
      this.bLoading = true;
      this.$axios({
        url: `/portal/expert/${this.sExpertId}`,
        method: "get",
      })
        .then(({ data }) => {
          this.oProfile = data;
          this.oProfile.picture = imgUrl + this.oProfile.picture;
          this.bLoading = false;
          this.$store.commit("common/updateBreadcrumb", [
            { name: "expert", title: "专家库" },
            { name: "expert_detail", title: data.name },
          ]);
        })
        .catch(() => {
          this.bLoading = false;
          this.$store.commit("common/updateBreadcrumb", [{ name: "expert", title: "专家库" }]);
        });
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
@profile_blue: #043187;

.expert-profile {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 469px;
  padding: 10.5 * @s_mg_v 2 * @s_mg_h 2 * @s_mg_v;
  background-color: @c_block;
}

.expert-profile-title {
  position: absolute;
  top: 20px;
  left: 0;
  width: 98px;
  height: 41px;
  text-align: center;
  line-height: 41px;
  font-size: @s_font_large;
  color: @c_white;
  background-color: @profile_blue;

  &::after {
    position: absolute;
    right: -41px;
    bottom: 0;
    content: "";
    border: 41px solid;
    border-color: transparent @profile_blue transparent transparent;
    border-radius: 50%;
    .l_pre(transform, rotateZ(45deg));
  }
}

.expert-profile-avatar {
  height: 148px;
  width: 148px;
  background-color: #bfbfbf;
  border-radius: 50%;
  overflow: hidden;
}

.expert-profile-msg {
  height: 148px;
  justify-content: center;
  //padding-bottom: 2 * @s_mg_v;
}

.expert-profile-name {
  margin-bottom: 1.5 * @s_mg_v;
  font-size: @s_font_large;

  ::v-deep {
    .el-skeleton__item {
      width: 30%;
    }
  }
}

.expert-profile-rank {
  font-size: @s_font_medium;
  color: @c_font;
  margin-bottom: 3 * @s_mg_v;
}

.expert-profile-rankin {
  width: 13em;
  .l_nowrap();
}

.expert-summary-title {
  height: 29px;
  width: 56px;
  text-align: center;
  line-height: 29px;
  font-size: @s_font_medium;
  background-color: @c_white;
  border-radius: 15px 15px 0 0;
}

.expert-summary-cont {
  height: 174px;
  padding: 16px;
  line-height: 1.2;
  background-color: @c_white;
}

::v-deep {
  .main-scroll {
    height: 142px;
  }

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
