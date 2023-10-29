<template>
    <section>
      <coach-filter @change-filter="setFilters">FILTER</coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button v-if="!isCoach" link to="/register"
            >Register as Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in coaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches Are found</h3>
      </base-card>
    </section>
  </template>
  <script>
  import CoachFilter from '../../components/coaches/CoachFilter.vue';
  // import { mapGetters } from 'vuex';
  import CoachItem from '../../components/coaches/CoachItem.vue';
  import BaseButton from '../../components/ui/BaseButton.vue';
  // import BaseSpinner from '../../components/ui/BaseSpinner.vue';
  export default {
    components: {
      CoachItem,
      BaseButton,
      CoachFilter,
      // BaseCard,
      // BaseSpinner,
    },
    data() {
      return {
        activeFilters: {
          isLoading: false,
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    // watch:{
    //   isLoading(val){
    //     return val;
    //   }
    // },
    computed: {
      isCoach() {
        return this.$store.getters['coaches/isCoach'];
      },
      hasCoaches() {
        return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
      },
      coaches() {
        const newCoaches = this.$store.getters['coaches/coaches'];
        return newCoaches.filter((coach) => {
          if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
            return true;
          }
          if (this.activeFilters.backend && coach.areas.includes('backend')) {
            return true;
          }
          if (this.activeFilters.career && coach.areas.includes('career')) {
            return true;
          }
          return false;
        });
      },
      // ...mapGetters({ hasCoaches: 'coaches/hasCoaches' }),
      // ...mapGetters({ coaches: 'coaches/coaches' }),
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
      async loadCoaches() {
        this.isLoading = true;
        console.log('loading starts');
        await this.$store.dispatch('coaches/loadCoaches');
        this.isLoading = false;
        console.log('loading ends');
      },
    },
    created() {
      this.loadCoaches();
    },
  };
  </script>
  <style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  </style>