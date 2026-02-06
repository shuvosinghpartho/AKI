<template>
  <div class="predict-container" :class="{ 'desktop-collapsed': isCollapsed }">
    
    <div 
      class="mobile-overlay" 
      :class="{ active: showMobileSidebar }"
      @click="closeMobileSidebar"
    ></div>

    <nav class="sidebar" :class="{ 'mobile-open': showMobileSidebar }">
      <div class="logo-container">
        <ion-icon name="bulb-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI PREDICT</span>
        
        <button class="mobile-close-btn" @click="closeMobileSidebar">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <div class="tools-wrapper">
        <div class="info-box hide-on-collapse">
          <div class="info-title">Target Column:</div>
          <div class="info-value">{{ targetColumn }}</div>
        </div>

        <div class="info-box hide-on-collapse">
          <div class="info-title">Features:</div>
          <div class="info-value features-list">{{ featuresList }}</div>
        </div>

        <div class="info-box hide-on-collapse">
          <div class="info-title">Model:</div>
          <div class="info-value">{{ deployedModel }}</div>
        </div>

        <div class="download-section hide-on-collapse">
          <h3 class="download-title">Download Deployed Model</h3>
          <label class="format-label">Select Format</label>
          <div class="custom-select-wrapper">
            <select class="f-input" v-model="downloadFormat">
              <option value="pickle">Pickle (.pkl)</option>
              <option value="joblib">Joblib (.joblib)</option>
              <option value="onnx">ONNX (.onnx)</option>
            </select>
            <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
          </div>
          <button class="download-btn" @click="downloadModel">Download Model</button>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-prev" @click="goToPrevious">
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>Previous</span>
        </button>
        <button class="nav-next" @click="goToNext">
          <span>Next</span>
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
          <div class="pipeline-scroll">
            <div class="pipeline">
              <div class="step">CLEANING</div>
              <div class="step">FILTERING</div>
              <div class="step">PREPROCESSING</div>
              <div class="step">TRAINING</div>
              <div class="step active">PREDICT</div>
            </div>
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
            <span class="panel-label">Input Features</span>
          </div>

          <div class="features-grid">
            <div class="feature-input">
              <label class="feature-label">Age</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.age" placeholder="Enter age">
            </div>
            <div class="feature-input">
              <label class="feature-label">Sleep_Quality(1-10)</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.sleepQuality" min="1" max="10" placeholder="1-10">
            </div>
            <div class="feature-input">
              <label class="feature-label">Stress_Level(1-10)</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.stressLevel" min="1" max="10" placeholder="1-10">
            </div>
            <div class="feature-input">
              <label class="feature-label">Days_Without_Social_Media</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.daysWithoutSocial" placeholder="Enter days">
            </div>
            <div class="feature-input">
              <label class="feature-label">Exercise_Frequency(week)</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.exerciseFrequency" placeholder="Days per week">
            </div>
            <div class="feature-input">
              <label class="feature-label">Happiness_Index(1-10)</label>
              <input type="number" class="f-input" v-model.number="inputFeatures.happinessIndex" min="1" max="10" placeholder="1-10">
            </div>
          </div>

          <div class="upload-section">
            <label class="upload-label">Upload a CSV or Excel file</label>
            <div class="upload-info">
              <ion-icon name="help-circle-outline"></ion-icon>
            </div>
            <div class="upload-area" @dragover.prevent @drop.prevent="handleFileDrop">
              <p class="drag-text">Drag and drop file here</p>
              <p class="file-limit">Limit 200MB per file • CSV, XLSX</p>
              <button class="browse-btn" @click="triggerFileInput">Browse files</button>
              <input type="file" ref="fileInput" @change="handleFileSelect" accept=".csv,.xlsx" style="display: none;">
            </div>
          </div>

          <button class="predict-btn" @click="runPrediction">Predict</button>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <div class="result-header">
              <span class="panel-label">Prediction Result</span>
              <button class="predict-btn-top" @click="runPrediction">Predict</button>
            </div>
          </div>

          <div class="result-container" v-if="!showResults">
            <div class="empty-state">
              <ion-icon name="cube-outline"></ion-icon>
              <p>Enter features and click Predict to see results</p>
            </div>
          </div>

          <div class="result-container" v-else>
            <div class="result-display">
              <div class="result-value">{{ predictionResult.value }}</div>
              <div class="result-label">Predicted Value</div>
            </div>
          </div>
        </div>

      </div>

    </main>

    <!-- Deploy Modal -->
    <transition name="fade">
      <div v-if="showDeployModal" class="modal-backdrop" @click="closeDeployModal">
        <div class="modal-window" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Which Model you want to Deploy?</h2>
            <button class="close-btn" @click="closeDeployModal">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-filters">
              <div class="filter-group">
                <label>Which Run?</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="deployRun">
                    <option value="Run 1">Run 1</option>
                    <option value="Run 2">Run 2</option>
                    <option value="Run 3">Run 3</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="filter-group">
                <label>Which Model?</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="selectedDeployModel">
                    <option value="Random Forest">Random Forest</option>
                    <option value="Linear Regression">Linear Regression</option>
                    <option value="SVM">Support Vector Machine</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
            </div>

            <div class="deployment-info">
              <p>Model will be deployed using <span class="highlight">{{ selectedDeployModel }}</span> from <span class="highlight">{{ deployRun }}</span>.</p>
            </div>

            <table class="metrics-table">
              <thead>
                <tr>
                  <th>Run</th>
                  <th>Model</th>
                  <th>MSE</th>
                  <th>RMSE</th>
                  <th>MAE</th>
                  <th>R2</th>
                  <th>MSLE</th>
                  <th>RMSLE</th>
                  <th>MAPE</th>
                </tr>
              </thead>
              <tbody>
                <tr class="highlighted">
                  <td>1</td>
                  <td>Random Forest</td>
                  <td>1.039165</td>
                  <td>1.019395</td>
                  <td>0.844011</td>
                  <td>0.676056</td>
                  <td>0.030010</td>
                  <td>0.173235</td>
                  <td>18.272896</td>
                </tr>
              </tbody>
            </table>

            <div class="modal-actions">
              <button class="deploy-btn" @click="deployModel">Deploy (using {{ selectedDeployModel }})</button>
              <button class="continue-btn" @click="continuePrevious">Continue with previously saved model</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const isCollapsed = ref(false);
