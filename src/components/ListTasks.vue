<template>
  <div class="list">
    <div class="list_task" :key="task.id" v-for="task in list">
      <input
        :id="task.id"
        type="checkbox"
        :checked="task.completed"
        v-model="task.completed"
        @change="$emit('changeList')"
      />
      <label :for="task.id"> {{ task.name }} </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTasks",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
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
