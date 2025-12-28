<template>
  <div class="training-container">
    <!-- Target Selection Modal -->
    <div class="modal-backdrop" :class="{ hidden: !showTargetModal }">
      <div class="modal-content">
        <div class="modal-icon">
          <ion-icon name="locate-outline"></ion-icon>
        </div>
        <h2 class="modal-title">Select Target Column</h2>
        <p class="modal-desc">Before training, select the column you want your model to predict from your dataset.</p>
        
        <div style="text-align: left; margin-bottom: 20px;">
          <label style="font-size: 0.75rem; color: #888; margin-bottom: 5px; display: block;">Target Variable (Y)</label>
          <select class="custom-select" v-model="selectedTarget">
            <option value="" disabled>Select a column...</option>
            <option value="price">Price (Numerical)</option>
            <option value="category">Category (Categorical)</option>
            <option value="churn">Churn (Binary)</option>
          </select>
        </div>

        <button class="target-btn" @click="confirmTarget">Confirm Selection</button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand-text">AKI <span style="color:var(--aki-red)">DataSuite</span></div>
      </div>
      
      <div class="sidebar-content">
        <div class="section-label">Supervised Learning</div>
        
        <div 
          v-for="model in models" 
          :key="model.name"
          class="model-item"
          :class="{ active: selectedModel === model.name }"
          @click="selectModel(model.name)"
        >
          <span>{{ model.name }}</span>
          <ion-icon :name="model.icon"></ion-icon>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="btn-prev" @click="goToProcess">
          Back
        </button>
        <button class="btn-next" @click="goToPredict">
          Predict <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="top-bar">
        <div style="display:flex; align-items:center; gap:20px;">
          <div class="menu-toggle" @click="toggleSidebar">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div class="pipeline-stepper">
            <div class="step">CLEAN</div>
            <div class="step">FILTER</div>
            <div class="step">PROCESS</div>
            <div class="step active">TRAIN</div>
            <div class="step">PREDICT</div>
          </div>
        </div>
        
        <div style="display:flex; gap:15px;">
          <button class="action-btn" title="Save">
            <ion-icon name="save-outline"></ion-icon>
          </button>
          <button class="action-btn" title="Home" @click="goHome">
            <ion-icon name="home-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div class="dashboard-grid">
        
        <!-- Configuration Panel -->
        <div class="panel">
          <div class="panel-header">
            <span>
              <ion-icon name="settings-outline" style="margin-right:8px; vertical-align:middle;"></ion-icon> 
              Configuration
            </span>
          </div>
          <div class="config-scroll">
            <div class="form-group">
              <label>Target Column</label>
              <input 
                type="text" 
                class="custom-input" 
                :value="targetDisplay" 
                disabled 
                style="opacity: 0.6; cursor: not-allowed;"
              >
            </div>
            
            <div class="form-group">
              <label>Test Split Ratio</label>
              <select class="custom-select" v-model="testSplitRatio">
                <option value="80-20">80% Train / 20% Test</option>
                <option value="70-30">70% Train / 30% Test</option>
                <option value="cv-5">Fold Cross Validation (5)</option>
              </select>
            </div>

            <div style="border-top: 1px solid var(--border-color); margin: 15px 0; padding-top: 15px;">
              <label style="color:var(--aki-teal); font-size:0.75rem; font-weight:600; margin-bottom:10px; display:block;">
                HYPERPARAMETERS
              </label>
              
              <div class="form-group">
                <label>n_estimators (Trees)</label>
                <input 
                  type="number" 
                  class="custom-input" 
                  v-model.number="hyperparameters.n_estimators"
                >
              </div>
              <div class="form-group">
                <label>max_depth</label>
                <input 
                  type="number" 
                  class="custom-input" 
                  v-model.number="hyperparameters.max_depth"
                >
              </div>
              <div class="form-group">
                <label>Criterion</label>
                <select class="custom-select" v-model="hyperparameters.criterion">
                  <option value="gini">Gini Impurity</option>
                  <option value="entropy">Entropy</option>
                </select>
              </div>
            </div>

            <button 
              class="train-btn-large" 
              :disabled="!selectedTarget || isTraining"
              @click="startTraining"
            >
              <ion-icon name="play-circle-outline" style="font-size:1.2rem;"></ion-icon>
              {{ isTraining ? 'Training...' : 'Start Training' }}
            </button>
          </div>
        </div>

        <!-- Model Performance Panel -->
        <div class="panel">
          <div class="panel-header">
            <span>
              <ion-icon name="stats-chart-outline" style="margin-right:8px; vertical-align:middle;"></ion-icon> 
              Model Performance
            </span>
            <span style="font-size:0.75rem; color:var(--aki-teal);">
              Status: {{ trainingStatus }}
            </span>
          </div>
          <div class="viz-scroll">
            
            <div class="stats-row">
              <div class="stat-card">
                <div class="stat-val" style="color:var(--aki-teal);">
                  {{ modelPerformance.accuracy }}%
                </div>
                <div class="stat-label">Accuracy</div>
              </div>
              <div class="stat-card">
                <div class="stat-val">{{ modelPerformance.f1Score }}</div>
                <div class="stat-label">F1 Score</div>
              </div>
              <div class="stat-card">
                <div class="stat-val">{{ modelPerformance.precision }}</div>
                <div class="stat-label">Precision</div>
              </div>
              <div class="stat-card">
                <div class="stat-val">{{ modelPerformance.recall }}</div>
                <div class="stat-label">Recall</div>
              </div>
            </div>

            <div class="chart-placeholder">
              <div class="chart-overlay"></div>
              <div style="text-align: center;">
                <ion-icon name="bar-chart-outline"></ion-icon>
                <p style="font-size:0.8rem; color:#666; margin-top:10px;">
                  {{ chartPlaceholderText }}
                </p>
              </div>
            </div>
            
            <div style="display:flex; gap:15px; height: 200px;">
              <div class="chart-placeholder" style="min-height:auto;">
                <p style="position:absolute; top:10px; left:15px; font-size:0.7rem; color:#888;">Confusion Matrix</p>
              </div>
              <div class="chart-placeholder" style="min-height:auto;">
                <p style="position:absolute; top:10px; left:15px; font-size:0.7rem; color:#888;">ROC Curve</p>
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
  name: 'TrainingView',
  data() {
    return {
      isSidebarClosed: false,
      selectedModel: 'Random Forest',
      showTargetModal: false,
      selectedTarget: '',
      isTraining: false,
      testSplitRatio: '80-20',
      trainingStatus: 'Ready',
      
      models: [
        { name: 'Random Forest', icon: 'git-network-outline' },
        { name: 'Linear Regression', icon: 'trending-up-outline' },
        { name: 'Logistic Regression', icon: 'analytics-outline' },
        { name: 'K-Nearest Neighbors (KNN)', icon: 'apps-outline' },
        { name: 'Support Vector Machine', icon: 'contract-outline' },
        { name: 'Decision Tree', icon: 'git-merge-outline' },
        { name: 'Naïve Bayes', icon: 'filter-circle-outline' },
        { name: 'XGBoost', icon: 'rocket-outline' },
        { name: 'Gradient Boosting', icon: 'layers-outline' }
      ],

      hyperparameters: {
        n_estimators: 100,
        max_depth: 10,
        criterion: 'gini'
      },

      modelPerformance: {
        accuracy: '94.2',
        f1Score: '0.89',
        precision: '0.91',
        recall: '0.87'
      }
    }
  },

  computed: {
    targetDisplay() {
      const targetMap = {
        'price': 'Price (Numerical)',
        'category': 'Category (Categorical)',
        'churn': 'Churn (Binary)'
      }
      return this.selectedTarget ? targetMap[this.selectedTarget] : 'Not Selected'
    },

    chartPlaceholderText() {
      if (!this.selectedTarget) {
        return 'Select target column to view feature importance'
      }
      if (this.isTraining) {
        return 'Training in progress...'
      }
      if (this.trainingStatus === 'Completed') {
        return 'Feature importance chart will be displayed here'
      }
      return 'Train the model to view feature importance'
    }
  },

  methods: {
    toggleSidebar() {
      this.isSidebarClosed = !this.isSidebarClosed
    },

    selectModel(modelName) {
      this.selectedModel = modelName
    },

    openTargetModal() {
      this.showTargetModal = true
    },

    confirmTarget() {
      if (this.selectedTarget) {
        this.showTargetModal = false
        // Update training status
        this.trainingStatus = 'Ready'
      } else {
        alert("Please select a target column to proceed.")
      }
    },

    startTraining() {
      if (!this.selectedTarget) {
        this.openTargetModal()
        return
      }

      this.isTraining = true
      this.trainingStatus = 'Training...'

      // Simulate training process
      setTimeout(() => {
        this.isTraining = false
        this.trainingStatus = 'Completed'
        
        // Update performance metrics with some variation
        this.modelPerformance = {
          accuracy: (90 + Math.random() * 8).toFixed(1),
          f1Score: (0.85 + Math.random() * 0.1).toFixed(2),
          precision: (0.88 + Math.random() * 0.08).toFixed(2),
          recall: (0.82 + Math.random() * 0.12).toFixed(2)
        }
      }, 3000)
    },

    goToProcess() {
      this.$router.push('/process')
    },

    goToPredict() {
      this.$router.push('/predict')
    },

    goHome() {
      this.$router.push('/')
    }
  },

  mounted() {
    // Auto-open target modal on component mount
    this.openTargetModal()
  }
}
</script>

