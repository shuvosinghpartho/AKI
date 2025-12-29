<template>
  <div class="data-processing-container">
    <div class="container">
      
      <div class="nav-bar">
        <div class="nav-group left-group">
          <button class="btn-primary" @click="goBack">
            <ion-icon name="arrow-back-outline"></ion-icon>
            Go Back
          </button>
        </div>

        <div class="nav-group center-group">
          <div class="custom-select">
            <!-- <select id="datasetSelect" v-model="selectedDataset" @change="handleDatasetChange">
               <option value="modified">Modified Dataset (Current)</option>
            </select> -->
            <ion-icon name="chevron-down-outline" class="select-arrow"></ion-icon>
          </div>
        </div>

        <div class="nav-group right-group">
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

        <div class="table-wrapper">
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
                <tr v-for="(row, rowIndex) in dataRows" :key="'dup'+rowIndex">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ formatCellValue(cell) }}
                  </td>
                </tr>
                 <tr v-for="(row, rowIndex) in dataRows" :key="'dup2'+rowIndex">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ formatCellValue(cell) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      this.$router.push('/upload-csv')
    },

    goToCleaning() {
      this.$router.push('/cleaning')
    },

    handleDatasetChange(event) {
      const selectedOption = event.target.options[event.target.selectedIndex].text
      this.showNotification(`Switched context to: ${selectedOption}`)
    }
  },
  mounted() {
    setTimeout(() => {
      this.showNotification('Successfully loaded Dataset from server.')
    }, 500)
  }
}
</script>

<style scoped>
/* =========================================
   Global Variables & Root Setup
   ========================================= */
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
}

.data-processing-container {
  background-color: var(--bg-color);
  color: var(--text-white);
  /* Use fixed viewport height and hide body scroll */
  height: 100vh;
  width: 100vw;
  overflow: hidden; 
  padding: 20px;
  background-image: radial-gradient(circle at 50% 0%, rgba(229, 57, 53, 0.1), transparent 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  height: 100%; /* Fill the viewport */
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.8s ease-out;
  position: relative; /* For absolute positioning of notification */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================================
   Navigation Bar (Updated for Split View)
   ========================================= */
.nav-bar {
  display: flex;
  justify-content: space-between; /* Pushes left/right groups to edges */
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0; /* Prevents navbar from shrinking */
}

.nav-group {
  display: flex;
  align-items: center;
}

.center-group {
  flex-grow: 1;
  justify-content: center;
  max-width: 400px;
  margin: 0 20px;
}

/* =========================================
   Dropdown Select
   ========================================= */
.custom-select {
  position: relative;
  width: 100%;
}

select {
  width: 100%;
  background-color: transparent; 
  border: 1px solid var(--border-color);
  color: var(--text-white);
  padding: 12px 15px;
  padding-right: 40px;
  border-radius: 8px;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

select:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
}

select option {
  background-color: var(--card-bg); 
  color: var(--text-white);         
  padding: 12px;
}

.select-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-gray);
  font-size: 1rem;
}

/* =========================================
   Buttons
   ========================================= */
.btn-secondary {
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-gray);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-secondary:hover {
  border-color: var(--primary-red);
  color: var(--text-white);
  background-color: rgba(229, 57, 53, 0.1);
}

.btn-primary {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: var(--primary-gradient);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--primary-glow);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 25px rgba(229, 57, 53, 0.7);
}

/* =========================================
   Notification (Updated Position)
   ========================================= */
.notification-container {
  position: absolute; /* Takes it out of flow */
  top: 60px;          /* Positions it slightly below navbar, but "upper" */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  pointer-events: none; /* Let clicks pass through if invisible */
}

.success-toast {
  pointer-events: auto;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(6, 78, 59, 0.9) 100%);
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-left: 5px solid #10b981;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  backdrop-filter: blur(12px);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

@keyframes popIn {
  0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* =========================================
   Data Card (Flex Layout for Internal Scroll)
   ========================================= */
.data-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 0; /* Removing padding to let table flush with edges if needed, or manage via inner div */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden; /* Prevents card from spilling over */
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Takes up all remaining vertical space */
  margin-bottom: 20px; /* Small bottom margin */
}

.data-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
  z-index: 20;
}

.card-header {
  padding: 20px 25px;
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0; /* Header stays fixed size */
}

.card-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-white);
  margin: 0;
}

/* =========================================
   Scrollable Table Area
   ========================================= */
.table-wrapper {
  flex-grow: 1; /* Fills the rest of the card */
  overflow: hidden; /* Contains the scrollable area */
  position: relative;
}

.table-responsive {
  height: 100%;     /* Fills wrapper */
  width: 100%;
  overflow-y: auto; /* ENABLE VERTICAL SCROLL HERE */
  overflow-x: auto; /* Horizontal scroll if needed */
}

/* Custom Scrollbar Styling */
.table-responsive::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.table-responsive::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.table-responsive::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
  border: 2px solid #1a1a1a;
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
  padding: 15px 25px;
  border-bottom: 1px solid var(--border-color);
}

thead th {
  background-color: #1a1a1a; /* Dark background for sticky header */
  color: var(--text-gray);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  /* STICKY HEADER MAGIC */
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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

/* =========================================
   Responsive Design
   ========================================= */
@media (max-width: 900px) {
  .nav-bar {
    flex-wrap: wrap;
    gap: 15px;
  }
  .nav-group.center-group {
    order: 3;
    width: 100%;
    margin: 10px 0 0 0;
  }
}
</style>