const showMobileSidebar = ref(false);
const showDeployModal = ref(false);
const showResults = ref(false);

const targetColumn = ref('Daily_Screen_Time(hrs)');
const deployedModel = ref('Random Forest');
const featuresList = ref('Age, Sleep_Quality(1-10), Stress_Level(1-10), Days_Without_Social_Media, Exercise_Frequency(week), Happiness_Index(1-10)');

const downloadFormat = ref('pickle');
const deployRun = ref('Run 1');
const selectedDeployModel = ref('Random Forest');

const inputFeatures = reactive({
  age: null,
  sleepQuality: null,
  stressLevel: null,
  daysWithoutSocial: null,
  exerciseFrequency: null,
  happinessIndex: null
});

const predictionResult = reactive({
  value: 0
});

const fileInput = ref(null);

// Functions
const toggleSidebar = () => {
  if (window.innerWidth <= 1024) {
    showMobileSidebar.value = !showMobileSidebar.value;
  } else {
    isCollapsed.value = !isCollapsed.value;
  }
};

const closeMobileSidebar = () => {
  showMobileSidebar.value = false;
};

const downloadModel = () => {
  console.log(`Downloading model in ${downloadFormat.value} format`);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    console.log('File selected:', files[0].name);
  }
};

const handleFileDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    console.log('File dropped:', files[0].name);
  }
};

const runPrediction = () => {
  const hasInputs = Object.values(inputFeatures).some(val => val !== null && val !== '');
  if (!hasInputs) {
    console.log('Please enter at least one feature');
    return;
  }

  predictionResult.value = Math.floor(Math.random() * (8 - 3 + 1) + 3).toFixed(1);
  showResults.value = true;
};

const deployModel = () => {
  console.log(`Deploying ${selectedDeployModel.value} from ${deployRun.value}`);
  closeDeployModal();
};

const continuePrevious = () => {
  console.log('Continuing with previously saved model');
  closeDeployModal();
};

const closeDeployModal = () => {
  showDeployModal.value = false;
};

const goHome = () => {
  router.push('/');
};

const goToPrevious = () => {
  router.push('/training');
};

const goToNext = () => {
  showDeployModal.value = true;
};
</script>

