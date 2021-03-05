<template>
  <div class="form-container">
    <!-- Component -->
    <BaseForm :layout="layout" />
    <!-- Component -->
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import BaseForm from "./BaseForm.vue";

export default {
  components: { BaseForm },
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

      // Layout for component
      layout: {
        input: {
          username: {
            type: "text",
            trim: true,
            required: true,
            ui: {
              label: "Tên đăng nhập",
              autocomplete: "off",
              placeholder: "Nhập tên đăng nhập",
              disabled: false,
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
                "col-6": true,
                "p-0": true,
              },
            },
          },

          firstName: {
            type: "text",
            trim: true,
            required: true,
            ui: {
              label: "Tên nhân viên",
              placeholder: "Nhập tên",
              autocomplete: "off",
              disabled: false,
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
                "col-6": true,
                "p-0": true,
              },
            },
          },
          lastName: {
            type: "text",
            trim: true,
            required: true,
            ui: {
              label: "Họ nhân viên",
              autocomplete: "off",
              disabled: false,
              placeholder: "Nhập họ",
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
                "col-6": true,
                "p-0": true,
              },
            },
          },

          status: {
            type: "checkbox",
            ui: {
              msg: "Trạng thái",
              styleObj: {},
              classObj: {},
            },
            checkedValue: 1,
            uncheckedValue: 0,
          },
        },

        button: {
          create: {
            type: "submit",
            ui: {
              msg: "Tạo",
              variant: "success",
              styleObj: {
                margin: "0 1rem 0 0",
              },
              classObj: {},
            },
            onClick: this.onSubmit,
          },
          edit: {
            type: "button",
            ui: {
              msg: "Huỷ",
              variant: "success",
              styleObj: {},
              classObj: {},
            },
            onClick: this.onCancel,
          },
        },
      },
    };
  },

  computed: {
    ...mapState(["editingUserIndex", "users"]),

    getEditingUserByID() {
      if (this.isEdit === "true") {
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
    if (this.isEdit === "true") {
      this.form = Object.assign({}, this.getEditingUserByID);
    }
  },

  watch: {
    getEditingUserByID(newData) {
      if (this.isEdit === "true") {
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
        this.users.findIndex((user) => user.username === this.form.username) ===
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

      if (this.error === 0) {
        if (this.isEdit === "true") {
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
}
</style>
