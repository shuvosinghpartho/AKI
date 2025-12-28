<template>
  <div class="process-container" :class="{ 'sidebar-closed': isSidebarClosed }">
    <!-- Sidebar -->
    <aside class="sidebar" id="mainSidebar">
      <div class="sidebar-header">
        <div class="brand-text">AKI <span style="color:var(--aki-red)">DataSuite</span></div>
      </div>

      <div class="sidebar-content">
        <div class="op-item" :class="{ active: activeOperation === 'rename' }" @click="setActiveOperation('rename')">
          <span>Rename Columns</span>
          <ion-icon name="text-outline"></ion-icon>
        </div>
        
        <div class="op-item" :class="{ active: activeOperation === 'null-handling' }" @click="setActiveOperation('null-handling')">
          <span>Null Handling</span>
          <ion-icon name="water-outline"></ion-icon>
        </div>
        
        <div class="op-item" :class="{ active: activeOperation === 'null-handle-cat' }" @click="setActiveOperation('null-handle-cat')">
          <span>Null Handle (Cat)</span>
          <ion-icon name="list-outline"></ion-icon>
        </div>

        <div class="op-item" :class="{ active: activeOperation === 'outlier-detection' }" @click="setActiveOperation('outlier-detection')">
          <span>Outlier Detection</span>
          <ion-icon name="trending-up-outline"></ion-icon>
        </div>

        <div class="op-item" :class="{ active: activeOperation === 'smote' }" @click="setActiveOperation('smote')">
          <span>SMOTE</span>
          <ion-icon name="duplicate-outline"></ion-icon>
        </div>

        <div class="op-item" :class="{ active: activeOperation === 'encoding' }" @click="setActiveOperation('encoding')">
          <span>Encoding</span>
          <ion-icon name="code-slash-outline"></ion-icon>
        </div>

        <div class="op-item" :class="{ active: activeOperation === 'feature-engineering' }" @click="setActiveOperation('feature-engineering')">
          <span>Feature Engineering</span>
          <ion-icon name="construct-outline"></ion-icon>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="btn-prev" @click="goToFiltering">
          Back
        </button>
        <button class="btn-next" @click="goToNext">
          Next Step <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      
      <div class="top-bar">
        <div class="left-controls">
          <div class="menu-toggle" @click="toggleSidebar">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div class="pipeline-stepper">
            <div class="step">CLEAN</div>
            <div class="step">FILTER</div>
            <div class="step active">PROCESS</div>
            <div class="step">TRAIN</div>
            <div class="step">PREDICT</div>
          </div>
        </div>

        <div class="user-actions">
          <button class="action-btn" title="Home" @click="goHome">
            <ion-icon name="home-outline"></ion-icon>
          </button>
          <button class="action-btn" title="Logout">
            <ion-icon name="log-out-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div class="comparison-grid">
        
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title"><span class="dot yellow"></span> Configuration</span>
            <div class="sub-tabs">
              <span style="font-size: 0.75rem; color: var(--text-gray);">Target: Price</span>
            </div>
          </div>
          
          <div class="chart-controls">
            <button 
              v-for="chartType in chartTypes" 
              :key="chartType"
              class="chart-btn"
              :class="{ active: selectedChartType === chartType }"
              @click="selectChartType(chartType)"
            >
              {{ chartType }}
            </button>
          </div>

          <div class="dropdown-grid">
            <div class="form-group">
              <label>Feature (X)</label>
              <select class="custom-select" v-model="selectedFeature">
                <option v-for="feature in features" :key="feature" :value="feature">
                  {{ feature }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Value (Y)</label>
              <select class="custom-select" v-model="selectedValue">
                <option v-for="value in values" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>

          <div class="chart-area">
            <div class="chart-bg"></div>
            <ion-icon :name="getChartIcon()"></ion-icon>
            <span>{{ getChartTitle() }}</span>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title"><span class="dot green"></span> Processed Data</span>
            <div class="sub-tabs">
              <span 
                style="color: var(--aki-teal); font-weight: 700; font-size:0.75rem; cursor:pointer;"
                :class="{ active: activeSubTab === 'preview' }"
                @click="setActiveSubTab('preview')"
              >Preview</span>
              <span 
                style="color: var(--text-gray); font-size:0.75rem; margin-left:15px; cursor:pointer;"
                :class="{ active: activeSubTab === 'stats' }"
                @click="setActiveSubTab('stats')"
              >Stats</span>
              <span 
                style="color: var(--text-gray); font-size:0.75rem; margin-left:15px; cursor:pointer;"
                :class="{ active: activeSubTab === 'info' }"
                @click="setActiveSubTab('info')"
              >Info</span>
            </div>
          </div>
          <div class="table-scroll-area">
            <table id="table-processed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Transaction</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in processedData" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex" :class="getCellClass(cell, cellIndex)">
                    {{ formatCellValue(cell, cellIndex) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ProcessView',
  data() {
    return {
      isSidebarClosed: false,
      activeOperation: 'null-handling',
      selectedChartType: 'Pie',
      chartTypes: ['Pie', 'Box', 'Scatter', 'Violin', 'Line', 'Hist'],
      selectedFeature: 'Transaction ID',
      features: ['Transaction ID', 'Item Category', 'Payment Method'],
      selectedValue: 'Count',
      values: ['Count', 'Sum', 'Average'],
      activeSubTab: 'preview',
      processedData: [
        ['0', 'TXN_1961373', 'None', 2, 2, 4, 'Credit Card'],
        ['1', 'TXN_4977031', 'None', 4, 3, 12, 'Cash'],
        ['2', 'TXN_4271903', 'None', 4, 1, 0, 'Credit Card'],
        ['3', 'TXN_7034554', 'None', 2, 5, 10, 'None'],
        ['4', 'TXN_3160411', 'None', 2, 2, 4, 'Digital Wallet'],
        ['5', 'TXN_2602893', 'None', 5, 4, 20, 'Credit Card'],
        ['6', 'TXN_4433211', 'None', 3, 3, 9, 'None'],
        ['7', 'TXN_6699534', 'None', 4, 4, 16, 'Cash'],
        ['8', 'TXN_4717867', 'None', 5, 3, 15, 'None'],
        ['9', 'TXN_2064365', 'None', 5, 4, 20, 'None'],
        ['10', 'TXN_1122334', 'None', 1, 8, 8, 'Cash'],
        ['11', 'TXN_9988776', 'None', 2, 6, 12, 'Credit Card'],
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarClosed = !this.isSidebarClosed
    },

    setActiveOperation(operation) {
      this.activeOperation = operation
    },

    selectChartType(chartType) {
      this.selectedChartType = chartType
    },

    setActiveSubTab(tab) {
      this.activeSubTab = tab
    },

    getChartIcon() {
      const iconMap = {
        'Pie': 'pie-chart-outline',
        'Box': 'cube-outline',
        'Scatter': 'location-outline',
        'Violin': 'musical-notes-outline',
        'Line': 'trending-up-outline',
        'Hist': 'bar-chart-outline'
      }
      return iconMap[this.selectedChartType] || 'pie-chart-outline'
    },

    getChartTitle() {
      return `${this.selectedChartType} Chart Preview`
    },

    formatCellValue(cell, cellIndex) {
      // Specific styling logic from original HTML
      if (cellIndex === 0) return cell // ID column
      if (cellIndex === 1) return cell // Transaction ID
      if (cell === 'None') return cell // Null values
      return cell
    },

    getCellClass(cell, cellIndex) {
      const classes = []
      if (cellIndex === 0) classes.push('id-column') // ID column
      if (cellIndex === 1) classes.push('transaction-id') // Transaction ID (Red)
      if (cell === 'None') classes.push('null-value') // Null values
      return classes
    },

    goToFiltering() {
      this.$router.push('/filtering')
    },

    goToNext() {
      // Navigate to training step (next after processing)
      this.$router.push('/training')
    },

    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* --- THEME VARIABLES (MATCHING FILTERING.HTML) --- */
:host {
  --bg-color: #050505;
  --sidebar-bg: rgba(18, 18, 18, 0.85);
  --card-bg: rgba(24, 24, 27, 0.6);
  --input-bg: #27272a;
  
  --aki-teal: #26a69a;
  --aki-red: #e53935;
  --aki-red-glow: rgba(229, 57, 53, 0.5);
  --aki-teal-glow: rgba(38, 166, 154, 0.3);
  
  --text-white: #ffffff;
  --text-gray: #a1a1aa;
  --border-color: rgba(255, 255, 255, 0.1);
  
  --sidebar-width: 340px;
  --transition-speed: 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

.process-container {
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
   1. SIDEBAR (Collapsible)
=========================== */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 100;
  backdrop-filter: blur(15px);
  transition: transform var(--transition-speed), width var(--transition-speed);
  position: relative;
  flex-shrink: 0;
}

/* Collapsed State Class */
.process-container.sidebar-closed .sidebar {
  margin-left: calc(var(--sidebar-width) * -1);
}

/* Sidebar Header */
.sidebar-header {
  padding: 25px;
  border-bottom: 1px solid var(--border-color);
}

.brand-text {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #fff, var(--text-gray));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sidebar Scrollable Area */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Operations Menu Items */
.op-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  color: var(--text-gray);
  font-size: 0.85rem;
  font-weight: 500;
}
.op-item:hover, .op-item.active {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--aki-red);
  color: white;
  transform: translateX(5px);
}
.op-item ion-icon { font-size: 1.1rem; }

/* Sidebar Footer (Sticky Buttons) */
.sidebar-footer {
  padding: 20px;
  background: rgba(0,0,0,0.4);
  border-top: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 10px;
}

.btn-prev, .btn-next {
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition-speed);
  border: 1px solid transparent;
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
  box-shadow: 0 0 15px var(--aki-red-glow);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-next:hover { transform: translateY(-2px); box-shadow: 0 0 25px var(--aki-red-glow); }


/* ===========================
   2. MAIN CONTENT
=========================== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Top Bar */
.top-bar {
  padding: 20px 30px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border-color);
  background: rgba(5, 5, 5, 0.6);
  backdrop-filter: blur(10px);
}

.left-controls { display: flex; align-items: center; gap: 20px; }

/* HAMBURGER MENU */
.menu-toggle {
  font-size: 1.8rem; cursor: pointer; color: white;
  transition: 0.2s;
  background: transparent;
  border: none;
}
.menu-toggle:hover { color: var(--aki-teal); }

/* Pipeline Stepper */
.pipeline-stepper {
  display: flex; gap: 2px;
  background: #111; padding: 4px; border-radius: 8px; border: 1px solid #333;
}
.step {
  padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;
  color: #555; cursor: pointer; transition: 0.3s;
}
.step:hover { color: #888; }
.step.active {
  background: #222; color: var(--aki-red);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.user-actions { display: flex; gap: 15px; }
.action-btn {
  background: transparent; border: 1px solid var(--border-color);
  padding: 8px; border-radius: 8px; color: var(--text-gray);
  font-size: 1.2rem; cursor: pointer; transition: 0.3s;
}
.action-btn:hover { border-color: var(--aki-teal); color: var(--aki-teal); }


/* Panels */
.comparison-grid {
  display: grid; grid-template-columns: 40% 60%; /* Adjusted split for chart vs table */
  gap: 25px;
  padding: 25px;
  flex: 1; height: 100%; overflow: hidden;
}

.panel {
  display: flex; flex-direction: column;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.panel-header {
  background: rgba(255,255,255,0.02); padding: 15px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.panel-title { font-weight: 600; font-size: 0.9rem; color: #fff; display: flex; align-items: center; gap: 8px;}
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.yellow { background: #ffca28; box-shadow: 0 0 8px rgba(255,202,40, 0.4); }
.dot.green { background: #66bb6a; box-shadow: 0 0 8px rgba(102,187,106, 0.4); }

/* --- PREPROCESSING SPECIFIC STYLES --- */

/* Chart Controls */
.chart-controls {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  display: flex; flex-wrap: wrap; gap: 8px;
}
.chart-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 4px;
  color: var(--text-gray);
  font-size: 0.75rem;
  cursor: pointer;
  transition: 0.2s;
}
.chart-btn:hover, .chart-btn.active {
  background: var(--aki-red-glow);
  border-color: var(--aki-red);
  color: white;
}

.dropdown-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 15px;
  padding: 15px;
}
.form-group label {
  display: block; font-size: 0.7rem; color: var(--text-gray); margin-bottom: 5px;
}
.custom-select {
  width: 100%;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  color: white;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  outline: none;
}
.custom-select:focus { border-color: var(--aki-teal); }

/* Chart Area */
.chart-area {
  flex: 1;
  margin: 15px;
  background: rgba(0,0,0,0.2);
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
  color: var(--text-gray);
  position: relative;
  overflow: hidden;
}
.chart-area ion-icon { font-size: 3rem; margin-bottom: 10px; opacity: 0.5; }

/* Decorative chart background */
.chart-bg {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 60%;
  background: linear-gradient(0deg, rgba(229,57,53,0.1) 0%, transparent 100%);
  z-index: 0; pointer-events: none;
}

/* Table Area */
.table-scroll-area { overflow: auto; flex: 1; }

table { width: 100%; border-collapse: collapse; font-size: 0.8rem; white-space: nowrap; }
thead th {
  position: sticky; top: 0; background: rgba(20,20,20,0.95); z-index: 5;
  padding: 14px; text-align: left; color: var(--text-gray); font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}
tbody td {
  padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ddd;
}
tbody tr:hover { background: rgba(229, 57, 53, 0.05); } /* Red hover tint for Preprocessing */

/* Cell specific styling */
.id-column { color: #666; }
.transaction-id { color: #e53935; }
.null-value { font-style: italic; color: #555; }

/* Sub tabs */
.sub-tabs { display: flex; gap: 15px; }
.sub-tab { font-size: 0.75rem; color: var(--text-gray); cursor: pointer; transition: 0.2s; }
.sub-tab:hover { color: white; }
.sub-tab.active { color: var(--aki-teal); font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--aki-red); }
</style>
