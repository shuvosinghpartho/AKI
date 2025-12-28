<template>
  <div class="data-processing-container">
    <div class="container">
      <div class="nav-bar">
        <div class="nav-group">
          <button class="btn-secondary" @click="goBack">
            <ion-icon name="arrow-back-outline"></ion-icon>
            Back to Project Manager
          </button>
        </div>

        <div class="nav-group" style="flex-grow: 1; max-width: 400px; margin: 0 auto;">
          <label class="nav-label">Active Dataset Source</label>
          <div class="custom-select">
            <select id="datasetSelect" v-model="selectedDataset" @change="handleDatasetChange">
              <option value="modified">Modified Dataset (Current)</option>
              <option value="original">Original Uploaded Data</option>
            </select>
            <ion-icon name="chevron-down-outline" class="select-arrow"></ion-icon>
          </div>
        </div>

        <div class="nav-group">
          <button class="btn-primary" @click="goToCleaning">
            Next: Processing
            <ion-icon name="arrow-forward-circle-outline" style="font-size: 1.3rem;"></ion-icon>
          </button>
        </div>
      </div>

      <div class="notification-container" id="notificationArea">
        <div v-if="notification.show" class="success-toast">
          <ion-icon name="checkmark-circle" style="font-size: 1.2rem;"></ion-icon>
          <span>{{ notification.message }}</span>
        </div>
      </div>

      <main class="data-card">
        <div class="card-header">
          <h2>Data Preview</h2>
        </div>

        <div class="table-responsive">
          <table id="previewTable">
            <thead>
              <tr>
                <th v-for="header in dataHeaders" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in dataRows" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                  {{ formatCellValue(cell) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataProcessingView',
  data() {
    return {
      selectedDataset: 'modified',
      notification: {
        show: false,
        message: ''
      },
      dataHeaders: ['Index', 'Price', 'Area', 'Bedrooms', 'Bathrooms', 'Stories', 'Mainroad', 'Guestroom', 'Basement', 'Hot Water'],
      dataRows: [
        [0, 13300000, 7420, 4, 2, 3, 'yes', 'no', 'no', 'no'],
        [1, 12250000, 8960, 4, 4, 4, 'yes', 'no', 'no', 'no'],
        [2, 12250000, 9960, 3, 2, 2, 'yes', 'no', 'yes', 'no'],
        [3, 12215000, 7500, 4, 2, 2, 'yes', 'no', 'yes', 'no'],
        [4, 11410000, 7420, 4, 1, 2, 'yes', 'yes', 'yes', 'no'],
        [5, 10850000, 7500, 3, 3, 1, 'yes', 'no', 'yes', 'no'],
        [6, 10150000, 8580, 4, 3, 4, 'yes', 'no', 'no', 'no'],
        [7, 10150000, 16200, 5, 3, 2, 'yes', 'no', 'no', 'no'],
        [8, 9870000, 8100, 4, 1, 2, 'yes', 'yes', 'yes', 'no'],
        [9, 9800000, 5750, 3, 2, 4, 'yes', 'yes', 'no', 'no']
      ]
    }
  },
  methods: {
    formatCellValue(cell) {
      if (typeof cell === 'number' && cell > 100000) {
        return cell.toLocaleString()
      }
      return cell
    },
    
    showNotification(message) {
      this.notification = {
        show: true,
        message: message
      }
      
      // Auto-hide notification after 4 seconds
      setTimeout(() => {
        this.notification.show = false
      }, 4000)
    },

    goBack() {
      this.$router.push('/')
    },

    goToCleaning() {
      this.$router.push('/cleaning')
    },

    handleDatasetChange(event) {
      const selectedOption = event.target.options[event.target.selectedIndex].text
      this.showNotification(`Switched context to: ${selectedOption}`)
      // In a real app, you would fetch new data and update dataRows here.
    }
  },
  mounted() {
    // Show initial success message with delay for animation
    setTimeout(() => {
      this.showNotification('Successfully loaded existing "Modified Dataset" from server.')
    }, 500)
  }
}
</script>

<style scoped>
/* --- CSS VARIABLES (Your Theme) --- */
:host {
  --bg-color: #0d0d0d;
  --card-bg: #141414;
  --input-bg: #1f1f1f;
  --primary-gradient: linear-gradient(135deg, #d32f2f 0%, #ff5252 100%);
  --primary-glow: 0 4px 20px rgba(229, 57, 53, 0.5);
  --primary-red: #e53935;
  --text-white: #ffffff;
  --text-gray: #a1a1aa;
  --border-color: #333333;
  --success-color: #10b981;
  --success-glow: 0 4px 20px rgba(16, 185, 129, 0.4);
}

.data-processing-container {
  background-color: var(--bg-color);
  color: var(--text-white);
  min-height: 100vh;
  padding: 20px;
  background-image: radial-gradient(circle at 50% 0%, rgba(229, 57, 53, 0.1), transparent 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- TOP NAVIGATION BAR --- */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-label {
  font-size: 0.85rem;
  color: var(--text-gray);
  margin-left: 4px;
}

/* Secondary Button Style (Home) */
.btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-gray);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 48px;
  text-decoration: none;
}

.btn-secondary:hover {
  border-color: var(--primary-red);
  color: var(--text-white);
  background-color: rgba(229, 57, 53, 0.1);
  transform: translateY(-2px);
}

/* Primary Gradient Button Style (Next) */
.btn-primary {
  padding: 12px 30px;
  border-radius: 8px;
  border: none;
  background: var(--primary-gradient);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--primary-glow);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 25px rgba(229, 57, 53, 0.7);
}

/* Styled Dropdown */
.custom-select {
  position: relative;
  min-width: 250px;
}

select {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  color: var(--text-white);
  padding: 12px 16px;
  border-radius: 8px;
  appearance: none;
  outline: none;
  cursor: pointer;
  font-size: 0.95rem;
  height: 48px;
  transition: all 0.3s;
}

select:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.1);
}

.select-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-gray);
}

/* --- NOTIFICATION AREA --- */
.notification-container {
  min-height: 60px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.success-toast {
  background-color: rgba(16, 185, 129, 0.15);
  border: 1px solid var(--success-color);
  color: var(--success-color);
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  box-shadow: var(--success-glow);
  backdrop-filter: blur(5px);
  animation: slideUpFade 0.5s ease-out forwards;
  opacity: 1;
  transform: translateY(0);
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- DATA TABLE CARD --- */
.data-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
}

/* Top Red Gradient Line */
.data-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
}

.card-header {
  margin-bottom: 25px;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Table Responsive Container */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

/* Custom Scrollbar for the table container */
.table-responsive::-webkit-scrollbar {
  height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  background: var(--bg-color);
  border-radius: 8px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 8px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: var(--primary-red);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
}

th, td {
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
}

thead th {
  background-color: rgba(255,255,255,0.05);
  color: var(--text-gray);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
}

tbody tr {
  background-color: var(--input-bg);
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

tbody td {
  font-size: 0.95rem;
  color: var(--text-white);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-group { 
    width: 100%; 
  }
  
  .btn-secondary, .btn-primary, .custom-select { 
    width: 100%; 
  }
  
  .data-card { 
    padding: 20px; 
  }
}
</style>
