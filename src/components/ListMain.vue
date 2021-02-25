<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    handleEdit: {
      type: Function,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>