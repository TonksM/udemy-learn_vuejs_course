<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>Rate: {{ rate }}</h3>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        />
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested?</h2>
          <base-button link :to="contactURL">Contact</base-button>
        </header>
        <router-view />
      </base-card>
    </section>
    <section>
      <base-card>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    ...mapGetters('coaches', {
      getCoachByID: 'getCoachByID',
    }),
    fullName() {
      return (
        this.selectedCoach.lastName.toUpperCase() +
        ', ' +
        this.selectedCoach.firstName
      );
    },
    rate() {
      return '$' + this.selectedCoach.hourlyRate + '/hr';
    },
    contactURL() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.getCoachByID(this.id);
  },
};
</script>

<style scoped>
h3 {
  float: right;
  padding-bottom: 10%;
}
</style>