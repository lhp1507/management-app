import { mapGetters, mapActions, mapMutations } from "vuex";
import ArmListHeader from "@/components/arm-list-header/arm-list-header";
import ArmListMain from "@/components/arm-list-main/arm-list-main";

export default {
  name: "ProductList",
  components: {
    ArmListHeader,
    ArmListMain,
  },
  data() {
    return {
      perPage: 20,
      pageOptions: [20, 50, 100],
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
