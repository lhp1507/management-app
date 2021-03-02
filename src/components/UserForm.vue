<template>
  <div class="form-container">
    <!-- Component -->
    <b-form @submit="onSubmit" v-if="show">
      <!-- username -->
      <div class="group-input">
        <v-form-input
          :id="'username'"
          :label="'Tên đăng nhập'"
          :labelFor="'username'"
          class="text-success font-weight-bold"
        >
          <template slot="username">
            <b-form-input
              id="username"
              v-model="$v.form.username.$model"
              @input="$v.form.username.$touch()"
              placeholder="Nhập tên đăng nhập"
              autocomplete="off"
              :disabled="isEdit == 'true'"
            ></b-form-input>
            <div
              v-if="isExisted && isEdit == 'false'"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Tên đăng nhập này đã được sử dụng.
            </div>
            <div
              class="error"
              v-if="!$v.form.username.required && $v.blur()"
              :class="{ 'form-group--error': $v.form.username.$error }"
            >
              Trường này không được bỏ trống.
            </div>
          </template>
        </v-form-input>

        <!-- firstname -->
        <v-form-input
          :id="'firstname'"
          :label="'Tên nhân viên'"
          :labelFor="'firstname'"
          class="text-success font-weight-bold"
        >
          <template slot="firstname">
            <b-form-input
              id="firstname"
              v-model="$v.form.fullname.firstname.$model"
              placeholder="Nhập tên"
              autocomplete="off"
            ></b-form-input>
            <div class="error" v-if="!$v.form.fullname.firstname.required">
              Trường này không được bỏ trống.
            </div>
          </template>
        </v-form-input>

        <!-- lastname -->
        <v-form-input
          :id="'lastname'"
          :label="'Họ nhân viên'"
          :labelFor="'lastname'"
          class="text-success font-weight-bold"
        >
          <template slot="lastname">
            <b-form-input
              id="lastname"
              v-model="$v.form.fullname.lastname.$model"
              placeholder="Nhập họ"
              autocomplete="off"
            ></b-form-input>
            <div class="error" v-if="!$v.form.fullname.lastname.required">
              Trường này không được bỏ trống.
            </div>
          </template>
        </v-form-input>

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
      <div class="group-button">
        <v-form-button
          v-if="isEdit == 'false'"
          :variant="'success'"
          :typeBtn="'submit'"
          :onClick="onSubmit"
        >
          Tạo
        </v-form-button>
        <v-form-button
          v-else
          :variant="'success'"
          :typeBtn="'submit'"
          :onClick="onSubmit"
        >
          Cập nhật
        </v-form-button>
        <v-form-button
          :onClick="onCancel"
          :variant="'success'"
          :typeBtn="'button'"
        >
          Hủy
        </v-form-button>
      </div>

      <!-- Component -->
    </b-form>

    <b-button @click="logInfo" variant="primary">Info</b-button>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
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
    };
  },
  validations: {
    form: {
      username: { required },
      fullname: {
        firstname: { required },
        lastname: { required },
      },
    },
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (
          this.users.findIndex((user) => user.username == this.form.username) ==
          -1
        ) {
          this.isExisted = false;
        } else this.isExisted = true;

        console.log(JSON.stringify(this.form), this.isExisted, this.isEdit);

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

    //
    logInfo() {
      console.log(JSON.stringify(this.form));
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 1rem;

  .group-input {
    display: flex;

    #username {
      flex-grow: 3;
    }
    #firstname {
      flex-grow: 1;
    }
    #lastname {
      flex-grow: 1;
    }
  }

  .group-button {
    display: flex;
  }
}
</style>
