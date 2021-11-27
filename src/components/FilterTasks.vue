<template>
  <section>
    <h2 v-if="!!itemsLeft">Items left: {{ itemsLeft }}</h2>
    <div class="filter_list">
      <div :key="filter" v-for="filter in filters.keys()">
        <input
          type="button"
          :value="filter"
          @click="setCurrentFilter($event.target.value)"
        />
      </div>
      <template v-if="completedTasks">
        <input type="button" value="Clear Completed" @click="clearCompletedTasks" />
      </template>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

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
  methods: mapActions(['setCurrentFilter', 'clearCompletedTasks'])
};
</script>

<style scoped>
.filter_list {
  display: flex;
  justify-content: center;
}
</style>
