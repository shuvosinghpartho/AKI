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
          
          <!-- Video/GIF Display area -->
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors cursor-pointer"
            @click="toggleGifPlayback">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            
            <!-- GIF Display (playing) -->
            <img 
              v-if="gifPlaying" 
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
              alt="Data Processing Animation"
              class="w-full h-full object-cover"
              @load="onGifLoad">

            <!-- Animated Grid Pattern (when not playing) -->
            <div v-if="!gifPlaying" class="absolute inset-0 opacity-30"
                 style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px;">
            </div>

            <!-- Animated Particles Background -->
            <div v-if="!gifPlaying" class="absolute inset-0 flex items-center justify-center">
              <div class="absolute w-24 h-24 border-2 border-brand-red/20 rounded-full animate-spin" style="animation-duration: 8s;"></div>
              <div class="absolute w-16 h-16 border border-brand-red/10 rounded-full animate-spin" style="animation-duration: 12s; animation-direction: reverse;"></div>
            </div>

            <!-- Play Button -->
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div
                class="play-button w-14 h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:border-white/40 hover:bg-black/50 transition-all"
                @click.stop="toggleGifPlayback">
                <i :class="gifPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play ml-1'"></i>
              </div>
            </div>

            <div class="absolute bottom-4 left-4 z-20">
              <span class="text-xs font-bold text-brand-red tracking-wider uppercase mb-1 block">System Core</span>
              <span class="text-white font-medium text-sm">{{ gifPlaying ? 'Animation Playing...' : 'Data Processing Guide' }}</span>
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
            <button 
              class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                     hover:text-white hover:bg-white/5 hover:border-brand-red/50 transition-all 
                     flex items-center justify-center gap-2 
                     group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white"
              @click="navigateToDataProcessing">
              Access Pipeline
              <i class="fa-solid fa-arrow-right text-xs opacity-50 group-hover:opacity-100"></i>
            </button>
          </div>
        </div>

        <!-- Module 2: Image Annotation -->
        <div class="glass-card rounded-3xl p-2 flex flex-col h-full group reveal"
             :class="{ 'active': showAnimation }"
             style="transition-delay: 100ms;">
          
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors cursor-not-allowed opacity-70 hover:opacity-75 transition-opacity"
            @click="showComingSoonModal('Image Annotation')">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <div class="absolute inset-0 opacity-20 flex items-center justify-center">
              <i class="fa-solid fa-crop-simple text-6xl text-gray-600"></i>
            </div>

            <!-- Coming Soon Badge -->
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div class="text-center">
                <div class="mb-3">
                  <i class="fa-solid fa-lock text-3xl text-yellow-500"></i>
                </div>
                <p class="text-xs font-bold text-yellow-500 tracking-wide">COMING SOON</p>
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
              <div class="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Advanced tools for labeling datasets. High precision bounding boxes, polygon segmentation, and auto-labeling.
            </p>
            <button
              class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                     hover:text-white hover:bg-white/5 hover:border-yellow-500/50 transition-all 
                     flex items-center justify-center gap-2 
                     group-hover:bg-yellow-500/20 group-hover:border-yellow-500/50 group-hover:text-yellow-300 cursor-not-allowed"
              @click="showComingSoonModal('Image Annotation')"
              disabled>
              Coming Soon
              <i class="fa-solid fa-lock text-xs opacity-50 group-hover:opacity-100"></i>
            </button>
          </div>
        </div>

        <!-- Module 3: Signal Processing -->
        <div class="glass-card rounded-3xl p-2 flex flex-col h-full group reveal"
             :class="{ 'active': showAnimation }"
             style="transition-delay: 200ms;">
          
          <div
            class="relative h-48 rounded-2xl bg-black/50 overflow-hidden border border-white/5 group-hover:border-brand-red/30 transition-colors cursor-not-allowed opacity-70 hover:opacity-75 transition-opacity"
            @click="showComingSoonModal('Signal Processing')">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <!-- Waveform visual -->
            <div class="absolute inset-0 opacity-30 flex items-center">
              <svg class="w-full h-12 text-gray-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 10 20 20 10 T 40 10 T 60 10 T 80 10 T 100 10" stroke="currentColor"
                      fill="none" stroke-width="0.5" />
              </svg>
            </div>

            <!-- Coming Soon Badge -->
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div class="text-center">
                <div class="mb-3">
                  <i class="fa-solid fa-lock text-3xl text-yellow-500"></i>
                </div>
                <p class="text-xs font-bold text-yellow-500 tracking-wide">COMING SOON</p>
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
              <div class="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Analyze waveforms and spectral data. Filter noise, extract features, and visualize FFTs efficiently.
            </p>
            <button
              class="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-300 
                     hover:text-white hover:bg-white/5 hover:border-yellow-500/50 transition-all 
                     flex items-center justify-center gap-2 
                     group-hover:bg-yellow-500/20 group-hover:border-yellow-500/50 group-hover:text-yellow-300 cursor-not-allowed"
              @click="showComingSoonModal('Signal Processing')"
              disabled>
              Coming Soon
              <i class="fa-solid fa-lock text-xs opacity-50 group-hover:opacity-100"></i>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Coming Soon Modal -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-icon">
            <i class="fa-solid fa-rocket"></i>
          </div>

          <h2 class="modal-title">{{ selectedModule }} Tool</h2>

          <p class="modal-subtitle">Under Development</p>

          <p class="modal-text">
            We're working hard to bring you this amazing feature. Stay tuned for updates!
          </p>

          <div class="modal-features">
            <div class="feature-item">
              <i class="fa-solid fa-check"></i>
              <span>Coming Very Soon</span>
            </div>
            <div class="feature-item">
              <i class="fa-solid fa-star"></i>
              <span>Advanced Capabilities</span>
            </div>
            <div class="feature-item">
              <i class="fa-solid fa-zap"></i>
              <span>Lightning Fast</span>
            </div>
          </div>

          <button class="modal-button" @click="closeModal">
            Got It! <i class="fa-solid fa-hand-thumbs-up"></i>
          </button>

          <p class="modal-notify">
            <i class="fa-solid fa-bell"></i>
            Notify me when {{ selectedModule }} is ready
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'ModulesSection',
  data() {
    return {
      showAnimation: false,
      gifPlaying: false,
      showModal: false,
      selectedModule: '',
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
          status: "coming-soon",
          link: "#",
          icon: "crop-simple"
        },
        {
          id: 3,
          title: "Signal Processing",
          description: "Analyze waveforms and spectral data. Filter noise, extract features, and visualize FFTs efficiently.",
          status: "coming-soon",
          link: "#",
          icon: "chart-line"
        }
      ]
    }
  },
  methods: {
    navigateToDataProcessing() {
      // Navigate to upload CSV file first
      this.$router.push('/upload-csv')
    },
    toggleGifPlayback() {
      this.gifPlaying = !this.gifPlaying
    },
    onGifLoad() {
      console.log('GIF loaded successfully')
    },
    showComingSoonModal(moduleName) {
      this.selectedModule = moduleName
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = 'auto'
    },
    initAnimations() {
      setTimeout(() => {
        this.showAnimation = true
      }, 600)
    }
  },
  mounted() {
    this.initAnimations()
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style scoped>
/* Coming Soon Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 15, 30, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 1.2rem;
}

.modal-close:hover {
  background: rgba(255, 59, 48, 0.2);
  border-color: rgba(255, 59, 48, 0.5);
  transform: rotate(90deg);
}

.modal-icon {
  font-size: 4rem;
  color: #ff3b30;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
  font-weight: 600;
}

.modal-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.modal-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  transition: all 0.3s;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.feature-item i {
  color: #34c759;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.modal-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b5b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.modal-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 59, 48, 0.4);
}

.modal-button:active {
  transform: translateY(0);
}

.modal-notify {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-notify:hover {
  color: rgba(255, 255, 255, 0.8);
}

.modal-notify i {
  color: #fbbf24;
}

/* Transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
}

/* GIF Animation Styles */
.play-button {
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  border-color: white/40;
  background: black/50;
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-content {
    padding: 30px 20px;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-icon {
    font-size: 3rem;
  }

  .modal-close {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .feature-item {
    padding: 10px;
    font-size: 0.9rem;
  }

  .modal-button {
    padding: 12px;
    font-size: 0.9rem;
  }
}
</style>