import Main from "@/layout/LayoutMain";

export default [
  {
    path: "/",
    name: "home",
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: "/home",
        name: "homepage",
        meta: {
          hideInMenu: false,
          title: "首页",
          notCache: true,
        },
        component: () => import("@/views/pages/index/home"),
      },
      {
        path: "/case",
        name: "case",
        meta: {
          hideInMenu: false,
          title: "方案库",
          notCache: true,
        },
        component: () => import("@/views/pages/case/CaseList"),
      },
      {
        path: "/case/electricity",
        name: "case_electricity",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseElectricity"),
      },
      {
        path: "/case/iron",
        name: "case_iron",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseIron"),
      },
      {
        path: "/case/chemistry",
        name: "case_chemistry",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseChemistry"),
      },
      {
        path: "/case/fuel",
        name: "case_fuel",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseFuel"),
      },
      {
        path: "/case/material",
        name: "case_material",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseMaterial"),
      },
      {
        path: "/case/paper",
        name: "case_paper",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CasePaper"),
      },
      {
        path: "/case/space",
        name: "case_space",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseSpace"),
      },
      {
        path: "/case/color",
        name: "case_color",
        meta: {
          hideInMenu: true,
          title: "方案库",
        },
        component: () => import("@/views/pages/case/components/CaseColor"),
      },
      {
        path: "/case/case_detail/:id",
        name: "case_detail",
        meta: {
          hideInMenu: true,
          title: "方案详情",
          notCache: true,
        },
        component: () => import("@/views/pages/case/components/CaseDetail"),
      },
      {
        path: "/expert",
        name: "expert",
        meta: {
          hideInMenu: false,
          title: "专家库",
          notCache: true,
        },
        component: () => import("@/views/pages/expert/list"),
      },
      {
        path: "/expert_detail/:id",
        name: "expert_detail",
        meta: {
          hideInMenu: true,
          title: "专家详情",
          notCache: true,
        },
        component: () => import("@/views/pages/expert/components/ExpertDetail"),
      },
      {
        path: "/expert_detail/article/:id",
        name: "article",
        meta: {
          hideInMenu: true,
          title: "文章详情",
          notCache: true,
        },
        component: () => import("@/views/pages/expert/components/ArticleDetail"),
      },
      {
        path: "/policy",
        name: "policy",
        meta: {
          hideInMenu: false,
          title: "政策法规",
          notCache: true,
        },
        component: () => import("@/views/pages/policy/list"),
      },
      {
        path: "/policy_detail/:id",
        name: "policy_detail",
        meta: {
          hideInMenu: true,
          title: "政策法规详情",
          notCache: true,
        },
        component: () => import("@/views/pages/policy/components/PolicyDetail"),
      },
      {
        path: "/contact",
        name: "contact",
        meta: {
          hideInMenu: false,
          title: "联系我们",
          notCache: true,
        },
        component: () => import("@/views/pages/contact/contact"),
      },
      {
        path: "/search",
        name: "search",
        meta: {
          hideInMenu: true,
          title: "搜索结果",
          notCache: true,
        },
        component: () => import("@/views/pages/search/SearchResult"),
      },
    ],
  },
  {
    path: "*",
    name: "error404",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "*",
    name: "error401",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@/views/error/401.vue"),
  },
];
