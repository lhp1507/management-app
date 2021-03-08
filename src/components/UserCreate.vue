<template>
  <div class="form-container">
    <!-- Component -->
    <b-form @submit="onSubmit" @reset="onCancel">
      <BaseForm :layout="layout" v-model="form" />
    </b-form>
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
        firstname: "",
        lastname: "",
        username: "",
        status: 0,
      },

      isExisted: false,

      // Layout for component
      layout: {
        input: {
          username: {
            type: "text",
            ui: {
              label: "Tên đăng nhập",
              autocomplete: "off",
              placeholder: "Nhập tên đăng nhập",
              disabled: true,
              styleObj: {
                paddingRight: "5px",
                paddingLeft: "0px",
              },
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
                "col-6": true,
              },
              cols: 12,
            },
            validate: {},
          },

          firstname: {
            type: "text",
            ui: {
              label: "Tên nhân viên",
              placeholder: "Nhập tên",
              autocomplete: "off",
              disabled: false,
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
              },
              cols: 6,
            },
          },

          lastname: {
            type: "text",
            ui: {
              label: "Họ nhân viên",
              autocomplete: "off",
              disabled: false,
              placeholder: "Nhập họ",
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
              },
              cols: 6,
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
            cols: 12,
          },
        },

        buttons: {
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
          },

          cancel: {
            type: "reset",
            ui: {
              msg: "Huỷ",
              variant: "success",
              styleObj: {},
              classObj: {},
            },
          },
        },
      },
    };
  },

  computed: {
    ...mapState(["users"]),
  },

  methods: {
    ...mapMutations(["addNewOneToUsers"]),

    onSubmit(event) {
      event.preventDefault();
      console.log("submit");

      if (
        this.users.findIndex((user) => user.username === this.form.username) ===
        -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (!this.form.username || !this.form.firstname || !this.form.lastname) {
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
            firstname: this.form.firstname,
            lastname: this.form.lastname,
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
