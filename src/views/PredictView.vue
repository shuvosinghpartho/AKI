<template>
  <div class="predict-container" :class="{ collapsed: isCollapsed }">
    
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="bulb-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI PREDICT</span>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">PREDICTION TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'input-mode' }">
          <div class="tool-header" @click="toggleTool('input-mode')">
            <ion-icon name="create-outline"></ion-icon>
            <span class="tool-label">Input Mode</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'input-mode' ? '200px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <div class="model-option selected">
                 <ion-icon name="keypad-outline"></ion-icon>
                 <span>Manual Entry</span>
               </div>
               <div class="model-option">
                 <ion-icon name="cloud-upload-outline"></ion-icon>
                 <span>Batch CSV</span>
               </div>
            </div>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-btn nav-finish" @click="goHome">
          <span>FINISH</span>
          <ion-icon name="checkmark-circle-outline"></ion-icon>
        </button>
      </div>
    </nav>

    <main class="main-view">
      
      <header class="top-header">
        <div class="header-left">
          <button class="menu-toggle" @click="toggleSidebar">
            <ion-icon name="menu-outline"></ion-icon>
          </button>
        </div>

        <div class="header-center">
          <div class="pipeline">
            <div class="step">CLEAN</div>
            <div class="step">FILTER</div>
            <div class="step">PROCESS</div>
            <div class="step">TRAIN</div>
            <div class="step active">PREDICT</div>
          </div>
        </div>

        <div class="header-right">
          <button class="top-nav-btn" @click="goHome">
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
          </button>
          
          <button class="top-nav-btn logout">
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
          </button>
          
          <div class="user-avatar">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
        </div>
      </header>

      <div class="content-grid">
        
        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label" style="color: #ffcc00;">● INPUT FEATURES</span>
            <ion-icon name="create-outline" style="color:#666;"></ion-icon>
          </div>
          <div class="panel-content-pad">
            
            <div class="input-group">
              <label class="sub-label">Bedrooms</label>
              <input type="number" class="f-input" v-model.number="formData.bedrooms" placeholder="e.g. 3">
            </div>

            <div class="input-group">
              <label class="sub-label">Bathrooms</label>
              <input type="number" class="f-input" v-model.number="formData.bathrooms" placeholder="e.g. 2">
            </div>

            <div class="input-group">
              <label class="sub-label">Square Footage</label>
              <input type="number" class="f-input" v-model.number="formData.squareFootage" placeholder="e.g. 1500">
            </div>

            <div class="input-group">
              <label class="sub-label">Year Built</label>
              <input type="number" class="f-input" v-model.number="formData.yearBuilt" placeholder="e.g. 2010">
            </div>

             <div class="input-group">
              <label class="sub-label">Location Score (1-10)</label>
              <input type="number" class="f-input" v-model.number="formData.locationScore" min="1" max="10" placeholder="e.g. 8">
            </div>

            <button class="action-btn-main" @click="runPrediction" :disabled="!isFormValid">
               Run Prediction
            </button>

          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label" style="color: var(--aki-primary);">● PREDICTION RESULT</span>
            <ion-icon name="flash-outline" style="color:#666;"></ion-icon>
          </div>
          <div class="panel-content-pad centered-content">
            
            <div v-if="!showResults" class="empty-state">
               <ion-icon name="cube-outline"></ion-icon>
               <p>Enter details and run prediction to see output</p>
            </div>

            <div v-else class="result-box">
               <div class="lbl">ESTIMATED VALUE</div>
               <div class="val">${{ formatNumber(predictionResult.value) }}</div>
               
               <div class="conf-badge">
                 Confidence: {{ predictionResult.confidence }}%
               </div>
               
               <div class="meta-info">
                 Model: {{ predictionResult.model }}
               </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PredictView',
  data() {
    return {
      // Structural State
      isCollapsed: false,
      activeTool: 'input-mode',

      // Logic State
      formData: {
        bedrooms: null,
        bathrooms: null,
        squareFootage: null,
        yearBuilt: null,
        locationScore: null
      },
      showResults: false,
      predictionResult: {
        value: 0,
        confidence: 0,
        model: 'Random Forest v1.0'
      }
    }
  },
  computed: {
    isFormValid() {
      return Object.values(this.formData).every(value => 
        value !== null && value !== '' && value !== undefined
      )
    }
  },
  methods: {
    // UI Structure Methods
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      if(this.isCollapsed) {
        this.activeTool = null
      } else {
        this.activeTool = 'input-mode'
      }
    },
    toggleTool(toolName) {
      if(this.isCollapsed) {
        this.isCollapsed = false
        setTimeout(() => { this.activeTool = toolName }, 200)
        return
      }
      this.activeTool = this.activeTool === toolName ? null : toolName
    },

    // Logic Methods
    runPrediction() {
      if (!this.isFormValid) return

      this.showResults = false
      
      // Simulation logic
      const baseValue = 500000
      const bedroomsValue = (this.formData.bedrooms || 0) * 50000
      const bathroomsValue = (this.formData.bathrooms || 0) * 30000
      const squareFootageValue = (this.formData.squareFootage || 0) * 200
      const agePenalty = Math.max(0, 2024 - (this.formData.yearBuilt || 2024)) * 1000
      const locationMultiplier = (this.formData.locationScore || 5) * 0.1

      const calculatedValue = Math.round(
        (baseValue + bedroomsValue + bathroomsValue + squareFootageValue - agePenalty) * (1 + locationMultiplier)
      )

      setTimeout(() => {
        this.predictionResult = {
          value: Math.max(calculatedValue, 100000),
          confidence: 89,
          model: 'Random Forest v1.0'
        }
        this.showResults = true
      }, 600)
    },

    formatNumber(number) {
      return new Intl.NumberFormat('en-US').format(number)
    },

    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* --- DESIGN TOKENS (Exact copy from CleaningView) --- */
