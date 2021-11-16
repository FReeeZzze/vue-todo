<template>
  <div class="home">
    <h1>Todo-List:</h1>
    <input
      type="text"
      v-model="newTask"
      @keyup.enter="submit"
      placeholder="Input your task"
    />
    <list-tasks />
    <filter-tasks />
  </div>
</template>

<script>
import { CHANGE_LIST } from "../store/mutation-types";
import { keyListStorage } from "@/constants";
import ListTasks from "@/components/ListTasks.vue";
import FilterTasks from "@/components/FilterTasks.vue";

export default {
  name: "Home",
  components: { ListTasks, FilterTasks },
  data() {
    return {
      newTask: "",
    };
  },
  created() {
    const todoListData = localStorage.getItem(keyListStorage);

    if (todoListData) {
      this.$store.commit(CHANGE_LIST, JSON.parse(todoListData));
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
  },
  methods: {
    submit() {
      if (!this.newTask) {
        return;
      }
      const id = "id" + new Date().getTime();
      this.$store.commit(CHANGE_LIST, [
        ...this.todoList,
        {
          id,
          name: this.newTask,
          completed: false,
        },
      ]);
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
