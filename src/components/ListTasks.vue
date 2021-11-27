<template>
  <div class="list">
    <div class="list_task" :key="task.id" v-for="task in filteredList">
      <input
        :id="task.id"
        type="checkbox"
        :checked="task.completed"
        v-model="task.completed"
        @change="changeList"
      />
      <label :for="task.id"> {{ task.name }} </label>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ListTasks",
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },

    filteredList() {
      return this.$store.getters.filteredList;
    },
  },
  methods: mapActions(['changeList']),
};
</script>

<style scoped>
.list {
  width: 100%;
  max-width: 300px;
  margin: auto;
}

.list_task {
  margin: 10px 0;
  text-align: left;
  user-select: none;
}
</style>
