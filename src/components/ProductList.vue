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

    <b-row no-gutters class="product-table mt-3" ref="btable">
      <b-table
        :items="getProducts"
        :fields="visibleFields"
        :current-page="currentPage"
        :per-page="perPage"
        stacked="md"
        show-empty
        head-variant="light"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #cell(productname)="data">
          {{ data.item.productname }}
        </template>

        <template #cell(price)="data">
          {{ Number(data.item.price).toLocaleString() }}
          <!--
            before: 10000
            after:  10,000
           -->
        </template>
        <template #cell(status)="data">
          <div v-if="data.item.status == 1">Hoạt động</div>
          <div v-else>Không hoạt động</div>
        </template>

        <template #cell(actions)="row">
          <div class="align-btn text-right mr-lg-4">
            <button
              @click="handleEdit(row.item)"
              class="btn p-0 bg-transparent border-0"
            >
              <font-awesome-icon icon="edit" class="text-success" />
            </button>
          </div>
        </template>
      </b-table>
    </b-row>

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
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    "v-list-header": ListHeader,
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
