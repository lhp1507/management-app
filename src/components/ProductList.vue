<template>
  <div class="list-container">
    <v-list-header msg="sản phẩm" :handleCreate="handleCreate"> </v-list-header>

    <b-row no-gutters class="pl-3 pr-3">
      <b-col class="page-size col-2">
        <b-form-group class="mb-0">
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col class="spacer-col col-7"></b-col>

      <b-col class="search col-3">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Tìm kiếm"
            ></b-form-input>

            <b-input-group-append>
              <button
                class="btn btn-success"
                :disabled="!filter"
                @click="filter = ''"
              >
                Xóa
              </button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <v-list-main
      msgActive="Hoạt động"
      msgDisactive="Không hoạt động"
      :handleEdit="handleEdit"
      :getList="getProducts"
      :fields="fields"
      :currentPage="currentPage"
      :filter="filter"
      :filterOn="filterOn"
      :onFiltered="onFiltered"
      :pageOptions="pageOptions"
      :perPage="perPage"
    ></v-list-main>

    <b-row no-gutters class="page-nav pr-3">
      <b-col class="col-3 pl-lg-3" align-self="center">
        Tổng số {{ totalRows }}
      </b-col>

      <b-col class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          class="mb-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListHeader from "./ListHeader.vue";
import ListMain from "./ListMain.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    "v-list-header": ListHeader,
    "v-list-main": ListMain,
  },
  data() {
    return {
      // Per page
      perPage: 20,
      pageOptions: [20, 50, 100],
      // Header của table
      fields: [
        { key: "productname", label: "Tên sản phẩm" },
        { key: "datecreated", label: "Ngày được tạo" },
        { key: "datemodified", label: "Ngày cập nhật gần đây" },
        { key: "price", label: "Giá" },
        { key: "status", label: "Trạng thái" },
        { key: "actions", label: "Thao tác", visible: true },
      ],

      totalRows: 1,
      currentPage: 1,
      filter: "",
      filterOn: [],
    };
  },

  computed: {
    ...mapGetters(["getProducts"]),
    isAdmin() {
      var isadmin = sessionStorage.getItem("IsAdmin");
      return isadmin;
    },
    visibleFields() {
      if (this.isAdmin == "true") {
        return this.fields;
      } else {
        return this.fields.filter((field) => !field.visible);
      }
    },
  },

  watch: {
    items: function () {
      this.totalRows = this.getProducts.length;
    },
  },
  created() {
    this.fetchData();
  },

  mounted() {
    this.totalRows = this.getProducts.length;
  },

  methods: {
    ...mapMutations([
      "setEditStateToTrue",
      "setEditStateToFalse",
      "setEditingProduct",
    ]),
    ...mapActions(["findEditingProduct"]),

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    handleEdit(editingProduct) {
      this.findEditingProduct(editingProduct);
      this.setEditStateToTrue();
      this.$router
        .push({
          name: "editProduct",
          params: { id: editingProduct.id },
        })
        .catch(() => {});
    },
    handleCreate() {
      this.setEditStateToFalse();
      this.$router.push({ name: "createProduct" }).catch(() => {});
    },
    fetchData() {
      this.setEditingProduct({
        index: this.editingProductIndex,
        product: JSON.parse(sessionStorage.getItem("ProductForm")),
      });
    },
  },
};
</script>

<style lang="scss">
.list-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.page-link {
  color: #212529;
}
.page-item.active .page-link {
  background-color: #28a745;
  border-color: #28a745;
}
</style>
