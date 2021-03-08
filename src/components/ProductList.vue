<template>
  <div class="list-container">
    <v-list-header
      msgTitle="Danh sách sản phẩm"
      msgBtn="Tạo sản phẩm"
      :handleCreate="handleCreate"
      :isAdmin="isAdmin"
    >
    </v-list-header>

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
      :items="getProducts"
      :fields="visibleFields"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="filter"
      :filterOn="filterOn"
      :onFiltered="onFiltered"
      pageOptions="pageOptions"
    >
      <!--  -->
      <template #cell(act)="data">
        <b-button
          size="sm"
          @click="viewCurrent(data.item)"
          class="mr-1"
          variant="primary"
        >
          Info
        </b-button>
        <b-button
          size="sm"
          @click="handleEdit(data.item)"
          class="mr-1"
          variant="warning"
        >
          Edit
        </b-button>
        <b-button size="sm" @click="deleteCurrent(data.item)" variant="danger">
          Delete
        </b-button>
      </template>
      <!--  -->
    </v-list-main>

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
import { mapGetters, mapActions, mapMutations } from "vuex";
import ListHeader from "./ListHeader.vue";
import ListMain from "./ListMain.vue";

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
        {
          key: "price",
          label: "Giá",
          formatter: (value) => {
            return Number(value).toLocaleString();
          },
        },
        {
          key: "status",
          label: "Trạng thái",
          formatter: (value) => {
            if (Number(value) === 1) return "Hoạt động";
            else return "Không hoạt động";
          },
        },
        { key: "act", label: "Thao tác", visible: true },
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
      let isadmin = sessionStorage.getItem("IsAdmin");
      return isadmin;
    },
    visibleFields() {
      if (this.isAdmin === "true") {
        return this.fields;
      } else {
        return this.fields.filter((field) => !field.visible);
      }
    },
  },

  created() {
    this.fetchData();
  },

  mounted() {
    this.totalRows = this.getProducts.length;
  },

  watch: {
    getProducts() {
      this.totalRows = this.getProducts.length;
    },
  },

  methods: {
    ...mapMutations(["setEditingProduct"]),
    ...mapActions(["findEditingProduct", "deleteProduct"]),

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    handleEdit(editingProduct) {
      this.findEditingProduct(editingProduct);
      this.$router
        .push({
          name: "editProduct",
          params: { id: editingProduct.id },
        })
        .catch(() => {});
    },

    handleCreate() {
      this.$router.push({ name: "createProduct" }).catch(() => {});
    },

    fetchData() {
      this.setEditingProduct({
        index: this.editingProductIndex,
        product: JSON.parse(sessionStorage.getItem("ProductForm")),
      });
    },

    viewCurrent(editingProduct) {
      alert(JSON.stringify(editingProduct));
    },

    deleteCurrent(currentProduct) {
      this.deleteProduct(currentProduct);
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
