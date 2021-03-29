import { mapMutations, mapState } from "vuex";
import ArmForm from "@/components/arm-form/arm-form";

export default {
  name: "UserEdit",
  components: { ArmForm },
  data() {
    return {
      form: {},
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
            cols: 12,
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
    ...mapState(["editingUserIndex", "users"]),
    getEditingUserByID() {
      return this.users.find(
        (user) => user.id === parseInt(this.$route.params.id, 10)
      );
    },
  },
  created() {
    this.form = Object.assign({}, this.getEditingUserByID);
  },
  methods: {
    ...mapMutations(["setEditingUser"]),
    onSubmit(event) {
      event.preventDefault();
      console.log("submit");
      this.setEditingUser({
        index: this.editingUserIndex,
        user: this.form,
      });
      console.log(this.editingUserIndex, JSON.stringify(this.form));
      this.$router.push("/user");
    },
    onCancel(event) {
      event.preventDefault();
      console.log("cancel");
      this.$router.back();
    },
  },
};
