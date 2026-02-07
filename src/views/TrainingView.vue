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
            <span class="tab" :class="{ active: currentTab === 'result' }" @click="currentTab = 'result'">Result</span>
            <span class="tab" :class="{ active: currentTab === 'report' }" @click="currentTab = 'report'">Report</span>
            <span class="tab" :class="{ active: currentTab === 'confusion' }" @click="currentTab = 'confusion'">Confusion Matrix</span>
            <span class="tab" :class="{ active: currentTab === 'preview' }" @click="currentTab = 'preview'">Preview</span>
            <span class="tab" :class="{ active: currentTab === 'selections' }" @click="currentTab = 'selections'">Selections</span>
          </div>

          <div class="table-wrap">
            <div v-if="currentTab === 'result'" class="result-chart-wrapper">
              <div class="chart-title">Performance Metrics for Random Forest</div>
              <canvas ref="resultChartRef" style="max-height: 400px;"></canvas>
            </div>

            <div v-if="currentTab === 'report'" class="report-table-wrapper">
              <table class="report-metrics-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1-Score</th>
                    <th>Support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row-0">
                    <td class="label-cell">0.0</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>126.00</td>
                  </tr>
                  <tr class="row-highlight">
                    <td class="label-cell">nan</td>
                    <td>0.94</td>
                    <td>1.00</td>
                    <td>0.97</td>
                    <td>1874.00</td>
                  </tr>
                  <tr class="row-accuracy">
                    <td class="label-cell">accuracy</td>
                    <td colspan="3" style="text-align: center;">0.94</td>
                    <td>0.94</td>
                  </tr>
                  <tr class="row-macro">
                    <td class="label-cell">macro avg</td>
                    <td>0.47</td>
                    <td>0.50</td>
                    <td>0.48</td>
                    <td>2000.00</td>
                  </tr>
                  <tr class="row-weighted">
                    <td class="label-cell">weighted avg</td>
                    <td>0.88</td>
                    <td>0.94</td>
                    <td>0.91</td>
                    <td>2000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="currentTab === 'confusion'" class="confusion-wrapper">
              <div class="confusion-heatmap">
                <div class="heatmap-container">
                  <!-- Y-axis labels -->
                  <div class="y-axis">
                    <div class="y-label top-label">0</div>
                    <div class="y-label bottom-label">null</div>
                  </div>
                  
                  <!-- Heatmap grid -->
                  <div class="heatmap-grid">
                    <div class="heatmap-cell cell-small">
                      <span class="cell-value">-</span>
                    </div>
                    <div class="heatmap-cell cell-large" style="background: linear-gradient(135deg, #0066cc, #00d4ff); opacity: 0.9;">
                      <span class="cell-value">1874</span>
                    </div>
                  </div>
                  
                  <!-- X-axis labels -->
                  <div class="x-axis">
                    <div class="x-label left-label">null</div>
                    <div class="x-label right-label">0</div>
                  </div>
                </div>
                
                <!-- Color scale legend -->
                <div class="color-scale">
                  <div class="scale-bar"></div>
                  <div class="scale-labels">
                    <span class="scale-label">0</span>
                    <span class="scale-label">200</span>
                    <span class="scale-label">400</span>
                    <span class="scale-label">600</span>
                    <span class="scale-label">800</span>
                    <span class="scale-label">1000</span>
                    <span class="scale-label">1200</span>
                    <span class="scale-label">1400</span>
                    <span class="scale-label">1600</span>
                    <span class="scale-label">1800</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentTab === 'preview'" class="preview-table-wrapper">
              <table class="preview-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Transaction ID</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price Per Unit</th>
                    <th>Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>TXN_1961373</td>
                    <td>Coffee</td>
                    <td>2</td>
                    <td>2.0</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>TXN_4977031</td>
                    <td>Cake</td>
                    <td>4</td>
                    <td>3.0</td>
                    <td>12.0</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>TXN_4271903</td>
                    <td>Cookie</td>
                    <td>4</td>
                    <td>1.0</td>
                    <td>ERROR</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>TXN_7034554</td>
                    <td>Salad</td>
                    <td>2</td>
                    <td>5.0</td>
                    <td>10.0</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>TXN_3160411</td>
                    <td>Coffee</td>
                    <td>2</td>
                    <td>2.0</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>TXN_2602893</td>
                    <td>Smoothie</td>
                    <td>5</td>
                    <td>4.0</td>
                    <td>20.0</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>TXN_4433211</td>
                    <td>UNKNOWN</td>
                    <td>3</td>
                    <td>3.0</td>
                    <td>9.0</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>TXN_6699534</td>
                    <td>Sandwich</td>
                    <td>4</td>
                    <td>4.0</td>
                    <td>16.0</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>TXN_4717867</td>
                    <td>None</td>
                    <td>5</td>
                    <td>3.0</td>
                    <td>15.0</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>TXN_2064365</td>
                    <td>Sandwich</td>
                    <td>5</td>
                    <td>4.0</td>
                    <td>20.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="currentTab === 'selections'" class="selections-content">
              <div class="selections-header">
                <h3>Model Configuration & Performance</h3>
              </div>
              <div class="selections-grid">
                <div class="selection-info-card">
                  <div class="info-label">Target Column</div>
                  <div class="info-value">{{ targetColumn }}</div>
                </div>
                <div class="selection-info-card">
                  <div class="info-label">Accuracy</div>
                  <div class="info-value" style="color: #00f0ff;">93.70%</div>
                </div>
                <div class="selection-info-card">
                  <div class="info-label">Cross Validation Fold</div>
                  <div class="info-value">None</div>
                </div>
                <div class="selection-info-card">
                  <div class="info-label">Test Size</div>
                  <div class="info-value">20%</div>
                </div>
              </div>
              <div class="selections-buttons">
                <button class="selection-btn" @click="toggleSelectedFeatures">
                  Selected Features 
                  <span :class="['toggle-icon', { open: showSelectedFeatures }]">▲</span>
                </button>
                <button class="selection-btn" @click="toggleParameters">
                  Parameters 
                  <span :class="['toggle-icon', { open: showParameters }]">▲</span>
                </button>
              </div>
              
              <div v-if="showSelectedFeatures" class="code-block">
                <pre><code>{
  <span class="code-number">0</span> : <span class="code-string">"Quantity"</span>,
  <span class="code-number">1</span> : <span class="code-string">"Price Per Unit"</span>
}</code></pre>
              </div>

              <div v-if="showParameters" class="code-block">
                <pre><code>{
  <span class="code-key">"parameters"</span>: {
    <span class="code-key">"n_estimators"</span>: <span class="code-number">100</span>,
    <span class="code-key">"max_depth"</span>: <span class="code-number">10</span>,
    <span class="code-key">"min_samples_split"</span>: <span class="code-number">2</span>,
    <span class="code-key">"min_samples_leaf"</span>: <span class="code-number">1</span>
  }
}</code></pre>
              </div>
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
                  <option value="Run 6">Run 6</option>
                  <option value="Run 1">Run 1</option>
                  <option value="Run 2">Run 2</option>
                  <option value="Run 3">Run 3</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>
            <div class="filter-group">
              <label>Select Metric</label>
              <div class="custom-select-wrapper" :class="{ 'metric-select': comparisonMode === 'run' }">
                <select class="f-input" v-model="selectedMetric">
                  <option value="F1 Score">F1 Score</option>
                  <option value="Precision">Precision</option>
                  <option value="Recall">Recall</option>
                  <option value="Accuracy">Accuracy</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>
          </div>

          <div class="chart-title">
            {{ comparisonMode === 'run' ? selectedMetric + ' Comparison for ' + selectedRun.toLowerCase() : selectedMetric + ' Across Runs' }}
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
        <div class="modal-window select-features-modal" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Select Feature</h2>
            <button class="close-btn" @click="closeSelectFeatures">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div class="modal-body">
            <!-- Error Message -->
            <div v-if="trainingError" class="error-alert">
              {{ trainingError }}
            </div>

            <!-- Select Action for Features -->
            <div class="feature-section">
              <div class="section-header">
                <label>Select Action for Features</label>
                <ion-icon name="help-circle-outline" class="help-icon"></ion-icon>
              </div>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" v-model="featureAction" value="drop" />
                  <span>Drop</span>
                </label>
                <label class="radio-option keep-option">
                  <input type="radio" v-model="featureAction" value="keep" />
                  <span>Keep</span>
                </label>
              </div>
            </div>

            <!-- Select Feature(s) to Keep -->
            <div class="feature-section">
              <div class="section-header">
                <label>Select Feature(s) to Keep</label>
                <ion-icon name="help-circle-outline" class="help-icon"></ion-icon>
              </div>
              <div class="custom-select-wrapper">
                <select class="f-input" disabled>
                  <option>No options to select</option>
                </select>
                <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
              </div>
            </div>

            <!-- Selected Features -->
            <div class="feature-section">
              <label class="section-label">Selected Features</label>
              <div class="selected-features-box">
                <p class="no-features-text">No features selected.</p>
              </div>
            </div>
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
const showSelectedFeatures = ref(false);
const showParameters = ref(false);
const featureAction = ref('keep');
const trainingError = ref('');

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
const currentTab = ref('result');
const comparisonMode = ref('run');
const selectedRun = ref('Run 6');
const selectedModel = ref('Random Forest');
const selectedMetric = ref('F1 Score');

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
const resultChartRef = ref(null);
let chartInstance = null;
let resultChartInstance = null;

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

