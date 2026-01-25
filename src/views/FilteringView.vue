<template>
  <div class="filtering-container" :class="{ 'desktop-collapsed': isCollapsed }">
    
    <div 
      class="mobile-overlay" 
      :class="{ active: showMobileSidebar }"
      @click="closeMobileSidebar"
    ></div>

    <nav class="sidebar" :class="{ 'mobile-open': showMobileSidebar }">
      <div class="logo-container">
        <ion-icon name="filter-outline" style="font-size: 1.5rem; color: var(--aki-primary); vertical-align: middle;"></ion-icon>
        <span class="logo-text hide-on-collapse" style="margin-left: 10px;">AKI DATA FILTER</span>
        
        <button class="mobile-close-btn" @click="closeMobileSidebar">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <div class="tools-wrapper">
        <div class="section-title hide-on-collapse">FILTERING TOOLS</div>

        <div class="tool-item" :class="{ active: activeTool === 'price' }">
          <div class="tool-header" @click="toggleTool('price')">
            <ion-icon name="cash-outline"></ion-icon>
            <span class="tool-label">Filter by Price</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'price' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'price' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              
              <div class="input-group">
                <label class="sub-label">Min Price</label>
                <input type="number" class="f-input" v-model="filters.price.min" placeholder="e.g. 5000">
              </div>

              <div class="input-group">
                <label class="sub-label">Max Price</label>
                <input type="number" class="f-input" v-model="filters.price.max" placeholder="e.g. 100000">
              </div>

              <div class="input-group" style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="manualPrice" v-model="filters.price.manual" style="accent-color: var(--aki-primary);">
                <label for="manualPrice" style="color: #aaa; font-size: 0.8rem;">Input Manually</label>
              </div>

              <button class="btn-action primary-btn" @click="applyFilter('price')">Apply Price Filter</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'area' }">
          <div class="tool-header" @click="toggleTool('area')">
            <ion-icon name="expand-outline"></ion-icon>
            <span class="tool-label">Filter by Area</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'area' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'area' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Min Area (sq ft)</label>
                <input type="number" class="f-input" v-model="filters.area.min" placeholder="Min Area...">
              </div>
              <div class="input-group">
                <label class="sub-label">Max Area (sq ft)</label>
                <input type="number" class="f-input" v-model="filters.area.max" placeholder="Max Area...">
              </div>
              <button class="btn-action primary-btn" @click="applyFilter('area')">Apply Area Filter</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'rooms' }">
          <div class="tool-header" @click="toggleTool('rooms')">
            <ion-icon name="bed-outline"></ion-icon>
            <span class="tool-label">Rooms & Stories</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'rooms' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'rooms' ? '2000px' : '0' }">
            <div class="form-pad hide-on-collapse">
              <div class="input-group">
                <label class="sub-label">Exact Bedrooms</label>
                <div class="custom-select-wrapper">
                  <select class="f-input" v-model="filters.rooms">
                    <option value="" selected>Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>

              <div class="input-group">
                <label class="sub-label">Stories</label>
                 <div class="custom-select-wrapper">
                  <select class="f-input" v-model="filters.stories">
                    <option value="" selected>Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                  <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                </div>
              </div>
              
              <button class="btn-action primary-btn" @click="applyFilter('rooms')">
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'categorical' }">
          <div class="tool-header" @click="toggleTool('categorical')">
            <ion-icon name="grid-outline"></ion-icon>
            <span class="tool-label">Categorical Filter</span>
            <ion-icon name="chevron-forward-outline" class="chevron" :class="{ rotated: activeTool === 'categorical' }" style="margin-left: auto; font-size: 1rem; color: white;"></ion-icon>
          </div>
          <div class="tool-content" :style="{ maxHeight: activeTool === 'categorical' ? '2000px' : '0' }">
             <div class="form-pad hide-on-collapse">
                <div class="input-group">
                  <label class="sub-label">Mainroad Access</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="filters.categorical.mainroad">
                      <option value="" selected>Any</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>

                <div class="input-group">
                  <label class="sub-label">Guestroom Available</label>
                  <div class="custom-select-wrapper">
                    <select class="f-input" v-model="filters.categorical.guestroom">
                      <option value="" selected>Any</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <ion-icon name="chevron-down-outline" class="select-icon"></ion-icon>
                  </div>
                </div>

                <button class="btn-action primary-btn" @click="applyFilter('categorical')">Apply Filter</button>
            </div>
          </div>
        </div>

        <div class="tool-item" :class="{ active: activeTool === 'clear' }">
          <div class="tool-header" @click="resetFilters">
            <ion-icon name="refresh-outline"></ion-icon>
            <span class="tool-label">Reset All Filters</span>
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
          <button class="menu-toggle" @click="handleSidebarToggle">
            <ion-icon name="menu-outline"></ion-icon>
          </button>
        </div>

        <div class="header-center">
          <div class="pipeline-scroll">
            <div class="pipeline">
              <div class="step">CLEAN</div>
              <div class="step active">FILTER</div>
              <div class="step">PREPROCESSING</div>
              <div class="step">TRAIN</div>
              <div class="step">PREDICT</div>
            </div>
          </div>
        </div>

        <div class="header-right">
          <button class="top-nav-btn icon-only-mobile" @click="goHome">
            <ion-icon name="home-outline"></ion-icon>
            <span class="desktop-text">Home</span>
          </button>
          
          <button class="top-nav-btn logout icon-only-mobile" @click="logout">
            <ion-icon name="log-out-outline"></ion-icon>
            <span class="desktop-text">Logout</span>
          </button>
          
          <div class="user-avatar">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
        </div>
      </header>

      <div class="content-grid">
        
        <div class="glass-panel">
          <div class="panel-head">
            <span class="panel-label" style="color: var(--aki-primary);">Before</span>
            <ion-icon name="expand-outline" style="color:#666;"></ion-icon>
          </div>
          
          <div class="sub-tabs">
            <span class="tab" :class="{ active: activeTabLeft === 'preview' }" @click="activeTabLeft = 'preview'">Preview</span>
            <span class="tab" :class="{ active: activeTabLeft === 'info' }" @click="activeTabLeft = 'info'">Info</span>
            <span class="tab" :class="{ active: activeTabLeft === 'stats' }" @click="activeTabLeft = 'stats'">Stats</span>
          </div>

          <div class="table-wrap">
            <table id="table-before">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Rooms</th>
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
            <span class="panel-label" style="color: var(--aki-primary);">After</span>
            <ion-icon name="download-outline" style="color:#666; cursor: pointer;" @click="downloadFiltered"></ion-icon>
          </div>

          <div class="sub-tabs">
            <span class="tab" :class="{ active: activeTabRight === 'preview' }" @click="activeTabRight = 'preview'">Preview</span>
            <span class="tab" :class="{ active: activeTabRight === 'info' }" @click="activeTabRight = 'info'">Info</span>
            <span class="tab" :class="{ active: activeTabRight === 'stats' }" @click="activeTabRight = 'stats'">Stats</span>
          </div>

          <div class="table-wrap">
            <table id="table-after">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Rooms</th>
                  <th>Stories</th>
                  <th>Mainroad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in filteredData" :key="index">
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
      isCollapsed: false,       
      showMobileSidebar: false, 
      activeTool: 'price', 
      
      activeTabLeft: 'preview',
      activeTabRight: 'preview',
      
      // Filter Configurations
      filters: {
        price: { min: '', max: '', manual: false },
        area: { min: '', max: '' },
        rooms: '',
        stories: '',
        categorical: { mainroad: '', guestroom: '' }
      },
      
      // Dummy Data (Matches Cleaning View Structure)
      rawData: [
        [1, 13300000, 7420, 4, 3, 'yes'],
        [2, 12250000, 8960, 4, 4, 'yes'],
        [3, 12250000, 9960, 3, 2, 'yes'],
        [4, 12215000, 7500, 4, 2, 'yes'],
        [5, 11410000, 7420, 4, 2, 'yes'],
        [6, 10850000, 7500, 3, 1, 'yes'],
        [7, 10150000, 8580, 4, 4, 'yes'],
        [8, 10150000, 16200, 5, 2, 'yes'],
        [9, 9870000, 8100, 4, 2, 'yes'],
        [10, 9800000, 5750, 3, 4, 'yes'],
        [11, 9800000, 13200, 3, 2, 'yes'],
        [12, 9681000, 6000, 4, 2, 'yes']
      ],
      filteredData: []
    }
  },
  mounted() {
    this.filteredData = [...this.rawData]
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    formatCellValue(cell) {
      if (typeof cell === 'number' && cell > 100) {
        return cell.toLocaleString()
      }
      return cell
    },

    handleSidebarToggle() {
      if (window.innerWidth <= 1024) {
        this.showMobileSidebar = !this.showMobileSidebar
      } else {
        this.isCollapsed = !this.isCollapsed
        if(this.isCollapsed) {
          this.activeTool = null
        } else {
          this.activeTool = 'price'
        }
      }
    },

    closeMobileSidebar() {
      this.showMobileSidebar = false
    },

    handleResize() {
      if (window.innerWidth > 1024) {
        this.showMobileSidebar = false
      }
    },

    toggleTool(toolName) {
      if(this.isCollapsed && window.innerWidth > 1024) {
        this.isCollapsed = false
        setTimeout(() => { this.activeTool = toolName }, 200)
        return
      }
      this.activeTool = this.activeTool === toolName ? null : toolName
    },

    applyFilter(type) {
      alert(`Applied ${type} filter! Updating data preview...`)
    },

    resetFilters() {
      this.filters = {
        price: { min: '', max: '', manual: false },
        area: { min: '', max: '' },
        rooms: '',
        stories: '',
        categorical: { mainroad: '', guestroom: '' }
      };
      this.filteredData = [...this.rawData];
      alert("Filters Reset");
    },

    goHome() { this.$router.push('/') },
    logout() { this.$router.push('/login') },
    
    // Correctly routes to ProcessView
    goToProcess() { this.$router.push('/process') },
    
    downloadFiltered() { alert('Downloading filtered dataset...') }
  }
}
</script>

