<template>
  <div class="lucrative-dashboard">
    <div class="ambient-light light-1"></div>
    <div class="ambient-light light-2"></div>

    <div class="glass-container">
      
      <header class="dashboard-header">
        <div class="brand">
          <div class="logo-box">
            <ion-icon name="prism-outline"></ion-icon>
          </div>
          <div class="brand-text">
            <h1>AKI</h1>
            <small>Artificial Kinetic Intelligence</small>
          </div>
        </div>

        <div class="header-buttons">
          <button class="btn-gradient small" @click="viewProfile">
            <ion-icon name="person"></ion-icon>
            <span>Profile</span>
          </button>
          <button class="btn-gradient small" @click="logout">
            <ion-icon name="power"></ion-icon>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main class="content-grid">
        
        <section class="panel left-panel">
          <div class="panel-header">
            <h2>Select Node</h2>
            <p>Choose an existing neural configuration.</p>
          </div>

          <div class="control-group">
            <label>Active Projects</label>
            <div class="select-wrapper">
              <select v-model="selectedProject" @change="clearUpload">
                <option value="" disabled>-- Select Stream --</option>
                <option value="demo">Demo Project (Regression)</option>
                <option value="vision">Vision V1 (Classification)</option>
                <option value="signal">Signal Test 04 (Processing)</option>
              </select>
              <ion-icon name="chevron-down" class="arrow"></ion-icon>
            </div>
          </div>

          <div class="control-group grow">
            <label>Objectives / Notes</label>
            <textarea 
              v-model="projectDescription" 
              placeholder="Define processing parameters..."
            ></textarea>
          </div>
        </section>

        <div class="orb-divider">
          <div class="line"></div>
          <div class="orb">OR</div>
          <div class="line"></div>
        </div>

        <section class="panel right-panel">
          <div class="panel-header">
            <h2>Upload Data</h2>
            <p>Ingest raw CSV or XLSX datasets.</p>
          </div>

          <label 
            class="cyber-dropzone" 
            :class="{ 'active': uploadedFile }"
            for="file-input"
          >
            <div class="glow-border"></div>
            <div class="drop-content">
              <div class="icon-stack">
                <ion-icon name="cloud-upload-outline" class="bg-icon"></ion-icon>
                <ion-icon name="cloud-upload" class="fg-icon"></ion-icon>
              </div>
              
              <div v-if="!uploadedFile" class="text-stack">
                <span class="primary-text">Drag & Drop Dataset</span>
                <span class="secondary-text">or click to browse local files</span>
              </div>

              <div v-else class="file-success">
                <ion-icon name="document-text"></ion-icon>
                <span class="filename">{{ uploadedFile.name }}</span>
                <span class="filesize">Ready for ingestion</span>
              </div>
            </div>
          </label>
          <input type="file" id="file-input" accept=".csv, .xlsx" @change="handleFileSelect" ref="fileInput">

          <div class="action-area">
             <div class="info-tag">
               <ion-icon name="scan-outline"></ion-icon>
               <span>Type: {{ problemTypeShort }}</span>
             </div>

             <button class="btn-gradient large" @click="submitProject">
                <span>Initialize Processing</span>
                <ion-icon name="rocket-outline"></ion-icon>
             </button>
          </div>
        </section>

      </main>
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
      problemTypeShort: 'WAITING INPUT'
    }
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadedFile = file
        this.selectedProject = ''
        this.problemTypeShort = 'NEW ANALYSIS'
      }
    },
    clearUpload() {
      this.uploadedFile = null
      this.$refs.fileInput.value = ''
      this.updateProblemType()
    },
    updateProblemType() {
      if (this.selectedProject === 'demo') this.problemTypeShort = 'REGRESSION'
      else if (this.selectedProject === 'vision') this.problemTypeShort = 'CLASSIFICATION'
      else if (this.selectedProject === 'signal') this.problemTypeShort = 'SIGNAL PROC'
      else this.problemTypeShort = 'WAITING INPUT'
    },
    submitProject() {
      if (!this.uploadedFile && !this.selectedProject) {
        alert("Action Required: Select a project or upload a file.")
        return
      }
      const projectData = {
        type: this.uploadedFile ? 'new-upload' : 'existing-project',
        source: this.uploadedFile ? this.uploadedFile.name : this.selectedProject,
        description: this.projectDescription,
        timestamp: new Date().toISOString()
      }
      sessionStorage.setItem('projectData', JSON.stringify(projectData))
      this.$router.push('/data-processing')
    },
    logout() { this.$router.push('/signin') },
    viewProfile() { this.$router.push('/user-profile') }
  },
  watch: {
    selectedProject() { this.updateProblemType() }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

/* ============================
   Variables & Reset
   ============================ */
.lucrative-dashboard {
  --bg-deep: #050505;
  --glass-bg: rgba(20, 20, 20, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
  
  /* The "Eye-Catchy" Gradient Scheme */
  --neon-start: #ff416c;
  --neon-end: #ff4b2b;
  --neon-glow: rgba(255, 75, 43, 0.4);
  
  --text-main: #ffffff;
  --text-muted: #8b8b95;
  
  font-family: 'Outfit', sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-deep);
  color: var(--text-main);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ============================
   Ambient Background Animation
   ============================ */
.ambient-light {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.4;
  animation: float 10s infinite alternate ease-in-out;
}

.light-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--neon-start), transparent);
  top: -100px;
  left: -100px;
}

