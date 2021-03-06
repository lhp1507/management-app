<template>
  <div class="form-container">
    <!-- Component -->
    <b-form>
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
      form: {},

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
          },
        },

        buttons: {
          edit: {
            type: "submit",
            ui: {
              msg: "Cập nhật",
              variant: "success",
              styleObj: {
                margin: "0 1rem 0 0",
              },
              classObj: {},
            },
          },

          cancel: {
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
      return this.users.find(
        (user) => user.id === parseInt(this.$route.params.id)
      );
    },
  },

  created() {
    this.form = Object.assign({}, this.getEditingUserByID);
    console.log(this.form);
  },
};
</script>

<style lang="scss">
.form-container {
  padding: 1rem;
}
</style>