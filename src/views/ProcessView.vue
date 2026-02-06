<template>
  <div class="process-container" :class="{ 'desktop-collapsed': isCollapsed }">
    
    <div 
      class="mobile-overlay" 
      :class="{ active: showMobileSidebar }"
      @click="closeMobileSidebar"
    ></div>

    <nav class="sidebar" :class="{ 'mobile-open': showMobileSidebar }">
      <div class="logo-container">
        <ion-icon name="analytics-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA PROCESS</span>
        
        <button class="mobile-close-btn" @click="closeMobileSidebar">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">TRANSFORMATION TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'rename' }">
          <div class="tool-header" @click="toggleTool('rename')">
            <ion-icon name="text-outline"></ion-icon>
            <span class="tool-label">Rename or Drop Columns</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'rename' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'rename' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="renameConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Transaction ID">Transaction ID</option>
                    <option value="Customer Name">Customer Name</option>
                    <option value="Description">Description</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Action</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="renameConfig.action">
                    <option value="" disabled selected>Choose action...</option>
                    <option value="rename">Rename</option>
                    <option value="drop">Drop</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group" v-if="renameConfig.action === 'rename'">
                <label class="sub-label">New Column Name</label>
                <input type="text" class="f-input" v-model="renameConfig.newName" placeholder="Enter name...">
              </div>
              <button class="btn-action primary-btn" @click="applyRename">Apply Changes</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'null' }">
          <div class="tool-header" @click="toggleTool('null')">
            <ion-icon name="water-outline"></ion-icon>
            <span class="tool-label">Null Handle</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'null' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'null' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="nullConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Transaction ID">Transaction ID</option>
                    <option value="mainroad">mainroad</option>
                    <option value="guestroom">guestroom</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Strategy</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="nullConfig.strategy">
                    <option value="" disabled selected>Choose strategy...</option>
                    <option value="mean">Mean</option>
                    <option value="median">Median</option>
                    <option value="mode">Mode</option>
                    <option value="forward_fill">Forward Fill</option>
                    <option value="drop">Drop Rows</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyNullHandle">Apply Handling</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'nullcat' }">
          <div class="tool-header" @click="toggleTool('nullcat')">
            <ion-icon name="layers-outline"></ion-icon>
            <span class="tool-label">Null Handle (Categorical)</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'nullcat' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'nullcat' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="nullCatConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Category A">Category A</option>
                    <option value="Category B">Category B</option>
                    <option value="Category C">Category C</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Fill Strategy</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="nullCatConfig.fillStrategy">
                    <option value="" disabled selected>Choose strategy...</option>
                    <option value="mode">Most Frequent</option>
                    <option value="custom">Custom Value</option>
                    <option value="drop">Drop Rows</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyNullCatHandle">Apply Handling</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'outlier' }">
          <div class="tool-header" @click="toggleTool('outlier')">
            <ion-icon name="trending-up-outline"></ion-icon>
            <span class="tool-label">Outlier Detection</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'outlier' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'outlier' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="outlierConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Price">Price</option>
                    <option value="Age">Age</option>
                    <option value="Income">Income</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Method</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="outlierConfig.method">
                    <option value="" disabled selected>Choose method...</option>
                    <option value="iqr">IQR Method</option>
                    <option value="zscore">Z-Score</option>
                    <option value="isolation">Isolation Forest</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyOutlierDetection">Detect Outliers</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'smote' }">
          <div class="tool-header" @click="toggleTool('smote')">
            <ion-icon name="flask-outline"></ion-icon>
            <span class="tool-label">SMOTE</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'smote' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'smote' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Target Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="smoteConfig.targetColumn">
                    <option value="" disabled selected>Choose target...</option>
                    <option value="Target Class">Target Class</option>
                    <option value="Label">Label</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Sampling Strategy</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="smoteConfig.samplingStrategy">
                    <option value="" disabled selected>Choose strategy...</option>
                    <option value="auto">Auto</option>
                    <option value="minority">Minority Class</option>
                    <option value="not_majority">Not Majority</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applySMOTE">Apply SMOTE</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'encoding' }">
          <div class="tool-header" @click="toggleTool('encoding')">
            <ion-icon name="code-slash-outline"></ion-icon>
            <span class="tool-label">Encoding</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'encoding' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'encoding' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="encodingConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Color">Color</option>
                    <option value="Category">Category</option>
                    <option value="Status">Status</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Encoding Type</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="encodingConfig.type">
                    <option value="" disabled selected>Choose type...</option>
                    <option value="onehot">One-Hot</option>
                    <option value="label">Label</option>
                    <option value="ordinal">Ordinal</option>
                    <option value="target">Target</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyEncoding">Apply Encoding</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'feature' }">
          <div class="tool-header" @click="toggleTool('feature')">
            <ion-icon name="construct-outline"></ion-icon>
            <span class="tool-label">Feature Engineering</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'feature' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'feature' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Feature Type</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="featureConfig.type">
                    <option value="" disabled selected>Choose type...</option>
                    <option value="polynomial">Polynomial</option>
                    <option value="interaction">Interaction</option>
                    <option value="binning">Binning</option>
                    <option value="scaling">Scaling</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Columns to Process</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="featureConfig.columns" multiple>
                    <option value="Feature1">Feature 1</option>
                    <option value="Feature2">Feature 2</option>
                    <option value="Feature3">Feature 3</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyFeatureEngineering">Apply Features</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'normalization' }">
          <div class="tool-header" @click="toggleTool('normalization')">
            <ion-icon name="swap-horizontal-outline"></ion-icon>
            <span class="tool-label">Normalization</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'normalization' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'normalization' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Columns</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="normalizationConfig.columns" multiple>
                    <option value="Price">Price</option>
                    <option value="Age">Age</option>
                    <option value="Income">Income</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Scaler Type</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="normalizationConfig.scalerType">
                    <option value="" disabled selected>Choose scaler...</option>
                    <option value="standard">Standard Scaler</option>
                    <option value="minmax">Min-Max</option>
                    <option value="robust">Robust</option>
                    <option value="log">Log</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyNormalization">Apply Normalization</button>
            </div>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-next" @click="goToTraining">
          <span>NEXT</span>
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
              <div class="step active">PREPROCESSING</div>
              <div class="step">TRAINING</div>
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
            <span class="panel-label">Before Modification</span>
          </div>
          <div class="sub-tabs">
            <div 
              v-for="chartType in chartTypes" 
              :key="chartType"
              class="tab"
              :class="{ active: selectedChartType === chartType }"
              @click="selectChartType(chartType)"
            >
              {{ chartType }}
            </div>
          </div>
          <div class="panel-content-pad">
            <div class="chart-controls-wrapper">
              <div class="inputs-row">
                <div class="input-group-mini">
                  <label>Names</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="beforeConfig.names">
                      <option value="User_ID">User_ID</option>
                      <option value="Feature1">Feature 1</option>
                      <option value="Feature2">Feature 2</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>
                <div class="input-group-mini">
                  <label>Values</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="beforeConfig.values">
                      <option value="None">None</option>
                      <option value="Value1">Value 1</option>
                      <option value="Value2">Value 2</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-display-area">
              <ion-icon :name="getChartIcon()"></ion-icon>
              <span>{{ selectedChartType }} Chart Preview</span>
            </div>
          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label">After Modification</span>
          </div>
          <div class="sub-tabs">
            <div 
              v-for="chartType in chartTypes" 
              :key="chartType"
              class="tab"
              :class="{ active: selectedChartType === chartType }"
              @click="selectChartType(chartType)"
            >
              {{ chartType }}
            </div>
          </div>
          <div class="panel-content-pad">
            <div class="chart-controls-wrapper">
              <div class="inputs-row">
                <div class="input-group-mini">
                  <label>Names</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="afterConfig.names">
                      <option value="User_ID">User_ID</option>
                      <option value="Feature1">Feature 1</option>
                      <option value="Feature2">Feature 2</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>
                <div class="input-group-mini">
                  <label>Values</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="afterConfig.values">
                      <option value="None">None</option>
                      <option value="Value1">Value 1</option>
                      <option value="Value2">Value 2</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-display-area">
              <ion-icon :name="getChartIcon()"></ion-icon>
              <span>{{ selectedChartType }} Chart Preview</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTool = ref(null);
