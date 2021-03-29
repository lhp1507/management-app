import { mapGetters, mapActions, mapMutations } from "vuex";
import ArmListHeader from "@/components/arm-list-header/arm-list-header";
import ArmListMain from "@/components/arm-list-main/arm-list-main";

export default {
  name: "UserList",
  components: {
    ArmListHeader,
    ArmListMain,
  },
  data() {
    return {
      perPage: 20,
      pageOptions: [20, 50, 100],
      fields: [
        { key: "firstname", label: "Tên đầy đủ" },
        { key: "username", label: "Tên đăng nhập" },
        { key: "datecreated", label: "Ngày được tạo" },
        {
          key: "status",
          label: "Trạng thái",
          formatter: (value) => {
            if (Number(value) === 1) return "Đang làm";
            else return "Nghỉ việc";
          },
        },
        { key: "act", label: "Thao tác", visible: true },
      ],
      totalRows: 1,
      currentPage: 1,
      filter: "",
      filterOn: [],
      error: 0,
    };
  },
  computed: {
    ...mapGetters(["getUsers"]),
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
    this.totalRows = this.getUsers.length;
  },
  watch: {
    getUsers() {
      this.totalRows = this.getUsers.length;
    },
  },
  methods: {
    ...mapMutations(["setEditingUser"]),
    ...mapActions(["findEditingUser", "deleteUser"]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleEdit(editingUser) {
      this.findEditingUser(editingUser);
      this.$router
        .push({
          name: "editUser",
          params: { id: editingUser.id },
        })
        .catch(() => {});
    },
    handleCreate() {
      this.$router.push({ name: "createUser" }).catch(() => {});
    },
    fetchData() {
      this.setEditingUser({
        index: this.editingUserIndex,
        user: JSON.parse(sessionStorage.getItem("UserForm")),
      });
    },
    viewCurrent(editingUser) {
      alert(JSON.stringify(editingUser));
    },
    deleteCurrent(currentUser) {
      if (currentUser.role === "admin") this.error = 1;
      else this.error = 0;
      if (this.error === 0) {
        this.deleteUser(currentUser);
      }
    },
  },
};
