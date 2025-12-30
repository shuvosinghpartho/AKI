<template>
  <div class="training-container" :class="{ collapsed: isCollapsed }">
    
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="school-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI MODEL TRAIN</span>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">MODEL SELECTION</div>

        <div class="tool-item" :class="{ active: activeTool === 'models' }">
          <div class="tool-header" @click="toggleTool('models')">
            <ion-icon name="git-network-outline"></ion-icon>
            <span class="tool-label">Algorithms</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'models' ? '600px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <label class="sub-label">Select Algorithm</label>
              <div class="model-list">
                <div 
                  v-for="model in models" 
                  :key="model.name"
                  class="model-option"
                  :class="{ selected: selectedModel === model.name }"
                  @click="selectModel(model.name)"
                >
                  <ion-icon :name="model.icon"></ion-icon>
                  <span>{{ model.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'advanced' }">
          <div class="tool-header" @click="toggleTool('advanced')">
            <ion-icon name="options-outline"></ion-icon>
            <span class="tool-label">Advanced</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'advanced' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="placeholder-box">[Advanced Config]</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="nav-btn nav-next" @click="goToPredict">
          <span>NEXT STEP</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
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
            <div class="step active">TRAIN</div>
            <div class="step">PREDICT</div>
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
            <span class="panel-label" style="color: #ffcc00;">● CONFIGURATION</span>
            <ion-icon name="settings-outline" style="color:#666;"></ion-icon>
          </div>
          <div class="panel-content-pad">
            
            <div class="input-group">
              <label class="sub-label">Target Column (Y)</label>
              <select class="f-input" v-model="selectedTarget">
                <option value="" disabled>Select Target...</option>
                <option value="price">Price (Numerical)</option>
                <option value="category">Category (Categorical)</option>
                <option value="churn">Churn (Binary)</option>
              </select>
            </div>

            <div class="input-group">
              <label class="sub-label">Test Split Ratio</label>
              <select class="f-input" v-model="testSplitRatio">
                <option value="80-20">80% Train / 20% Test</option>
                <option value="70-30">70% Train / 30% Test</option>
                <option value="cv-5">Fold Cross Validation (5)</option>
              </select>
            </div>

            <div class="divider">HYPERPARAMETERS</div>
             
             <div class="input-row">
                <div class="input-group">
                  <label class="sub-label">n_estimators</label>
                  <input type="number" class="f-input" v-model.number="hyperparameters.n_estimators">
                </div>
                <div class="input-group">
                   <label class="sub-label">max_depth</label>
                  <input type="number" class="f-input" v-model.number="hyperparameters.max_depth">
                </div>
             </div>

             <button class="train-btn" :disabled="!selectedTarget || isTraining" @click="startTraining">
                <ion-icon name="play-circle-outline" style="font-size: 1.2rem;"></ion-icon>
                <span>{{ isTraining ? 'Training...' : 'START TRAINING' }}</span>
             </button>

          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label" style="color: var(--aki-primary);">● PERFORMANCE</span>
            <span class="status-badge">{{ trainingStatus }}</span>
          </div>
          <div class="panel-content-pad">
            
            <div class="metrics-row">
               <div class="metric-card">
                 <div class="m-val" style="color:var(--aki-primary)">{{ modelPerformance.accuracy }}%</div>
                 <div class="m-lbl">Accuracy</div>
               </div>
               <div class="metric-card">
                 <div class="m-val">{{ modelPerformance.f1Score }}</div>
                 <div class="m-lbl">F1 Score</div>
               </div>
               <div class="metric-card">
                 <div class="m-val">{{ modelPerformance.precision }}</div>
                 <div class="m-lbl">Precision</div>
               </div>
            </div>

            <div class="chart-area">
               <ion-icon name="bar-chart-outline"></ion-icon>
               <span>{{ chartPlaceholderText }}</span>
            </div>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'TrainingView',
  data() {
    return {
      // Structural State
      isCollapsed: false,
      activeTool: 'models',

      // Logic State
      selectedModel: 'Random Forest',
      selectedTarget: 'price',
      isTraining: false,
      testSplitRatio: '80-20',
      trainingStatus: 'Ready',
      
      models: [
        { name: 'Random Forest', icon: 'git-network-outline' },
        { name: 'Linear Regression', icon: 'trending-up-outline' },
        { name: 'Logistic Regression', icon: 'analytics-outline' },
        { name: 'Decision Tree', icon: 'git-merge-outline' },
        { name: 'XGBoost', icon: 'rocket-outline' },
      ],

      hyperparameters: {
        n_estimators: 100,
        max_depth: 10,
        criterion: 'gini'
      },

      modelPerformance: {
        accuracy: '0.0',
        f1Score: '0.00',
        precision: '0.00'
      }
    }
  },
  computed: {
    chartPlaceholderText() {
      if (this.isTraining) return 'Training in progress...'
      if (this.trainingStatus === 'Completed') return 'Feature Importance Visualization'
      return 'Train model to view stats'
    }
  },
  methods: {
    // UI Structure Methods
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      if(this.isCollapsed) {
        this.activeTool = null
      } else {
        this.activeTool = 'models'
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
    selectModel(name) {
      this.selectedModel = name
    },

    startTraining() {
      this.isTraining = true
      this.trainingStatus = 'Training...'
      
      setTimeout(() => {
        this.isTraining = false
        this.trainingStatus = 'Completed'
        this.modelPerformance = {
          accuracy: '94.2',
          f1Score: '0.89',
          precision: '0.91'
        }
      }, 2000)
    },

    // Navigation
    goHome() {
      this.$router.push('/')
    },
    goToPredict() {
      this.$router.push('/predict')
    }
  }
}
</script>

<style scoped>
/* --- DESIGN TOKENS --- */
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

.training-container {
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

.training-container.collapsed .sidebar { width: var(--sidebar-collapsed); }
.training-container.collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

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
.training-container.collapsed .logo-container { padding: 0 0 20px 0; text-align: center; }

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
  padding: 12px 14px; 
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
  font-size: 0.85rem; 
  font-weight: 500;
  transition: 0.2s;
  min-height: 50px; 
}

.tool-header ion-icon { font-size: 1.1rem; color: var(--aki-primary); flex-shrink: 0; }
.tool-item:hover { background: rgba(255,255,255,0.05); }
.tool-item.active { border-color: rgba(0, 240, 255, 0.4); background: var(--aki-primary-dim); }
.tool-item.active .tool-header { color: white; }

.training-container.collapsed .tool-header { justify-content: center; padding: 12px 0; }
.training-container.collapsed .tool-label, .training-container.collapsed .chevron { display: none; }

/* Tool Content Form */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(0,0,0,0.3);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.05); }