<style scoped>
/* =================================================================
   1. DESIGN TOKENS & BASE SETTINGS
================================================================= */
:host {
  --bg-deep: #050505;
  --bg-glass: rgba(20, 20, 20, 0.75);
  --border-glass: rgba(255, 255, 255, 0.08);
  
  --aki-primary: #00F0FF; 
  --aki-primary-dim: rgba(0, 240, 255, 0.08);
  --aki-danger: #FF2A6D;  
  
  --input-bg: #1e1e24;
  --input-border: #444; 
  
  --sidebar-width: 280px;
  --sidebar-collapsed: 70px;
  --trans-speed: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

.filtering-container {
  background-color: var(--bg-deep);
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 240, 255, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(255, 42, 109, 0.05) 0px, transparent 50%);
  color: #ffffff;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
}

/* =================================================================
   2. MOBILE OVERLAY
================================================================= */
.mobile-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.mobile-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

/* =================================================================
   3. SIDEBAR
================================================================= */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-glass);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-right: 1px solid var(--border-glass);
  display: flex;
  flex-direction: column;
  transition: all var(--trans-speed);
  position: relative;
  z-index: 100;
  padding: 15px 0;
  flex-shrink: 0;
}

.filtering-container.desktop-collapsed .sidebar { width: var(--sidebar-collapsed); }
.filtering-container.desktop-collapsed .hide-on-collapse { opacity: 0; pointer-events: none; display: none; }

