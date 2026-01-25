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
          <div class="custom-select-wrapper">
            <label class="select-label">Which Dataset you want to use?</label>
            
            <div class="custom-dropdown" :class="{ 'active': isDropdownOpen }">
              <div class="dropdown-trigger" @click="toggleDropdown">
                <span>{{ getDatasetLabel(selectedDataset) }}</span>
                <ion-icon name="chevron-down-outline" class="dropdown-arrow"></ion-icon>
              </div>

              <transition name="fade">
                <div v-if="isDropdownOpen" class="dropdown-menu">
                  <div 
                    class="dropdown-item" 
                    :class="{ 'selected': selectedDataset === 'modified' }"
                    @click="selectOption('modified')"
                  >
                    Modified Dataset
                  </div>
                  <div 
                    class="dropdown-item" 
                    :class="{ 'selected': selectedDataset === 'raw' }"
                    @click="selectOption('raw')"
                  >
                    Raw Dataset
                  </div>
                </div>
              </transition>
            </div>

            <div v-if="isDropdownOpen" class="click-outside-overlay" @click="isDropdownOpen = false"></div>
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

      <div v-if="showConfirmationModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Confirm Action</h3>
          </div>
          <div class="modal-body">
            <p>If you proceed with the Raw Dataset, all previous modifications will be lost.</p>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" @click="cancelDatasetChange">Cancel</button>
            <button class="btn-primary" @click="confirmDatasetChange">Proceed</button>
          </div>
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
      isDropdownOpen: false, // Tracks custom dropdown state
      showConfirmationModal: false,
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

    // --- Custom Dropdown Logic ---
    getDatasetLabel(val) {
      return val === 'modified' ? 'Modified Dataset' : 'Raw Dataset';
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    selectOption(value) {
      this.isDropdownOpen = false; // Close dropdown

      // If user clicks the one already selected, do nothing
      if (value === this.selectedDataset) return;

      if (value === 'raw') {
        // Show modal warning before switching
        this.showConfirmationModal = true;
      } else {
        // Switching to Modified is safe
        this.selectedDataset = value;
        this.showNotification(`Switched context to: Modified Dataset`);
      }
    },

    confirmDatasetChange() {
      // User Confirmed in Modal
      this.selectedDataset = 'raw';
      this.showConfirmationModal = false;
      this.showNotification('Switched to Raw Dataset. Modifications lost.');
    },

    cancelDatasetChange() {
      // User Cancelled in Modal - Do nothing (value stays 'modified')
      this.showConfirmationModal = false;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.8s ease-out;
  position: relative;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================================
   Navigation Bar
   ========================================= */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
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
  z-index: 50; /* Ensure dropdown appears above other nav elements */
}

/* =========================================
   Custom Dropdown Styles (Transparent & Centered)
   ========================================= */
.custom-select-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
  position: relative;
  align-items: center; /* Center the Label */
}

.select-label {
  font-size: 0.85rem;
  color: var(--text-gray);
  text-align: center; /* Center Text Alignment */
  width: 100%;
  margin-bottom: 4px;
}

.custom-dropdown {
  position: relative;
  width: 100%;
  cursor: pointer;
}

/* Trigger Box */
.dropdown-trigger {
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-white);
  padding: 12px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  font-size: 0.95rem;
  background-color: rgba(255, 255, 255, 0.02);
}

.custom-dropdown.active .dropdown-trigger,
.dropdown-trigger:hover {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.1);
}

.dropdown-arrow {
  color: var(--text-gray);
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.custom-dropdown.active .dropdown-arrow {
  transform: rotate(180deg);
}

/* Dropdown Menu Options */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 101;
}

.dropdown-item {
  padding: 12px 15px;
  color: var(--text-gray);
  font-size: 0.95rem;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.dropdown-item:last-child {
  border-bottom: none;
}

/* Hover & Active States - Dark/Transparent Style */
.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.08); /* Subtle light overlay */
  color: var(--text-white);
}

.dropdown-item.selected {
  background-color: rgba(229, 57, 53, 0.15); /* Red tint for selected */
  color: var(--primary-red);
  font-weight: 600;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Overlay to close dropdown */
.click-outside-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 40; /* Below dropdown menu (101) but above everything else */
  background: transparent;
}


/* =========================================
   Buttons
   ========================================= */
.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-gray);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
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
   Notification
   ========================================= */
.notification-container {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  pointer-events: none;
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
}

@keyframes popIn {
  0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* =========================================
   Modal (Confirmation)
   ========================================= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  width: 90%;
  max-width: 450px;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  border-top: 3px solid var(--primary-red);
}

.modal-header h3 {
  margin: 0 0 10px 0;
  color: var(--text-white);
  font-size: 1.2rem;
}

.modal-body p {
  color: var(--text-gray);
  margin-bottom: 24px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* =========================================
   Data Card
   ========================================= */
.data-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 20px;
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
  flex-shrink: 0;
}

.card-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-white);
  margin: 0;
}

/* =========================================
   Table
   ========================================= */
.table-wrapper {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}

.table-responsive {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

/* Custom Scrollbar */
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
  background-color: #1a1a1a;
  color: var(--text-gray);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
   Responsive
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