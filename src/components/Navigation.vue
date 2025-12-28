<template>
  <nav 
    class="glass-nav fixed w-full z-50 transition-all duration-300"
    :class="{ 'backdrop-blur-md bg-black/80': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" @click="goToHome">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-red to-red-900 flex items-center justify-center shadow-lg shadow-red-900/40">
            <i class="fa-solid fa-cube text-white text-xs"></i>
          </div>
          <span class="font-display font-bold text-xl tracking-tight text-white">
            AKI <span class="text-brand-red font-light">SYSTEM</span>
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#" 
             class="text-sm font-medium text-gray-300 hover:text-white transition-colors"
             @click.prevent="navigateTo('dashboard')">
            Dashboard
          </a>
          <a href="#" 
             class="text-sm font-medium text-gray-300 hover:text-white transition-colors"
             @click.prevent="navigateTo('analytics')">
            Analytics
          </a>
          <a href="#" 
             class="text-sm font-medium text-gray-300 hover:text-white transition-colors"
             @click.prevent="navigateTo('documentation')">
            Documentation
          </a>
        </div>

        <!-- CTA / Profile -->
        <div class="flex items-center gap-4">
          <a href="signin.html">
            <button
              class="hidden md:flex px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
              Log In
            </button>
          </a>
          <button
            class="px-4 py-2 rounded-lg bg-brand-red hover:bg-red-600 transition-all text-sm font-medium text-white shadow-lg shadow-red-900/20"
            @click="handleSubscription">
            Subscription
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isScrolled: false
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    goToHome() {
      window.location.href = '/'
    },
    navigateTo(section) {
      console.log(`Navigating to ${section}`)
      // Add navigation logic here
    },
    handleSubscription() {
      console.log('Subscription clicked')
      // Add subscription logic here
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll() // Check initial state
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
