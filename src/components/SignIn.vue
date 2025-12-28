<template>
  <div class="signin-container">
    <!-- Background Elements -->
    <div class="mesh-bg"></div>
    <div class="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-[-1]"></div>

    <!-- Main Card Container -->
    <div class="glass-panel w-full max-w-[1200px] min-h-[700px] rounded-3xl flex flex-col lg:flex-row overflow-hidden relative animate-fade-in-up">
        
      <!-- LEFT SIDE: Visual Brand Experience -->
      <div class="relative lg:w-1/2 p-12 flex flex-col justify-between overflow-hidden bg-black/40">
        <!-- Animated 3D Grid Background -->
        <div class="absolute inset-0 grid-animation opacity-30"></div>
        
        <!-- Logo Area -->
        <div class="relative z-10 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-red-900 flex items-center justify-center shadow-lg shadow-red-900/50">
            <i class="fa-solid fa-cube text-white text-lg"></i>
          </div>
          <span class="font-display font-bold text-2xl tracking-tight text-white">AKI</span>
        </div>

        <!-- Hero Text -->
        <div class="relative z-10 mt-auto mb-12">
          <div class="inline-block px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span class="text-xs font-medium text-red-400 tracking-wider uppercase">System v4.0 Online</span>
          </div>
          <h1 class="font-display text-5xl font-bold leading-tight mb-6">
            Artificial<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Kinetic</span><br/>
            Intelligence
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed max-w-md">
            Access the neural network. Monitor real-time analytics and manage your kinetic models with precision.
          </p>
        </div>

        <!-- Stats / Social Proof -->
        <div class="relative z-10 pt-8 border-t border-white/10 flex gap-8">
          <div>
            <h4 class="text-2xl font-display font-bold text-white">1.2M+</h4>
            <span class="text-sm text-gray-500">Active Nodes</span>
          </div>
          <div>
            <h4 class="text-2xl font-display font-bold text-white">99.9%</h4>
            <span class="text-sm text-gray-500">Uptime</span>
          </div>
        </div>
        
        <!-- Decorative Glow -->
        <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <!-- RIGHT SIDE: Login Interface -->
      <div class="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.02]">
        <div class="w-full max-w-md mx-auto">
          
          <!-- Header -->
          <div class="mb-10">
            <h2 class="font-display text-3xl font-bold mb-2">Welcome Back</h2>
            <p class="text-gray-400">Please enter your credentials to access the dashboard.</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            
            <!-- Email Field -->
            <div class="input-group">
              <input 
                type="email" 
                v-model="formData.email" 
                id="email" 
                class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                placeholder="Email" 
                required
                :class="{ 'border-red-500': errors.email }"
              >
              <label for="email" class="input-label">Email Address</label>
              <i class="fa-regular fa-envelope absolute right-4 top-4 text-gray-500"></i>
              <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
            </div>

            <!-- Password Field -->
            <div class="input-group">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="formData.password" 
                id="password" 
                class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                placeholder="Password" 
                required
                :class="{ 'border-red-500': errors.password }"
              >
              <label for="password" class="input-label">Password</label>
              <button 
                type="button" 
                @click="togglePassword" 
                class="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors focus:outline-none"
              >
                <i :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" id="eyeIcon"></i>
              </button>
              <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</span>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="formData.rememberMe" 
                  class="custom-checkbox w-4 h-4 rounded border-gray-600 bg-transparent text-brand-red focus:ring-offset-0 focus:ring-transparent transition-colors"
                >
                <span class="ml-2 text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <a href="#" class="text-brand-red hover:text-red-400 font-medium transition-colors">Forgot Password?</a>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isLoading"
              class="btn-primary w-full py-4 rounded-xl font-semibold text-lg tracking-wide shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing In...</span>
              <span v-else>Sign In</span>
            </button>
            
            <!-- Divider -->
            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white/10"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-[#141416] text-gray-500">Or continue with</span>
              </div>
            </div>

            <!-- Social Login -->
            <div class="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                @click="socialLogin('google')"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <i class="fa-brands fa-google text-gray-400 group-hover:text-white transition-colors"></i>
                <span class="text-sm font-medium text-gray-300 group-hover:text-white">Google</span>
              </button>
              <button 
                type="button" 
                @click="socialLogin('github')"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <i class="fa-brands fa-github text-gray-400 group-hover:text-white transition-colors"></i>
                <span class="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</span>
              </button>
            </div>
          </form>

          <!-- Footer -->
          <p class="mt-8 text-center text-sm text-gray-500">
            Don't have an account?
            <router-link to="/signup" class="text-white font-medium hover:underline">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        rememberMe: false
      },
      showPassword: false,
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    validateForm() {
      this.errors = {}
      
      if (!this.formData.email) {
        this.errors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
        this.errors.email = 'Please enter a valid email'
      }
      
      if (!this.formData.password) {
        this.errors.password = 'Password is required'
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Handle successful login
        console.log('Login successful:', {
          email: this.formData.email,
          rememberMe: this.formData.rememberMe
        })
        
        // Redirect to home page or dashboard
        this.$router.push('/')
        
      } catch (error) {
        console.error('Login failed:', error)
        this.errors.general = 'Login failed. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
    
    socialLogin(provider) {
      console.log(`Social login with ${provider}`)
      // Implement social login logic here
      // This would typically redirect to OAuth providers
    }
  }
}
</script>

<style scoped>
/* Import existing styles from the original signin.html */
@import url('https://cdn.tailwindcss.com');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

.signin-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #050505;
  color: white;
  overflow-x: hidden;
}

/* Dynamic Mesh Gradient Background */
.mesh-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: 
    radial-gradient(at 0% 0%, hsla(0, 86%, 59%, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsla(0, 91%, 63%, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(260, 100%, 60%, 0.05) 0px, transparent 50%);
  filter: blur(80px);
}

/* Glassmorphism Panel */
.glass-panel {
  background: rgba(20, 20, 23, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Custom Input Styling */
.input-group {
  position: relative;
}

.input-field {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: #FF3B30;
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 59, 48, 0.1);
}

.input-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  color: #9CA3AF;
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  transform: translateY(-2.5rem);
  font-size: 0.875rem;
  color: #FF3B30;
  font-weight: 500;
}

/* Button Gradient Hover */
.btn-primary {
  background: linear-gradient(135deg, #FF3B30 0%, #D70015 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(255, 59, 48, 0.5);
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}

.btn-primary:hover:not(:disabled)::after {
  left: 100%;
}

/* 3D Grid Animation for Left Side */
.grid-animation {
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  transform: perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px);
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: perspective(1000px) rotateX(60deg) translateY(0) translateZ(-200px); }
  100% { transform: perspective(1000px) rotateX(60deg) translateY(50px) translateZ(-200px); }
}

/* Checkbox Customization */
.custom-checkbox:checked {
  background-color: #FF3B30;
  border-color: #FF3B30;
}

/* Animation keyframes for consistency */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  0% { box-shadow: 0 0 20px -10px rgba(255, 59, 48, 0.5); }
  100% { box-shadow: 0 0 30px 5px rgba(255, 59, 48, 0.3); }
}
</style>
