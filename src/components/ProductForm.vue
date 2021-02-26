<template>
  <div class="form-container">
    <b-form @submit="onSubmit" v-if="show">
      <!-- Tên sản phẩm - productname -->
      <b-form-group
        id="input-group-productname"
        label="Tên sản phẩm"
        label-for="input-productname"
        class="text-success font-weight-bold col-lg-6 d-inline-block pl-0"
      >
        <b-form-input
          id="input-productname"
          v-model="form.productname"
          placeholder="Nhập tên sản phẩm"
          autocomplete="off"
          :disabled="isEdit == 'true'"
          required
        ></b-form-input>
        <div
          v-if="isExisted && isEdit == 'false'"
          class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
        >
          Tên sản phẩm này đã được sử dụng.
        </div>
      </b-form-group>
      <!-- Giá sản phẩm - productprice -->
      <b-form-group
        id="input-group-productprice"
        label="Giá sản phẩm"
        label-for="input-productprice"
        class="text-success font-weight-bold col-lg-6 d-inline-block pr-0 align-top"
      >
        <b-form-input
          id="input-productprice"
          v-model.number="form.price"
          placeholder="Nhập giá sản phẩm"
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
          v-if="isEdit == 'false'"
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
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      form: {},
      show: true,
      isExisted: false,
    };
  },

  computed: {
    ...mapState(["editingProductIndex", "products"]),

    getEditingProductByID() {
      if (this.isEdit == "true") {
        return this.products.find(
          (product) => product.id === parseInt(this.$route.params.id)
        );
      } else return {};
    },
  },
  beforeCreate() {
    this.isEdit = sessionStorage.getItem("isEdit");
    // console.log("beforeCreate", this.isEdit);
  },

  created() {
    // console.log(
    //   "created",
    //   this.isEdit,
    //   this.getEditingProductByID,
    //   this.getEditingProductByID.id
    // );

    if (this.isEdit == "true") {
      this.form = this.getEditingProductByID;
      // this.form = Object.assign({}, this.getEditingProductByID);
    }
    // console.log("form", this.form, this.form.id);
  },

  watch: {
    getEditingProductByID(newData) {
      if (this.isEdit == "true") {
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
          (product) => product.productname == this.form.productname
        ) == -1
      ) {
        this.isExisted = false;
      } else this.isExisted = true;

      if (this.isEdit == "true") {
        // console.log(this.isEdit, "Edit");
        this.setEditingProduct({
          index: this.editingProductIndex,
          product: this.form,
        });
        this.$router.push("/product");
      } else if (this.isExisted === false) {
        // console.log(this.getIsEdit, "Create");
        this.addNewOneToProducts({
          name: this.form.productname,
          price: this.form.price,
          status: this.form.status,
        });
        this.$router.push("/product");
      }

      this.setEditStateToFalse();
    },
    onCancel() {
      // console.log("cancel clicked.");
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
