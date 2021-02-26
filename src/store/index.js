import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      // status: 1 -> Đang làm, 0 -> Nghỉ việc
      {
        id: 1,
        firstname: "Bong",
        lastname: "Milktea",
        username: "bong",
        password: "bong123",
        datecreated: "10/02/2021, 3:52:52 PM",
        status: 1,
        role: "user",
      },
      {
        id: 2,
        firstname: "Hai",
        lastname: "Coi",
        username: "haicoi",
        password: "123456",
        datecreated: "10/02/2021, 3:52:52 PM",
        status: 0,
        role: "user",
      },
      {
        id: 3,
        firstname: "Kentucky",
        lastname: "FC",
        username: "kfc",
        password: "kfc123",
        datecreated: "10/02/2021, 3:52:52 PM",
        status: 1,
        role: "admin",
      },
    ],

    products: [
      // status: 1 -> Hoạt động, 0 -> Không hoạt động
      {
        id: 1,
        productname: "Apple",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 2,
        productname: "Avocado",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 3,
        productname: "Orange",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 4,
        productname: "Banana",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 5,
        productname: "Cacao",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 6,
        productname: "Apricots",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 7,
        productname: "Blackberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 8,
        productname: "Blackcurrant",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 9,
        productname: "Breadfruit",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 10,
        productname: "Cantaloupe",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 11,
        productname: "Clementine",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 12,
        productname: "Cranberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 13,
        productname: "Elderberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 14,
        productname: "Feijoa",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 15,
        productname: "Grapes",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 16,
        productname: "Guava",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 17,
        productname: "Gooseberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 18,
        productname: "Lemon",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 19,
        productname: "Kumquat",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 20,
        productname: "Kiwifruit",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 21,
        productname: "Jackfruit",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 22,
        productname: "Mango",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 23,
        productname: "Mangosteen",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 24,
        productname: "Mulberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 25,
        productname: "Nectarine",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 26,
        productname: "Lychee",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 27,
        productname: "Olives",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 28,
        productname: "Banana",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 29,
        productname: "Peaches",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 30,
        productname: "Pear",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 31,
        productname: "Pineapple",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 32,
        productname: "Plums",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 33,
        productname: "Pomegranate",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 34,
        productname: "Pummelo",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 35,
        productname: "Sapodilla",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 36,
        productname: "Soursop",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 37,
        productname: "Strawberries",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 38,
        productname: "Watermelon",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 39,
        productname: "Orange",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 0,
      },
      {
        id: 40,
        productname: "Tamarind",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
        price: 10000,
        status: 1,
      },
      {
        id: 41,
        productname: "Durian",
        datecreated: "10/02/2021, 3:52:52 PM",
        datemodified: "10/02/2021, 3:52:52 PM",
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
    compareUser() {
      this.state.loggedUser.role === "admin"
        ? (this.state.isAdmin = true)
        : (this.state.isAdmin = false);
    },
    login({ dispatch, commit }, loginData) {
      commit("findLoggedUser", loginData);
      // console.log("loggedUser: ", state.loggedUser); //debug
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

    /** Product - handleEdit || handleCreate **/
    findEditingProduct({ commit }, editingProduct) {
      var IndexOfEditingProduct = this.state.products.findIndex(
        (product) => editingProduct.productname == product.productname
      );
      var payload = { index: IndexOfEditingProduct, product: editingProduct };
      commit("setEditingProduct", payload);
    },

    /** User - handleEdit || handleCreate **/
    findEditingUser({ commit }, editingUser) {
      var IndexOfEditingUser = this.state.users.findIndex(
        (user) => editingUser.username == user.username
      );
      var payload = { index: IndexOfEditingUser, user: editingUser };
      commit("setEditingUser", payload);
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
      // console.log(state.products[payload.index], "pindex");
    },
    // Create
    addNewOneToProducts(state, payload) {
      state.products.push({
        id: state.products.length + 1,
        productname: payload.name,
        price: payload.price,
        status: payload.status,
        datecreated: "17/02/2021, 0:25 AM",
        datemodified: "18/02/2021, 5:02 PM",
      });
    },

    /** User - handleEdit || handleCreate **/
    // Edit
    setEditingUser(state, payload) {
      state.editingUserIndex = payload.index;
      state.users[payload.index] = payload.user;
      // console.log(state.users[payload.index], "uindex");
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
        datecreated: "17/02/2021, 0:25 AM",
        role: "user",
      });
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
