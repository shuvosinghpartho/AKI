<template>
  <section class="border-t border-white/5 bg-black/40 backdrop-blur-sm py-12 mt-12">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">

      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
          <i class="fa-solid fa-users text-gray-400 text-xs"></i>
        </div>
        <div>
          <span class="block text-white font-bold text-lg leading-none">{{ activeAnalysts }}</span>
          <span class="text-xs text-gray-500">Active Analysts</span>
        </div>
      </div>

      <!-- Partners/Logos Placeholder -->
      <div class="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <!-- Simple placeholder boxes to represent the logos -->
        <div class="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-[10px] text-gray-500">
          Logo 1
        </div>
        <div class="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-[10px] text-gray-500">
          Logo 2
        </div>
        <div class="h-10 w-16 bg-white/10 rounded flex items-center justify-center text-[10px] text-gray-500">
          QRARG
        </div>
      </div>

      <div class="text-center md:text-right">
        <p class="text-xs text-gray-600">© {{ currentYear }} aki.qrarg.com. All rights reserved.</p>
        <div class="flex gap-4 justify-center md:justify-end mt-2">
          <a href="#" 
             class="text-xs text-gray-500 hover:text-white transition-colors"
             @click.prevent="navigateTo('privacy')">
            Privacy
          </a>
          <a href="#" 
             class="text-xs text-gray-500 hover:text-white transition-colors"
             @click.prevent="navigateTo('terms')">
            Terms
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'StatsFooter',
  data() {
    return {
      activeAnalysts: 135,
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    navigateTo(section) {
      console.log(`Navigating to ${section}`)
      // Add navigation logic here
      if (section === 'privacy') {
        alert('Privacy policy would open here')
      } else if (section === 'terms') {
        alert('Terms of service would open here')
      }
    }
  }
}
</script>
