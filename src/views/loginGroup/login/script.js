import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      error: 0,
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapState(["users"]),
    ListOfRetiredEmployees() {
      return this.users.filter((rUser) => rUser.status === 0);
    },
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      let username = this.username;
      let password = this.password;
      let RetiredEmployee = this.ListOfRetiredEmployees.findIndex(
        (u) => u.username == username && u.password == password
      );
      if (!username || !password) {
        this.error = 1;
      } else if (RetiredEmployee == -1) {
        this.error = 0;
      } else this.error = 2;
      if (!this.$v.$invalid && this.error === 0) {
        this.login({ username, password })
          .then(() => {
            let isAdmin = sessionStorage.getItem("IsAdmin");
            if (this.$route.query.redirect != null) {
              this.$router.push(this.$route.query.redirect);
            } else {
              if (isAdmin == "true") {
                this.$router.push("/user");
              } else {
                this.$router.push("/product");
              }
            }
          })
          .catch(() => {
            this.error = 1;
          });
      }
    },
  },
};