<style scoped>
:root {
  --aki-primary: #00f0ff;
  --aki-primary-dim: rgba(0, 240, 255, 0.1);
  --aki-danger: #ff2a6d;
  --border-glass: rgba(255, 255, 255, 0.05);
  --input-bg: #14151a;
  --input-border: #333;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #0a0a0a;
  color: #ccc;
  font-family: 'Segoe UI', sans-serif;
}

/* =================================================================
   1. CONTAINER & SIDEBAR
================================================================= */
.predict-container {
  display: flex; height: 100vh; background: #0a0a0a;
  transition: padding-left 0.3s ease;
}

.sidebar {
  width: 280px; background: rgba(10, 10, 10, 0.95);
  border-right: 1px solid var(--border-glass);
  display: flex; flex-direction: column;
  padding-top: 0; overflow-y: auto; z-index: 100;
  transition: all 0.3s ease;
}

.mobile-overlay {
  display: none; position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.mobile-overlay.active { display: block; }

.mobile-close-btn { display: none; }

@media (max-width: 1024px) {
  .sidebar.mobile-open { transform: translateX(0); }
  .sidebar {
    position: fixed; left: 0; top: 0; height: 100%;
    transform: translateX(-100%); width: 280px;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.8);
    border-right: 1px solid #333; z-index: 1000;
  }
  .mobile-close-btn { display: flex; }
}

.logo-container {
  padding: 20px 16px; display: flex; align-items: center;
  gap: 8px; border-bottom: 1px solid var(--border-glass);
  background: rgba(0, 240, 255, 0.05);
  position: relative;
}

.logo-text { font-weight: 800; color: var(--aki-primary); font-size: 0.9rem; letter-spacing: 1px; }

.hide-on-collapse {
  transition: opacity 0.2s ease;
}

.predict-container.desktop-collapsed .sidebar { width: 80px; }
.predict-container.desktop-collapsed .hide-on-collapse { opacity: 0; display: none; }

.tools-wrapper {
  flex: 1; overflow-y: auto; padding: 12px 0; display: flex; flex-direction: column; gap: 12px;
}

