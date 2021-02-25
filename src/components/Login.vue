<template>
  <div>
    <div class="container">
      <div class="form-outer">
        <div class="form-inner">
          <img src="../assets/logo.png" alt="Logo Vue" />

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

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      error: 0,
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },

  computed: {
    ...mapState(["users"]),
    ListOfRetiredEmployees() {
      return this.users.filter((rUser) => rUser.status === 0);
    },
  },

  methods: {
    ...mapActions(["login"]),

    handleLogin() {
      var username = this.username;
      var password = this.password;

      var RetiredEmployee = this.ListOfRetiredEmployees.findIndex(
        (u) => u.username == username && u.password == password
      );

      if (!username && !password) {
        this.error = 1;
      } else if (RetiredEmployee == -1) {
        this.error = 0;
      } else this.error = 2;

      if (!this.$v.$invalid && this.error === 0) {
        this.login({ username, password })
          .then(() => {
            let isAdmin = sessionStorage.getItem("IsAdmin");

            if (this.$route.query.redirect != null) {
              this.$router.push(this.$route.query.redirect);
            } else {
              if (isAdmin == "true") {
                this.$router.push("/user");
              } else {
                this.$router.push("/product");
              }
            }
          })
          .catch(() => {
            this.error = 1;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100%;
  width: 100%;
  .form-outer {
    width: 400px;
    max-width: 100%;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
    margin-top: 3rem;
    .form-inner {
      width: 80%;
      margin: 0 auto;
      padding: 1rem 0;
      img {
        display: block;
        margin: 0 auto;
      }
      .login-form {
        padding-top: 1rem;
      }
    }
  }
}
</style>
