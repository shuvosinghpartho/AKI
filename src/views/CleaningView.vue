<template>
  <div class="cleaning-container" :class="{ collapsed: isCollapsed }">
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="aperture-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA SUITE</span>
      </div>

      <div class="tools-wrapper">
        
        <div class="tool-item" :class="{ active: activeTool === 'replacer' }">
          <div class="tool-header" @click="toggleTool('replacer')">
            <ion-icon name="color-wand-outline"></ion-icon>
            <span class="tool-label">Value Replacer</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.9rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'replacer' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <select class="f-input" v-model="replacerConfig.column">
                <option value="mainroad">mainroad</option>
                <option value="guestroom">guestroom</option>
              </select>
              <select class="f-input" v-model="replacerConfig.currentValue">
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <input type="text" class="f-input" placeholder="New Value..." v-model="replacerConfig.newValue">
              <button class="btn-action" @click="applyValueReplace">APPLY CHANGE</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'encoder' }">
          <div class="tool-header" @click="toggleTool('encoder')">
            <ion-icon name="code-working-outline"></ion-icon>
            <span class="tool-label">Encoder</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.9rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'encoder' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <button class="btn-action" @click="autoEncode">AUTO ENCODE</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'rename' }">
          <div class="tool-header" @click="toggleTool('rename')">
            <ion-icon name="text-outline"></ion-icon>
            <span class="tool-label">Rename</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.9rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'rename' ? '500px' : '0' }">
             <div class="form-pad hide-on-collapse">
                <select class="f-input" v-model="renameConfig.column">
                  <option value="price">price</option>
                </select>
                <input type="text" class="f-input" placeholder="New Name..." v-model="renameConfig.newName">
                <button class="btn-action" @click="renameColumn">RENAME</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'dropcol' }">
          <div class="tool-header" @click="toggleTool('dropcol')">
            <ion-icon name="trash-outline"></ion-icon>
            <span class="tool-label">Drop Col</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.9rem;"></ion-icon>
          </div>
        </div>

      </div>

      <div class="sidebar-footer">
        <button class="nav-btn nav-home" @click="goHome">
          <ion-icon name="home-outline"></ion-icon>
          <span>HOME</span>
        </button>
        <button class="nav-btn nav-next" @click="goToFiltering">
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
          
          <div class="pipeline">
            <div class="step active">CLEAN</div>
            <div class="step">FILTER</div>
            <div class="step">PROCESS</div>
            <div class="step">TRAIN</div>
            <div class="step">PREDICT</div>
          </div>
        </div>

        <div class="user-profile">
          <ion-icon name="person-circle-outline" style="font-size: 1.8rem; color: #555; cursor: pointer;"></ion-icon>
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
                  <th>Index</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Rooms</th>
                  <th>Stories</th>
                  <th>Mainroad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in rawData" :key="index">
                  <td>{{ index }}</td>
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
            <span class="panel-label" style="color: var(--aki-primary);">● TRANSFORMED</span>
            <ion-icon name="download-outline" style="color:#666; cursor: pointer;" @click="downloadTransformed"></ion-icon>
          </div>
          <div class="table-wrap">
            <table id="table-after">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Rooms</th>
                  <th>Stories</th>
                  <th>Mainroad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                  <td>{{ index }}</td>
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
  name: 'CleaningView',
  data() {
    return {
      isCollapsed: false,
      activeTool: 'replacer',
      replacerConfig: {
        column: 'mainroad',
        currentValue: 'yes',
        newValue: ''
      },
      renameConfig: {
        column: 'price',
        newName: ''
      },
      rawData: [
        [13300000, 7420, 4, 3, 'yes'],
        [12250000, 8960, 4, 4, 'yes'],
        [12250000, 9960, 3, 2, 'yes'],
        [12215000, 7500, 4, 2, 'yes'],
        [11410000, 7420, 4, 2, 'yes'],
        [10850000, 7500, 3, 1, 'yes'],
        [10150000, 8580, 4, 4, 'yes'],
        [10150000, 16200, 5, 2, 'yes'],
        [9870000, 8100, 4, 2, 'yes'],
        [9800000, 5750, 3, 4, 'yes'],
        [9800000, 13200, 3, 2, 'yes'],
        [9681000, 6000, 4, 2, 'yes']
      ],
      transformedData: []
    }
  },
  mounted() {
    // Initialize transformed data with raw data
    this.transformedData = [...this.rawData]
  },
  methods: {
    formatCellValue(cell) {
      if (typeof cell === 'number' && cell > 100) {
        return cell.toLocaleString()
      }
      return cell
    },

    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      
      // If we are collapsing, close all tools to avoid weird UI
      if(this.isCollapsed) {
        this.activeTool = null
      } else {
        this.activeTool = 'replacer'
      }
    },

    toggleTool(toolName) {
      // If sidebar is collapsed, expand it first
      if(this.isCollapsed) {
        this.isCollapsed = false
        return
      }

      // Toggle the clicked tool
      this.activeTool = this.activeTool === toolName ? null : toolName
    },

    applyValueReplace() {
      if (!this.replacerConfig.newValue) {
        alert('Please enter a new value')
        return
      }

      // Find the column index
      const columns = ['price', 'area', 'rooms', 'stories', 'mainroad']
      const columnIndex = columns.indexOf(this.replacerConfig.column)
      
      if (columnIndex === -1) return

      // Apply the replacement
      this.transformedData = this.transformedData.map(row => {
        if (row[columnIndex] === this.replacerConfig.currentValue) {
          return [...row.slice(0, columnIndex), this.replacerConfig.newValue, ...row.slice(columnIndex + 1)]
        }
        return row
      })

      this.replacerConfig.newValue = ''
      alert('Value replacement applied successfully!')
    },

    autoEncode() {
      // Simple encoding logic - convert yes/no to 1/0
      this.transformedData = this.transformedData.map(row => {
        return row.map(cell => {
          if (cell === 'yes') return 1
          if (cell === 'no') return 0
          return cell
        })
      })
      alert('Auto encoding applied successfully!')
    },

    renameColumn() {
      if (!this.renameConfig.newName) {
        alert('Please enter a new name')
        return
      }
      alert(`Column renamed to: ${this.renameConfig.newName}`)
      this.renameConfig.newName = ''
    },

    goHome() {
      this.$router.push('/')
    },

    goToFiltering() {
      this.$router.push('/filtering')
    },

    downloadTransformed() {
      alert('Downloading transformed data...')
    }
  }
}
</script>