<style scoped>
/* --- THEME VARIABLES (MATCHING FILTERING & PREPROCESSING) --- */
:host {
  --bg-color: #050505;
  --sidebar-bg: rgba(18, 18, 18, 0.85);
  --card-bg: rgba(24, 24, 27, 0.6);
  --input-bg: #27272a;
  --aki-teal: #26a69a;
  --aki-red: #e53935;
  --aki-red-glow: rgba(229, 57, 53, 0.5);
  --text-white: #ffffff;
  --text-gray: #a1a1aa;
  --border-color: rgba(255, 255, 255, 0.1);
  --sidebar-width: 340px;
  --transition-speed: 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

.training-container {
  background-color: var(--bg-color);
  background-image: 
    radial-gradient(circle at 0% 0%, rgba(38, 166, 154, 0.08), transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(229, 57, 53, 0.08), transparent 40%);
  color: var(--text-white);
  height: 100vh;
  display: flex;
  overflow: hidden;
}

/* ===========================
   1. SIDEBAR
=========================== */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  backdrop-filter: blur(15px);
  z-index: 50;
  flex-shrink: 0;
}

/* Collapsed State */
.training-container.sidebar-closed .sidebar {
  margin-left: calc(var(--sidebar-width) * -1);
}

.sidebar-header { padding: 25px; border-bottom: 1px solid var(--border-color); }
.brand-text { font-weight: 800; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }

