<template>
  <b-container class="p-0 100 min-vh-100 bg-light" fluid>
    <b-row no-gutters class="h-100">
      <b-col lg="2" class="col-sidebar">
        <b-sidebar
          visible
          no-header
          bg-variant="success"
          class="sidebar h-100 col-lg-2 p-0"
          no-close-on-route-change
        >
          <div class="px-3 py-2">
            <img src="../assets/logo.png" alt="" />
            <div class="sidebar-nav-list">
              <div class="setting">
                <b-button
                  v-b-toggle.collapse-setting
                  variant="link"
                  class="d-block w-100 text-left text-white text-decoration-none p-0"
                >
                  <font-awesome-icon icon="cog" style="color: white" />
                  <span class="pl-lg-3 pr-lg-5">Cài đặt</span>
                  <font-awesome-icon icon="caret-down" style="color: white" />
                </b-button>
                <b-collapse id="collapse-setting">
                  <b-nav vertical>
                    <b-nav-item v-if="isAdmin == 'true'" @click="redirectUser"
                      >Người dùng</b-nav-item
                    >
                    <b-nav-item @click="redirectProduct">Sản phẩm</b-nav-item>
                  </b-nav>
                </b-collapse>
              </div>
              <div class="management">
                <font-awesome-icon icon="calculator" style="color: white" />
                <b-nav vertical class="d-inline-block">
                  <b-nav-item>Quản lý</b-nav-item>
                </b-nav>
              </div>
            </div>
          </div>
        </b-sidebar>
      </b-col>

      <b-col>
        <b-row no-gutters class="sticky-top">
          <b-navbar
            type="light"
            variant="white"
            class="justify-content-end w-100"
          >
            <b-navbar-nav>
              <font-awesome-icon icon="user-circle" class="fa-2x" />

              <b-nav-item-dropdown :text="username" right>
                <b-dropdown-item href="#">Hồ sơ</b-dropdown-item>
                <b-dropdown-item @click="handleLogout">Thoát</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-navbar>
        </b-row>

        <b-row no-gutters class="row-list">
          <div class="row-list-wrapper bg-white">
            <router-view :key="$route.path"></router-view>
          </div>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    username() {
      var loggedUser = JSON.parse(sessionStorage.getItem("LoggedUser"));
      return loggedUser.username;
    },
    isAdmin() {
      var isadmin = sessionStorage.getItem("IsAdmin");
      return isadmin;
    },
  },
  methods: {
    ...mapActions(["logout"]),

    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    redirectUser() {
      let isAdminInsessionStorage = sessionStorage.getItem("IsAdmin");
      if (isAdminInsessionStorage == "true") {
        this.$router.replace({ path: "/user" }).catch(() => {});
      } else {
        this.$router.push({ path: "/404" });
      }
    },
    redirectProduct() {
      this.$router.push({ path: "/product" }).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.col-sidebar {
  .sidebar {
    .b-sidebar {
      width: 16.666667%;
      img {
        width: 60px;
        height: 60px;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
.sidebar-nav-list {
  margin-top: 2rem;
  #collapse-setting {
    .nav-item {
      a {
        margin-left: 20px;
        color: white !important;
      }
    }
  }
  .management {
    .nav-item {
      a {
        color: white !important;
      }
    }
  }
}
.navbar-nav {
  align-items: center;
}

.row-list {
  padding: 2rem;
  .row-list-wrapper {
    width: 100%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
