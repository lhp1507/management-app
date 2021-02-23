<template>
  <div class="list-container">
    <b-row no-gutters class="pl-3 pr-3 align-items-center mb-4">
      <b-col class="col-6" style="font-size: 2rem">Danh sách người dùng</b-col>
      <b-col class="col-6 d-flex justify-content-end">
        <button class="btn btn-success d-block w-auto" @click="handleCreate">
          Tạo người dùng
        </button>
      </b-col>
    </b-row>

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

    <b-row no-gutters class="user-table mt-3" ref="btable">
      <b-table
        :items="getUsers"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        stacked="md"
        show-empty
        head-variant="light"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #cell(fullname)="data">
          {{ data.item.firstname }} {{ data.item.lastname }}
        </template>
        <template #cell(status)="data">
          <div v-if="data.item.status == 1">Đang làm</div>
          <div v-else>Nghỉ việc</div>
        </template>

        <template #cell(actions)="data">
          <div class="align-btn text-right mr-lg-4">
            <button
              @click="handleEdit(data.item)"
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
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
      filter: null,
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
