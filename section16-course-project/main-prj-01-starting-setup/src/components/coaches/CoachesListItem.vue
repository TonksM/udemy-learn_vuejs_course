<template>
  <li>
    <h3>{{ fullName }}</h3>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <h4>${{ hourlyRate }}/hour</h4>
    <div class="actions">
      <base-button :to="contactURL" :link="true">Contact</base-button>
      <base-button :to="detailsURL" :link="true">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'first-name', 'last-name', 'areas', 'hourly-rate'],
  computed: {
    fullName() {
      const name = this.lastName.toUpperCase() + ', ' + this.firstName;
      return name;
    },
    contactURL() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    detailsURL() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped lang="css" src="../../styles/coach-item.css"/>