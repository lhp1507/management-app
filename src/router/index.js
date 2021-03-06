import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts/private/private";
import PageNotFound from "@/views/common/page-not-found/page-not-found";
import Login from "@/views/loginGroup/login/login";
import ProductCreate from "@/views/productGroup/product-create/list/list";
import ProductEdit from "@/views/productGroup/product-edit/list/list";
import ProductList from "@/views/productGroup/product-list/list/list";
import UserCreate from "@/views/userGroup/user-create/list/list";
import UserEdit from "@/views/userGroup/user-edit/list/list";
import UserList from "@/views/userGroup/user-list/list/list";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/user",
    component: Layout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "edit/:id",
        name: "editUser",
        component: UserEdit,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "create",
        name: "createUser",
        component: UserCreate,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "",
        name: "listUser",
        component: UserList,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "edit/:id",
        name: "editProduct",
        component: ProductEdit,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "create",
        name: "createProduct",
        component: ProductCreate,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "",
        name: "listProduct",
        component: ProductList,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/404",
    component: PageNotFound,
    name: "PageNotFound",
  },
  // { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  let IsAdmin = sessionStorage.getItem("IsAdmin");
  let currentUser = JSON.parse(sessionStorage.getItem("LoggedUser"));
  let prevPath = sessionStorage.getItem("SSPrevPath");
  // TH chưa chưa đăng nhập và route đó có yêu cầu Auth thì sẽ chuyển sang page login, sau khi đăng nhập thành công thì sẽ chuyển đến path đang query.
  if (requiresAuth && !currentUser) {
    next({
      path: "/login",
      query: { redirect: to.path },
    });
  }
  // TH đã đăng nhập và to.path là login thì dù là user hay admin thì quay lại trang trước. (Không nên hiển thị trang login rồi mới quay về trang trước!)
  else if (to.path === "/login" && currentUser) {
    next(prevPath);
  } else if (to.path === "/" && IsAdmin === "true") {
    next("/user");
  } else if (to.path === "/" && IsAdmin === "false") {
    next("/product");
  } else if (
    to.path === "/" &&
    !currentUser &&
    (IsAdmin === "false" || !IsAdmin)
  ) {
    next("/login");
  }
  // TH không có quyền vào trang có yêu cầu quyền admin
  else if (requiresAdmin && IsAdmin === "false") {
    next("/404");
  }
  // Các TH còn lại
  else {
    next();
  }
});
router.afterEach((to) => {
  // to and from are both route objects.
  let isLoggedIn = sessionStorage.getItem("UserIsLoggedIn");
  if ((to.path !== "/login" || to.path !== "/") && isLoggedIn === "true") {
    sessionStorage.setItem("SSPrevPath", router.currentRoute.path);
  }
});

export default router;
