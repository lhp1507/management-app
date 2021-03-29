import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      // status: 1 -> Đang làm, 0 -> Nghỉ việc
      {
        id: 1,
        firstname: "Nguyen Van",
        lastname: "A",
        username: "nva",
        password: "123456",
        datecreated: 1612972372000,
        status: 1,
        role: "user",
      },
      {
        id: 2,
        firstname: "Mr",
        lastname: "Bo",
        username: "mrbo",
        password: "123456",
        datecreated: 1612972372000,
        status: 0,
        role: "user",
      },
      {
        id: 3,
        firstname: "Nam",
        lastname: "Danh",
        username: "namdanh",
        password: "123456",
        datecreated: 1612972372000,
        status: 1,
        role: "admin",
      },
    ],
    products: [
      // status: 1 -> Hoạt động, 0 -> Không hoạt động
      {
        id: 1,
        productname: "Apple",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 2,
        productname: "Avocado",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 3,
        productname: "Orange",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 4,
        productname: "Banana",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 5,
        productname: "Cacao",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 6,
        productname: "Apricots",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 7,
        productname: "Blackberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 8,
        productname: "Blackcurrant",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 9,
        productname: "Breadfruit",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 10,
        productname: "Cantaloupe",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 11,
        productname: "Clementine",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 12,
        productname: "Cranberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 13,
        productname: "Elderberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 14,
        productname: "Feijoa",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 15,
        productname: "Grapes",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 16,
        productname: "Guava",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 17,
        productname: "Gooseberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 18,
        productname: "Lemon",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 19,
        productname: "Kumquat",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 20,
        productname: "Kiwifruit",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 21,
        productname: "Jackfruit",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 22,
        productname: "Mango",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 23,
        productname: "Mangosteen",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 24,
        productname: "Mulberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 25,
        productname: "Nectarine",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 26,
        productname: "Lychee",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 27,
        productname: "Olives",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 28,
        productname: "Banana",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 29,
        productname: "Peaches",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 30,
        productname: "Pear",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 31,
        productname: "Pineapple",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 32,
        productname: "Plums",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 33,
        productname: "Pomegranate",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 34,
        productname: "Pummelo",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 35,
        productname: "Sapodilla",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 36,
        productname: "Soursop",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 37,
        productname: "Strawberries",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 38,
        productname: "Watermelon",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 39,
        productname: "Orange",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 0,
      },
      {
        id: 40,
        productname: "Tamarind",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
      {
        id: 41,
        productname: "Durian",
        datecreated: 1612972372000,
        datemodified: 1612972372000,
        price: 10000,
        status: 1,
      },
    ],
    isEdit: false,
    isLoggedIn: false,
    isAdmin: false,
    loggedUser: null,
    editingProductIndex: null,
    editingUserIndex: null,
  },
  actions: {
    /** Login **/
    compareUser({ commit }) {
      this.state.loggedUser.role === "admin"
        ? commit("setAdminToTrue")
        : commit("setAdminToFalse");
    },
    login({ dispatch, commit }, loginData) {
      commit("findLoggedUser", loginData);
      return new Promise((resolve) => {
        dispatch("compareUser").then(() => {
          commit("loginSuccess");
          resolve();
        });
      });
    },
    /** Logout **/
    logout({ commit }) {
      commit("clearData");
    },
    /** Product - handleEdit || handleDelete **/
    findEditingProduct({ commit }, editingProduct) {
      let IndexOfEditingProduct = this.state.products.findIndex(
        (product) => editingProduct.productname === product.productname
      );
      let payload = { index: IndexOfEditingProduct, product: editingProduct };
      commit("setEditingProduct", payload);
    },
    deleteProduct({ commit }, currentProduct) {
      commit("deleteSelectedProduct", currentProduct);
    },
    /** User - handleEdit || handleDelete **/
    findEditingUser({ commit }, editingUser) {
      let IndexOfEditingUser = this.state.users.findIndex(
        (user) => editingUser.username === user.username
      );
      let payload = { index: IndexOfEditingUser, user: editingUser };
      commit("setEditingUser", payload);
    },
    deleteUser({ commit }, currentUser) {
      commit("deleteSelectedUser", currentUser);
    },
  },
  mutations: {
    /** Login **/
    findLoggedUser(state, loginData) {
      state.loggedUser = state.users.find(
        (user) =>
          user.username === loginData.username &&
          user.password === loginData.password
      );
    },
    loginSuccess(state) {
      state.isLoggedIn = true;
      sessionStorage.setItem("UserIsLoggedIn", state.isLoggedIn);
      sessionStorage.setItem("IsAdmin", state.isAdmin);
      sessionStorage.setItem("LoggedUser", JSON.stringify(state.loggedUser));
    },
    /** Logout **/
    clearData(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.loggedUser = null;
      sessionStorage.setItem("UserIsLoggedIn", state.isLoggedIn);
      sessionStorage.setItem("IsAdmin", state.isAdmin);
      sessionStorage.setItem("LoggedUser", JSON.stringify(state.loggedUser));
      sessionStorage.removeItem("SSPrevPath");
    },
    // Edit
    setEditStateToTrue(state) {
      state.isEdit = true;
      sessionStorage.setItem("isEdit", state.isEdit);
    },
    // Create
    setEditStateToFalse(state) {
      state.isEdit = false;
      sessionStorage.setItem("isEdit", state.isEdit);
    },
    /** Product - handleEdit || handleCreate **/
    // Edit
    setEditingProduct(state, payload) {
      state.editingProductIndex = payload.index;
      state.products[payload.index] = payload.product;
    },
    // Create
    addNewOneToProducts(state, payload) {
      state.products.push({
        id: state.products.length + 1,
        productname: payload.productname,
        price: payload.price,
        status: payload.status,
        datecreated: 1613521500000,
        datemodified: 1613667720000,
      });
    },
    // Delete
    deleteSelectedProduct(state, currentProduct) {
      let IndexOfDeletingProduct = state.products.findIndex(
        (product) => product.id === currentProduct.id
      );
      state.products.splice(IndexOfDeletingProduct, 1);
    },
    /** User - handleEdit || handleCreate || handleDelete **/
    // Edit
    setEditingUser(state, payload) {
      state.editingUserIndex = payload.index;
      state.users[payload.index] = payload.user;
    },
    // Create
    addNewOneToUsers(state, payload) {
      state.users.push({
        id: state.users.length + 1,
        firstname: payload.firstname,
        lastname: payload.lastname,
        username: payload.username,
        status: payload.status,
        password: "123456",
        datecreated: 1613521500000,
        role: "user",
      });
    },
    // Delete
    deleteSelectedUser(state, currentUser) {
      let IndexOfDeletingUser = state.users.findIndex(
        (user) => user.id === currentUser.id
      );
      state.users.splice(IndexOfDeletingUser, 1);
    },
    //isAdmin
    setAdminToTrue(state) {
      state.isAdmin = true;
    },
    setAdminToFalse(state) {
      state.isAdmin = false;
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getProducts(state) {
      return state.products;
    },
  },
});