:host {
  --bg-deep: #050505;
  --bg-glass: rgba(20, 20, 20, 0.75);
  --border-glass: rgba(255, 255, 255, 0.08);
  
  --aki-primary: #00F0FF; 
  --aki-primary-dim: rgba(0, 240, 255, 0.08);
  --aki-danger: #FF2A6D;  
  
  --text-main: #ffffff;
  --text-muted: #888899;
  
  --sidebar-width: 280px;
  --sidebar-collapsed: 70px;
  --trans-speed: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

.predict-container {
  background-color: var(--bg-deep);
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 240, 255, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(255, 42, 109, 0.05) 0px, transparent 50%);
  color: var(--text-main);
  height: 100vh;
  display: flex;
  overflow: hidden;
  transition: all var(--trans-speed);
}

/* ===========================
   1. SIDEBAR
=========================== */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-glass);
  display: flex;
  flex-direction: column;
  transition: width var(--trans-speed);
  position: relative;
  z-index: 100;
  padding: 15px 0;
  overflow: hidden;
}

.predict-container.collapsed .sidebar { width: var(--sidebar-collapsed); }
.predict-container.collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

/* Logo */
.logo-container {
  padding: 0 20px 20px 20px;
  white-space: nowrap;
}
.logo-text {
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #bbb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.predict-container.collapsed .logo-container { padding: 0 0 20px 0; text-align: center; }

/* Tools Wrapper */
.tools-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 0.65rem;
  color: #555;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 5px;
  padding-left: 4px;
}

/* Accordion Item */
.tool-item {
  border: 1px solid var(--border-glass);
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
}

.tool-header {
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
  font-size: 0.8rem;
  font-weight: 500;
  transition: 0.2s;
  min-height: 45px;
}

.tool-header ion-icon { font-size: 1rem; color: var(--aki-primary); flex-shrink: 0; }
.tool-item:hover { background: rgba(255,255,255,0.05); }
.tool-item.active { border-color: rgba(0, 240, 255, 0.4); background: var(--aki-primary-dim); }
.tool-item.active .tool-header { color: white; }

.predict-container.collapsed .tool-header { justify-content: center; padding: 12px 0; }
.predict-container.collapsed .tool-label, .predict-container.collapsed .chevron { display: none; }

/* Tool Content Form */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(0,0,0,0.3);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.05); }

.form-pad { padding: 15px 12px; }

/* Custom Options in Sidebar */
.model-option {
  padding: 8px; border-radius: 4px; cursor: pointer; color: #888;
  display: flex; align-items: center; gap: 10px; font-size: 0.75rem;
  transition: 0.2s; margin-bottom: 4px;
}
.model-option:hover { background: rgba(255,255,255,0.05); color: white; }
.model-option.selected { background: var(--aki-primary-dim); color: var(--aki-primary); border: 1px solid rgba(0,240,255,0.2); }

