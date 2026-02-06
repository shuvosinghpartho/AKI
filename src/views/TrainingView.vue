<template>
  <div class="training-container" :class="{ 'desktop-collapsed': isCollapsed }">
    
    <div 
      class="mobile-overlay" 
      :class="{ active: showMobileSidebar }"
      @click="closeMobileSidebar"
    ></div>

    <nav class="sidebar" :class="{ 'mobile-open': showMobileSidebar }">
      <div class="logo-container">
        <ion-icon name="school-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI MODEL TRAIN</span>
        
        <button class="mobile-close-btn" @click="closeMobileSidebar">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <div class="tools-wrapper">
        <div class="target-info hide-on-collapse">
          Target column is "{{ targetColumn }}"
        </div>

        <button class="btn-select-features hide-on-collapse" @click="openSelectFeatures">
          Select Features
        </button>

        <div class="section-title hide-on-collapse">AVAILABLE MODELS</div>

        <div class="models-grid hide-on-collapse">
          <label v-for="model in availableModels" :key="model.id" class="model-checkbox">
            <input 
              type="checkbox" 
              :value="model.id" 
              v-model="selectedModels"
              @change="handleModelToggle(model.name)"
            >
            <span>{{ model.name }}</span>
          </label>
        </div>

        <button class="adjust-params hide-on-collapse" @click="toggleAdjustParams">
          Adjust Model Parameters
          <ion-icon name="chevron-down-outline" :class="{ rotated: showParams }"></ion-icon>
        </button>

        <div class="params-section hide-on-collapse" v-show="showParams">
          <div class="param-input-group">
            <label class="param-label">Learning Rate</label>
            <input type="number" class="param-input" v-model="modelParams.learningRate" step="0.001" />
          </div>
          <div class="param-input-group">
            <label class="param-label">Max Depth</label>
            <input type="number" class="param-input" v-model="modelParams.maxDepth" />
          </div>
          <div class="param-input-group">
            <label class="param-label">N Estimators</label>
            <input type="number" class="param-input" v-model="modelParams.nEstimators" />
          </div>
        </div>

        <div class="test-crossval-row hide-on-collapse">
          <div class="custom-select-wrapper">
            <select class="f-input" v-model="testSize">
              <option disabled value="">Test Size</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
            </select>
            <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
          </div>
          <div class="custom-select-wrapper">
            <select class="f-input" v-model="crossVal">
              <option disabled value="">Cross-Val</option>
              <option value="5">5-Fold</option>
              <option value="10">10-Fold</option>
            </select>
            <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-next" @click="startTraining">
          <span>{{ isTraining ? 'TRAINING...' : 'TRAIN MODEL' }}</span>
          <ion-icon name="flash-outline"></ion-icon>
        </button>
        <button class="nav-next" @click="goToPredict">
          <span>NEXT PAGE</span>
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
              <div class="step active">TRAINING</div>
              <div class="step">PREDICT</div>
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
            <div style="display: flex; align-items: center; gap: 15px;">
              <span class="panel-label">Which Run?</span>
              <div class="custom-select-wrapper" style="flex: 0 0 150px;">
                <select class="f-input" v-model="selectedRun">
                  <option value="Run 1">Run 1</option>
                  <option value="Run 2">Run 2</option>
                  <option value="Run 3">Run 3</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
              <span class="panel-label">Which Model?</span>
              <div class="custom-select-wrapper" style="flex: 0 0 180px;">
                <select class="f-input" v-model="selectedModel">
                  <option value="Random Forest">Random Forest</option>
                  <option value="Linear Regression">Linear Regression</option>
                  <option value="SVM">Support Vector Machine</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>
          </div>

          <div class="sub-tabs">
            <span class="tab" :class="{ active: currentTab === 'errors' }" @click="currentTab = 'errors'">Errors</span>
            <span class="tab" :class="{ active: currentTab === 'selections' }" @click="currentTab = 'selections'">Selections</span>
            <span class="tab" :class="{ active: currentTab === 'preview' }" @click="currentTab = 'preview'">Preview</span>
          </div>

          <div class="table-wrap">
            <table v-if="currentTab === 'errors'" class="metrics-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(metric, index) in errorMetrics" :key="metric.name">
                  <td>{{ index }}</td>
                  <td>{{ metric.name }}</td>
                  <td>{{ metric.value }}</td>
                </tr>
              </tbody>
            </table>

            <div v-if="currentTab === 'selections'" class="selections-content">
              <div class="metric-grid">
                <div class="metric-box">
                  <span class="metric-label">Target Column:</span>
                  <span class="metric-value">{{ targetColumn }}</span>
                </div>
                <div class="metric-box">
                  <span class="metric-label">RMSE:</span>
                  <span class="metric-value">1.02</span>
                </div>
                <div class="metric-box">
                  <span class="metric-label">Cross Validation Fold:</span>
                  <span class="metric-value">None</span>
                </div>
                <div class="metric-box">
                  <span class="metric-label">Test Size:</span>
                  <span class="metric-value">20%</span>
                </div>
              </div>
              <div class="selections-buttons">
                <button class="selection-btn">Selected Features</button>
                <button class="selection-btn">Parameters</button>
              </div>
            </div>

            <div v-if="currentTab === 'preview'" class="preview-table-wrapper">
              <table class="preview-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>User_ID</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Daily_Screen_Time(hrs)</th>
                    <th>Sleep_</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in previewData" :key="row.id">
                    <td>{{ index }}</td>
                    <td>{{ row.id }}</td>
                    <td>{{ row.age }}</td>
                    <td>{{ row.gender }}</td>
                    <td>{{ row.screenTime }}</td>
                    <td>{{ row.sleep }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <div class="comparison-tabs">
              <span class="comparison-tab" :class="{ active: comparisonMode === 'run' }" @click="comparisonMode = 'run'">Run Comparison</span>
              <span class="comparison-tab" :class="{ active: comparisonMode === 'result' }" @click="comparisonMode = 'result'">Result Comparison</span>
            </div>
          </div>

          <div class="chart-filters">
            <div v-if="comparisonMode === 'run'" class="filter-group">
              <label>Which Run?</label>
              <div class="custom-select-wrapper">
                <select class="f-input" v-model="selectedRun">
                  <option value="Run 1">Run 1</option>
                  <option value="Run 2">Run 2</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>
            <div class="filter-group">
              <label>Select Evaluation Metric</label>
              <div class="custom-select-wrapper">
                <select class="f-input" v-model="selectedMetric">
                  <option value="MSE">MSE</option>
                  <option value="RMSE">RMSE</option>
                  <option value="MAE">MAE</option>
                  <option value="R2">R2</option>
                  <option value="MSLE">MSLE</option>
                  <option value="RMSLE">RMSLE</option>
                  <option value="MAPE">MAPE</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>
          </div>

          <div class="chart-title">
            {{ comparisonMode === 'run' ? selectedMetric + ' Comparison for run1' : selectedMetric + ' Across Runs' }}
          </div>

          <div class="chart-container">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

      </div>

    </main>

    <!-- Select Features Modal -->
    <transition name="fade">
      <div v-if="showSelectFeaturesModal" class="modal-backdrop" @click="closeSelectFeatures">
        <div class="modal-window" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Select Target Column</h2>
            <button class="close-btn" @click="closeSelectFeatures">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div class="modal-body">
            <label class="modal-label">Select Target Column (Regression)</label>
            <div class="custom-select-wrapper">
              <select class="f-input" v-model="selectedTargetColumn">
                <option disabled value="">Choose an option</option>
                <option value="Stress_Level(1-10)">Stress_Level(1-10)</option>
                <option value="Daily_Screen_Time(hrs)">Daily_Screen_Time(hrs)</option>
                <option value="Sleep_Duration">Sleep_Duration</option>
              </select>
              <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
            </div>
            <button class="modal-submit" @click="submitTargetColumn">Submit</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const router = useRouter();

// State: Sidebar
const isCollapsed = ref(false);
const showMobileSidebar = ref(false);
const targetColumn = ref('Stress_Level(1-10)');
const selectedTargetColumn = ref('Stress_Level(1-10)');
const showSelectFeaturesModal = ref(false);
const selectedModels = ref(['rf']);
const testSize = ref('20');
const crossVal = ref('5');
const isTraining = ref(false);
const showParams = ref(false);

const modelParams = reactive({
  learningRate: 0.1,
  maxDepth: 10,
  nEstimators: 100
});

const availableModels = [
  { id: 'rf', name: 'Random Forest' },
  { id: 'gb', name: 'Gradient Boosting' },
  { id: 'sv', name: 'Support Vector' },
  { id: 'knn', name: 'KNN' },
  { id: 'lr', name: 'Linear Regression' },
  { id: 'nn', name: 'Neural Network' },
  { id: 'dt', name: 'Decision Tree' },
  { id: 'rd', name: 'Ridge' }
];

// State: Main Content
const currentTab = ref('errors');
const comparisonMode = ref('run');
const selectedRun = ref('Run 1');
const selectedModel = ref('Random Forest');
const selectedMetric = ref('MSE');

const errorMetrics = reactive([
  { name: 'MSE', value: '1.0392' },
  { name: 'RMSE', value: '1.0194' },
  { name: 'MAE', value: '0.8440' },
  { name: 'R2', value: '0.6761' },
  { name: 'MSLE', value: '0.0300' },
  { name: 'RMSLE', value: '0.1732' },
  { name: 'MAPE', value: '18.2729' }
]);

const previewData = reactive([
  { id: 'U001', age: 44, gender: 'Male', screenTime: 3.1, sleep: 7.2 },
  { id: 'U002', age: 30, gender: 'Other', screenTime: 5.1, sleep: 6.1 },
  { id: 'U003', age: 23, gender: 'Other', screenTime: 7.4, sleep: 5.4 },
  { id: 'U004', age: 36, gender: 'Female', screenTime: 5.7, sleep: 6.7 },
  { id: 'U005', age: 34, gender: 'Female', screenTime: 7.0, sleep: 5.8 },
  { id: 'U006', age: 38, gender: 'Male', screenTime: 6.6, sleep: 6.4 },
  { id: 'U007', age: 26, gender: 'Female', screenTime: 7.8, sleep: 5.2 },
  { id: 'U008', age: 26, gender: 'Female', screenTime: 7.4, sleep: 5.6 },
  { id: 'U009', age: 39, gender: 'Male', screenTime: 4.7, sleep: 7.1 },
  { id: 'U010', age: 39, gender: 'Female', screenTime: 6.6, sleep: 6.0 }
]);

// Chart
const chartCanvas = ref(null);
let chartInstance = null;

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

const handleModelToggle = (name) => {
  console.log(`${name} toggled`);
};

const toggleAdjustParams = () => {
  showParams.value = !showParams.value;
};

const openSelectFeatures = () => {
  showSelectFeaturesModal.value = true;
};

const closeSelectFeatures = () => {
  showSelectFeaturesModal.value = false;
};

const submitTargetColumn = () => {
  targetColumn.value = selectedTargetColumn.value;
  showSelectFeaturesModal.value = false;
};

const startTraining = () => {
  isTraining.value = true;
  setTimeout(() => {
    isTraining.value = false;
    currentTab.value = 'errors';
  }, 2000);
};

const goHome = () => {
  router.push('/');
};

const goToPredict = () => {
  router.push('/predict');
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;

  if (comparisonMode.value === 'run') {
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Random Forest'],
        datasets: [{
          label: selectedMetric.value,
          data: [getMetricValue(selectedMetric.value)],
          backgroundColor: '#00f0ff',
          borderColor: '#00f0ff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { color: '#888' }, grid: { color: '#333' } },
          y: { ticks: { color: '#888' }, grid: { display: false } }
        }
      }
    });
  } else {
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1', '2'],
        datasets: [{
          label: 'Random Forest',
          data: [2.0, 1.0, 0.5],
          borderColor: '#00f0ff',
          backgroundColor: 'rgba(0, 240, 255, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#888' } }
        },
        scales: {
          y: { ticks: { color: '#888' }, grid: { color: '#333' } },
          x: { ticks: { color: '#888' }, grid: { color: '#333' } }
        }
      }
    });
  }
};

