<template>
  <div>
    <b-row no-gutters class="user-table mt-3" ref="btable">
      <b-table
        :items="getList"
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
          <div v-if="data.item.status == 1">{{ msgActive }}</div>
          <div v-else>{{ msgDisactive }}</div>
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
    msgActive: {
      type: String,
      required: true,
    },
    msgDisactive: {
      type: String,
      required: true,
    },
    getList: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    pageOptions: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    filter: {
      type: String,
      required: true,
    },
    filterOn: {
      type: Array,
      required: true,
    },
    onFiltered: {
      type: Function,
      required: true,
    },
  },
};
</script>