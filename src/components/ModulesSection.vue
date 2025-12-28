<template>
  <section class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16 reveal" :class="{ 'active': showAnimation }">
        <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">Kinetic Modules</h2>
        <p class="text-gray-400 max-w-lg mx-auto">
          Select a neural module to begin your analysis. Real-time processing available.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Module 1: Data Processing -->
        <div class="glass-card rounded-3xl p-2 flex flex-col h-full group reveal"
             :class="{ 'active': showAnimation }"
             style="transition-delay: 0ms;">
          
          <!-- Video/Image Placeholder area -->
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <!-- Abstract Grid for visual -->
            <div class="absolute inset-0 opacity-30"
                 style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px;">
            </div>

            <!-- Play Button -->
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div
                class="play-button w-14 h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
                <i class="fa-solid fa-play ml-1"></i>
              </div>
            </div>

            <div class="absolute bottom-4 left-4 z-20">
              <span class="text-xs font-bold text-brand-red tracking-wider uppercase mb-1 block">System Core</span>
              <span class="text-white font-medium text-sm">Data Processing Guide</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-display text-xl font-bold text-white">Data Processing</h3>
              <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Access the central neural network. Monitor real-time analytics and manage kinetic models with sub-millisecond latency.
            </p>
            <a :href="modules[0].link" target="_blank" class="block">
              <button 
                class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                       hover:text-white hover:bg-white/5 hover:border-brand-red/50 transition-all 
                       flex items-center justify-center gap-2 
                       group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white">
                Access Module
                <i class="fa-solid fa-arrow-right text-xs opacity-50 group-hover:opacity-100"></i>
              </button>
            </a>
          </div>
        </div>

        <!-- Module 2: Image Annotation -->
        <div class="glass-card rounded-3xl p-2 flex flex-col h-full group reveal"
             :class="{ 'active': showAnimation }"
             style="transition-delay: 100ms;">
          
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <div class="absolute inset-0 opacity-20 flex items-center justify-center">
              <i class="fa-solid fa-crop-simple text-6xl text-gray-600"></i>
            </div>

            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div
                class="play-button w-14 h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
                <i class="fa-solid fa-play ml-1"></i>
              </div>
            </div>

            <div class="absolute bottom-4 left-4 z-20">
              <span class="text-xs font-bold text-brand-red tracking-wider uppercase mb-1 block">Vision Tools</span>
              <span class="text-white font-medium text-sm">Image Annotation Guide</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-display text-xl font-bold text-white">Image Annotation</h3>
              <div class="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_10px_rgba(255,59,48,0.5)]"></div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Advanced tools for labeling datasets. High precision bounding boxes, polygon segmentation, and auto-labeling.
            </p>
            <button
              class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                     hover:text-white hover:bg-white/5 hover:border-brand-red/50 transition-all 
                     flex items-center justify-center gap-2 
                     group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white"
              @click="launchImageAnnotation">
              Launch Tool
              <i class="fa-solid fa-arrow-right text-xs opacity-50 group-hover:opacity-100"></i>
            </button>
          </div>
        </div>

        <!-- Module 3: Signal Processing -->
        <div class="glass-card rounded-3xl p-2 flex flex-col h-full group reveal"
             :class="{ 'active': showAnimation }"
             style="transition-delay: 200ms;">
          
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <!-- Waveform visual -->
            <div class="absolute inset-0 opacity-30 flex items-center">
              <svg class="w-full h-12 text-gray-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 10 20 20 10 T 40 10 T 60 10 T 80 10 T 100 10" stroke="currentColor"
                      fill="none" stroke-width="0.5" />
              </svg>
            </div>

            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div
                class="play-button w-14 h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
                <i class="fa-solid fa-play ml-1"></i>
              </div>
            </div>

            <div class="absolute bottom-4 left-4 z-20">
              <span class="text-xs font-bold text-brand-red tracking-wider uppercase mb-1 block">Wave Analysis</span>
              <span class="text-white font-medium text-sm">Signal Processing Guide</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-display text-xl font-bold text-white">Signal Processing</h3>
              <div class="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_10px_rgba(255,59,48,0.5)]"></div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Analyze waveforms and spectral data. Filter noise, extract features, and visualize FFTs efficiently.
            </p>
            <button
              class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                     hover:text-white hover:bg-white/5 hover:border-brand-red/50 transition-all 
                     flex items-center justify-center gap-2 
                     group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white"
              @click="launchSignalProcessing">
              Analyze Data
              <i class="fa-solid fa-arrow-right text-xs opacity-50 group-hover:opacity-100"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModulesSection',
  data() {
    return {
      showAnimation: false,
      modules: [
        {
          id: 1,
          title: "Data Processing",
          description: "Access the central neural network. Monitor real-time analytics and manage kinetic models with sub-millisecond latency.",
          status: "active",
          link: "Dataprocessingfilepreview.html",
          icon: "play"
        },
        {
          id: 2,
          title: "Image Annotation",
          description: "Advanced tools for labeling datasets. High precision bounding boxes, polygon segmentation, and auto-labeling.",
          status: "available",
          link: "#",
          icon: "crop-simple"
        },
        {
          id: 3,
          title: "Signal Processing",
          description: "Analyze waveforms and spectral data. Filter noise, extract features, and visualize FFTs efficiently.",
          status: "available",
          link: "#",
          icon: "chart-line"
        }
      ]
    }
  },
  methods: {
    launchImageAnnotation() {
      console.log('Launching Image Annotation tool...')
      alert('Image Annotation tool would launch here')
    },
    launchSignalProcessing() {
      console.log('Launching Signal Processing...')
      alert('Signal Processing tool would launch here')
    },
    initAnimations() {
      setTimeout(() => {
        this.showAnimation = true
      }, 600)
    }
  },
  mounted() {
    this.initAnimations()
  }
}
</script>
