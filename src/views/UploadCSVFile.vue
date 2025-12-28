<template>
  <div class="upload-csv-container">
    <div class="container">
      <!-- Header Actions -->
      <div class="header-actions">
        <button class="btn-secondary" @click="logout">
          <ion-icon name="log-out-outline"></ion-icon>
          Logout
        </button>
        <button class="btn-secondary" @click="viewProfile">
          <ion-icon name="person-outline"></ion-icon>
          Profile
        </button>
      </div>

      <!-- Main Card -->
      <div class="main-card">
        <div class="title-section">
          <h1>Project Initialization</h1>
          <p>Select an existing node or upload data to create a new one.</p>
        </div>

        <div class="selection-grid">
          <!-- Left Column: Use Existing Project -->
          <div class="column">
            <div class="section-title">
              <ion-icon name="folder-open-outline"></ion-icon>
              Use Existing Project
            </div>
            <div class="custom-select-wrapper">
              <select 
                id="projectSelect" 
                v-model="selectedProject" 
                @change="clearUpload">
                <option value="" disabled>-- Select a Project --</option>
                <option value="demo">Demo Project (Regression)</option>
                <option value="vision">Vision V1 (Classification)</option>
                <option value="signal">Signal Test 04 (Processing)</option>
              </select>
              <ion-icon name="chevron-down-outline" class="select-arrow"></ion-icon>
            </div>
          </div>

          <!-- Right Column: Create New Project -->
          <div class="column">
            <div class="section-title">
              <ion-icon name="add-circle-outline"></ion-icon>
              Create New Project
            </div>
            
            <label for="file-input" class="upload-area" id="drop-zone">
              <ion-icon name="cloud-upload-outline" class="upload-icon" :class="{ 'uploaded': uploadedFile }"></ion-icon>
              <div class="default-msg" v-if="!uploadedFile">
                <span class="upload-text"><strong>Click to upload</strong> or drag and drop</span>
                <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Excel (.xlsx) or CSV</div>
              </div>
              <div class="file-name-display" v-if="uploadedFile">
                {{ uploadedFile.name }}
              </div>
            </label>
            <input 
              type="file" 
              id="file-input" 
              accept=".csv, .xlsx, .xls"
              @change="handleFileSelect"
              ref="fileInput"
            >
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 30px 0;">

        <!-- Description Section -->
        <div class="desc-section">
          <label>Project Description (Optional)</label>
          <textarea 
            v-model="projectDescription"
            placeholder="Describe the objectives of this kinetic model..."
          ></textarea>
        </div>

        <!-- Footer Section -->
        <div class="footer-section">
          <div class="problem-type-badge">
            <ion-icon name="analytics-outline"></ion-icon>
            <span>{{ problemTypeText }}</span>
          </div>

          <button class="btn-cta" @click="submitProject">
            Begin Data Processing 
            <ion-icon name="hardware-chip-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadCSVFile',
  data() {
    return {
      selectedProject: '',
      uploadedFile: null,
      projectDescription: '',
      problemTypeText: 'Problem Type: Waiting for selection...'
    }
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadedFile = file
        this.selectedProject = ''
        this.updateProblemType('New Data (Analysis Pending)')
      }
    },

    clearUpload() {
      this.uploadedFile = null
      this.$refs.fileInput.value = ''
      this.updateProblemTypeForProject()
    },

    updateProblemType(type) {
      this.problemTypeText = `Problem Type: ${type}`
    },

    updateProblemTypeForProject() {
      if (this.selectedProject === 'demo') {
        this.updateProblemType('Regression')
      } else if (this.selectedProject === 'vision') {
        this.updateProblemType('Classification')
      } else if (this.selectedProject === 'signal') {
        this.updateProblemType('Processing')
      } else {
        this.updateProblemType('Waiting for selection...')
      }
    },

    submitProject() {
      const hasFile = this.uploadedFile !== null
      const hasSelection = this.selectedProject !== ''

      if (!hasFile && !hasSelection) {
        alert("Please select an existing project OR upload a file.")
        return
      }

      // Store project data for the next step
      const projectData = {
        type: hasFile ? 'new-upload' : 'existing-project',
        source: hasFile ? this.uploadedFile.name : this.selectedProject,
        description: this.projectDescription,
        timestamp: new Date().toISOString()
      }

      // Store in sessionStorage for the next component
      sessionStorage.setItem('projectData', JSON.stringify(projectData))

      // Navigate to data processing
      this.$router.push('/data-processing')
    },

    logout() {
      // Implement logout logic here
      console.log('Logging out...')
      this.$router.push('/signin')
    },

    viewProfile() {
      // Implement profile view logic here
      console.log('Viewing profile...')
      alert('Profile view would open here')
    }
  },
  watch: {
    selectedProject() {
      this.updateProblemTypeForProject()
    }
  },
  mounted() {
    // Check if we have project data from previous navigation
    const storedData = sessionStorage.getItem('projectData')
    if (storedData) {
      try {
        const projectData = JSON.parse(storedData)
        console.log('Found stored project data:', projectData)
        // Clear the stored data after reading
        sessionStorage.removeItem('projectData')
      } catch (error) {
        console.error('Error parsing stored project data:', error)
      }
    }
  }
}
</script>