const toggleSelectedFeatures = () => {
  showSelectedFeatures.value = !showSelectedFeatures.value;
};

const toggleParameters = () => {
  showParameters.value = !showParameters.value;
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
    currentTab.value = 'result';
  }, 2000);
};

const goHome = () => {
  router.push('/');
};

const goToPredict = () => {
  router.push('/predict');
};

const renderResultChart = () => {
  const ctx = resultChartRef.value?.getContext('2d');
  if (!ctx) return;
  
  if (resultChartInstance) resultChartInstance.destroy();
  
  resultChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
      datasets: [{
        label: 'Performance Metrics',
        data: [93.70, 87.80, 93.70, 90.65],
        backgroundColor: ['#00d4ff', '#ffeb3b', '#ff9a56', '#d596ff'],
        borderRadius: 6,
        borderSkipped: false,
        borderWidth: 0,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          padding: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(2) + '%';
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 }
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          ticks: { 
            color: '#888',
            stepSize: 20,
            callback: function(value) {
              return value.toFixed(2);
            }
          },
          grid: { 
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          max: 100
        },
        x: { 
          ticks: { color: '#888' },
          grid: { display: false },
          border: { display: false }
        }
      }
    },
    plugins: [{
      id: 'customDataLabels',
      afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
            const x = bar.x;
            const y = bar.y - 10;
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(value.toFixed(2) + '%', x, y);
          });
        });
      }
    }]
  });
};