/* Logo Area */
.logo-container {
  padding: 0 20px 20px 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-text {
  font-weight: 800; font-size: 0.85rem; letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #bbb);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* Mobile Close Button */
.mobile-close-btn {
  background: rgba(255, 255, 255, 0.15); 
  border: 1px solid rgba(255,255,255,0.2);
  color: white; 
  font-size: 1.2rem;
  width: 32px; height: 32px;
  border-radius: 50%;
  cursor: pointer; 
  display: none; 
  align-items: center; justify-content: center;
  transition: 0.2s;
}
.mobile-close-btn:active { background: var(--aki-danger); border-color: var(--aki-danger); }

/* Tools Wrapper */
.tools-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tools-wrapper::-webkit-scrollbar { width: 4px; }
.tools-wrapper::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

.section-title {
  font-size: 0.65rem; color: #777; font-weight: 700;
  letter-spacing: 1px; margin-bottom: 5px; padding-left: 4px;
}

/* Tool Item */
.tool-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
}

.tool-header {
  padding: 12px 14px;
  cursor: pointer;
  display: flex; align-items: center; gap: 12px;
  color: #ccc; font-size: 0.85rem; font-weight: 600;
  transition: 0.2s; min-height: 48px;
}

.tool-header ion-icon { font-size: 1.1rem; color: var(--aki-primary); flex-shrink: 0; }
.tool-item:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }

