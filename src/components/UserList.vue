<template>
  <div class="list-container">
    <v-list-header msg="người dùng" :handleCreate="handleCreate">
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
      msgActive="Đang làm"
      msgDisactive="Nghỉ việc"
      :handleEdit="handleEdit"
      :getList="getUsers"
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

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
        { key: "fullname", label: "Tên đầy đủ" },
        { key: "username", label: "Tên đăng nhập" },
        { key: "datecreated", label: "Ngày được tạo" },
        { key: "status", label: "Trạng thái" },
        { key: "actions", label: "Thao tác" },
      ],
      //
      totalRows: 1,
      currentPage: 1,
      filter: "",
      filterOn: [],
    };
  },

  computed: {
    ...mapGetters(["getUsers"]),
    ...mapState(["users"]),
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.totalRows = this.getUsers.length;
  },
  watch: {
    items: function () {
      this.totalRows = this.getUsers.length;
    },
  },
  methods: {
    ...mapMutations([
      "setEditStateToTrue",
      "setEditStateToFalse",
      "setEditingUser",
    ]),
    ...mapActions(["findEditingUser"]),

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    handleEdit(editingUser) {
      this.findEditingUser(editingUser);
      this.setEditStateToTrue();
      this.$router
        .push({
          name: "editUser",
          params: { id: editingUser.id },
        })
        .catch(() => {});
    },

    handleCreate() {
      this.setEditStateToFalse();
      this.$router.push({ name: "createUser" }).catch(() => {});
    },

    fetchData() {
      this.setEditingUser({
        index: this.editingUserIndex,
        user: JSON.parse(sessionStorage.getItem("UserForm")),
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
