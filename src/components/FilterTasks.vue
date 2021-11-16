<template>
  <section>
    <h2 v-if="!!itemsLeft">Items left: {{ itemsLeft }}</h2>
    <div class="filter_list">
      <div :key="filter" v-for="filter in filters.keys()">
        <input
          type="button"
          :value="filter"
          @click="handleChangeFilter($event.target.value)"
        />
      </div>
      <template v-if="completedTasks">
        <input type="button" value="Clear Completed" @click="clearCompleted" />
      </template>
    </div>
  </section>
</template>

<script>
import {
  SET_CURRENT_FILTER,
  CLEAR_COMPLETED_TASKS,
} from "../store/mutation-types";

export default {
  name: "FilterTasks",
  computed: {
    itemsLeft() {
      return this.$store.getters.itemsLeft;
    },

    filters() {
      return this.$store.state.filters;
    },

    completedTasks() {
      return this.$store.getters.completedTasks;
    },
  },
  methods: {
    handleChangeFilter(value) {
      this.$store.commit(SET_CURRENT_FILTER, value);
    },

    clearCompleted() {
      this.$store.commit(CLEAR_COMPLETED_TASKS);
    },
  },
};
</script>

<style scoped>
.filter_list {
  display: flex;
  justify-content: center;
}
</style>
