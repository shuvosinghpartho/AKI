<template>
  <div class="process-container" :class="{ collapsed: isCollapsed }">
    
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="analytics-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA PROCESS</span>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">PROCESSING TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'rename' }">
          <div class="tool-header" @click="toggleTool('rename')">
            <ion-icon name="text-outline"></ion-icon>
            <span class="tool-label">Rename Columns</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'rename' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <label class="sub-label">Column Configuration</label>
              <div class="placeholder-box">
                [Rename Settings Placeholder]
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'null-handling' }">
          <div class="tool-header" @click="toggleTool('null-handling')">
            <ion-icon name="water-outline"></ion-icon>
            <span class="tool-label">Null Handling</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'null-handling' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <label class="sub-label">Imputation Method</label>
              <div class="placeholder-box">
                [Null Handling Settings]
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'outlier' }">
          <div class="tool-header" @click="toggleTool('outlier')">
            <ion-icon name="trending-up-outline"></ion-icon>
            <span class="tool-label">Outlier Detection</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'outlier' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <label class="sub-label">Threshold Settings</label>
               <div class="placeholder-box">
                [Outlier Logic Placeholder]
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'smote' }">
          <div class="tool-header" @click="toggleTool('smote')">
            <ion-icon name="duplicate-outline"></ion-icon>
            <span class="tool-label">SMOTE</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'smote' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <label class="sub-label">Oversampling Config</label>
               <div class="placeholder-box">
                [SMOTE Settings]
              </div>
            </div>
          </div>
        </div>
        
        <div class="tool-item" :class="{ active: activeTool === 'feature' }">
          <div class="tool-header" @click="toggleTool('feature')">
            <ion-icon name="construct-outline"></ion-icon>
            <span class="tool-label">Feature Eng.</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'feature' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <label class="sub-label">New Feature Logic</label>
               <div class="placeholder-box">
                [Feature Builder]
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-btn nav-next" @click="goToTraining">
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
            <div class="step active">PROCESS</div>
            <div class="step">TRAIN</div>
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
             <div class="chart-controls-wrapper">
                <div class="chart-buttons">
                  <button 
                    v-for="chartType in chartTypes" 
                    :key="chartType"
                    class="mini-btn"
                    :class="{ active: selectedChartType === chartType }"
                    @click="selectChartType(chartType)"
                  >
                    {{ chartType }}
                  </button>
                </div>

                <div class="inputs-row">
                  <div class="input-group-mini">
                    <label>Feature (X)</label>
                    <select class="f-input" v-model="selectedFeature">
                      <option v-for="feature in features" :key="feature" :value="feature">{{ feature }}</option>
                    </select>
                  </div>
                  <div class="input-group-mini">
                     <label>Value (Y)</label>
                    <select class="f-input" v-model="selectedValue">
                       <option v-for="value in values" :key="value" :value="value">{{ value }}</option>
                    </select>
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
            <span class="panel-label" style="color: var(--aki-primary);">● PROCESSED DATA</span>
            <ion-icon name="download-outline" style="color:#666; cursor: pointer;"></ion-icon>
          </div>
          <div class="table-wrap">
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
      // Structural state (Matches CleaningView)
      isCollapsed: false,
      activeTool: 'null-handling', // Default open tool

      // Logic State (Preserved from ProcessView)
      selectedChartType: 'Pie',
      chartTypes: ['Pie', 'Box', 'Scatter', 'Violin', 'Line', 'Hist'],
      selectedFeature: 'Transaction ID',
      features: ['Transaction ID', 'Item Category', 'Payment Method'],
      selectedValue: 'Count',
      values: ['Count', 'Sum', 'Average'],

      // Data
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
    // UI Structure Methods
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      if(this.isCollapsed) {
        this.activeTool = null
      } else {
        this.activeTool = 'null-handling'
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
    selectChartType(type) {
      this.selectedChartType = type
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

    formatCellValue(cell, cellIndex) {
      if (cellIndex === 0) return cell 
      if (cellIndex === 1) return cell 
      if (cell === 'None') return cell 
      return cell
    },

    getCellClass(cell, cellIndex) {
      const classes = []
      if (cellIndex === 0) classes.push('id-column') 
      if (cellIndex === 1) classes.push('transaction-id') 
      if (cell === 'None') classes.push('null-value') 
      return classes
    },

    // Navigation
    goHome() {
      this.$router.push('/')
    },

    goToTraining() {
      this.$router.push('/training')
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

/* Renamed root class */
.process-container {
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

.process-container.collapsed .sidebar { width: var(--sidebar-collapsed); }
.process-container.collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

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
.process-container.collapsed .logo-container { padding: 0 0 20px 0; text-align: center; }

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

.process-container.collapsed .tool-header { justify-content: center; padding: 12px 0; }
.process-container.collapsed .tool-label, .process-container.collapsed .chevron { display: none; }

/* Tool Content Form */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(0,0,0,0.3);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.05); }

.form-pad { padding: 15px 12px; }
.placeholder-box {
  padding: 10px; border: 1px dashed #444; border-radius: 6px; 
  text-align: center; color: #666; font-size: 0.7rem;
}

/* --- INPUTS & LABELS --- */
.sub-label { 
  display: block; 
  font-size: 0.75rem; 
  color: #e0e0e0; 
  margin-bottom: 6px; 
  font-weight: 500;
}

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
  box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
  transition: 0.2s;
}
.nav-next:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 42, 109, 0.4); }
.process-container.collapsed .nav-next span { display: none; }

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
  left: 42%; /* MOVED LEFT from 50% */
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
.panel-content-pad { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 20px; }

/* Internal Chart Controls (Styled minimally to fit new theme) */
.chart-controls-wrapper {
  display: flex; flex-direction: column; gap: 15px;
  padding-bottom: 15px; border-bottom: 1px solid var(--border-glass);
}
.chart-buttons { display: flex; gap: 6px; flex-wrap: wrap; }
.mini-btn {
  background: rgba(255,255,255,0.05); border: 1px solid #333; color: #999;
  padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 0.7rem;
}
.mini-btn.active, .mini-btn:hover { background: var(--aki-primary-dim); color: var(--aki-primary); border-color: var(--aki-primary); }

.inputs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.input-group-mini label { display: block; font-size: 0.7rem; color: #777; margin-bottom: 4px; }
.f-input {
  width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #333;
  color: #ccc; padding: 8px; border-radius: 4px; font-size: 0.75rem;
}

.chart-display-area {
  flex: 1; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px dashed #333;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #555; gap: 10px;
}
.chart-display-area ion-icon { font-size: 3rem; opacity: 0.5; }

.table-wrap { flex: 1; overflow: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.75rem; white-space: nowrap; }
thead th {
  position: sticky; top: 0; background: #141414; color: #777;
  text-align: left; padding: 10px 16px; font-weight: 600;
  border-bottom: 1px solid #333; z-index: 5;
}
tbody td { padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ccc; }
tbody tr:hover { background: rgba(0, 240, 255, 0.03); }

/* Specific Colors preserved from logic */
.transaction-id { color: var(--aki-danger); }
.null-value { font-style: italic; color: #555; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>