<style scoped>
/* --- DESIGN TOKENS --- */
:host {
  --bg-deep: #050505;
  --bg-glass: rgba(20, 20, 20, 0.7);
  --border-glass: rgba(255, 255, 255, 0.08);
  
  --aki-primary: #00F0FF; /* Cyber Cyan */
  --aki-primary-dim: rgba(0, 240, 255, 0.1);
  --aki-danger: #FF2A6D;  /* Neon Red */
  
  --text-main: #ffffff;
  --text-muted: #888899;
  
  --sidebar-width: 300px;
  --sidebar-collapsed: 70px;
  --trans-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

.cleaning-container {
  background-color: var(--bg-deep);
  /* Subtle background mesh gradient */
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
   1. SIDEBAR (Collapsible)
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
  padding: 20px 0;
  overflow: hidden;
}

/* Collapsed State Logic */
.cleaning-container.collapsed .sidebar {
  width: var(--sidebar-collapsed);
}

.cleaning-container.collapsed .hide-on-collapse {
  opacity: 0;
  pointer-events: none;
  display: none; /* remove from flow */
}

.cleaning-container.collapsed .sidebar-padding {
  padding: 0 10px;
}

/* Logo Area */
.logo-container {
  padding: 0 24px 30px 24px;
  white-space: nowrap;
}

.logo-text {
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #999);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cleaning-container.collapsed .logo-text { display: none; }
.cleaning-container.collapsed .logo-container { padding: 0 0 30px 0; text-align: center; }

/* Navigation Tools */
.tools-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cleaning-container.collapsed .tools-wrapper { padding: 0 10px; }

/* Accordion Styling */
.tool-item {
  border: 1px solid var(--border-glass);
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s;
}

.tool-header {
  padding: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ccc;
  font-size: 0.85rem;
  font-weight: 500;
  transition: 0.3s;
}

.tool-header ion-icon {
  font-size: 1.1rem;
  color: var(--aki-primary);
}

.tool-item.active {
  border-color: var(--aki-primary);
  background: var(--aki-primary-dim);
}

.tool-item.active .tool-header { color: white; }

/* Hide text/chevron in collapsed mode */
.cleaning-container.collapsed .tool-label, 
.cleaning-container.collapsed .chevron { display: none; }

.cleaning-container.collapsed .tool-header { 
  justify-content: center; 
  padding: 14px 0; 
}

/* Forms */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
  background: rgba(0,0,0,0.2);
}

.tool-item.active .tool-content {
  max-height: 500px; /* Arbitrary limit */
  border-top: 1px solid var(--border-glass);
}

.form-pad { padding: 15px; }

.f-input {
  width: 100%;
  background: #111;
  border: 1px solid #333;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 0.8rem;
}
.f-input:focus { border-color: var(--aki-primary); outline: none; }

.btn-action {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-glass);
  background: linear-gradient(to right, #222, #1a1a1a);
  color: #bbb;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: 0.3s;
}
.btn-action:hover {
  border-color: var(--aki-primary);
  color: white;
  box-shadow: 0 0 15px var(--aki-primary-dim);
}

/* Sidebar Footer */
.sidebar-footer {
  margin-top: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid var(--border-glass);
}

.cleaning-container.collapsed .sidebar-footer { padding: 20px 10px; }

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.2s;
}

