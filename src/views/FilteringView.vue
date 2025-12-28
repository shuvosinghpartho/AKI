<template>
  <div class="filtering-container" :class="{ 'sidebar-closed': isSidebarClosed }">
    <!-- Sidebar -->
    <aside class="sidebar" id="mainSidebar">
      <div class="sidebar-header">
        <div class="brand-text">AKI <span style="color:var(--aki-teal)">DataSuite</span></div>
      </div>

      <div class="sidebar-content">
        <!-- Price Filter -->
        <div class="filter-card" id="price-filter">
          <div class="filter-header">
            <span>PRICE RANGE</span>
            <label class="checkbox-wrapper">
              <input 
                type="checkbox" 
                class="custom-checkbox toggle-manual" 
                v-model="priceFilter.manualMode"
                @change="toggleManualMode('price')"
              >
              <span>Manual</span>
            </label>
          </div>
          
          <div class="slider-wrapper">
            <div class="slider-values">
              <span class="val-min">{{ formatSliderValue(priceFilter.min) }}</span>
              <span class="val-max">{{ formatSliderValue(priceFilter.max) }}</span>
            </div>
            <div class="slider-track"></div>
            <div class="slider-range" :style="priceRangeStyle"></div>
            <input 
              type="range" 
              class="range-input input-min" 
              :min="priceFilter.minLimit" 
              :max="priceFilter.maxLimit" 
              v-model="priceFilter.min" 
              step="1000"
              @input="updatePriceSlider"
            >
            <input 
              type="range" 
              class="range-input input-max" 
              :min="priceFilter.minLimit" 
              :max="priceFilter.maxLimit" 
              v-model="priceFilter.max" 
              step="1000"
              @input="updatePriceSlider"
            >
          </div>

          <div class="manual-input-container" :class="{ open: priceFilter.manualMode }">
            <input 
              type="number" 
              class="num-input manual-min" 
              v-model="priceFilter.min"
              @input="updatePriceManual"
            >
            <input 
              type="number" 
              class="num-input manual-max" 
              v-model="priceFilter.max"
              @input="updatePriceManual"
            >
          </div>
        </div>

        <!-- Area Filter -->
        <div class="filter-card" id="area-filter">
          <div class="filter-header">
            <span>AREA (SqFt)</span>
            <label class="checkbox-wrapper">
              <input 
                type="checkbox" 
                class="custom-checkbox toggle-manual" 
                v-model="areaFilter.manualMode"
                @change="toggleManualMode('area')"
              >
              <span>Manual</span>
            </label>
          </div>
          <div class="slider-wrapper">
            <div class="slider-values">
              <span class="val-min">{{ areaFilter.min }}</span>
              <span class="val-max">{{ areaFilter.max }}</span>
            </div>
            <div class="slider-track"></div>
            <div class="slider-range" :style="areaRangeStyle"></div>
            <input 
              type="range" 
              class="range-input input-min" 
              :min="areaFilter.minLimit" 
              :max="areaFilter.maxLimit" 
              v-model="areaFilter.min" 
              step="10"
              @input="updateAreaSlider"
            >
            <input 
              type="range" 
              class="range-input input-max" 
              :min="areaFilter.minLimit" 
              :max="areaFilter.maxLimit" 
              v-model="areaFilter.max" 
              step="10"
              @input="updateAreaSlider"
            >
          </div>
          <div class="manual-input-container" :class="{ open: areaFilter.manualMode }">
            <input 
              type="number" 
              class="num-input manual-min" 
              v-model="areaFilter.min"
              @input="updateAreaManual"
            >
            <input 
              type="number" 
              class="num-input manual-max" 
              v-model="areaFilter.max"
              @input="updateAreaManual"
            >
          </div>
        </div>

        <!-- Bedrooms Filter -->
        <div class="filter-card" id="bed-filter">
          <div class="filter-header">
            <span>BEDROOMS</span>
            <label class="checkbox-wrapper">
              <input 
                type="checkbox" 
                class="custom-checkbox toggle-manual" 
                v-model="bedFilter.manualMode"
                @change="toggleManualMode('bed')"
              >
              <span>Manual</span>
            </label>
          </div>
          <div class="slider-wrapper">
            <div class="slider-values">
              <span class="val-min">{{ bedFilter.min }}</span>
              <span class="val-max">{{ bedFilter.max }}</span>
            </div>
            <div class="slider-track"></div>
            <div class="slider-range" :style="bedRangeStyle"></div>
            <input 
              type="range" 
              class="range-input input-min" 
              :min="bedFilter.minLimit" 
              :max="bedFilter.maxLimit" 
              v-model="bedFilter.min" 
              step="1"
              @input="updateBedSlider"
            >
            <input 
              type="range" 
              class="range-input input-max" 
              :min="bedFilter.minLimit" 
              :max="bedFilter.maxLimit" 
              v-model="bedFilter.max" 
              step="1"
              @input="updateBedSlider"
            >
          </div>
          <div class="manual-input-container" :class="{ open: bedFilter.manualMode }">
            <input 
              type="number" 
              class="num-input manual-min" 
              v-model="bedFilter.min"
              @input="updateBedManual"
            >
            <input 
              type="number" 
              class="num-input manual-max" 
              v-model="bedFilter.max"
              @input="updateBedManual"
            >
          </div>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="btn-prev" @click="goToCleaning">
          Back
        </button>

        <button class="btn-next" @click="goToProcess">
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
            <div class="step active">FILTER</div>
            <div class="step">PROCESS</div>
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
            <span class="panel-title"><span class="dot yellow"></span> Raw Data</span>
            <div class="sub-tabs">
              <span class="sub-tab active">Preview</span>
              <span class="sub-tab">Stats</span>
            </div>
          </div>
          <div class="table-scroll-area">
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

        <div class="panel">
          <div class="panel-header">
            <span class="panel-title"><span class="dot green"></span> Filtered Result</span>
            <div class="sub-tabs">
              <span class="sub-tab active">Preview</span>
              <span class="sub-tab">Diff</span>
            </div>
          </div>
          <div class="table-scroll-area">
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
      isSidebarClosed: false,
      priceFilter: {
        min: 1750000,
        max: 13300000,
        minLimit: 1750000,
        maxLimit: 13300000,
        manualMode: false
      },
      areaFilter: {
        min: 1650,
        max: 16200,
        minLimit: 1650,
        maxLimit: 16200,
        manualMode: false
      },
      bedFilter: {
        min: 1,
        max: 6,
        minLimit: 1,
        maxLimit: 6,
        manualMode: false
      },
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
  computed: {
    filteredData() {
      return this.rawData.filter(row => {
        const price = row[0]
        const area = row[1]
        const bedrooms = row[2]
        
        return price >= this.priceFilter.min && 
               price <= this.priceFilter.max &&
               area >= this.areaFilter.min && 
               area <= this.areaFilter.max &&
               bedrooms >= this.bedFilter.min && 
               bedrooms <= this.bedFilter.max
      })
    },
    priceRangeStyle() {
      const minPercent = ((this.priceFilter.min - this.priceFilter.minLimit) / 
                         (this.priceFilter.maxLimit - this.priceFilter.minLimit)) * 100
      const maxPercent = ((this.priceFilter.max - this.priceFilter.minLimit) / 
                         (this.priceFilter.maxLimit - this.priceFilter.minLimit)) * 100
      
      return {
        left: minPercent + '%',
        width: (maxPercent - minPercent) + '%'
      }
    },
    areaRangeStyle() {
      const minPercent = ((this.areaFilter.min - this.areaFilter.minLimit) / 
                         (this.areaFilter.maxLimit - this.areaFilter.minLimit)) * 100
      const maxPercent = ((this.areaFilter.max - this.areaFilter.minLimit) / 
                         (this.areaFilter.maxLimit - this.areaFilter.minLimit)) * 100
      
      return {
        left: minPercent + '%',
        width: (maxPercent - minPercent) + '%'
      }
    },
    bedRangeStyle() {
      const minPercent = ((this.bedFilter.min - this.bedFilter.minLimit) / 
                         (this.bedFilter.maxLimit - this.bedFilter.minLimit)) * 100
      const maxPercent = ((this.bedFilter.max - this.bedFilter.minLimit) / 
                         (this.bedFilter.maxLimit - this.bedFilter.minLimit)) * 100
      
      return {
        left: minPercent + '%',
        width: (maxPercent - minPercent) + '%'
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarClosed = !this.isSidebarClosed
    },

    toggleManualMode(filterType) {
      // Manual mode toggle is handled by v-model
    },

    formatSliderValue(value) {
      return value > 1000000 ? (value / 1000000).toFixed(1) + 'M' : 
             value > 1000 ? (value / 1000).toFixed(1) + 'k' : value
    },

    formatCellValue(cell) {
      if (typeof cell === 'number' && cell > 100) {
        return cell.toLocaleString()
      }
      return cell
    },

    updatePriceSlider() {
      const gap = (this.priceFilter.maxLimit - this.priceFilter.minLimit) * 0.05
      if (this.priceFilter.max - this.priceFilter.min < gap) {
        this.priceFilter.max = this.priceFilter.min + gap
      }
    },

    updateAreaSlider() {
      const gap = (this.areaFilter.maxLimit - this.areaFilter.minLimit) * 0.05
      if (this.areaFilter.max - this.areaFilter.min < gap) {
        this.areaFilter.max = this.areaFilter.min + gap
      }
    },

    updateBedSlider() {
      const gap = (this.bedFilter.maxLimit - this.bedFilter.minLimit) * 0.05
      if (this.bedFilter.max - this.bedFilter.min < gap) {
        this.bedFilter.max = this.bedFilter.min + gap
      }
    },

    updatePriceManual() {
      const gap = (this.priceFilter.maxLimit - this.priceFilter.minLimit) * 0.05
      if (this.priceFilter.max - this.priceFilter.min < gap) {
        this.priceFilter.min = this.priceFilter.max - gap
      }
    },

    updateAreaManual() {
      const gap = (this.areaFilter.maxLimit - this.areaFilter.minLimit) * 0.05
      if (this.areaFilter.max - this.areaFilter.min < gap) {
        this.areaFilter.min = this.areaFilter.max - gap
      }
    },

    updateBedManual() {
      const gap = (this.bedFilter.maxLimit - this.bedFilter.minLimit) * 0.05
      if (this.bedFilter.max - this.bedFilter.min < gap) {
        this.bedFilter.min = this.bedFilter.max - gap
      }
    },

    goToCleaning() {
      this.$router.push('/cleaning')
    },

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
/* --- THEME VARIABLES (UNCHANGED THEME) --- */
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

.filtering-container {
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
.filtering-container.sidebar-closed .sidebar {
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
  gap: 15px;
}

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


/* --- FILTER CARDS (Modernized) --- */
.filter-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  transition: 0.3s;
}
.filter-card:hover { border-color: rgba(255,255,255,0.2); }

.filter-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 15px; font-size: 0.8rem; color: var(--text-gray); font-weight: 500;
}

/* Custom Checkbox */
.checkbox-wrapper { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.custom-checkbox {
  appearance: none; width: 16px; height: 16px;
  border: 1px solid var(--text-gray); border-radius: 4px;
  background: transparent; cursor: pointer; position: relative;
  transition: 0.2s;
}
.custom-checkbox:checked { border-color: var(--aki-red); background: var(--aki-red-glow); }
.custom-checkbox:checked::after {
  content: '✓'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  color: white; font-size: 10px; font-weight: bold;
}

/* --- DUAL SLIDER STYLING --- */
.slider-wrapper { position: relative; width: 100%; height: 45px; }
.slider-values {
  display: flex; justify-content: space-between;
  font-size: 0.7rem; color: var(--aki-red); font-family: 'Courier New', monospace; font-weight: 700;
  margin-bottom: 6px;
}
.slider-track {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 100%; height: 4px; background: #333; border-radius: 2px; z-index: 1;
}
.slider-range {
  position: absolute; top: 50%; transform: translateY(-50%);
  height: 4px; background: var(--aki-red); z-index: 2;
  box-shadow: 0 0 10px var(--aki-red-glow);
}
.range-input {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 100%; pointer-events: none; appearance: none; background: none; z-index: 3;
}
.range-input::-webkit-slider-thumb {
  pointer-events: auto; appearance: none; width: 16px; height: 16px;
  background: #fff; border-radius: 50%; border: 2px solid var(--aki-red);
  cursor: pointer; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-top: -6px;
  transition: transform 0.2s;
}
.range-input::-webkit-slider-thumb:hover { transform: scale(1.2); }

/* Manual Inputs */
.manual-input-container {
  max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out;
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px; opacity: 0;
}
.manual-input-container.open { max-height: 100px; margin-top: 15px; opacity: 1; }

.num-input {
  width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color);
  color: white; padding: 10px; border-radius: 6px; font-size: 0.8rem;
}
.num-input:focus { outline: none; border-color: var(--aki-red); }


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


/* Content Grid (Glass Panels) */
.comparison-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 25px;
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
  transition: transform 0.3s;
}
.panel:hover { border-color: rgba(255,255,255,0.15); }

.panel-header {
  background: rgba(255,255,255,0.02); padding: 15px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border-color);
}
 
.panel-title { font-weight: 600; font-size: 0.9rem; color: #fff; display: flex; align-items: center; gap: 8px;}
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.yellow { background: #ffca28; box-shadow: 0 0 8px rgba(255,202,40, 0.4); }
.dot.green { background: #66bb6a; box-shadow: 0 0 8px rgba(102,187,106, 0.4); }

.sub-tabs { display: flex; gap: 15px; }
.sub-tab { font-size: 0.75rem; color: var(--text-gray); cursor: pointer; transition: 0.2s; }
.sub-tab:hover { color: white; }
.sub-tab.active { color: var(--aki-teal); font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }

.table-scroll-area { overflow: auto; flex: 1; }

/* Modern Table */
table { width: 100%; border-collapse: collapse; font-size: 0.8rem; white-space: nowrap; }
thead th {
  position: sticky; top: 0; background: rgba(20,20,20,0.95); z-index: 5;
  padding: 14px; text-align: left; color: var(--text-gray); font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}
tbody td {
  padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ddd;
}
tbody tr:hover { background: rgba(38, 166, 154, 0.05); }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--aki-red); }
</style>
