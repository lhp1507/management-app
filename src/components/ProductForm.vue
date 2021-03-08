<template>
  <div class="form-container">
    <!-- Component -->
    <b-form @submit="onSubmit" v-if="show">
      <div class="wrap-input-product">
        <!-- productname -->
        <v-form-input
          :id="'productname'"
          :label="'Tên sản phẩm'"
          :labelFor="'productname'"
          class="text-success font-weight-bold v-form-input"
        >
          <template slot="productname">
            <b-form-input
              id="productname"
              v-model="form.productname"
              placeholder="Nhập tên sản phẩm"
              autocomplete="off"
              :disabled="isEdit == 'true'"
            ></b-form-input>
            <p
              v-if="isExisted && isEdit == 'false'"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Tên sản phẩm này đã được sử dụng.
            </p>

            <p
              v-if="error === 1 && !form.productname"
              class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
            >
              Trường này không được để trống.
            </p>
          </template>
        </v-form-input>

        <!-- price -->
        <v-form-input
          :id="'price'"
          :label="'Giá sản phẩm'"
          :labelFor="'price'"
          class="text-success font-weight-bold v-form-input"
        >
          <template slot="price">
            <b-form-input
              id="price"
              v-model="form.price"
              placeholder="Nhập giá sản phẩm"
              autocomplete="off"
            ></b-form-input>
            <p
              v-if="error === 1 && !form.price"
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

export default {
  data() {
    return {
      form: { productname: "", price: null, status: 0 },

      show: true,
      isExisted: false,
      error: 0,
    };
  },

  computed: {
    ...mapState(["editingProductIndex", "products"]),

    getEditingProductByID() {
      if (this.isEdit === "true") {
        return this.products.find(
          (product) => product.id === parseInt(this.$route.params.id)
        );
      } else return {};
    },
  },
  beforeCreate() {
    this.isEdit = sessionStorage.getItem("isEdit");
  },

  created() {
    if (this.isEdit === "true") {
      this.form = Object.assign({}, this.getEditingProductByID);
    }
  },

  watch: {
    getEditingProductByID(newData) {
      if (this.isEdit === "true") {
        this.form = newData;
        sessionStorage.setItem("ProductForm", JSON.stringify(this.form));
      }
    },
  },

  methods: {
    ...mapMutations([
      "setEditingProduct",
      "addNewOneToProducts",
      "setEditStateToFalse",
    ]),

    onSubmit(e) {
      e.preventDefault();

      if (
        this.products.findIndex(
          (product) => product.productname === this.form.productname
        ) === -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (!this.form.productname || !this.form.price) {
        this.error = 1;
      } else this.error = 0;

      if (this.error === 0) {
        if (this.isEdit === "true") {
          this.setEditingProduct({
            index: this.editingProductIndex,
            product: this.form,
          });
          this.$router.push("/product");
        } else if (this.isExisted === false) {
          this.addNewOneToProducts({
            name: this.form.productname,
            price: this.form.price,
            status: this.form.status,
          });
          this.$router.push("/product");
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

  .wrap-input-product {
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