const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;

  if (comparisonMode.value === 'run') {
    const metricValue = getMetricValue(selectedMetric.value);
    
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Random Forest'],
        datasets: [{
          label: selectedMetric.value,
          data: [metricValue],
          backgroundColor: '#00d4ff',
          borderColor: '#00d4ff',
          borderWidth: 0,
          borderRadius: 4,
          barPercentage: 0.5,
          categoryPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            padding: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return context.parsed.x.toFixed(2) + '%';
              }
            }
          }
        },
        scales: {
          x: { 
            beginAtZero: true,
            ticks: { color: '#888' }, 
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            max: 100
          },
          y: { 
            ticks: { color: '#888' }, 
            grid: { display: false },
            border: { display: false }
          }
        }
      },
      plugins: [{
        id: 'customDataLabels',
        afterDatasetsDraw(chart) {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar, index) => {
              const value = dataset.data[index];
              const x = bar.x + 10;
              const y = bar.y;
              
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 14px sans-serif';
              ctx.textAlign = 'left';
              ctx.textBaseline = 'middle';
              ctx.fillText(value.toFixed(2) + '%', x, y);
            });
          });
        }
      }]
    });
  } else {
    // Result Comparison - Line chart across runs
    const runNumbers = ['1', '2', '3', '4', '5', '6'];
    
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: runNumbers,
        datasets: [
          {
            label: 'Random Forest',
            data: [20, 20, 35, 85, 90, 93.7],
            borderColor: '#00d4ff',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#00d4ff',
            pointBorderWidth: 2,
            tension: 0.4,
            borderDash: [5, 5]
          },
          {
            label: 'KNN',
            data: [20, 20, 20, 20, 20, 20],
            borderColor: '#00d4ff',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#00d4ff',
            pointBorderWidth: 2,
            tension: 0.4,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { 
              color: '#888',
              usePointStyle: true,
              padding: 20,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            padding: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true,
            ticks: { 
              color: '#888',
              stepSize: 20,
              callback: function(value) {
                return value.toFixed(0);
              }
            }, 
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            max: 100
          },
          x: { 
            ticks: { color: '#888' }, 
            grid: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }
};

const getMetricValue = (metric) => {
  const values = {
    'F1 Score': 90.65,
    'Precision': 87.80,
    'Recall': 93.70,
    'Accuracy': 93.70,
    'MSE': 1.0392,
    'RMSE': 1.0194,
    'MAE': 0.8440,
    'R2': 0.6761,
    'MSLE': 0.0300,
    'RMSLE': 0.1732,
    'MAPE': 18.2729
  };
  return values[metric] || 90.65;
};

onMounted(() => {
  setTimeout(() => {
    renderChart();
    renderResultChart();
  }, 100);
});

watch([comparisonMode, selectedMetric], () => {
  setTimeout(() => renderChart(), 100);
});

watch(currentTab, () => {
  setTimeout(() => {
    if (currentTab.value === 'result') renderResultChart();
  }, 100);
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

/* Report Table Styles */
.report-table-wrapper {
  flex: 1; overflow: auto; padding: 15px;
}

.report-metrics-table {
  width: 100%; border-collapse: collapse; font-size: 0.8rem;
}

.report-metrics-table th {
  background: rgba(0, 0, 0, 0.4);
  color: #aaa;
  font-weight: 700;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.report-metrics-table th:first-child {
  text-align: left;
}

.report-metrics-table td {
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #ddd;
}

.report-metrics-table td.label-cell {
  text-align: left;
  background: rgba(0, 0, 0, 0.2);
  color: #888;
  font-weight: 600;
}

/* Row 1: 0.0 - white background */
.report-metrics-table tbody tr.row-0 {
  background: transparent;
}

.report-metrics-table tbody tr.row-0 td {
  background: transparent;
  color: #ddd;
}

/* Row 2: nan - dark blue background */
.report-metrics-table tbody tr.row-highlight {
  background: rgba(25, 80, 150, 0.6);
}

.report-metrics-table tbody tr.row-highlight td {
  background: rgba(25, 80, 150, 0.6);
  color: #fff;
  font-weight: 600;
}

.report-metrics-table tbody tr.row-highlight td.label-cell {
  background: rgba(10, 50, 100, 0.7);
}

/* Row 3: accuracy - light blue background */
.report-metrics-table tbody tr.row-accuracy {
  background: rgba(100, 180, 255, 0.3);
}

.report-metrics-table tbody tr.row-accuracy td {
  background: rgba(100, 180, 255, 0.3);
  color: #fff;
}

.report-metrics-table tbody tr.row-accuracy td.label-cell {
  background: rgba(50, 120, 200, 0.4);
}

/* Row 4: macro avg - light cyan background */
.report-metrics-table tbody tr.row-macro {
  background: rgba(100, 200, 255, 0.25);
}

.report-metrics-table tbody tr.row-macro td {
  background: rgba(100, 200, 255, 0.25);
  color: #fff;
}

.report-metrics-table tbody tr.row-macro td.label-cell {
  background: rgba(50, 150, 220, 0.3);
}

/* Row 5: weighted avg - darker blue background */
.report-metrics-table tbody tr.row-weighted {
  background: rgba(30, 100, 180, 0.5);
}

.report-metrics-table tbody tr.row-weighted td {
  background: rgba(30, 100, 180, 0.5);
  color: #fff;
  font-weight: 600;
}

.report-metrics-table tbody tr.row-weighted td.label-cell {
  background: rgba(15, 60, 130, 0.6);
}

/* Confusion Matrix Styles */
.confusion-wrapper {
  flex: 1; overflow: auto; padding: 30px;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  gap: 30px;
}

.confusion-heatmap {
  display: flex; gap: 40px; align-items: flex-start;
}

.heatmap-container {
  display: flex; flex-direction: column; gap: 20px;
}

.y-axis {
  display: flex; flex-direction: column; gap: 0;
  position: relative;
  width: 50px;
}

.y-label {
  color: #888; font-size: 0.85rem; font-weight: 600;
  text-align: right; padding-right: 15px;
}

.y-label.top-label {
  height: 60px; display: flex; align-items: flex-start;
}

.y-label.bottom-label {
  height: 60px; display: flex; align-items: flex-end;
}

.heatmap-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 300px;
  height: 300px;
}

.heatmap-cell {
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  position: relative;
}

.heatmap-cell.cell-small {
  background: rgba(50, 50, 60, 0.6);
  color: #666;
  font-size: 1.5rem;
}

.heatmap-cell.cell-large {
  grid-column: span 2;
  background: linear-gradient(135deg, #0066cc, #00d4ff);
}

.cell-value {
  color: #fff;
  font-weight: 700;
  font-size: 1.3rem;
}

.x-axis {
  display: flex; justify-content: space-around;
  gap: 0;
  width: 315px;
  margin-left: 50px;
}

.x-label {
  color: #888; font-size: 0.85rem; font-weight: 600;
  flex: 1; text-align: center;
}

.color-scale {
  display: flex; flex-direction: column; gap: 10px;
  width: 30px;
}

.scale-bar {
  width: 30px;
  height: 300px;
  background: linear-gradient(to bottom, #00d4ff, #0066cc, #000033);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

.scale-labels {
  display: flex; flex-direction: column; justify-content: space-between;
  height: 300px;
  font-size: 0.7rem;
  color: #888;
  text-align: center;
}

.scale-label {
  line-height: 1;
}

.selections-content {
  padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 15px;
}

.selections-header {
  margin-bottom: 10px;
}

.selections-header h3 {
  font-size: 0.95rem; color: #ddd; font-weight: 700;
}

.selections-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  margin-bottom: 15px;
}

.selection-info-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 6px;
  padding: 12px;
  display: flex; flex-direction: column; gap: 6px;
}

.info-label { 
  font-size: 0.7rem; color: #00f0ff; font-weight: 700; text-transform: uppercase;
}

.info-value { 
  font-size: 0.95rem; color: #fff; font-weight: 600;
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
  flex: 1; padding: 12px 14px; background: transparent;
  border: 1px solid #333; color: #aaa;
  border-radius: 6px; cursor: pointer;
  font-size: 0.8rem; font-weight: 600;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: space-between;
}

.selection-btn:hover {
  border-color: #555; color: white;
}

.toggle-icon {
  transition: transform 0.3s ease;
  display: inline-block;
  margin-left: 8px;
}

.toggle-icon.open {
  transform: rotate(180deg);
}

.code-block {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  padding: 15px;
  margin-top: 12px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  color: #ccc;
  line-height: 1.6;
}

.code-block code {
  color: #ccc;
}

.code-key {
  color: #00f0ff;
  font-weight: 600;
}

.code-number {
  color: #ffa500;
  font-weight: 600;
}

.code-string {
  color: #ff9a56;
}

.result-chart-wrapper {
  flex: 1; overflow: auto; padding: 25px;
  display: flex; flex-direction: column; gap: 20px;
}

.result-chart-wrapper .chart-title {
  font-size: 1.1rem; font-weight: 700;
  color: #fff;
  margin-top: 10px;
}

.chart-wrapper {
  flex: 1; overflow: auto; padding: 20px;
  display: flex; align-items: center; justify-content: center;
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

.metric-select .f-input {
  border-color: #ff5e00 !important;
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
  max-height: 90vh; overflow-y: auto;
}

.select-features-modal {
  width: 900px;
  max-width: 90vw;
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

.modal-body { 
  padding: 25px; 
  display: grid; 
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.feature-section {
  display: flex; flex-direction: column; gap: 12px;
}

.section-header {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 8px;
}

.section-header label {
  font-size: 0.85rem;
  color: #ddd;
  font-weight: 700;
}

.help-icon {
  font-size: 1rem;
  color: #888;
  cursor: help;
}

.radio-group {
  display: flex; gap: 15px;
}

.radio-option {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #aaa;
  transition: all 0.2s;
}

.radio-option input[type="radio"] {
  cursor: pointer;
  accent-color: #ff5e00;
}

.radio-option:hover {
  color: #ddd;
}

.radio-option.keep-option input[type="radio"] {
  accent-color: #ff5e00;
}

.section-label {
  font-size: 0.85rem;
  color: #ddd;
  font-weight: 700;
  display: block;
}

.selected-features-box {
  background: rgba(100, 120, 80, 0.5);
  border: 1px solid rgba(180, 200, 100, 0.3);
  border-radius: 6px;
  padding: 15px;
  min-height: 80px;
  display: flex; align-items: center; justify-content: center;
}

.no-features-text {
  color: #d4d4a0;
  font-size: 0.9rem;
  margin: 0;
}

.error-alert {
  grid-column: 1 / -1;
  background: rgba(180, 80, 80, 0.7);
  border: 1px solid rgba(255, 100, 100, 0.3);
  border-radius: 6px;
  padding: 12px 15px;
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

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