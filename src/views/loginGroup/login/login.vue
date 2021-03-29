<template>
  <div>
    <div class="container">
      <div class="form-outer">
        <div class="form-inner">
          <img src="@/assets/logo.png" alt="Logo Vue" />
          <form class="login-form" @submit.prevent="handleLogin">
            <!-- Username -->
            <div class="form-group">
              <label
                class="d-block text-success font-weight-bold text-left"
                for="username"
                >Tên đăng nhập</label
              >
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                autocomplete="off"
                v-model="$v.username.$model"
                class="form-control"
                :class="{
                  'is-invalid': $v.username.$error,
                }"
              />
              <div
                v-if="!$v.username.required"
                class="invalid-feedback text-left"
              >
                Vui lòng nhập tên đăng nhập.
              </div>
            </div>
            <!-- Password -->
            <div class="form-group">
              <label
                class="d-block text-success font-weight-bold text-left"
                for="password"
                >Mật khẩu</label
              >
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                autocomplete="off"
                v-model="$v.password.$model"
                class="form-control"
                :class="{
                  'is-invalid': $v.password.$error,
                }"
              />
              <div
                v-if="!$v.password.required"
                class="invalid-feedback text-left"
              >
                Vui lòng nhập mật khẩu.
              </div>
            </div>
            <!-- Button -->
            <div class="form-group">
              <button type="submit" class="btn btn-success d-block w-100">
                Đăng nhập
              </button>
              <b-alert v-if="error == 1" show variant="danger" class="mt-3"
                >Tài khoản hoặc mật khẩu không đúng.</b-alert
              >
              <b-alert v-if="error == 2" show variant="danger" class="mt-3">
                Nhân viên này đã nghỉ việc.
              </b-alert>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
