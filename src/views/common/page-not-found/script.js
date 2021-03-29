export default {
  name: "PageNotFound",
  computed: {
    message() {
      return "The webmaster said that you can not enter this page...";
    },
    IsAdmin() {
      return sessionStorage.getItem("IsAdmin");
    },
    currentUser() {
      return JSON.parse(sessionStorage.getItem("LoggedUser"));
    },
  },
  methods: {
    backToDashboard() {
      // back to user/product dashboard
      if (this.currentUser && this.IsAdmin == "true") {
        this.$router.push("/user");
      } else if (this.currentUser && this.IsAdmin == "false") {
        this.$router.push("/product");
      } else if (!this.currentUser) {
        this.$router.push("/login");
      }
    },
  },
};
