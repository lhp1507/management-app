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
        productname: "",
        price: null,
        status: 0,
      },

      isExisted: false,

      // Layout for component
      layout: {
        input: {
          productname: {
            type: "text",
            ui: {
              label: "Tên sản phẩm",
              placeholder: "Nhập tên sản phẩm",
              autocomplete: "off",
              disabled: false,
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
              },
              cols: 6,
            },
            validate: {
              required: true,
            },
          },

          price: {
            type: "number",
            ui: {
              label: "Giá sản phẩm",
              autocomplete: "off",
              disabled: false,
              placeholder: "Nhập giá sản phẩm",
              styleObj: {},
              classObj: {
                "text-success": true,
                "font-weight-bold": true,
              },
              cols: 6,
            },
            validate: {
              required: true,
            },
          },

          status: {
            type: "checkbox",
            ui: {
              msg: "Trạng thái",
              styleObj: {},
              classObj: {},
              cols: 12,
            },
            checkedValue: 1,
            uncheckedValue: 0,
            validate: {
              required: false,
            },
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
    ...mapState(["products"]),
  },

  methods: {
    ...mapMutations(["addNewOneToProducts"]),

    onSubmit(event) {
      event.preventDefault();
      console.log("submit");

      if (
        this.products.findIndex(
          (product) => product.productname === this.form.productname
        ) === -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (this.isExisted === false) {
        this.addNewOneToProducts({
          productname: this.form.productname,
          price: this.form.price,
          status: this.form.status,
        });
        this.$router.push("/product");
      }
    },

    onCancel(event) {
      event.preventDefault();
      console.log("cancel");

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