const isCollapsed = ref(false);
const showMobileSidebar = ref(false);
const selectedChartType = ref('Pie');

const chartTypes = ['Pie', 'Box', 'Scatter', 'Violin', 'Line', 'Histogram', 'DistPlot', 'Co-relation', 'Z'];

const renameConfig = ref({ column: '', action: '', newName: '' });
const nullConfig = ref({ column: '', strategy: '' });
const nullCatConfig = ref({ column: '', fillStrategy: '' });
const outlierConfig = ref({ column: '', method: '' });
const smoteConfig = ref({ targetColumn: '', samplingStrategy: '' });
const encodingConfig = ref({ column: '', type: '' });
const featureConfig = ref({ type: '', columns: [] });
const normalizationConfig = ref({ columns: [], scalerType: '' });

const beforeConfig = ref({ names: 'User_ID', values: 'None' });
const afterConfig = ref({ names: 'User_ID', values: 'None' });

const toggleTool = (toolName) => {
  activeTool.value = activeTool.value === toolName ? null : toolName;
};

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

const selectChartType = (chartType) => {
  selectedChartType.value = chartType;
};

const getChartIcon = () => {
  const icons = {
    'Pie': 'pie-chart-outline',
    'Box': 'cube-outline',
    'Scatter': 'scatter-plot-outline',
    'Violin': 'musical-notes-outline',
    'Line': 'trending-up-outline',
    'Histogram': 'bar-chart-outline',
    'DistPlot': 'analytics-outline',
    'Co-relation': 'git-network-outline',
    'Z': 'flashlight-outline'
  };
  return icons[selectedChartType.value] || 'analytics-outline';
};