.sidebar-content { 
  flex: 1; 
  overflow-y: auto; 
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}
.section-label { 
  font-size: 0.7rem; 
  color: #666; 
  text-transform: uppercase; 
  margin-top: 10px; 
  margin-bottom: 5px; 
  font-weight: 700; 
}

/* Model Items */
.model-item {
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03); 
  border: 1px solid var(--border-color);
  padding: 12px 14px; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: 0.2s;
  color: var(--text-gray); 
  font-size: 0.8rem; 
  font-weight: 500;
}
.model-item:hover, .model-item.active {
  background: rgba(255, 255, 255, 0.08); 
  border-color: var(--aki-red);
  color: white; 
  transform: translateX(5px);
}
.model-item ion-icon { font-size: 1.1rem; }

/* Sidebar Footer */
.sidebar-footer { 
  padding: 20px; 
  border-top: 1px solid var(--border-color); 
  display: grid; 
  grid-template-columns: 1fr 1.5fr; 
  gap: 10px; 
}
.btn-prev, .btn-next {
  padding: 12px; border-radius: 6px; cursor: pointer; transition: 0.2s;
  font-weight: 600; font-size: 0.85rem; border: 1px solid transparent;
}
.btn-prev { 
  background: transparent; 
  border-color: var(--border-color); 
  color: var(--text-gray); 
}
.btn-prev:hover { border-color: white; color: white; }
.btn-next { 
  background: var(--aki-red); 
  color: white; 
  border: none; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  box-shadow: 0 0 15px var(--aki-red-glow); 
}
.btn-next:hover { transform: translateY(-2px); box-shadow: 0 0 25px var(--aki-red-glow); }

/* ===========================
   2. MAIN CONTENT
=========================== */
.main-content { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden; 
  position: relative; 
}

/* Top Bar */
.top-bar {
  padding: 20px 30px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  border-bottom: 1px solid var(--border-color); 
  background: rgba(5, 5, 5, 0.6); 
  backdrop-filter: blur(10px);
}

.menu-toggle {
  font-size: 1.8rem; 
  cursor: pointer; 
  color: white;
  transition: 0.2s;
  background: transparent;
  border: none;
}
.menu-toggle:hover { color: var(--aki-teal); }

.pipeline-stepper { 
  display: flex; 
  gap: 2px; 
  background: #111; 
  padding: 4px; 
  border-radius: 8px; 
  border: 1px solid #333; 
}
.step { 
  padding: 6px 12px; 
  border-radius: 6px; 
  font-size: 0.75rem; 
  font-weight: 700; 
  color: #555; 
  cursor: pointer; 
}
.step.active { 
  background: #222; 
  color: var(--aki-red); 
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
}

.action-btn { 
  background: transparent; 
  border: 1px solid var(--border-color); 
  padding: 8px; 
  border-radius: 8px; 
  color: var(--text-gray); 
  font-size: 1.2rem; 
  cursor: pointer; 
  transition: 0.2s; 
}
.action-btn:hover { border-color: var(--aki-teal); color: var(--aki-teal); }

/* Dashboard Grid */
.dashboard-grid {
  display: grid; 
  grid-template-columns: 320px 1fr; 
  gap: 25px; 
  padding: 25px;
  flex: 1; 
  overflow: hidden;
}

