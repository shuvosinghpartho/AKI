<template>
  <section class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 overflow-hidden">
    <div class="max-w-7xl mx-auto text-center relative z-10">

      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        :class="{ 'animate-fade-in-up': showAnimation }"
      >
        <span class="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
        <span class="text-xs font-medium text-gray-300 tracking-wide uppercase">System v2.0 Operational</span>
      </div>

      <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] reveal"
          :class="{ 'active': showAnimation }">
        Artificial <br />
        <span class="text-gradient-red relative inline-block">
          Kinetic
          <!-- Decorative Line -->
          <svg class="absolute w-full h-3 -bottom-1 left-0 text-brand-red opacity-50" viewBox="0 0 100 10"
              preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="transparent" />
          </svg>
        </span>
        Intelligence
      </h1>

      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed reveal"
         :class="{ 'active': showAnimation }">
        Advanced data analysis meets intelligent decision-making.
        Power your projects with the next generation of neural kinetic models.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 reveal"
          :class="{ 'active': showAnimation }"
          style="transition-delay: 100ms;">
        <button
          class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          @click="launchConsole">
          User Guidelines
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button
          class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          @click="watchDemo">
          <i class="fa-solid fa-play"></i>
          Watch Demo
        </button>
      </div>
    </div>

    <!-- Decorative Floating Elements -->
    <div
      class="absolute top-1/3 left-10 w-24 h-24 border border-white/5 rounded-full opacity-20 hidden lg:block"
      :class="{ 'animate-float': showAnimation }">
    </div>
    <div class="absolute bottom-1/4 right-10 w-32 h-32 border border-brand-red/10 rounded-full opacity-20 hidden lg:block"
        :class="{ 'animate-float': showAnimation }"
        style="animation-delay: 2s;"></div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      showAnimation: false
    }
  },
  methods: {
    launchConsole() {
      console.log('Launch Console clicked')
      // Add console launch logic here
      alert('Launching AKI Console...')
    },
    watchDemo() {
      console.log('Watch Demo clicked')
      // Add demo logic here
      alert('Demo video would play here')
    },
    initAnimations() {
      // Small delay to trigger animations
      setTimeout(() => {
        this.showAnimation = true
      }, 300)
    }
  },
  mounted() {
    this.initAnimations()
  }
}
</script>