.nav-home { 
  background: transparent; 
  color: var(--text-muted); 
  border: 1px solid var(--border-glass); 
}
.nav-home:hover { 
  border-color: white; 
  color: white; 
}

.nav-next { 
  background: var(--aki-danger); 
  color: white; 
  box-shadow: 0 4px 15px rgba(255, 42, 109, 0.3); 
}
.nav-next:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 6px 20px rgba(255, 42, 109, 0.5); 
}

.cleaning-container.collapsed .nav-btn span { display: none; }

/* ===========================
   2. MAIN AREA
=========================== */
.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Header Bar */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-glass);
}

.header-left { display: flex; align-items: center; gap: 20px; }

/* THE MENU TOGGLE (3 BARS) */
.menu-toggle {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
}
.menu-toggle:hover { color: var(--aki-primary); }

/* Pipeline Pills */
.pipeline {
  display: flex;
  gap: 5px;
  background: #111;
  padding: 4px;
  border-radius: 50px;
  border: 1px solid #222;
}

.step {
  padding: 6px 16px;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
}
.step.active {
  background: #222;
  color: var(--aki-primary);
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  border: 1px solid #333;
}

/* Content Grid */
.content-grid {
  flex: 1;
  padding: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  overflow: hidden;
}

.glass-panel {
  background: rgba(15, 15, 17, 0.6);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.panel-head {
  padding: 15px 20px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-label { font-size: 0.85rem; font-weight: 600; color: #ddd; letter-spacing: 0.5px; }

/* Table */
.table-wrap {
  flex: 1;
  overflow: auto;
}

table { width: 100%; border-collapse: collapse; font-size: 0.8rem; white-space: nowrap; }

thead th {
  position: sticky; top: 0;
  background: #141414;
  color: #777;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #333;
  z-index: 5;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  color: #ccc;
}

tbody tr:hover { background: rgba(0, 240, 255, 0.03); }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
</style>
