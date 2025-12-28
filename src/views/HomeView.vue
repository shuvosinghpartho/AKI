<template>
  <div id="home-view">
    <!-- Backgrounds -->
    <div class="mesh-bg"></div>
    <div class="grid-overlay"></div>

    <!-- Vue Components -->
    <Navigation />
    <HeroSection />
    <ModulesSection />
    <StatsFooter />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import HeroSection from '../components/HeroSection.vue'
import ModulesSection from '../components/ModulesSection.vue'
import StatsFooter from '../components/StatsFooter.vue'

export default {
  name: 'HomeView',
  components: {
    Navigation,
    HeroSection,
    ModulesSection,
    StatsFooter
  }
}
</script>

<style scoped>
/* Home view specific styles if needed */
</style>
