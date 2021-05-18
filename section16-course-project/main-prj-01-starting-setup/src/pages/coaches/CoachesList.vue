<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred0"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
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
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading && isLoggedIn" link to="/coach/register"
            >Register as Coach</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=coach/register">Login to register as a coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="loadingCoaches">
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
  </div>
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
      isLoading: false,
      error: null,
      areas: ['frontend', 'backend', 'career'],
      activeFilters: {},
    };
  },
  computed: {
    ...mapGetters('coaches', {
      coaches: 'getCoaches',
      hasCoaches: 'hasCoaches',
      isCoach: 'isCoach',
    }),
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    loadingCoaches() {
      return !this.isLoading && this.hasCoaches;
    },
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        for (let filter in this.activeFilters) {
          if (this.activeFilters[filter] && coach.areas.includes(filter)) {
            return true;
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
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forcedRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
    this.areas.forEach((id) => {
      this.activeFilters = {
        ...this.activeFilters,
        [id]: true,
      };
    });
    //Dynamically adds options stored in areas array
  },
};
</script>

<style scoped lang="css" src="../../styles/coaches-list.css"/>