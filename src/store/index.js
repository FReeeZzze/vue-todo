import Vue from "vue";
import Vuex from "vuex";
import {
  CHANGE_LIST,
  SET_CURRENT_FILTER,
  CLEAR_COMPLETED_TASKS,
} from "./mutation-types";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentFilter: "",
    filters: new Map([
      ["Всe", "all"],
      ["Выполненые", true],
      ["Активные", false],
    ]),
    todoList: [
      {
        id: 1,
        name: "Выполнить проверку работы #1",
        completed: false,
      },
      {
        id: 2,
        name: "Выполнить проверку работы #2",
        completed: true,
      },
      {
        id: 3,
        name: "Выполнить проверку работы #3",
        completed: false,
      },
    ],
  },
  mutations: {
    [SET_CURRENT_FILTER](state, payload) {
      state.currentFilter = payload;
    },
    [CHANGE_LIST](state, payload) {
      state.todoList = [...payload];
    },
    [CLEAR_COMPLETED_TASKS](state) {
      state.todoList = state.todoList.filter((v) => v.completed !== true);
    },
  },
  getters: {
    filteredList: (state) => {
      const key = state.currentFilter;
      const filteredValue = state.filters.get(key);
      const allTodos = state.filters.get("Всe");

      if (!key || filteredValue === allTodos) {
        return state.todoList;
      }

      return state.todoList.filter((item) => item.completed === filteredValue);
    },

    itemsLeft: (state) => {
      return state.todoList.filter((i) => i.completed === false).length;
    },

    completedTasks: (state) => {
      return !!state.todoList.filter((i) => i.completed === true).length;
    },
  },
  actions: {
    setCurrentFilter({ commit }, payload) {
      commit(SET_CURRENT_FILTER, payload)
    },
    changeList({ commit }, payload) {
      commit(CHANGE_LIST, payload)
    },
    clearCompletedTasks({ commit }) {
      commit(CLEAR_COMPLETED_TASKS)
    }
  }
});

export default store;
