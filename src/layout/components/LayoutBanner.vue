<template>
  <el-carousel height="526px" arrow="never" trigger="click" :interval="6000" :autoplay="bAuto">
    <el-carousel-item class="banner-item" v-for="item in aBannerList" :key="item.id">
      <el-image class="banner-item-img" :src="item.uploadUrl" fit="cover" @click.native="fJump(item.link)">
        <div slot="error" class="image-slot" />
      </el-image>
      <div class="banner-cont">
        <div class="banner-title">
          <el-link type="snow" :href="item.link" :underline="false">{{ item.title }}</el-link>
        </div>
        <div class="banner-title _sub">
          <el-link type="snow" :href="item.link" :underline="false">{{ item.subtitle }}</el-link>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
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
 * @desc LayoutBanner.vue
 * @author caoyu
 * @CreatedTime 2021/7/13 11:26 上午
 **/
export default {
  name: "LayoutBanner",
  props: {},
  components: {},
  data() {
    return {
      aBannerList: [],
      bAuto: true,
    };
  },
  computed: {},
  created() {
    this.fGetBannerList();
  },
  mounted() {},
  methods: {
    fJump(url) {
      window.open(url, "_blank");
    },
    fGetBannerList() {
      this.$axios({
        url: "/portal/portalPictureList?type=carousel",
        method: "get",
      })
        .then(({ data }) => {
          this.aBannerList = data;
          this.aBannerList.forEach((banner) => {
            banner.uploadUrl = imgUrl + banner.uploadUrl;
          });
          this.bAuto = true;
        })
        .catch(() => {
          this.bAuto = false;
        });
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.layout-banner {
}

.banner-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-cont {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  width: fit-content;
  margin: 0 auto;
  .l_pre(transform, translate(0, -50%));
}

.banner-item-img {
  //position: absolute;
  //width: 100%;
  //left: 50%;
  //top: 50%;
  //.l_pre(transform, translate(-50%, -50%));
  //object-fit: cover;
  width: 100%;
  height: 100%;
}

.banner-title {
  width: fit-content;
  margin: 0 auto;
  font-size: 44px;
  line-height: 1;
  color: @c_white;
  cursor: pointer;

  a {
    font-size: 44px;
  }

  &._sub {
    padding-top: 36px;
    font-size: @s_font_larger;
    a {
      font-size: @s_font_larger;
    }
  }

  &:hover {
    opacity: @e_active_opacity;
  }
}

::v-deep {
  .image-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less">
.layout-banner {
}
</style>
