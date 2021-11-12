<template>
  <div class="home">
    <h1>Todo-List:</h1>
    <input
      type="text"
      v-model="newTask"
      @keyup.enter="submit"
      placeholder="Input your task"
    />
    <list-tasks :list="filteredList" @changeList="changeList" />
    <filter-tasks :tasks="todoList" @clearCompleted="clearCompleted" />
  </div>
</template>

<script>
import { keyListStorage } from "@/constants";
import ListTasks from "@/components/ListTasks.vue";
import FilterTasks from "@/components/FilterTasks.vue";
import store from "@/store";

export default {
  name: "Home",
  components: { ListTasks, FilterTasks },
  data() {
    return {
      newTask: "",
      store: store.state,
      todoList: store.state.todoList,
    };
  },
  created() {
    const todoListData = localStorage.getItem(keyListStorage);

    if (todoListData) {
      this.todoList = JSON.parse(todoListData);
    }
  },
  computed: {
    filteredList() {
      const key = this.store.currentFilter;
      const filteredValue = this.store.filters.get(key);
      const allTodos = this.store.filters.get("Всe");

      if (!key || filteredValue === allTodos) {
        return this.todoList;
      }

      return this.todoList.filter((item) => item.completed === filteredValue);
    },
  },
  methods: {
    changeList() {
      this.todoList = [...this.todoList];
    },

    clearCompleted(completedTasks) {
      this.todoList = completedTasks;
    },

    submit() {
      if (!this.newTask) {
        return;
      }
      const id = "id" + new Date().getTime();
      this.todoList = [
        ...this.todoList,
        {
          id,
          name: this.newTask,
          completed: false,
        },
      ];
      this.newTask = "";
    },
  },
  watch: {
    todoList(value) {
      localStorage.setItem(keyListStorage, JSON.stringify(value));
    },
  },
};
</script>