/* Sidebar Footer */
.sidebar-footer {
  margin-top: auto;
  padding: 15px 12px;
  border-top: 1px solid var(--border-glass);
}
.nav-finish {
  width: 100%;
  background: #666; /* Grey for finish/home */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  transition: 0.2s;
}
.nav-finish:hover { background: #888; }
.predict-container.collapsed .nav-finish span { display: none; }

/* ===========================
   2. MAIN VIEW
=========================== */
.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border-bottom: 1px solid var(--border-glass);
  position: relative; 
}

.header-left { display: flex; align-items: center; gap: 20px; z-index: 2; }
.header-right { display: flex; align-items: center; gap: 15px; z-index: 2; }

/* === HEADER CENTER (PIPELINE) === */
.header-center {
  position: absolute;
  left: 42%;
  transform: translateX(-50%);
  z-index: 1;
}

.menu-toggle {
  background: transparent; border: none; color: white;
  font-size: 1.6rem; cursor: pointer; display: flex;
}
.menu-toggle:hover { color: var(--aki-primary); }

.pipeline {
  display: flex; gap: 4px; background: #0a0a0a;
  padding: 4px; border-radius: 50px; border: 1px solid #222;
}
.step {
  padding: 5px 14px; border-radius: 40px; font-size: 0.7rem;
  font-weight: 600; color: #555; cursor: default;
}
.step.active {
  background: #1f1f1f; color: var(--aki-primary); border: 1px solid #333;
}

.top-nav-btn {
  background: transparent;
  border: 1px solid var(--border-glass);
  color: #aaa;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  transition: 0.2s;
}
.top-nav-btn:hover { border-color: #666; color: white; background: rgba(255,255,255,0.05); }
.top-nav-btn.logout:hover { border-color: var(--aki-danger); color: var(--aki-danger); }

.user-avatar { font-size: 1.8rem; color: #444; display: flex; align-items: center; }

/* === CONTENT GRID === */
.content-grid {
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  overflow: hidden;
}

.glass-panel {
  background: rgba(15, 15, 17, 0.6);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-head {
  padding: 12px 18px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--border-glass);
  display: flex; justify-content: space-between; align-items: center;
}
.panel-label { font-size: 0.8rem; font-weight: 700; color: #ddd; letter-spacing: 0.5px; }
.panel-content-pad { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; }
.centered-content { align-items: center; justify-content: center; }

/* Form Elements */
.input-group { display: flex; flex-direction: column; gap: 6px; }
.sub-label { font-size: 0.75rem; color: #999; font-weight: 500; }
.f-input {
  background: rgba(0,0,0,0.3); border: 1px solid #333; color: white;
  padding: 10px; border-radius: 6px; outline: none; font-size: 0.8rem;
}
.f-input:focus { border-color: var(--aki-primary); }

.action-btn-main {
  margin-top: 20px; width: 100%; background: var(--aki-primary); color: #000; border: none;
  padding: 12px; border-radius: 6px; font-weight: 700; cursor: pointer;
  transition: 0.2s;
}
.action-btn-main:hover:not(:disabled) { box-shadow: 0 0 15px var(--aki-primary-dim); transform: translateY(-1px); }
.action-btn-main:disabled { opacity: 0.5; cursor: not-allowed; }

/* Result Elements */
.empty-state { text-align: center; color: #555; font-size: 0.8rem; }
.empty-state ion-icon { font-size: 3rem; margin-bottom: 10px; opacity: 0.3; }

.result-box { text-align: center; animation: popIn 0.4s ease; }
@keyframes popIn { 0% { opacity:0; transform: scale(0.9); } 100% { opacity:1; transform: scale(1); } }

.lbl { font-size: 0.75rem; color: #888; letter-spacing: 2px; margin-bottom: 10px; }
.val { font-size: 3rem; font-weight: 800; color: var(--aki-primary); text-shadow: 0 0 20px var(--aki-primary-dim); }
.conf-badge {
  display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid #333;
  padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; color: #aaa; margin: 15px 0;
}
.meta-info { font-size: 0.7rem; color: #555; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>