const getMetricValue = (metric) => {
  const values = { 'MSE': 1.0392, 'RMSE': 1.0194, 'MAE': 0.8440, 'R2': 0.6761, 'MSLE': 0.0300, 'RMSLE': 0.1732, 'MAPE': 18.2729 };
  return values[metric] || 1.0;
};

onMounted(() => {
  setTimeout(() => renderChart(), 100);
});

watch([comparisonMode, selectedMetric], () => {
  setTimeout(() => renderChart(), 100);
});
</script>

<style scoped>
:root {
  --aki-primary: #00f0ff;
  --aki-primary-dim: rgba(0, 240, 255, 0.1);
  --aki-danger: #ff2a6d;
  --border-glass: rgba(255, 255, 255, 0.05);
  --bg-gradient: linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(255, 42, 109, 0.02));
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
.training-container {
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

.training-container.desktop-collapsed .sidebar { width: 80px; }
.training-container.desktop-collapsed .hide-on-collapse { opacity: 0; display: none; }

.tools-wrapper {
  flex: 1; overflow-y: auto; padding: 12px 0; display: flex; flex-direction: column; gap: 0;
}

.target-info {
  padding: 12px 16px; background: rgba(0, 200, 240, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  margin: 12px 12px 0 12px;
  font-size: 0.85rem;
  color: var(--aki-primary);
}

.btn-select-features {
  padding: 12px 16px; margin: 12px 12px;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: var(--aki-primary);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-select-features:hover {
  background: rgba(0, 240, 255, 0.15);
  border-color: var(--aki-primary);
}

.section-title {
  padding: 12px 16px; font-size: 0.7rem; font-weight: 700;
  color: #666; text-transform: uppercase; letter-spacing: 1px;
}

.models-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px; padding: 0 12px;
}

.model-checkbox {
  display: flex; align-items: center;
  gap: 6px; cursor: pointer; font-size: 0.8rem;
  padding: 8px; border-radius: 4px;
  transition: all 0.2s;
}

.model-checkbox:hover {
  background: rgba(0, 240, 255, 0.08);
}

.model-checkbox input {
  width: 16px; height: 16px;
  cursor: pointer; accent-color: var(--aki-danger);
}

.model-checkbox span {
  color: #aaa;
}

.model-checkbox input:checked + span {
  color: white;
}

.adjust-params {
  padding: 12px 16px; margin: 8px 12px;
  background: transparent;
  border: 1px solid #333;
  color: #aaa;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex; align-items: center; justify-content: space-between;
  transition: all 0.2s;
}

.adjust-params:hover {
  border-color: #555;
  color: white;
}

.adjust-params ion-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.adjust-params ion-icon.rotated {
  transform: rotate(180deg);
}

.params-section {
  padding: 12px 16px;
  border-top: 1px solid #333;
  display: flex; flex-direction: column; gap: 10px;
}

.param-input-group {
  display: flex; flex-direction: column; gap: 4px;
}

.param-label {
  font-size: 0.7rem; color: #888; font-weight: 600;
  text-transform: uppercase;
}

.param-input {
  background: #14151a; border: 1px solid #333;
  color: #fff; padding: 8px 10px;
  border-radius: 4px; font-size: 0.8rem;
}

.param-input:focus {
  border-color: var(--aki-primary);
  outline: none;
}

.test-crossval-row {
  display: flex; gap: 8px; padding: 12px 12px;
  margin-top: auto;
}

.test-crossval-row .custom-select-wrapper {
  flex: 1;
}

.custom-select-wrapper {
  position: relative; background: #14151a; border: 1px solid #333;
  border-radius: 6px; overflow: hidden; transition: 0.2s;
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

/* Sidebar Footer */
.sidebar-footer { margin-top: auto; padding: 15px 12px; border-top: 1px solid var(--border-glass); }

.nav-next {
  width: 100%; background: var(--aki-danger); color: white;
  padding: 12px; border: none; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; font-weight: 700; box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
}

.training-container.desktop-collapsed .nav-next span { display: none; }

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

/* HAMBURGER BUTTON */
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

.sub-tabs { display: flex; background: rgba(0, 0, 0, 0.3); border-bottom: 1px solid var(--border-glass); overflow-x: auto; }

.tab {
  flex: 1; text-align: center; padding: 12px 0;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  color: #666; cursor: pointer; white-space: nowrap; min-width: 80px;
}

.tab.active { color: #ff5e00; border-bottom: 2px solid #ff5e00; background: linear-gradient(to top, rgba(255, 94, 0, 0.05), transparent); }

.table-wrap { flex: 1; overflow: auto; }

.metrics-table {
  width: 100%; border-collapse: collapse; font-size: 0.75rem;
}

.metrics-table th, .metrics-table td {
  padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  text-align: left;
}

.metrics-table th {
  background: #141414; color: #888; font-weight: 600;
  position: sticky; top: 0; z-index: 5;
}

.metrics-table tbody td { color: #ccc; }

.selections-content {
  padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 15px;
}

.metric-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}

.metric-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  display: flex; flex-direction: column; gap: 6px;
}

.metric-label { font-size: 0.75rem; color: #00f0ff; font-weight: 700; }
.metric-value { font-size: 1rem; color: #fff; font-weight: 600; }

.selections-buttons {
  display: flex; gap: 10px;
}

.selection-btn {
  flex: 1; padding: 10px; background: transparent;
  border: 1px solid #333; color: #aaa;
  border-radius: 6px; cursor: pointer;
  font-size: 0.8rem; font-weight: 600;
  transition: all 0.2s;
}

.selection-btn:hover {
  border-color: #555; color: white;
}

.preview-table-wrapper {
  flex: 1; overflow: auto;
}

.preview-table {
  width: 100%; border-collapse: collapse; font-size: 0.75rem;
}

.preview-table th, .preview-table td {
  padding: 10px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  text-align: left;
}

.preview-table th {
  background: #141414; color: #888; font-weight: 600;
  position: sticky; top: 0; z-index: 5;
}

.preview-table tbody td { color: #ccc; }

/* Comparison Tabs */
.comparison-tabs {
  display: flex; gap: 20px;
}

.comparison-tab {
  font-size: 0.9rem; font-weight: 700;
  color: #aaa; cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.comparison-tab:hover { color: #ddd; }

.comparison-tab.active {
  color: var(--aki-danger);
  border-bottom-color: var(--aki-danger);
}

.chart-filters {
  display: flex; gap: 15px; padding: 12px 18px;
  border-bottom: 1px solid var(--border-glass);
}

.filter-group {
  flex: 1; display: flex; flex-direction: column; gap: 6px;
}

.filter-group label {
  font-size: 0.75rem; color: #888; font-weight: 600;
  text-transform: uppercase;
}

.chart-title {
  padding: 12px 18px; font-weight: 700;
  color: #ddd; font-size: 0.95rem;
}

.chart-container {
  flex: 1; position: relative;
  padding: 20px; min-height: 300px;
  display: flex; justify-content: center; align-items: center;
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
  width: 450px; background: #0b0c10;
  border: 1px solid var(--border-glass); border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  display: flex; flex-direction: column; overflow: hidden;
}

.modal-header {
  padding: 15px 20px; background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid var(--border-glass);
  display: flex; justify-content: space-between; align-items: center;
}

.modal-title { font-weight: 700; color: #fff; font-size: 0.95rem; letter-spacing: 0.5px; }

.close-btn {
  background: none; border: none; color: #888;
  cursor: pointer; font-size: 1.2rem; transition: 0.2s;
}

.close-btn:hover { color: var(--aki-danger); }

.modal-body { padding: 25px; }

.modal-label {
  display: block; font-size: 0.85rem; color: #aaa;
  margin-bottom: 10px; font-weight: 600;
}

.modal-submit {
  width: 100%; padding: 12px; margin-top: 20px;
  background: #FFFFFF; color: #000000;
  border: none; border-radius: 6px;
  cursor: pointer; font-weight: 700;
  font-size: 0.85rem; text-transform: uppercase;
  transition: 0.2s;
}

.modal-submit:hover {
  background: #e6e6e6;
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
  .modal-window { width: 90vw; }
  .models-grid { grid-template-columns: 1fr; }
  .metric-grid { grid-template-columns: 1fr; }
}

@media screen and (max-width: 480px) {
  .logo-text { display: block; font-size: 0.8rem; }
  .top-nav-btn { padding: 8px; border-radius: 50%; }
  .pipeline { width: 100%; justify-content: space-between; }
  .glass-panel { min-height: 300px; }
  .chart-filters { flex-direction: column; }
  .comparison-tabs { flex-direction: column; }
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>