.light-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #4200ff, transparent);
  bottom: -150px;
  right: -150px;
  animation-delay: -5s;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* ============================
   Main Glass Container
   ============================ */
.glass-container {
  width: 95%;
  height: 92%;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  z-index: 10;
  position: relative;
  overflow: hidden;
}

/* ============================
   Header
   ============================ */
.dashboard-header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid var(--glass-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-box {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, var(--neon-start), var(--neon-end));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px var(--neon-glow);
}

.brand-text h1 {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  margin: 0;
  letter-spacing: -0.5px;
}

.brand-text .highlight { color: var(--neon-start); }
.brand-text small { color: var(--text-muted); font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; }

.header-buttons {
  display: flex;
  gap: 15px;
}

/* ============================
   The Universal Button Style
   ============================ */
.btn-gradient {
  background: linear-gradient(135deg, var(--neon-start) 0%, var(--neon-end) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px var(--neon-glow);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

/* Shine Effect */
.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: 0.5s;
  z-index: -1;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px var(--neon-glow);
}

.btn-gradient:hover::before { left: 100%; }
.btn-gradient:active { transform: translateY(1px); }

/* Sizes */
.btn-gradient.small {
  padding: 10px 20px;
  font-size: 0.8rem;
  height: 40px;
}

.btn-gradient.large {
  width: 100%;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 800;
}

/* ============================
   Main Content Layout
   ============================ */
.content-grid {
  flex: 1;
  display: flex;
  padding: 40px;
  gap: 40px;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.panel-header { margin-bottom: 25px; }
.panel-header h2 { font-size: 1.8rem; font-weight: 600; margin: 0 0 5px 0; }
.panel-header p { color: var(--text-muted); margin: 0; font-size: 0.95rem; }

/* ============================
   Inputs (Left Panel)
   ============================ */
.control-group { margin-bottom: 25px; display: flex; flex-direction: column; gap: 10px; }
.control-group.grow { flex: 1; }

label { font-size: 0.8rem; color: var(--neon-start); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

.select-wrapper { position: relative; }

select, textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--glass-border);
  color: white;
  border-radius: 12px;
  padding: 15px;
  font-family: inherit;
  font-size: 1rem;
  transition: 0.3s;
  outline: none;
}

select:focus, textarea:focus {
  border-color: var(--neon-start);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 15px rgba(255, 65, 108, 0.1);
}

textarea { height: 100%; resize: none; }
select { appearance: none; cursor: pointer; }
select option { background-color: #111; }

.arrow { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); pointer-events: none; }

/* ============================
   Divider
   ============================ */
.orb-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.orb-divider .line {
  width: 1px;
  flex: 1;
  background: linear-gradient(to bottom, transparent, var(--glass-border), transparent);
}

.orb-divider .orb {
  background: rgba(255, 255, 255, 0.05);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-muted);
}

/* ============================
   Upload Zone (Right Panel)
   ============================ */
.cyber-dropzone {
  flex: 1;
  position: relative;
  background: radial-gradient(circle at center, rgba(255, 65, 108, 0.03) 0%, transparent 70%);
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animated Border */
.glow-border {
  position: absolute;
  inset: 0;
  border: 2px dashed var(--glass-border);
  border-radius: 20px;
  transition: 0.3s;
}

.cyber-dropzone:hover .glow-border, .cyber-dropzone.active .glow-border {
  border-color: var(--neon-start);
  box-shadow: inset 0 0 20px rgba(255, 65, 108, 0.1);
}

.drop-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.icon-stack {
  position: relative;
  height: 80px;
  width: 80px;
  margin: 0 auto 20px auto;
}

.bg-icon {
  font-size: 5rem;
  color: var(--neon-start);
  opacity: 0.2;
  position: absolute;
  top: 0; left: 0;
  filter: blur(5px);
}

.fg-icon {
  font-size: 5rem;
  background: linear-gradient(to bottom, #fff, var(--text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 0; left: 0;
}

.text-stack { display: flex; flex-direction: column; gap: 8px; }
.primary-text { font-size: 1.2rem; font-weight: 600; }
.secondary-text { font-size: 0.9rem; color: var(--text-muted); }

.file-success {
  animation: popIn 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.file-success ion-icon { font-size: 3rem; color: #10b981; margin-bottom: 10px; }
.file-success .filename { font-size: 1.2rem; font-weight: 700; color: white; }
.file-success .filesize { color: var(--text-muted); font-size: 0.85rem; }

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

#file-input { display: none; }

/* ============================
   Action Footer
   ============================ */
.action-area {
  display: flex;
  gap: 20px;
  align-items: center;
}

.info-tag {
  background: rgba(255,255,255,0.05);
  padding: 0 20px;
  height: 56px; /* Match button height */
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

.info-tag ion-icon { color: var(--neon-start); font-size: 1.2rem; }

/* Responsive */
@media (max-width: 1024px) {
  .content-grid { flex-direction: column; overflow-y: auto; padding: 20px; }
  .orb-divider { flex-direction: row; width: 100%; height: 40px; }
  .orb-divider .line { width: auto; height: 1px; }
  .dashboard-header { padding: 0 20px; }
  .header-buttons .btn-gradient span { display: none; } /* Hide text on tablets */
}
</style>