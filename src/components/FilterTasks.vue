<template>
  <section>
    <h2 v-if="!!itemsLeft">Items left: {{ itemsLeft }}</h2>
    <div class="filter_list">
      <div :key="filter" v-for="filter in store.filters.keys()">
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
import store from "@/store";
export default {
  name: "FilterTasks",
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      store: store.state,
    };
  },
  computed: {
    itemsLeft() {
      return this.tasks.filter((i) => i.completed === false).length;
    },

    completedTasks() {
      return !!this.tasks.filter((i) => i.completed === true).length;
    },
  },
  methods: {
    handleChangeFilter(value) {
      store.setCurrentFilter(value);
    },

    clearCompleted() {
      const completedTasks = this.tasks.filter((v) => v.completed !== true);
      this.$emit("clearCompleted", completedTasks);
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