.info-box {
  background: rgba(0, 200, 240, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  padding: 12px 16px;
  margin: 0 12px;
}

.info-title {
  font-size: 0.75rem; color: #888; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
}

.info-value {
  font-size: 0.9rem; color: #fff; font-weight: 600; line-height: 1.4;
}

.features-list {
  font-size: 0.8rem; color: #aaa; white-space: pre-wrap; word-break: break-word;
}

.download-section {
  padding: 12px 16px; margin: 0 12px;
  border-top: 1px solid var(--border-glass);
}

.download-title {
  font-size: 0.9rem; color: #fff; margin-bottom: 12px; font-weight: 700;
}

.format-label {
  display: block; font-size: 0.75rem; color: #888; font-weight: 700;
  text-transform: uppercase; margin-bottom: 6px;
}

.custom-select-wrapper {
  position: relative; background: #14151a; border: 1px solid #333;
  border-radius: 6px; overflow: hidden; transition: 0.2s; margin-bottom: 10px;
}

.custom-select-wrapper:hover { border-color: #555; }

.custom-select-wrapper select {
  width: 100%; background: transparent; border: none; color: #fff;
  padding: 10px 35px 10px 12px; font-size: 0.85rem;
  appearance: none; cursor: pointer; outline: none; z-index: 2; position: relative;
}

.f-input {
  width: 100%; background: #14151a; border: 1px solid #333;
  color: #fff; padding: 10px 12px; border-radius: 6px;
  font-size: 0.85rem; appearance: none; cursor: pointer; transition: all 0.2s ease;
}

select.f-input option { background-color: #1a1a1a; color: white; padding: 10px; }

.f-input:hover { border-color: #777; background-color: #25252b; }
.f-input:focus {
  border-color: var(--aki-primary);
  box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.15);
  outline: none;
}

.select-icon {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%); color: #888;
  pointer-events: none; font-size: 0.9rem;
}

.custom-select-wrapper:hover .select-icon { color: white; }

.download-btn {
  width: 100%; padding: 10px; background: #FFFFFF;
  color: #000000; border: none; border-radius: 6px;
  cursor: pointer; font-weight: 700; font-size: 0.8rem;
  transition: 0.2s;
}

.download-btn:hover { background: #e6e6e6; }

/* Sidebar Footer */
.sidebar-footer { margin-top: auto; padding: 15px 12px; border-top: 1px solid var(--border-glass); display: flex; gap: 10px; }

.nav-prev {
  flex: 1; background: transparent; color: #aaa;
  padding: 12px; border: 1px solid #333; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  gap: 6px; font-weight: 700; font-size: 0.8rem; transition: 0.2s;
}

.nav-prev:hover { border-color: var(--aki-danger); color: var(--aki-danger); }

.nav-next {
  flex: 1; background: var(--aki-danger); color: white;
  padding: 12px; border: none; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  gap: 6px; font-weight: 700; font-size: 0.8rem; box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
}

.predict-container.desktop-collapsed .nav-next span,
.predict-container.desktop-collapsed .nav-prev span { display: none; }

/* =================================================================
   2. MAIN VIEW & HEADER
================================================================= */
.main-view {
  flex: 1; display: flex; flex-direction: column;
  position: relative; overflow: hidden; width: 100%;
}

.top-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 15px 20px; border-bottom: 1px solid var(--border-glass);
  background: rgba(5, 5, 5, 0.8); z-index: 50;
  flex-wrap: wrap; gap: 10px;
}

.menu-toggle {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid var(--aki-primary);
  color: var(--aki-primary);
  font-size: 1.5rem; cursor: pointer;
  padding: 8px; border-radius: 6px; display: flex;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: var(--aki-primary);
  color: #000;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
}

.header-center { flex: 1; display: flex; justify-content: center; overflow: hidden; }

.pipeline-scroll { width: 100%; overflow-x: auto; display: flex; justify-content: center; }

.pipeline {
  display: flex; gap: 4px; background: #0a0a0a;
  padding: 4px; border-radius: 50px; border: 1px solid #222;
  white-space: nowrap;
}

.step {
  padding: 6px 16px; border-radius: 40px; font-size: 0.7rem;
  font-weight: 600; color: #555;
}

.step.active { background: #1f1f1f; color: var(--aki-primary); border: 1px solid #333; }

.header-right { display: flex; align-items: center; gap: 10px; }

.top-nav-btn {
  background: transparent; border: 1px solid var(--border-glass);
  color: #aaa; padding: 6px 14px; border-radius: 20px;
  cursor: pointer; display: flex; align-items: center; gap: 6px;
  font-size: 0.8rem; transition: 0.2s;
}

.top-nav-btn:hover { color: white; border-color: #666; }

.user-avatar { font-size: 2rem; color: #444; margin-left: 5px; }

/* =================================================================
   3. CONTENT GRID
================================================================= */
.content-grid {
  flex: 1; padding: 20px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px; overflow-y: auto; overflow-x: hidden;
}

.glass-panel {
  background: rgba(15, 15, 17, 0.6);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  display: flex; flex-direction: column;
  overflow: hidden; min-height: 400px;
}

.panel-head {
  padding: 12px 18px; border-bottom: 1px solid var(--border-glass);
  display: flex; justify-content: space-between; align-items: center;
}

.panel-label { font-size: 1rem; font-weight: 700; color: #ddd; }

.result-header {
  display: flex; justify-content: space-between; align-items: center; width: 100%;
}

.predict-btn-top {
  padding: 8px 16px; background: #ff2a6d;
  color: white; border: none; border-radius: 6px;
  cursor: pointer; font-weight: 700; font-size: 0.8rem;
  transition: 0.2s;
}

.predict-btn-top:hover { background: #ff1a5d; }

.features-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 15px; padding: 20px; border-bottom: 1px solid var(--border-glass);
}

.feature-input {
  display: flex; flex-direction: column; gap: 6px;
}

.feature-label {
  font-size: 0.75rem; color: #888; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
}

.upload-section {
  padding: 20px; border-bottom: 1px solid var(--border-glass);
}

.upload-label {
  display: block; font-size: 0.85rem; color: #aaa; font-weight: 700; margin-bottom: 8px;
}

.upload-info {
  display: inline-block; margin-left: 8px; cursor: help;
}

.upload-info ion-icon {
  font-size: 1rem; color: #666;
}

.upload-area {
  border: 1px dashed #333; border-radius: 8px;
  padding: 30px 20px; text-align: center;
  margin: 15px 0; transition: all 0.2s;
  background: rgba(0, 0, 0, 0.2);
}

.upload-area:hover {
  border-color: var(--aki-primary);
  background: rgba(0, 240, 255, 0.05);
}

.drag-text {
  font-weight: 600; color: #ddd; margin-bottom: 6px;
}

.file-limit {
  font-size: 0.75rem; color: #888; margin-bottom: 15px;
}

.browse-btn {
  padding: 8px 16px; background: transparent;
  border: 1px solid #333; color: #aaa;
  border-radius: 6px; cursor: pointer; font-size: 0.8rem;
  transition: 0.2s;
}

.browse-btn:hover {
  border-color: #555; color: white;
}

.predict-btn {
  margin: 20px; padding: 12px;
  background: #ff2a6d; color: white;
  border: none; border-radius: 6px;
  cursor: pointer; font-weight: 700;
  font-size: 0.9rem; transition: 0.2s;
}

.predict-btn:hover { background: #ff1a5d; }

.result-container {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.empty-state {
  text-align: center; color: #555;
}

.empty-state ion-icon {
  font-size: 3rem; opacity: 0.3; margin-bottom: 10px;
}

.result-display {
  text-align: center;
}

.result-value {
  font-size: 2.5rem; font-weight: 800;
  color: var(--aki-primary); margin-bottom: 10px;
}

.result-label {
  font-size: 0.9rem; color: #888; font-weight: 600;
}

/* Modal */
.modal-backdrop {
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 2000; display: flex;
  align-items: center; justify-content: center;
}

.modal-window {
  width: 700px; background: #0b0c10;
  border: 1px solid var(--border-glass); border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  display: flex; flex-direction: column; overflow: hidden;
  max-height: 90vh; overflow-y: auto;
}

.modal-header {
  padding: 15px 20px; background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid var(--border-glass);
  display: flex; justify-content: space-between; align-items: center;
}

.modal-title { font-weight: 700; color: #fff; font-size: 1rem; letter-spacing: 0.5px; }

.close-btn {
  background: none; border: none; color: #888;
  cursor: pointer; font-size: 1.2rem; transition: 0.2s;
}

.close-btn:hover { color: var(--aki-danger); }

.modal-body { padding: 25px; }

.modal-filters {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 15px; margin-bottom: 20px;
}

.filter-group {
  display: flex; flex-direction: column; gap: 6px;
}

.filter-group label {
  font-size: 0.75rem; color: #888; font-weight: 700;
  text-transform: uppercase;
}

.deployment-info {
  background: rgba(0, 200, 240, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  padding: 12px;
  margin: 15px 0; font-size: 0.85rem; color: #aaa;
}

.highlight {
  color: var(--aki-primary); font-weight: 700;
}

.metrics-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.75rem; margin: 20px 0;
  overflow-x: auto; display: block;
}

.metrics-table th {
  background: #141414; color: #888; font-weight: 600;
  padding: 10px; text-align: left; border-bottom: 1px solid #333;
}

.metrics-table td {
  padding: 10px; border-bottom: 1px solid #333; color: #ccc;
}

.metrics-table tr.highlighted {
  background: rgba(255, 255, 255, 0.05);
}

.modal-actions {
  display: flex; flex-direction: column; gap: 10px; margin-top: 20px;
}

.deploy-btn {
  padding: 12px; background: #ff2a6d;
  color: white; border: none; border-radius: 6px;
  cursor: pointer; font-weight: 700; font-size: 0.9rem;
  transition: 0.2s;
}

.deploy-btn:hover { background: #ff1a5d; }

.continue-btn {
  padding: 12px; background: transparent;
  border: 1px solid #333; color: #aaa;
  border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.9rem;
  transition: 0.2s;
}

.continue-btn:hover {
  border-color: #555; color: white;
}

/* Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive */
@media screen and (max-width: 1024px) {
  .content-grid { grid-template-columns: 1fr; padding: 15px; }
  .header-center { order: 3; width: 100%; margin-top: 10px; justify-content: flex-start; }
  .pipeline-scroll { justify-content: flex-start; padding-bottom: 5px; }
  .top-header { padding: 10px 15px; }
  .features-grid { grid-template-columns: 1fr; }
  .modal-window { width: 90vw; }
  .modal-filters { grid-template-columns: 1fr; }
}

@media screen and (max-width: 480px) {
  .logo-text { display: block; font-size: 0.8rem; }
  .top-nav-btn { padding: 8px; border-radius: 50%; }
  .pipeline { width: 100%; justify-content: space-between; }
  .glass-panel { min-height: 300px; }
  .sidebar-footer { flex-direction: column; }
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>