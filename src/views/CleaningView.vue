<template>
  <div class="cleaning-container" :class="{ collapsed: isCollapsed }">
    <nav class="sidebar" id="sidebar">
      <div class="logo-container">
        <ion-icon name="aperture-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA CLEAN</span>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">TRANSFORMATION TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'dataclean' }">
          <div class="tool-header" @click="toggleTool('dataclean')">
            <ion-icon name="water-outline"></ion-icon>
            <span class="tool-label">Data Cleaning</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'dataclean' ? '600px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column for Cleaning</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="cleaningConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Transaction ID">Transaction ID</option>
                    <option value="Customer Name">Customer Name</option>
                    <option value="Description">Description</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Select Class to Clean</label>
                 <div class="custom-select-wrapper">
                  <select class="f-input" v-model="cleaningConfig.targetClass">
                    <option value="" disabled selected>Choose class...</option>
                    <option value="TXN_1961373">TXN_1961373</option>
                    <option value="TXN_ERROR">TXN_ERROR</option>
                    <option value="ALL">All Rows</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Select Characters to Remove</label>
                 <div class="custom-select-wrapper">
                  <select class="f-input" v-model="cleaningConfig.removeChars">
                    <option value="" disabled selected>Choose options...</option>
                    <option value="symbols">Symbols (@, #, $)</option>
                    <option value="numbers">Numbers (0-9)</option>
                    <option value="whitespace">Extra Whitespace</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="applyCleaning">Apply Cleaning</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'replacer' }">
          <div class="tool-header" @click="toggleTool('replacer')">
            <ion-icon name="swap-vertical-outline"></ion-icon>
            <span class="tool-label">Replace Value</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'replacer' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column for Replacement</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="replacerConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Transaction ID">Transaction ID</option>
                    <option value="mainroad">mainroad</option>
                    <option value="guestroom">guestroom</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Select Class to Replace</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="replacerConfig.currentValue">
                    <option value="" disabled selected>Choose options...</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="null">NULL / NaN</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <div class="input-group">
                <label class="sub-label">Enter New Value</label>
                <input type="text" class="f-input" v-model="replacerConfig.newValue">
              </div>
              <button class="btn-action primary-btn" @click="applyValueReplace">Replace Value</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'alphaint' }">
          <div class="tool-header" @click="toggleTool('alphaint')">
            <ion-icon name="swap-horizontal-outline"></ion-icon>
            <span class="tool-label" style="line-height: 1.2;">Convert Alphanumeric to Integers</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'alphaint' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Select Column for Conversion</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="alphaIntConfig.column">
                    <option value="" disabled selected>Choose column...</option>
                    <option value="Transaction ID">Transaction ID</option>
                    <option value="mainroad">mainroad</option>
                    <option value="stories">stories</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              <button class="btn-action primary-btn" @click="convertAlphaToInt">
                Apply Conversion
              </button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'rename' }">
          <div class="tool-header" @click="toggleTool('rename')">
            <ion-icon name="text-outline"></ion-icon>
            <span class="tool-label">Rename Column</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'rename' ? '500px' : '0' }">
             <div class="form-pad hide-on-collapse">
                
                <div class="input-group">
                  <label class="sub-label">Select Column to Rename</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="renameConfig.column">
                      <option value="" disabled selected>Choose column...</option>
                      <option value="Transaction ID">Transaction ID</option>
                      <option value="price">price</option>
                      <option value="area">area</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>

                <div class="input-group">
                  <label class="sub-label">Enter New Column Name</label>
                  <input type="text" class="f-input" v-model="renameConfig.newName">
                </div>

                <button class="btn-action primary-btn" @click="renameColumn">Apply Rename</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'dropcol' }">
          <div class="tool-header" @click="toggleTool('dropcol')">
            <ion-icon name="trash-outline"></ion-icon>
            <span class="tool-label">Drop Column</span>
            <ion-icon name="chevron-down-outline" class="chevron" style="margin-left: auto; font-size: 0.8rem;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'dropcol' ? '500px' : '0' }">
            <div class="form-pad hide-on-collapse">
               <label class="sub-label">Select Column to Drop</label>
               <div class="custom-select-wrapper">
                  <select class="f-input">
                    <option>Select Column...</option>
                    <option>guestroom</option>
                    <option>basement</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
               </div>
               <button class="btn-action danger-btn" style="margin-top:15px;">DELETE COLUMN</button>
            </div>
         </div>
        </div>

      </div>

      <div class="sidebar-footer">
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
        </div>

        <div class="header-center">
          <div class="pipeline">
            <div class="step active">CLEAN</div>
            <div class="step">FILTER</div>
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
          
          <button class="top-nav-btn logout" @click="logout">
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
            <span class="panel-label" style="color: var(--aki-primary);">Before Cleaning</span>
            <ion-icon name="expand-outline" style="color:#666;"></ion-icon>
          </div>
          
          <div class="sub-tabs">
            <span class="tab" :class="{ active: activeTabLeft === 'preview' }" @click="activeTabLeft = 'preview'">Preview</span>
            <span class="tab" :class="{ active: activeTabLeft === 'info' }" @click="activeTabLeft = 'info'">Info</span>
            <span class="tab" :class="{ active: activeTabLeft === 'features' }" @click="activeTabLeft = 'features'">Features</span>
            <span class="tab" :class="{ active: activeTabLeft === 'describe' }" @click="activeTabLeft = 'describe'">Describe</span>
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
            <span class="panel-label" style="color: var(--aki-primary);">After Cleaning</span>
            <ion-icon name="download-outline" style="color:#666; cursor: pointer;" @click="downloadTransformed"></ion-icon>
          </div>

          <div class="sub-tabs">
            <span class="tab" :class="{ active: activeTabRight === 'preview' }" @click="activeTabRight = 'preview'">Preview</span>
            <span class="tab" :class="{ active: activeTabRight === 'info' }" @click="activeTabRight = 'info'">Info</span>
            <span class="tab" :class="{ active: activeTabRight === 'features' }" @click="activeTabRight = 'features'">Features</span>
            <span class="tab" :class="{ active: activeTabRight === 'describe' }" @click="activeTabRight = 'describe'">Describe</span>
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
      activeTool: 'rename', 
      
      // === SEPARATED STATE VARIABLES ===
      activeTabLeft: 'preview',  // Controls Raw Data Panel
      activeTabRight: 'preview', // Controls Transformed Panel
      
      cleaningConfig: {
        column: '',
        targetClass: '',
        removeChars: ''
      },

      replacerConfig: {
        column: 'Transaction ID',
        currentValue: '',
        newValue: ''
      },

      alphaIntConfig: {
        column: 'Transaction ID'
      },
      
      renameConfig: {
        column: 'Transaction ID',
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
      if(this.isCollapsed) {
        this.activeTool = null
      } else {
        this.activeTool = 'rename'
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

    applyCleaning() {
      if(!this.cleaningConfig.column) {
        alert("Please select a column first.")
        return
      }
      alert(`Cleaning Applied!\nColumn: ${this.cleaningConfig.column}\nTarget: ${this.cleaningConfig.targetClass}\nRemoving: ${this.cleaningConfig.removeChars}`)
    },

    convertAlphaToInt() {
      if(!this.alphaIntConfig.column) {
        alert("Please select a column for conversion.")
        return
      }
       alert(`Converting Alphanumeric to Integers for column: ${this.alphaIntConfig.column}`)
    },

    applyValueReplace() {
      if (!this.replacerConfig.column || !this.replacerConfig.currentValue || !this.replacerConfig.newValue) {
        alert('Please fill all fields for Value Replacement')
        return
      }
      alert('Value replacement applied!')
    },

    renameColumn() {
      if (!this.renameConfig.newName) {
        alert('Please enter a new name')
        return
      }
      alert(`Column '${this.renameConfig.column}' renamed to: ${this.renameConfig.newName}`)
      this.renameConfig.newName = ''
    },

    goHome() {
      this.$router.push('/')
    },

    logout() {
      alert("Logging out...")
      this.$router.push('/login')
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

.cleaning-container {
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

.cleaning-container.collapsed .sidebar { width: var(--sidebar-collapsed); }
.cleaning-container.collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

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
.cleaning-container.collapsed .logo-container { padding: 0 0 20px 0; text-align: center; }

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

.cleaning-container.collapsed .tool-header { justify-content: center; padding: 12px 0; }
.cleaning-container.collapsed .tool-label, .cleaning-container.collapsed .chevron { display: none; }

/* Tool Content Form */
.tool-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(0,0,0,0.3);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.05); }

.form-pad { padding: 15px 12px; }

/* --- INPUTS & LABELS & ANIMATION --- */
.input-group {
  margin-bottom: 15px;
}

.sub-label { 
  display: block; 
  font-size: 0.75rem; 
  color: #e0e0e0; 
  margin-bottom: 6px; 
  font-weight: 500;
}

.custom-select-wrapper {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 6px;
}

/* === TRANSPARENT DROPDOWN STYLING === */
.f-input {
  width: 100%;
  /* Transparent glass background */
  background: rgba(255, 255, 255, 0.02); 
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px;
  padding-right: 30px;
  border-radius: 6px;
  font-size: 0.8rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Fallback for Options: 
   Browser native dropdowns generally cannot be transparent. 
   We set them to dark black to ensure readability. */
select.f-input option {
  background-color: #050505;
  color: white;
}

/* Hover Animation */
.f-input:hover, .custom-select-wrapper:hover .f-input {
  border-color: var(--aki-primary);
  background: rgba(0, 240, 255, 0.05); /* Slight tint on hover */
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.15);
  transform: translateY(-2px);
}

.f-input:focus { 
  border-color: var(--aki-danger); 
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.2);
  outline: none; 
}

.select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
  pointer-events: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.custom-select-wrapper:hover .select-icon {
  color: var(--aki-primary);
}


/* Buttons */
.btn-action {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-glass);
  background: linear-gradient(to right, #252525, #1a1a1a);
  color: #ccc;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: 0.2s;
  text-transform: capitalize;
}
.btn-action:hover { border-color: var(--aki-primary); color: white; }

.primary-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid #444;
}
.primary-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: #666;
}

