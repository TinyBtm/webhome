<template>
  <div class="partners container">
    <div class="block-title">合作伙伴</div>
    <div class="logo-block">
      <div v-for="item in aLogos" :key="`partner${item.id}`" class="partner-logo">
        <el-image :src="item.uploadUrl" fit="fill" />
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
 * @description Partners.vue
 * @author 13660
 * @CreatedTime 2021/7/15 11:00
 **/
export default {
  name: "Partners",
  props: {},
  components: {},
  data() {
    return {
      aLogos: [],
    };
  },
  computed: {},
  created() {
    this.fGetPartners();
  },
  mounted() {},
  methods: {
    fGetPartners() {
      this.$axios({
        url: "/portal/portalPictureList?type=partner",
        method: "get",
      }).then(({ data }) => {
        this.aLogos = data;
        this.aLogos.forEach((banner) => {
          banner.uploadUrl = imgUrl + banner.uploadUrl;
        });
      });
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.partners {
  padding: 5 * @s_mg_v 0 3 * @s_mg_v;
}

.logo-block {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 2 * @s_mg_v 0 0;
}

.partner-logo {
  width: 240px;
  height: 135px;
  padding: 0.5 * @s_mg_v 0.5 * @s_mg_h;
  border: 1px solid @c_bor_base;
  margin-bottom: 2 * @s_mg_v;

  &:not(:nth-child(5n-4)) {
    margin-left: 2.5 * @s_mg_h;
  }

  ::v-deep {
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
