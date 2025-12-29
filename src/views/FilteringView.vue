<template>
  <div class="filtering-container" :class="{ collapsed: isCollapsed }">
    
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="options-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA FILTER</span>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">FILTERING TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'price' }">
          <div class="tool-header" @click="toggleTool('price')">
            <ion-icon name="cash-outline"></ion-icon>
            <span class="tool-label">Price Range</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'price' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <label class="sub-label">Min / Max Price</label>
              <div style="padding: 10px; border: 1px dashed #444; border-radius: 6px; text-align: center; color: #666; font-size: 0.7rem;">
                [Price Slider Component Placeholder]
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'area' }">
          <div class="tool-header" @click="toggleTool('area')">
            <ion-icon name="expand-outline"></ion-icon>
            <span class="tool-label">Area (SqFt)</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'area' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <label class="sub-label">Min / Max Area</label>
              <div style="padding: 10px; border: 1px dashed #444; border-radius: 6px; text-align: center; color: #666; font-size: 0.7rem;">
                [Area Slider Component Placeholder]
              </div>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'bed' }">
          <div class="tool-header" @click="toggleTool('bed')">
            <ion-icon name="bed-outline"></ion-icon>
            <span class="tool-label">Bedrooms</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'bed' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <label class="sub-label">Number of Rooms</label>
               <div style="padding: 10px; border: 1px dashed #444; border-radius: 6px; text-align: center; color: #666; font-size: 0.7rem;">
                [Bed Slider Component Placeholder]
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-btn nav-next" @click="goToProcess">
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
            <div class="step active">FILTER</div>
            <div class="step">PROCESS</div>
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
            <span class="panel-label" style="color: #ffcc00;">● RAW DATA</span>
            <ion-icon name="expand-outline" style="color:#666;"></ion-icon>
          </div>
          <div class="table-wrap">
            <table id="table-before">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Stories</th>
                  <th>Mainroad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in rawData" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ formatCellValue(cell) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label" style="color: var(--aki-primary);">● FILTERED RESULT</span>
            <ion-icon name="download-outline" style="color:#666; cursor: pointer;"></ion-icon>
          </div>
          <div class="table-wrap">
            <table id="table-after">
              <thead>
                <tr>
                   <th>Price</th>
                  <th>Area</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Stories</th>
                  <th>Mainroad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in rawData" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ formatCellValue(cell) }}
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
  name: 'FilteringView',
  data() {
    return {
      // Structural state (Matches CleaningView)
      isCollapsed: false,
      activeTool: 'price', // Default open tool

      // Legacy Data (Kept for table rendering, but logic is paused)
      rawData: [
        [13300000, 7420, 4, 2, 3, 'yes'],
        [12250000, 8960, 4, 4, 4, 'yes'],
        [12250000, 9960, 3, 2, 2, 'yes'],
        [12215000, 7500, 4, 2, 2, 'yes'],
        [11410000, 7420, 4, 1, 2, 'yes'],
        [10850000, 7500, 3, 3, 1, 'yes'],
        [10150000, 8580, 4, 3, 4, 'yes'],
        [10150000, 16200, 5, 3, 2, 'yes'],
        [9870000, 8100, 4, 1, 2, 'yes'],
        [9800000, 5750, 3, 2, 4, 'yes'],
        [9800000, 13200, 3, 1, 2, 'yes'],
        [9681000, 6000, 4, 3, 2, 'yes'],
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
        this.activeTool = 'price'
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

    formatCellValue(cell) {
      if (typeof cell === 'number' && cell > 100) {
        return cell.toLocaleString()
      }
      return cell
    },

    // Navigation
    goHome() {
      this.$router.push('/')
    },

    goToProcess() {
      this.$router.push('/process')
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

/* Renamed root class to match file context, but keeps styling */
.filtering-container {
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

.filtering-container.collapsed .sidebar { width: var(--sidebar-collapsed); }
.filtering-container.collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

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
.filtering-container.collapsed .logo-container { padding: 0 0 20px 0; text-align: center; }

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

.filtering-container.collapsed .tool-header { justify-content: center; padding: 12px 0; }
.filtering-container.collapsed .tool-label, .filtering-container.collapsed .chevron { display: none; }

/* Tool Content Form */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(0,0,0,0.3);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.05); }

.form-pad { padding: 15px 12px; }

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
.filtering-container.collapsed .nav-next span { display: none; }

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

.table-wrap { flex: 1; overflow: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.75rem; white-space: nowrap; }
thead th {
  position: sticky; top: 0; background: #141414; color: #777;
  text-align: left; padding: 10px 16px; font-weight: 600;
  border-bottom: 1px solid #333; z-index: 5;
}
tbody td { padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ccc; }
tbody tr:hover { background: rgba(0, 240, 255, 0.03); }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>