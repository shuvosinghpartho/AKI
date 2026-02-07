<template>
  <footer class="border-t border-white/5 bg-black/40 backdrop-blur-sm">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        <!-- About Section -->
        <div class="col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <i class="fa-solid fa-cube text-white text-sm"></i>
            </div>
            <h3 class="text-white font-bold text-lg">AKI</h3>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed mb-4">
           A No Code Auto Ml Tool For Everyone. Empowering users to build and deploy machine learning models without writing a single line of code.
          </p>
          <p class="text-xs text-gray-600">
            Product of <a href="https://www.qrarg.com" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition-colors font-semibold">QRARG</a>
          </p>
        </div>

        <!-- Product Section -->
        <div class="col-span-1">
          <h4 class="text-white font-semibold text-sm mb-6">Product</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">Features</a>
            </li>
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">Pricing</a>
            </li>
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">Documentation</a>
            </li>
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">API</a>
            </li>
          </ul>
        </div>

        <!-- Company Section -->
        <div class="col-span-1">
          <h4 class="text-white font-semibold text-sm mb-6">Company</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">Blog</a>
            </li>
            <li>
              <button @click="openDevelopersModal" 
                      class="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Developers
              </button>
            </li>
            <li>
              <a href="#" class="text-xs text-gray-500 hover:text-white transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        <!-- Stats Section -->
        <div class="col-span-1">
          <h4 class="text-white font-semibold text-sm mb-6">Stats</h4>
          <div class="space-y-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <i class="fa-solid fa-users text-blue-400 text-xs"></i>
                <span class="text-white font-bold text-sm">{{ activeAnalysts }}</span>
              </div>
              <span class="text-xs text-gray-600">Active Analysts</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <i class="fa-solid fa-chart-line text-green-400 text-xs"></i>
                <span class="text-white font-bold text-sm">99.9%</span>
              </div>
              <span class="text-xs text-gray-600">Uptime</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="border-t border-white/5 pt-8">
        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-600">© {{ currentYear }} aki.qrarg.com. All rights reserved.</p>
          
          <div class="flex gap-6 items-center">
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
    </div>

    <!-- Developers Modal -->
    <transition name="fade">
      <div v-if="showDevelopersModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-gradient-to-r from-gray-900 to-black border-b border-white/10 px-6 py-6 flex items-center justify-between">
            <div>
              <h2 class="text-white font-bold text-2xl">Development Team</h2>
              <p class="text-xs text-gray-500 mt-1">Meet the talented minds behind QRARG aki</p>
            </div>
            <button @click="closeDevelopersModal" class="text-gray-500 hover:text-white transition-colors hover:bg-white/10 rounded-lg p-2">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-8 space-y-8">
            
            <!-- Supervisor Section -->
            <div>
              <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <i class="fa-solid fa-user-tie text-amber-400"></i>
                Project Supervisor
              </h3>
              <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <i class="fa-solid fa-user-tie text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-white font-bold text-base">Dr. Akhtaruzzaman</h4>
                      <p class="text-xs text-amber-400 font-medium">Project Supervisor</p>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <a href="mailto:akhtaruzzaman@qrarg.com" 
                       title="Email Dr. Akhtaruzzaman"
                       class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 transition-all">
                      <i class="fa-solid fa-envelope text-sm"></i>
                    </a>
                    <a href="https://linkedin.com/in/akhtaruzzaman" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       title="Visit Dr. Akhtaruzzaman's LinkedIn"
                       class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 transition-all">
                      <i class="fa-brands fa-linkedin text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Development Team Section -->
            <div>
              <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <i class="fa-solid fa-people-group text-blue-400"></i>
                Development Team
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="developer in developers" :key="developer.id" 
                     class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                  
                  <!-- Developer Card Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-start gap-3 flex-1">
                      <div class="w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0" 
                           :style="{ backgroundImage: `linear-gradient(to bottom right, ${developer.colorFrom}, ${developer.colorTo})` }">
                        <i :class="developer.icon" class="text-white text-lg"></i>
                      </div>
                      <div class="min-w-0">
                        <h4 class="text-white font-bold text-sm">{{ developer.name }}</h4>
                        <p class="text-xs text-blue-400 font-medium">{{ developer.role }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Icons -->
                  <div class="flex gap-2">
                    <a :href="`mailto:${developer.email}`" 
                       :title="`Email ${developer.name}`"
                       class="flex items-center justify-center flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all text-xs">
                      <i class="fa-solid fa-envelope text-sm mr-1"></i>
                      <span class="hidden sm:inline">Email</span>
                    </a>
                    <a :href="developer.linkedin" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       :title="`Visit ${developer.name}'s LinkedIn`"
                       class="flex items-center justify-center flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all text-xs">
                      <i class="fa-brands fa-linkedin text-sm mr-1"></i>
                      <span class="hidden sm:inline">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Note -->
            <div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <p class="text-xs text-gray-500">
                Have questions? Feel free to reach out to any team member directly.
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gradient-to-t from-black/40 to-transparent px-6 py-4 border-t border-white/10 flex gap-3">
            <button @click="closeDevelopersModal" 
                    class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all">
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script>
export default {
  name: 'StatsFooter',
  data() {
    return {
      activeAnalysts: 135,
      currentYear: new Date().getFullYear(),
      showDevelopersModal: false,
      developers: [
        {
          id: 1,
          name: 'Shuvo Singh Partho',
          role: 'Project Lead',
          email: 'partho23105101445@diu.edu.bd',
          linkedin: 'https://linkedin.com/in/shuvo-singh-partho',
          icon: 'fa-solid fa-crown',
          colorFrom: '#3b82f6',
          colorTo: '#8b5cf6'
        },
        {
          id: 2,
          name: 'Sachitro Halder',
          role: 'Senior Developer',
          email: 'sachitro@qrarg.com',
          linkedin: 'https://linkedin.com/in/sachitro-halder',
          icon: 'fa-solid fa-code',
          colorFrom: '#06b6d4',
          colorTo: '#3b82f6'
        },
        {
          id: 3,
          name: 'Methun Ahmed',
          role: 'Backend Developer',
          email: 'methun@qrarg.com',
          linkedin: 'https://linkedin.com/in/methun-ahmed',
          icon: 'fa-solid fa-server',
          colorFrom: '#10b981',
          colorTo: '#06b6d4'
        },
        {
          id: 4,
          name: 'Juniad Ahamed',
          role: 'UI Designer',
          email: 'juniad@qrarg.com',
          linkedin: 'https://linkedin.com/in/juniad-ahamed',
          icon: 'fa-solid fa-palette',
          colorFrom: '#f59e0b',
          colorTo: '#ef4444'
        }
      ]
    }
  },
  methods: {
    openDevelopersModal() {
      this.showDevelopersModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeDevelopersModal() {
      this.showDevelopersModal = false;
      document.body.style.overflow = 'auto';
    },
    navigateTo(section) {
      console.log(`Navigating to ${section}`);
      if (section === 'privacy') {
        alert('Privacy policy would open here');
      } else if (section === 'terms') {
        alert('Terms of service would open here');
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
/* Modal Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Smooth scrollbar styling for modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Button hover effects */
button {
  outline: none;
}

a {
  outline: none;
}
</style>