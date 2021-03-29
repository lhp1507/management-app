export default {
  name: "ArmListHeader",
  props: {
    handleCreate: {
      type: Function,
      required: true,
    },
    msgTitle: {
      type: String,
      required: true,
    },
    msgBtn: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      required: true,
    },
  },
};
