<template>
  <div class="form-container">
    <b-form @submit="onSubmit" v-if="show">
      <!-- Tên đăng nhập - username -->
      <b-form-group
        id="input-group-username"
        label="Tên đăng nhập"
        label-for="input-username"
        class="text-success font-weight-bold col-lg-6 d-block pl-0"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
          placeholder="Nhập tên đăng nhập"
          autocomplete="off"
          :disabled="getIsEdit == true"
          required
        ></b-form-input>
        <div
          v-if="isExisted && !getIsEdit"
          class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
        >
          Tên đăng nhập này đã được sử dụng.
        </div>
      </b-form-group>
      <!-- Tên nhân viên - firstname -->
      <b-form-group
        id="input-group-firstname"
        label="Tên nhân viên"
        label-for="input-firstname"
        class="text-success font-weight-bold col-lg-6 d-inline-block pl-0"
      >
        <b-form-input
          id="input-firstname"
          v-model="form.firstname"
          placeholder="Nhập tên"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <!-- Họ nhân viên - lastname -->
      <b-form-group
        id="input-group-lastname"
        label="Họ nhân viên"
        label-for="input-lastname"
        class="text-success font-weight-bold col-lg-6 d-inline-block pr-0"
      >
        <b-form-input
          id="input-lastname"
          v-model="form.lastname"
          placeholder="Nhập họ"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-status">
        <b-form-checkbox
          id="checkbox-status"
          v-model="form.status"
          name="checkbox-status"
          value="1"
          unchecked-value="0"
        >
          Trạng thái
        </b-form-checkbox>
      </b-form-group>

      <div class="button-group text-right">
        <b-button
          v-if="getIsEdit == false"
          type="submit"
          variant="success"
          style="width: 100px"
          class="mr-3"
          >Tạo</b-button
        >
        <b-button
          v-else
          type="submit"
          variant="success"
          style="width: 100px"
          class="mr-3"
          >Cập nhật</b-button
        >
        <b-button
          type="button"
          variant="success"
          @click.prevent="onCancel"
          style="width: 100px"
          >Hủy</b-button
        >
      </div>
    </b-form>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        username: null,
        firstname: null,
        lastname: null,
        status: 0,
      },
      show: true,
      isExisted: false,
    };
  },
  computed: {
    ...mapGetters(["getIsEdit", "getEditingUser"]),
    ...mapState(["editingUserIndex", "users"]),
  },
  created() {
    if (this.getIsEdit) {
      this.form = Object.assign({}, this.getEditingUser);
    }
  },

  watch: {
    getEditingUser(newData) {
      if (this.getIsEdit) {
        this.form = newData;
        sessionStorage.setItem("UserForm", JSON.stringify(this.form));
      }
    },
  },

  methods: {
    ...mapMutations(["setEditingUser", "addNewOneToUsers", "GoBackOnCancel"]),

    onSubmit(e) {
      e.preventDefault();

      if (
        this.users.findIndex((user) => user.username == this.form.username) ==
        -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (this.getIsEdit) {
        // console.log(this.getIsEdit, "Edit");
        this.setEditingUser({
          index: this.editingUserIndex,
          user: this.form,
        });
        this.$router.push("/user");
      } else if (this.isExisted === false) {
        // console.log(this.getIsEdit, "Create");
        this.addNewOneToUsers({
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          username: this.form.username,
          status: this.form.status,
        });
        this.$router.push("/user");
      }
    },

    onCancel() {
      // console.log("cancel clicked.");
      this.GoBackOnCancel();
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 1rem;
}
</style>
