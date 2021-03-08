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
      form: {},

      // Layout for component
      layout: {
        input: {
          productname: {
            type: "text",
            ui: {
              label: "Tên sản phẩm",
              placeholder: "Nhập tên sản phẩm",
              autocomplete: "off",
              disabled: true,
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
    ...mapState(["editingProductIndex", "products"]),

    getEditingProductByID() {
      return this.products.find(
        (product) => product.id === parseInt(this.$route.params.id, 10)
      );
    },
  },

  created() {
    this.form = Object.assign({}, this.getEditingProductByID);
    // this.form = this.getEditingUserByID;
  },

  methods: {
    ...mapMutations(["setEditingProduct"]),

    onSubmit(event) {
      event.preventDefault();
      console.log("submit");

      this.setEditingProduct({
        index: this.editingProductIndex,
        product: this.form,
      });
      console.log(this.editingProductIndex, JSON.stringify(this.form));

      this.$router.push("/product");
    },

    onCancel(event) {
      event.preventDefault();
      console.log("cancel");

      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.form-container {
  padding: 1rem;
}
</style>