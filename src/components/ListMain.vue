<template>
  <div>
    <b-row no-gutters class="user-table mt-3" ref="btable">
      <b-table
        :items="getList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        stacked="md"
        show-empty
        head-variant="light"
      >
        <template
          v-for="slotName in Object.keys($scopedSlots)"
          v-slot:[slotName]="slotScope"
        >
          <slot :name="slotName" v-bind="slotScope"></slot>
        </template>
      </b-table>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
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