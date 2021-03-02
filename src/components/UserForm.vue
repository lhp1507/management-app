<template>
  <div class="form-container">
    <!-- Component -->
    <b-form @submit="onSubmit" v-if="show">
      <div class="wrap-input-username">
        <!-- username -->
        <v-form-input
          :id="'username'"
          :label="'Tên đăng nhập'"
          :labelFor="'username'"
          class="text-success font-weight-bold v-form-input"
        >
          <template slot="username">
            <b-form-input
              id="username"
              v-model="form.username"
              placeholder="Nhập tên đăng nhập"
              autocomplete="off"
              :disabled="isEdit == 'true'"
            ></b-form-input>
            <p
              v-if="isExisted && isEdit == 'false'"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Tên đăng nhập này đã được sử dụng.
            </p>

            <p
              v-if="error === 1 && !form.username"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Trường này không được để trống.
            </p>
          </template>
        </v-form-input>
      </div>

      <div class="wrap-input-fullname">
        <!-- firstname -->
        <v-form-input
          :id="'firstname'"
          :label="'Tên nhân viên'"
          :labelFor="'firstname'"
          class="text-success font-weight-bold v-form-input"
        >
          <template slot="firstname">
            <b-form-input
              id="firstname"
              v-model="form.fullname.firstname"
              placeholder="Nhập tên"
              autocomplete="off"
            ></b-form-input>

            <p
              v-if="error === 1 && !form.fullname.firstname"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Trường này không được để trống.
            </p>
          </template>
        </v-form-input>

        <!-- lastname -->
        <v-form-input
          :id="'lastname'"
          :label="'Họ nhân viên'"
          :labelFor="'lastname'"
          class="text-success font-weight-bold v-form-input"
        >
          <template slot="lastname">
            <b-form-input
              id="lastname"
              v-model="form.fullname.lastname"
              placeholder="Nhập họ"
              autocomplete="off"
            ></b-form-input>

            <p
              v-if="error === 1 && !form.fullname.lastname"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Trường này không được để trống.
            </p>
          </template>
        </v-form-input>
      </div>

      <div class="wrap-input-checkbox">
        <!-- status -->
        <v-form-input :id="'status'" :labelFor="'status'">
          <template slot="status">
            <b-form-checkbox v-model="form.status" value="1" unchecked-value="0"
              >Trạng thái</b-form-checkbox
            >
          </template>
        </v-form-input>
      </div>

      <!-- Buttons -->
      <div class="wrap-button">
        <v-form-button
          v-if="isEdit == 'false'"
          :variant="'success'"
          :typeBtn="'submit'"
          :onClick="onSubmit"
          class="v-button"
        >
          Tạo
        </v-form-button>
        <v-form-button
          v-else
          :variant="'success'"
          :typeBtn="'submit'"
          :onClick="onSubmit"
          class="v-button"
        >
          Cập nhật
        </v-form-button>
        <v-form-button
          :onClick="onCancel"
          :variant="'success'"
          :typeBtn="'button'"
          class="v-button"
        >
          Hủy
        </v-form-button>
      </div>

      <!-- Component -->
    </b-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import FormInput from "./FormInput.vue";
import FormButton from "./FormButton.vue";

export default {
  components: { "v-form-input": FormInput, "v-form-button": FormButton },
  data() {
    return {
      form: {
        fullname: { firstname: "", lastname: "" },
        username: "",
        status: 0,
      },

      show: true,
      isExisted: false,
      error: 0,
    };
  },

  computed: {
    ...mapState(["editingUserIndex", "users"]),

    getEditingUserByID() {
      if (this.isEdit == "true") {
        return this.users.find(
          (user) => user.id === parseInt(this.$route.params.id)
        );
      } else return {};
    },
  },
  beforeCreate() {
    this.isEdit = sessionStorage.getItem("isEdit");
  },

  created() {
    if (this.isEdit == "true") {
      this.form = Object.assign({}, this.getEditingUserByID);
    }
  },

  watch: {
    getEditingUserByID(newData) {
      if (this.isEdit == "true") {
        this.form = newData;
        sessionStorage.setItem("UserForm", JSON.stringify(this.form));
      }
    },
  },

  methods: {
    ...mapMutations([
      "setEditingUser",
      "addNewOneToUsers",
      "setEditStateToFalse",
    ]),

    onSubmit(e) {
      e.preventDefault();

      if (
        this.users.findIndex((user) => user.username == this.form.username) ==
        -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (
        !this.form.username ||
        !this.form.fullname.firstname ||
        !this.form.fullname.lastname
      ) {
        this.error = 1;
      } else this.error = 0;

      if (this.error == 0) {
        if (this.isEdit == "true") {
          this.setEditingUser({
            index: this.editingUserIndex,
            user: this.form,
          });
          this.$router.push("/user");
        } else if (this.isExisted === false) {
          this.addNewOneToUsers({
            firstname: this.form.fullname.firstname,
            lastname: this.form.fullname.lastname,
            username: this.form.username,
            status: this.form.status,
          });
          this.$router.push("/user");
        }

        this.setEditStateToFalse();
      }
    },

    onCancel() {
      this.setEditStateToFalse();
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 1rem;

  .wrap-input-username {
    display: block;
    .v-form-input {
      width: 49%;
    }
  }
  .wrap-input-fullname {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .v-form-input {
      flex: 0 0 auto;
      width: 49%;
    }
  }
  .wrap-input-checkbox {
    display: block;
  }
  .wrap-button {
    display: flex;
    justify-content: flex-end;

    .v-button {
      margin-left: 1rem;
    }
  }
}
</style>
