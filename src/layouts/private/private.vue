<template>
  <b-container class="p-0 100 min-vh-100 bg-light" fluid>
    <b-row no-gutters class="h-100">
      <b-col sm="2" class="col-left">
        <b-sidebar
          visible
          no-header
          bg-variant="success"
          class="sidebar h-100 col-sm-2 p-0"
          no-close-on-route-change
        >
          <div class="px-3 py-2">
            <img src="@/assets/logo.png" alt="Logo Vue" />
            <div class="sidebar-nav-list">
              <div class="setting">
                <b-button
                  v-b-toggle.collapse-setting
                  variant="link"
                  class="d-block w-100 text-left text-white text-decoration-none p-0"
                >
                  <font-awesome-icon icon="cog" style="color: white" />
                  <span class="pl-sm-1 pr-sm-1 pl-md-2 pr-md-4">Cài đặt</span>
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
              <div class="management d-flex align-items-center">
                <font-awesome-icon icon="calculator" style="color: white" />
                <b-nav>
                  <b-nav-item class="pl-sm-1 pl-md-2">Quản lý</b-nav-item>
                </b-nav>
              </div>
            </div>
          </div>
        </b-sidebar>
      </b-col>
      <b-col sm="10" class="col-right">
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
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