/* Panels */
.panel {
  background: var(--card-bg); 
  border: 1px solid var(--border-color); 
  border-radius: 16px;
  overflow: hidden; 
  backdrop-filter: blur(12px); 
  display: flex; 
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.panel-header { 
  padding: 15px; 
  border-bottom: 1px solid var(--border-color); 
  font-weight: 600; 
  font-size: 0.9rem; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  color: white; 
}

/* Configuration Form */
.config-scroll { padding: 20px; overflow-y: auto; flex: 1; }
.form-group { margin-bottom: 18px; }
.form-group label { 
  display: block; 
  font-size: 0.75rem; 
  color: var(--text-gray); 
  margin-bottom: 8px; 
}
.custom-input, .custom-select { 
  width: 100%; 
  background: var(--input-bg); 
  border: 1px solid var(--border-color); 
  color: white; 
  padding: 10px; 
  border-radius: 6px; 
  outline: none; 
  font-size: 0.85rem; 
}
.custom-input:focus, .custom-select:focus { border-color: var(--aki-red); }

.train-btn-large {
  width: 100%; 
  padding: 14px; 
  background: var(--aki-red); 
  color: white; 
  border: none; 
  border-radius: 8px; 
  font-weight: 600; 
  cursor: pointer;
  box-shadow: 0 0 20px var(--aki-red-glow); 
  transition: 0.3s; 
  margin-top: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 10px;
}
.train-btn-large:hover:not(:disabled) { transform: scale(1.02); }
.train-btn-large:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Visualization Area */
.viz-scroll { 
  padding: 20px; 
  overflow-y: auto; 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}
.stats-row { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 15px; 
}
.stat-card { 
  background: rgba(0,0,0,0.3); 
  border: 1px solid var(--border-color); 
  padding: 15px; 
  border-radius: 10px; 
  text-align: center; 
}
.stat-val { 
  font-size: 1.4rem; 
  font-weight: 700; 
  color: white; 
  margin-bottom: 4px; 
}
.stat-label { 
  font-size: 0.7rem; 
  color: var(--text-gray); 
  text-transform: uppercase; 
  letter-spacing: 0.5px; 
}

.chart-placeholder {
  flex: 1; 
  min-height: 300px; 
  background: rgba(0,0,0,0.2); 
  border: 1px dashed var(--border-color); 
  border-radius: 12px;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  position: relative; 
  overflow: hidden;
}
.chart-placeholder ion-icon { 
  font-size: 4rem; 
  opacity: 0.2; 
  color: white; 
}
.chart-overlay { 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  width: 100%; 
  height: 50%; 
  background: linear-gradient(0deg, rgba(38, 166, 154, 0.1), transparent); 
}

/* ===========================
   3. POPUP MODAL
=========================== */
.modal-backdrop {
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background: rgba(0,0,0,0.85); 
  backdrop-filter: blur(8px);
  z-index: 999; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  opacity: 1; 
  transition: opacity 0.3s ease;
}
.modal-backdrop.hidden { 
  opacity: 0; 
  pointer-events: none; 
}

.modal-content {
  background: #18181b; 
  border: 1px solid var(--border-color);
  width: 450px; 
  border-radius: 16px; 
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  text-align: center; 
  transform: scale(1); 
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.modal-backdrop.hidden .modal-content { transform: scale(0.9); }

.modal-icon {
  width: 60px; 
  height: 60px; 
  background: rgba(229, 57, 53, 0.1); 
  color: var(--aki-red);
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-size: 1.8rem; 
  margin: 0 auto 20px auto; 
  border: 1px solid rgba(229, 57, 53, 0.3);
}
.modal-title { 
  font-size: 1.2rem; 
  font-weight: 700; 
  color: white; 
  margin-bottom: 10px; 
}
.modal-desc { 
  font-size: 0.85rem; 
  color: var(--text-gray); 
  margin-bottom: 25px; 
  line-height: 1.5; 
}

.target-btn {
  width: 100%; 
  padding: 12px; 
  background: white; 
  color: black; 
  border: none; 
  font-weight: 600; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: 0.2s;
}
.target-btn:hover { background: #e0e0e0; }

/* ===========================
   4. RESPONSIVE DESIGN
=========================== */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .training-container.sidebar-closed .sidebar {
    margin-left: 0;
  }
  
  .sidebar {
    position: absolute;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .training-container.sidebar-open .sidebar {
    transform: translateX(0);
  }
  
  .stats-row {
    grid-template-columns: 1fr;
  }
  
  .top-bar {
    padding: 15px 20px;
  }
  
  .dashboard-grid {
    padding: 15px;
  }
}
</style>
