<template>
  <base-card>
    <h2>Find a coach</h2>
    <span
      class="filter-option"
      v-for="area in areas"
      :key="area"
      @change="setFilter"
    >
      <label :for="area">{{ area }}</label>
      <input type="checkbox" :id="area" :name="area" checked />
    </span>
  </base-card>
</template>

<script>
export default {
  props: ['areas', 'filters'],
  emits: ['change-filter'],
  methods: {
    setFilter(e) {
      const id = e.target.id;
      const isActive = e.target.checked;
      const updatedFilters = {
        ...this.filters,
        [id]: isActive,
      };
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped lang="css" src="../../styles/coach-filter.css"/>