.danger-btn {
  background: rgba(255,42,109,0.1); 
  color: #ff2a6d; 
  border-color: #ff2a6d;
}
.danger-btn:hover {
  background: rgba(255,42,109,0.2); 
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
.cleaning-container.collapsed .nav-next span { display: none; }

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
  position: relative; /* Needed for absolute center positioning */
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
  display: flex; justify-content: center; align-items: center;
}
.panel-label { font-size: 1.3rem; font-weight: 1000; color: #ddd; letter-spacing: 1px; }

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

/* ====================================
   UPDATED TAB MENU STYLING
==================================== */
.sub-tabs {
  display: flex;
  width: 100%;
  background: rgba(0, 0, 0, 0.3); /* Darker background strip */
  border-bottom: 1px solid var(--border-glass);
  padding: 0; 
}

.tab {
  /* THIS MAKES THEM DISTRIBUTE EVENLY */
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 14px 0; /* Vertical height */
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  cursor: pointer;
  color: #666; /* Inactive text color */
  transition: all 0.2s ease;
  position: relative;
}

.tab:hover {
  color: white;
  background: rgba(255, 255, 255, 0.03);
}

/* --- ACTIVE STATE (Reddish-Orange) --- */
.tab.active {
  color: #ff5e00; 
  background: linear-gradient(to top, rgba(255, 94, 0, 0.05), transparent);
}

/* Bottom Line Indicator */
.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff5e00; 
  box-shadow: 0 -2px 10px rgba(255, 94, 0, 0.5);
}
</style>