<style scoped>
.upload-csv-container {
  background-color: var(--bg-color);
  color: var(--text-white);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: radial-gradient(circle at 50% -20%, rgba(229, 57, 53, 0.15), transparent 50%);
}

.container {
  width: 100%;
  max-width: 1000px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* CSS Variables */
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

/* Header Actions */
.header-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-bottom: 25px;
}

.btn-secondary {
  padding: 10px 20px;
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
}

.btn-secondary:hover {
  border-color: var(--primary-red);
  color: var(--text-white);
  background-color: rgba(229, 57, 53, 0.1);
  transform: translateY(-2px);
}

/* Main Card */
.main-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Top Red Line */
.main-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
}

.title-section h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(to bottom, #ffffff, #a1a1aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-section p { 
  color: var(--text-gray); 
}

/* Selection Grid */
.selection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
  position: relative;
}

.selection-grid::after {
  content: "";
  position: absolute;
  top: 10%;
  left: 50%;
  height: 80%;
  width: 1px;
  background-color: var(--border-color);
  transform: translateX(-50%);
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: var(--text-white);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title ion-icon { 
  color: var(--primary-red); 
}

/* Dropdown */
.custom-select-wrapper { 
  position: relative; 
}

select {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  color: var(--text-white);
  padding: 15px;
  border-radius: 8px;
  appearance: none;
  outline: none;
  cursor: pointer;
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

/* Upload Area */
.upload-area {
  border: 2px dashed var(--border-color);
  background: linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 100%);
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.upload-area:hover {
  border-color: var(--primary-red);
  background: rgba(229, 57, 53, 0.05);
  box-shadow: 0 0 15px rgba(229, 57, 53, 0.1);
}

.upload-icon {
  font-size: 2.5rem;
  color: var(--text-gray);
  margin-bottom: 10px;
  transition: transform 0.3s, color 0.3s;
}

.upload-icon.uploaded {
  color: var(--success-color);
  transform: scale(1.1);
}

.upload-area:hover .upload-icon {
  color: var(--primary-red);
  transform: scale(1.1);
}

.upload-text { 
  color: var(--text-gray); 
  font-size: 0.9rem; 
}

.upload-text strong { 
  color: var(--primary-red); 
}

#file-input { 
  display: none; 
}

.file-name-display {
  margin-top: 10px;
  font-weight: 600;
  color: var(--text-white);
  display: block;
}

/* Description */
.desc-section { 
  margin-top: 20px; 
}

label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-gray);
  font-size: 0.9rem;
}

textarea {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-white);
  padding: 15px;
  height: 100px;
  resize: none;
  outline: none;
  transition: 0.3s;
}

textarea:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.1);
}

/* Footer Section */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
}

.problem-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-red);
  font-size: 0.9rem;
  font-weight: 600;
}

/* CTA Button */
.btn-cta {
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  border: none;
  background: var(--primary-gradient);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: var(--primary-glow);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(229, 57, 53, 0.6);
}

.btn-cta:active {
  transform: translateY(1px);
}

.btn-cta ion-icon {
  font-size: 1.4rem;
}

/* Responsive */
@media (max-width: 768px) {
  .selection-grid { 
    grid-template-columns: 1fr; 
  }
  
  .selection-grid::after { 
    display: none; 
  }
}
</style>
