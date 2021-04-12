<template>
  <section>
    <coach-filter
      @change-filter="setFilter"
      :areas="areas"
      :filters="activeFilters"
    />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/coach/register">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :hourly-rate="coach.hourlyRate"
        />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachListItem from '../../components/coaches/CoachesListItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    'coach-item': CoachListItem,
    'coach-filter': CoachFilter,
  },
  data() {
    return {
      areas: ['frontend', 'backend', 'career'],
      activeFilters: {},
    };
  },
  computed: {
    ...mapGetters('coaches', {
      coaches: 'getCoaches',
      hasCoaches: 'hasCoaches',
    }),
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        for(let filter in this.activeFilters){
          if(this.activeFilters[filter] && coach.areas.includes(filter)) {
            return true
          }
        }
        return false;
      });
    },
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = {
        ...updatedFilters,
      };
      console.log(this.activeFilters);
    },
  },
  created() {
    this.areas.forEach((id) => {
      console.log(id);
      this.activeFilters = {
        ...this.activeFilters,
        [id]: true,
      };
    });
    console.log(this.activeFilters);
    //Dynamically adds options stored in areas array
  },
};
</script>

<style scoped lang="css" src="../../styles/coaches-list.css"/>