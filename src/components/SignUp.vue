<template>
  <div class="signup-container">
    <!-- Background Elements -->
    <div class="mesh-bg"></div>
    <div class="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-[-1]"></div>

    <!-- Main Card Container -->
    <div class="glass-panel w-full max-w-[1200px] h-[85vh] min-h-[700px] rounded-3xl flex flex-col lg:flex-row overflow-hidden relative animate-fade-in-up">
      
      <!-- LEFT SIDE: Visual Brand Experience -->
      <div class="relative lg:w-5/12 p-12 flex flex-col justify-between overflow-hidden bg-black/40 hidden lg:flex">
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
            <span class="text-xs font-medium text-red-400 tracking-wider uppercase">New Node Initialization</span>
          </div>
          <h1 class="font-display text-4xl font-bold leading-tight mb-6">
            Join the<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">AKI</span>
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed max-w-sm">
            Contribute to the collective intelligence. Create your identity to access advanced kinetic models.
          </p>
        </div>

        <!-- Decorative Glow -->
        <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <!-- RIGHT SIDE: Sign Up Interface -->
      <div class="lg:w-7/12 flex flex-col bg-white/[0.02] relative">
        
        <!-- Scrollable Form Area -->
        <div class="flex-1 overflow-y-auto custom-scroll p-8 md:p-12">
          <div class="w-full max-w-lg mx-auto">
            
            <!-- Mobile Header (Visible only on small screens) -->
            <div class="lg:hidden mb-8 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center">
                <i class="fa-solid fa-cube text-white text-sm"></i>
              </div>
              <span class="font-display font-bold text-xl">AKI</span>
            </div>

            <h2 class="font-display text-3xl font-bold mb-2">Create Account</h2>
            <p class="text-gray-400 mb-8">Enter your details to register.</p>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              
              <!-- Row 1: Names -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="input-group">
                  <input 
                    type="text" 
                    v-model="formData.firstName" 
                    id="firstName" 
                    class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                    placeholder="First Name" 
                    required
                    :class="{ 'border-red-500': errors.firstName }"
                  >
                  <label for="firstName" class="input-label">First Name *</label>
                  <span v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</span>
                </div>
                <div class="input-group">
                  <input 
                    type="text" 
                    v-model="formData.lastName" 
                    id="lastName" 
                    class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                    placeholder="Last Name" 
                    required
                    :class="{ 'border-red-500': errors.lastName }"
                  >
                  <label for="lastName" class="input-label">Last Name *</label>
                  <span v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</span>
                </div>
              </div>

              <!-- Email -->
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
                <label for="email" class="input-label">Email Address *</label>
                <i class="fa-regular fa-envelope absolute right-4 top-4 text-gray-500"></i>
                <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
              </div>

              <!-- Password -->
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
                <label for="password" class="input-label">Password *</label>
                <button 
                  type="button" 
                  @click="togglePassword" 
                  class="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors focus:outline-none"
                >
                  <i :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                </button>
                <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</span>
              </div>

              <!-- Row 2: Role & DOB -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="input-group">
                  <select 
                    v-model="formData.role" 
                    id="role" 
                    class="input-field w-full px-4 py-4 rounded-xl text-white focus:ring-0 appearance-none bg-transparent" 
                    required
                    :class="{ 'border-red-500': errors.role }"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="student">Student</option>
                    <option value="researcher">Researcher</option>
                    <option value="industry">Industry</option>
                    <option value="guest">Guest</option>
                  </select>
                  <label for="role" class="input-label">Role *</label>
                  <i class="fa-solid fa-chevron-down absolute right-4 top-4 text-gray-500 pointer-events-none text-xs"></i>
                  <span v-if="errors.role" class="text-red-500 text-sm mt-1">{{ errors.role }}</span>
                </div>

                <div class="input-group">
                  <input 
                    type="date" 
                    v-model="formData.dob" 
                    id="dob" 
                    class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                    required
                    :class="{ 'border-red-500': errors.dob }"
                  >
                  <label for="dob" class="input-label">Date of Birth *</label>
                  <span v-if="errors.dob" class="text-red-500 text-sm mt-1">{{ errors.dob }}</span>
                </div>
              </div>

              <!-- Institution -->
              <div class="input-group">
                <input 
                  type="text" 
                  v-model="formData.institution" 
                  id="institution" 
                  class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0" 
                  placeholder="Institution" 
                  required
                  :class="{ 'border-red-500': errors.institution }"
                >
                <label for="institution" class="input-label">Institution *</label>
                <i class="fa-solid fa-building-columns absolute right-4 top-4 text-gray-500"></i>
                <span v-if="errors.institution" class="text-red-500 text-sm mt-1">{{ errors.institution }}</span>
              </div>

              <!-- Country -->
              <div class="input-group">
                <select 
                  v-model="formData.country" 
                  id="country" 
                  class="input-field w-full px-4 py-4 rounded-xl text-white focus:ring-0 appearance-none bg-transparent" 
                  required
                  :class="{ 'border-red-500': errors.country }"
                >
                  <option value="bangladesh">Bangladesh</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="india">India</option>
                  <!-- Add more as needed -->
                </select>
                <label for="country" class="input-label">Country *</label>
                <i class="fa-solid fa-earth-asia absolute right-4 top-4 text-gray-500 pointer-events-none text-xs"></i>
                <span v-if="errors.country" class="text-red-500 text-sm mt-1">{{ errors.country }}</span>
              </div>

              <!-- Address -->
              <div class="input-group">
                <textarea 
                  v-model="formData.address" 
                  id="address" 
                  rows="2" 
                  class="input-field w-full px-4 py-4 rounded-xl text-white placeholder-transparent focus:ring-0 resize-none" 
                  placeholder="Address"
                ></textarea>
                <label for="address" class="input-label">Address</label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="isLoading"
                class="btn-primary w-full py-4 rounded-xl font-semibold text-lg tracking-wide shadow-lg shadow-red-900/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading">Creating Account...</span>
                <span v-else>Complete Registration</span>
              </button>

            </form>
          </div>
        </div>

        <!-- Footer Area (Sticky bottom of right panel) -->
        <div class="p-6 border-t border-white/5 bg-black/20 backdrop-blur-sm z-20">
          <div class="w-full max-w-lg mx-auto flex items-center justify-center gap-2">
            <span class="text-sm text-gray-400">Already a member?</span>
            <router-link to="/signin" class="text-sm font-medium text-white hover:text-brand-red transition-colors">
              Log In here
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        dob: '',
        institution: '',
        country: 'bangladesh',
        address: ''
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
      
      if (!this.formData.firstName) {
        this.errors.firstName = 'First name is required'
      }
      
      if (!this.formData.lastName) {
        this.errors.lastName = 'Last name is required'
      }
      
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
      
      if (!this.formData.role) {
        this.errors.role = 'Role is required'
      }
      
      if (!this.formData.dob) {
        this.errors.dob = 'Date of birth is required'
      }
      
      if (!this.formData.institution) {
        this.errors.institution = 'Institution is required'
      }
      
      if (!this.formData.country) {
        this.errors.country = 'Country is required'
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
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Handle successful registration
        console.log('Registration successful:', {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          role: this.formData.role,
          institution: this.formData.institution,
          country: this.formData.country
        })
        
        // Redirect to signin page
        this.$router.push('/signin')
        
      } catch (error) {
        console.error('Registration failed:', error)
        this.errors.general = 'Registration failed. Please try again.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Import existing styles from the original signup.html */
@import url('https://cdn.tailwindcss.com');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

.signup-container {
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
  appearance: none; /* Removes default browser styles */
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

/* Float label logic */
.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label,
.input-field:-webkit-autofill ~ .input-label {
  transform: translateY(-2.5rem);
  font-size: 0.875rem;
  color: #FF3B30;
  font-weight: 500;
}

/* Select Dropdown specific fix */
select.input-field {
  color: white; 
}
select.input-field option {
  background-color: #1C1C1E; /* Dark dropdown menu */
  color: white;
}

/* Date Input specific fix */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1); /* Makes the calendar icon white */
  cursor: pointer;
  opacity: 0.6;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Scrollbar for the form container */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
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

/* 3D Grid Animation */
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

/* Animation keyframes for consistency */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  0% { box-shadow: 0 0 20px -10px rgba(255, 59, 48, 0.5); }
  100% { box-shadow: 0 0 30px 5px rgba(255, 59, 48, 0.3); }
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
