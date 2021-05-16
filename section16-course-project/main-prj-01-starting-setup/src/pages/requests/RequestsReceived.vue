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
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in requests"
            :key="req.id"
            :email="req.email"
            :message="req.msg"
          />
        </ul>
        <h3 v-if="!hasRequests && !isLoading">No requests received</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    'request-item': RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters('requests', {
      requests: 'getRequests',
      hasRequests: 'hasRequests',
    }),
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped lang="css" src="../../styles/requests-received.css"/>