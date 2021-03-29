export default {
  name: "ArmListMain",
  props: {
    items: {
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