.tool-item.active { 
  border-color: var(--aki-primary); 
  background: var(--aki-primary-dim); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.tool-item.active .tool-header { color: white; }

.chevron { transition: transform 0.3s; }
.chevron.rotated { transform: rotate(90deg); }

.filtering-container.desktop-collapsed .tool-header { justify-content: center; padding: 12px 0; }
.filtering-container.desktop-collapsed .tool-label, 
.filtering-container.desktop-collapsed .chevron { display: none; }

.tool-content {
  max-height: 0; 
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  background: rgba(0,0,0,0.2);
}
.tool-item.active .tool-content { border-top: 1px solid rgba(255,255,255,0.1); }
.form-pad { padding: 15px 12px; }

/* =================================================================
   4. INPUTS & BUTTONS
================================================================= */
.input-group { margin-bottom: 15px; }
.sub-label { display: block; font-size: 0.75rem; color: #aaa; margin-bottom: 8px; font-weight: 500; }

.custom-select-wrapper { position: relative; width: 100%; }

.f-input {
  width: 100%;
  background-color: var(--input-bg); 
  border: 1px solid var(--input-border);
  color: white;
  padding: 12px 12px;
  padding-right: 35px;
  border-radius: 6px;
  font-size: 0.85rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
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

/* PRIMARY ACTION BUTTONS */
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

/* Sidebar Footer */
.sidebar-footer { margin-top: auto; padding: 15px 12px; border-top: 1px solid var(--border-glass); }
.nav-next {
  width: 100%; background: var(--aki-danger); color: white;
  padding: 12px; border: none; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; font-weight: 700; box-shadow: 0 4px 15px rgba(255, 42, 109, 0.2);
}
.filtering-container.desktop-collapsed .nav-next span { display: none; }

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
  background: rgba(5,5,5,0.8); z-index: 50;
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

.sub-tabs { display: flex; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border-glass); overflow-x: auto; }
.tab {
  flex: 1; text-align: center; padding: 12px 0;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  color: #666; cursor: pointer; white-space: nowrap; min-width: 80px;
}
.tab.active { color: #ff5e00; border-bottom: 2px solid #ff5e00; background: linear-gradient(to top, rgba(255,94,0,0.05), transparent); }

.table-wrap { flex: 1; overflow: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.75rem; white-space: nowrap; }
thead th { position: sticky; top: 0; background: #141414; color: #888; text-align: left; padding: 12px 16px; border-bottom: 1px solid #333; z-index: 5; }
tbody td { padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ccc; }

@media screen and (max-width: 1024px) {
  .sidebar {
    position: fixed; left: 0; top: 0; height: 100%;
    transform: translateX(-100%); width: 280px;
    box-shadow: 10px 0 30px rgba(0,0,0,0.8);
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