const applyRename = () => console.log('Apply Rename:', renameConfig.value);
const applyNullHandle = () => console.log('Apply Null Handle:', nullConfig.value);
const applyNullCatHandle = () => console.log('Apply Null Categorical Handle:', nullCatConfig.value);
const applyOutlierDetection = () => console.log('Apply Outlier Detection:', outlierConfig.value);
const applySMOTE = () => console.log('Apply SMOTE:', smoteConfig.value);
const applyEncoding = () => console.log('Apply Encoding:', encodingConfig.value);
const applyFeatureEngineering = () => console.log('Apply Feature Engineering:', featureConfig.value);
const applyNormalization = () => console.log('Apply Normalization:', normalizationConfig.value);

const goHome = () => router.push('/');
const goToTraining = () => router.push('/training');
</script>

<style scoped>
:root {
  --aki-primary: #00f0ff;
  --aki-primary-dim: rgba(0, 240, 255, 0.1);
  --aki-danger: #ff2a6d;
  --border-glass: rgba(255, 255, 255, 0.05);
  --bg-gradient: linear-gradient(135deg, rgba(0,240,255,0.05), rgba(255,42,109,0.02));
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
.process-container {
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

.process-container.desktop-collapsed .sidebar { width: 80px; }
.process-container.desktop-collapsed .hide-on-collapse { opacity: 0; display: none; }

.tools-wrapper {
  flex: 1; overflow-y: auto; padding: 12px 0;
}

.section-title {
  padding: 12px 16px; font-size: 0.7rem; font-weight: 700;
  color: #666; text-transform: uppercase; letter-spacing: 1px;
}

.tool-item { border-bottom: 1px solid rgba(255, 255, 255, 0.03); }

.tool-header {
  padding: 12px 16px; display: flex; align-items: center;
  gap: 10px; cursor: pointer; color: #aaa; transition: 0.2s;
  font-size: 0.9rem; font-weight: 600;
}

.tool-header:hover { color: white; background: rgba(0, 240, 255, 0.05); }

.tool-item.active .tool-header {
  background: rgba(0, 240, 255, 0.08); color: var(--aki-primary);
}

.tool-header ion-icon:first-child { font-size: 1.2rem; }

.chevron { transition: transform 0.3s ease; }
.chevron.rotated { transform: rotate(90deg); }

.tool-content {
  overflow: hidden; transition: max-height 0.3s ease;
}

.form-pad {
  padding: 16px; display: flex; flex-direction: column; gap: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.input-group {
  display: flex; flex-direction: column; gap: 6px;
}

.sub-label {
  font-size: 0.75rem; color: #888; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.5px;
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

/* PRIMARY ACTION BUTTONS (Bright White) */
.btn-action {
  width: 100%; padding: 12px;
  border-radius: 6px; border: none;
  cursor: pointer; font-size: 0.85rem; font-weight: 700;
  transition: 0.2s; margin-top: 5px;
  text-transform: uppercase; letter-spacing: 0.5px;
}

.primary-btn {
  background: #FFFFFF;
  color: #000000;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.primary-btn:hover {
  background: #e6e6e6;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
}

.danger-btn {
  background: rgba(255, 42, 109, 0.1);
  border: 1px solid var(--aki-danger);
  color: var(--aki-danger);
}

.danger-btn:hover { background: var(--aki-danger); color: white; }

/* Sidebar Footer */
.sidebar-footer { margin-top: auto; padding: 15px 12px; border-top: 1px solid var(--border-glass); }

.nav-next {
  width: 100%; background: var(--aki-danger); color: white;
  padding: 12px; border: none; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; font-weight: 700; box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
}

.process-container.desktop-collapsed .nav-next span { display: none; }

/* =================================================================
   5. MAIN VIEW & HEADER
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

/* HAMBURGER BUTTON (Bright and Visible) */
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
   6. CONTENT & RESPONSIVE
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

.panel-label { font-size: 1.1rem; font-weight: 700; color: #ddd; }

.panel-content-pad { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; }

.sub-tabs { display: flex; background: rgba(0, 0, 0, 0.3); border-bottom: 1px solid var(--border-glass); overflow-x: auto; }

.tab {
  flex: 1; text-align: center; padding: 12px 0;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  color: #666; cursor: pointer; white-space: nowrap; min-width: 80px;
}

.tab.active { color: #ff5e00; border-bottom: 2px solid #ff5e00; background: linear-gradient(to top, rgba(255, 94, 0, 0.05), transparent); }

.chart-controls-wrapper {
  display: flex; flex-direction: column; gap: 12px;
}

.inputs-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}

.input-group-mini {
  display: flex; flex-direction: column; gap: 6px;
}

.input-group-mini label {
  font-size: 0.7rem; color: #888; font-weight: 600; text-transform: uppercase;
}

.chart-display-area {
  flex: 1; background: rgba(0, 0, 0, 0.2); border-radius: 8px;
  border: 1px dashed #333; display: flex; flex-direction: column;
  align-items: center; justify-content: center; color: #555; gap: 10px; min-height: 250px;
}

.chart-display-area ion-icon { font-size: 3rem; opacity: 0.5; }

.table-wrap { flex: 1; overflow: auto; }

table { width: 100%; border-collapse: collapse; font-size: 0.75rem; white-space: nowrap; }

thead th {
  position: sticky; top: 0; background: #141414; color: #888;
  text-align: left; padding: 12px 16px; border-bottom: 1px solid #333; z-index: 5;
}

tbody td { padding: 10px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); color: #ccc; }

@media screen and (max-width: 1024px) {
  .sidebar {
    position: fixed; left: 0; top: 0; height: 100%;
    transform: translateX(-100%); width: 280px;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.8);
    border-right: 1px solid #333; z-index: 1000;
  }
  .sidebar.mobile-open { transform: translateX(0); }
  .mobile-close-btn { display: flex; }
  .logo-container { padding-right: 15px; }
  .content-grid { grid-template-columns: 1fr; padding: 15px; }
  .header-center { order: 3; width: 100%; margin-top: 10px; justify-content: flex-start; }
  .pipeline-scroll { justify-content: flex-start; padding-bottom: 5px; }
  .top-header { padding: 10px 15px; }
  .f-input { padding: 14px; font-size: 0.9rem; }
  .tool-header { padding: 14px; }
}

@media screen and (max-width: 480px) {
  .logo-text { display: block; font-size: 0.8rem; }
  .icon-only-mobile .desktop-text { display: none; }
  .top-nav-btn { padding: 8px; border-radius: 50%; }
  .pipeline { width: 100%; justify-content: space-between; }
  .glass-panel { min-height: 300px; }
}
</style>