.form-pad { padding: 15px 12px; }

/* --- CUSTOM TRAINING SIDEBAR LIST --- */
.model-list { display: flex; flex-direction: column; gap: 4px; }
.model-option {
  padding: 10px; 
  border-radius: 4px; cursor: pointer; color: #888;
  display: flex; align-items: center; gap: 10px; font-size: 0.8rem; 
  transition: 0.2s;
}
.model-option:hover { background: rgba(255,255,255,0.05); color: white; }
.model-option.selected { background: var(--aki-primary-dim); color: var(--aki-primary); border: 1px solid rgba(0,240,255,0.2); }


/* Sidebar Footer */
.sidebar-footer {
  margin-top: auto;
  padding: 15px 12px;
  border-top: 1px solid var(--border-glass);
}
.nav-next {
  width: 100%;
  background: var(--aki-danger);
  color: white;
  padding: 14px; 
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem; 
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
  transition: 0.2s;
}
.nav-next:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 42, 109, 0.4); }
.training-container.collapsed .nav-next span { display: none; }

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

/* Form Elements */
.input-group { display: flex; flex-direction: column; gap: 6px; }
.sub-label { font-size: 0.75rem; color: #999; font-weight: 500; }
.f-input {
  background: rgba(0,0,0,0.3); border: 1px solid #333; color: white;
  padding: 10px; border-radius: 6px; outline: none; font-size: 0.8rem;
}
.f-input:focus { border-color: var(--aki-primary); }

.divider {
  border-top: 1px solid var(--border-glass); margin-top: 10px; padding-top: 15px;
  font-size: 0.7rem; color: var(--aki-primary); font-weight: 700; letter-spacing: 1px;
}
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

/* --- ENHANCED TRAIN BUTTON --- */
.train-btn {
  margin-top: auto; 
  background: linear-gradient(90deg, var(--aki-primary) 0%, #00C2CE 100%); 
  color: white; /* Changed from black to white */
  border: none;
  padding: 14px; 
  border-radius: 6px; 
  font-weight: 800; 
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 240, 255, 0.2); 
}

/* Hover Effect with Pop & Glow */
.train-btn:hover:not(:disabled) { 
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.6); 
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.1);
}

.train-btn:disabled { 
  background: #333; 
  color: #777; 
  opacity: 0.7; 
  cursor: not-allowed; 
  box-shadow: none; 
}

/* Performance Elements */
.status-badge { font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; color: #aaa; }
.metrics-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.metric-card { background: rgba(255,255,255,0.03); border: 1px solid #333; padding: 10px; border-radius: 8px; text-align: center; }
.m-val { font-size: 1.2rem; font-weight: 700; color: white; }
.m-lbl { font-size: 0.65rem; color: #777; margin-top: 2px; text-transform: uppercase; }

.chart-area {
  flex: 1; background: rgba(0,0,0,0.2); border: 1px dashed #333; border-radius: 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; color: #555; gap: 10px;
  min-height: 200px;
}
.chart-area ion-icon { font-size: 3rem; opacity: 0.3; }

.placeholder-box { padding: 10px; border: 1px dashed #444; text-align: center; color: #666; font-size: 0.7rem; border-radius: 6px; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>