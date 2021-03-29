import { mapActions } from "vuex";

export default {
  name: "Layout",
  computed: {
    username() {
      let loggedUser = JSON.parse(sessionStorage.getItem("LoggedUser"));
      return loggedUser.username;
    },
    isAdmin() {
      let isadmin = sessionStorage.getItem("IsAdmin");
      return isadmin;
    },
  },
  methods: {
    ...mapActions(["logout"]),

    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    redirectUser() {
      let isAdminInsessionStorage = sessionStorage.getItem("IsAdmin");
      if (isAdminInsessionStorage === "true") {
        this.$router.replace({ path: "/user" }).catch(() => {});
      } else {
        this.$router.push({ path: "/404" });
      }
    },
    redirectProduct() {
      this.$router.push({ path: "/product" }).catch(() => {});
    },
  },
};
