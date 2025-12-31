<template>
  <div class="user-profile-page">
    <div class="ambient-mesh"></div>

    <nav class="sidebar">
      <div class="brand">
        Artificial Kinetic Intelligence
      </div>
      
      <div class="nav-menu">
        <a href="#" class="nav-btn" @click.prevent="goToHome">
          <i class="fa-solid fa-house"></i> <span>Home</span>
        </a>
        <button class="nav-btn" @click="refreshPage">
          <i class="fa-solid fa-rotate"></i> <span>Refresh</span>
        </button>
        <a href="#" class="nav-btn" @click.prevent="logout">
          <i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
        </a>
        <a href="#" class="nav-btn" style="margin-top: 20px;" @click.prevent="showAbout">
          <i class="fa-solid fa-circle-info"></i> <span>About Us</span>
        </a>
        <a href="#" class="nav-btn" @click.prevent="reportProblem">
          <i class="fa-solid fa-triangle-exclamation"></i> <span>Report a problem</span>
        </a>
      </div>
    </nav>

    <main class="main-content">
      
      <div class="dashboard-grid">
        <div class="card">
          <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="user-role">as a {{ user.role }}</p>
          <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 15px 0;"></div>
          <p class="user-inst">in {{ user.institution }}</p>
        </div>

        <div class="card">
          <div class="stat-group">
            <span class="stat-label">Project Limit</span>
            <span class="stat-value">{{ stats.projectLimit }}</span>
          </div>
          <div class="stat-group" style="margin-bottom: 0;">
            <span class="stat-label">Remaining Project</span>
            <span class="stat-value">{{ stats.remainingProject }}</span>
          </div>
        </div>

        <div class="card">
          <p class="info-text">
QRARG operates as a non-profit research organization. Your kind support will help us to grow and provide quality services through educational and research support on AI and ML.          </p>
        </div>
      </div>

      <div class="content-split">
        
        <div class="donation-card-container">
          <div class="donation-card">
            <div class="btn-donate-header">Donate to support us</div>
            
            <p class="donation-info">You can donate -</p>
            <div class="radio-group">
              <span class="radio-dot"></span>
              <span>BDT 200+</span>
            </div>

            <p class="donation-info">You will get a new project access. Send your transaction ID (last 4 digits) and press Apply.</p>
            
            <div class="payment-details">
              <span>BKash: +88 01998124416</span>
            </div>

            <div class="input-group">
              <label class="input-label">Transaction ID</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder=""
                v-model="transactionId"
              >
            </div>

            <button class="btn-apply" @click="submitTransaction">Apply</button>
          </div>
        </div>

        <div class="accordion-scroll-container">
          
          <div class="accordion-item" :class="{ 'is-open': expandedSection === 'projectInfo' }">
            <button class="accordion-header" @click="toggleSection('projectInfo')">
              <span>Project Info</span>
              <i class="fa-solid fa-chevron-down chevron"></i>
            </button>
            
            <div class="accordion-body" v-show="expandedSection === 'projectInfo'">
              <div class="body-content">
                <label class="input-label">Select project to view info:</label>
                <select class="custom-select" v-model="selectedProject">
                  <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
                </select>

                <div class="project-detail-row">
                  <div class="detail-box">
                    <div class="detail-label">Project Name:</div>
                    <div class="detail-content">{{ selectedProject }}</div>
                  </div>
                  <div class="detail-box">
                    <div class="detail-content">Raw Dataset is uploaded</div>
                  </div>
                  <div class="detail-box">
                    <div class="detail-label">Description:</div>
                    <div class="detail-content">--</div>
                  </div>
                  <div class="detail-box">
                    <div class="detail-content">Modified Dataset is uploaded</div>
                  </div>
                  <div class="detail-box full-width">
                    <div class="detail-label">Problem Type:</div>
                    <div class="detail-content">Classification</div>
                  </div>
                </div>
                <p style="margin-top: 20px; color: #888; font-size: 0.9rem;">No interaction history found.</p>
              </div>
            </div>
          </div>

          <div class="accordion-item" :class="{ 'is-open': expandedSection === 'donation' }">
            <button class="accordion-header" @click="toggleSection('donation')">
              <span>Donation History</span>
              <i class="fa-solid fa-chevron-down chevron"></i>
            </button>
            
            <div class="accordion-body" v-show="expandedSection === 'donation'">
              <div class="body-content">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Approved?</th>
                      <th>Plan</th>
                      <th>Donation Amount</th>
                      <th>Tx Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(donation, index) in donations" :key="index">
                      <td>
                        <i 
                          class="fa-solid fa-square-check" 
                          :style="{ color: donation.approved ? '#10b981' : '#555' }"
                        ></i>
                      </td>
                      <td>{{ donation.plan }}</td>
                      <td>{{ donation.amount }}</td>
                      <td>{{ donation.txId }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="accordion-item" :class="{ 'is-open': expandedSection === 'loginHistory' }">
            <button class="accordion-header" @click="toggleSection('loginHistory')">
              <span>Login History</span>
              <i class="fa-solid fa-chevron-down chevron"></i>
            </button>
            
            <div class="accordion-body" v-show="expandedSection === 'loginHistory'">
              <div class="body-content">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Project_name</th>
                      <th>Login Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(login, index) in loginHistory" :key="index">
                      <td>{{ login.project }}</td>
                      <td>{{ login.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="accordion-item" :class="{ 'is-open': expandedSection === 'editInfo' }">
            <button class="accordion-header" @click="toggleSection('editInfo')">
              <span>Edit Basic Info</span>
              <i class="fa-solid fa-chevron-down chevron"></i>
            </button>
            
            <div class="accordion-body" v-show="expandedSection === 'editInfo'">
              <div class="body-content">
                <form @submit.prevent="updateProfile">
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="input-label">First Name</label>
                      <input type="text" class="form-input" v-model="editForm.firstName">
                    </div>
                    <div class="form-group">
                      <label class="input-label">Institution</label>
                      <input type="text" class="form-input" v-model="editForm.institution" readonly style="opacity: 0.7;">
                    </div>
                    
                    <div class="form-group">
                      <label class="input-label">Last Name</label>
                      <input type="text" class="form-input" v-model="editForm.lastName">
                    </div>
                    
                    <div class="form-group row-span-2" style="grid-row: span 2;">
                      <label class="input-label">Address</label>
                      <textarea 
                        class="form-input" 
                        style="height: 122px; resize: none;"
                        v-model="editForm.address"
                      ></textarea>
                    </div>

                    <div class="form-group">
                      <label class="input-label">Date of Birth</label>
                      <input type="text" class="form-input" v-model="editForm.dob">
                    </div>

                    <div class="form-group">
                      <label class="input-label">Role</label>
                      <input type="text" class="form-input" v-model="editForm.role" readonly style="opacity: 0.7;">
                    </div>
                    
                    <div class="form-group">
                      <label class="input-label">Country</label>
                      <input type="text" class="form-input" v-model="editForm.country">
                    </div>
                  </div>
                  <button type="submit" class="btn-confirm">Confirm</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div v-if="showAboutModal" class="modal-overlay" @click.self="showAboutModal = false">
        <div class="modal-box large-box">
          <div class="modal-header">
            <h2>About Us</h2>
            <button class="close-btn" @click="showAboutModal = false">&times;</button>
          </div>
          <div class="modal-body about-content">
            <p class="mb-4">
              AKI is a comprehensive web application that aims to make <strong>Machine Learning</strong> and <strong>Data Analysis</strong> more accessible to users from all backgrounds. This platform enables users to preprocess data, visualize datasets, and train machine learning models with just a few clicks.
            </p>
            
            <h3 class="section-title">Key Features:</h3>
            <ul class="feature-list">
              <li><strong>Data Preprocessing:</strong> Easily preprocess datasets with one-click actions, simplifying tasks like cleaning and transforming data.</li>
              <li><strong>Visualization:</strong> Generate insightful visualizations to better understand your data and uncover hidden patterns.</li>
              <li><strong>Automated Machine Learning:</strong> Select machine learning models and adjust parameters for automated workflows that make training models seamless.</li>
            </ul>

            <h3 class="section-title">Mission</h3>
            <p class="mb-4">
              To provide a powerful, intuitive tool that helps users for data analysis and machine learning without writing a single code. This platform empowers you to effortlessly manage the entire machine learning lifecycle.
            </p>

            <h3 class="section-title">Get Started</h3>
            <p class="mb-4">Try AKI to see how it simplifies machine learning and data analysis tasks.</p>
            
            <p class="footer-note">Thank you for using AKI!</p>
          </div>
        </div>
      </div>

      <div v-if="showReportModal" class="modal-overlay" @click.self="showReportModal = false">
        <div class="modal-box">
          <div class="modal-header">
            <h2>Report a problem/feedback</h2>
            <button class="close-btn" @click="showReportModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <p style="margin-bottom: 10px; color: #ddd;">Enter your message here:</p>
            <textarea 
              v-model="reportMessage" 
              class="modal-textarea"
            ></textarea>
            <button class="btn-modal-send" @click="submitReport">Send</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      // Modal States
      showAboutModal: false,
      showReportModal: false,
      reportMessage: '',

      // Existing Data
      expandedSection: 'projectInfo',
      transactionId: '',
      selectedProject: 'IEB dataset',
      projects: ['IEB dataset', 'Vision V1', 'Signal Process'],
      user: {
        firstName: 'Shuvo Singh',
        lastName: 'Partho',
        role: 'Student',
        institution: 'Daffodil International University',
        address: 'Daffodil Smart City, Birulia 1216',
        dob: '2025/11/19',
        country: 'Bangladesh'
      },
      stats: {
        projectLimit: 5,
        remainingProject: 1
      },
      donations: [
        { approved: true, plan: 'Free', amount: '0', txId: 'N/A' }
      ],
      loginHistory: [
        { project: 'IEB dataset', time: '05:55 PM, 29 December 2025' },
        { project: 'IEB dataset', time: '09:01 PM, 29 December 2025' },
        { project: 'IEB dataset', time: '07:07 PM, 29 December 2025' },
        { project: 'IEB dataset', time: '03:42 PM, 29 December 2025' },
        { project: 'test new', time: '09:39 AM, 29 December 2025' },
        { project: 'IEB dataset', time: '09:39 AM, 29 December 2025' },
        { project: 'IEB dataset', time: '08:18 PM, 28 December 2025' }
      ],
      editForm: {
        firstName: 'Shuvo Singh',
        lastName: 'Partho',
        institution: 'Daffodil International University',
        address: 'Daffodil Smart City, Birulia 1216',
        dob: '2025/11/19',
        role: 'Student',
        country: 'Bangladesh'
      }
    }
  },
  methods: {
    toggleSection(sectionName) {
      if (this.expandedSection === sectionName) {
        this.expandedSection = null;
      } else {
        this.expandedSection = sectionName;
      }
    },
    goToHome() { this.$router.push('/') },
    refreshPage() { window.location.reload() },
    logout() { this.$router.push('/signin') },
    
    // Updated Methods for Modals
    showAbout() {
      this.showAboutModal = true;
    },
    reportProblem() {
      this.showReportModal = true;
    },
    submitReport() {
      if (!this.reportMessage.trim()) {
        alert('Please enter a message');
        return;
      }
      alert('Feedback sent successfully!');
      this.reportMessage = '';
      this.showReportModal = false;
    },

    submitTransaction() {
      if (!this.transactionId) { alert('Please enter a transaction ID'); return; }
      alert('Transaction Submitted for Review'); this.transactionId = '';
    },
    updateProfile() { alert('Profile Updated!') }
  }
}
</script>

<style scoped>
/* --- 1. GLOBAL LAYOUT (No Body Scroll) --- */
.user-profile-page {
  --bg-body: #050505;
  --bg-sidebar: #0a0a0a;
  --bg-card: rgba(20, 20, 23, 0.6);
  --bg-input: #1f1f1f;
  --text-main: #FFFFFF;
  --text-muted: #A1A1AA;
  --brand-red: #FF3B30;
  --border-glass: rgba(255, 255, 255, 0.1);
  --font-main: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
  
  font-family: var(--font-main);
  background-color: var(--bg-body);
  color: var(--text-main);
  height: 100vh;        
  overflow: hidden;     
  display: flex;
  position: relative;
}

.ambient-mesh {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1;
  background: 
    radial-gradient(circle at 10% 20%, rgba(255, 59, 48, 0.05), transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(50, 10, 10, 0.3), transparent 40%);
  pointer-events: none;
}

/* --- 2. SIDEBAR --- */
.sidebar {
  width: 260px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-glass);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  flex-shrink: 0;
  height: 100vh;
  z-index: 100;
}

.brand {
  font-weight: 700; color: var(--brand-red);
  background: #000; border: 1px solid var(--brand-red);
  padding: 12px; text-align: center; border-radius: 8px; margin-bottom: 40px;
}

.nav-menu { display: flex; flex-direction: column; gap: 15px; }
.nav-btn {
  background: transparent; border: 1px solid var(--border-glass); color: var(--text-muted);
  padding: 12px 15px; border-radius: 8px; text-align: left; cursor: pointer;
  text-decoration: none; font-size: 0.9rem; font-weight: 500; display: flex; align-items: center; gap: 10px;
}
.nav-btn:hover { border-color: var(--brand-red); color: white; background: rgba(255, 59, 48, 0.05); }

/* --- 3. MAIN CONTENT (Flex Column) --- */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column; 
  padding: 30px;
  height: 100vh;
  overflow: hidden; 
}

/* --- 3a. TOP GRID (Fixed Size) --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  gap: 20px;
  margin-bottom: 20px;
  flex-shrink: 0; 
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}
.user-name { font-size: 1.4rem; font-weight: 600; color: white; margin-bottom: 5px; }
.user-role { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 15px; }
.user-inst { font-size: 0.85rem; color: #ddd; }
.stat-group { margin-bottom: 10px; }
.stat-label { font-size: 0.75rem; color: var(--text-muted); display: block; }
.stat-value { font-size: 1.8rem; font-family: var(--font-display); line-height: 1; }
.info-text { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

/* --- 3b. BOTTOM SPLIT (Takes Remaining Space) --- */
.content-split {
  flex-grow: 1;         
  min-height: 0;        
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  padding-bottom: 10px;
}

/* Left: Donation Card */
.donation-card-container {
  height: 100%;
  overflow-y: auto; 
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}

.donation-card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 20px;
}
.btn-donate-header { background: #1e8e78; color: white; padding: 10px; border-radius: 6px; text-align: center; font-weight: 600; margin-bottom: 15px; }
.donation-info { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px; }
.radio-group { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.radio-dot { width: 10px; height: 10px; background: var(--brand-red); border-radius: 50%; }
.input-group { margin-top: 15px; }
.input-label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 5px; }
.form-input { width: 100%; background: var(--bg-input); border: 1px solid #333; color: white; padding: 10px; border-radius: 6px; outline: none; }
.form-input:focus { border-color: var(--brand-red); }
.btn-apply { margin-top: 15px; background: transparent; border: 1px solid var(--border-glass); color: white; padding: 8px 20px; border-radius: 6px; cursor: pointer; width: 100%; }
.btn-apply:hover { background: rgba(255,255,255,0.1); }

/* Right: Accordion Container (Internal Scrolling) */
.accordion-scroll-container {
  height: 100%;       
  overflow-y: auto;   
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.accordion-scroll-container::-webkit-scrollbar { width: 6px; }
.accordion-scroll-container::-webkit-scrollbar-track { background: transparent; }
.accordion-scroll-container::-webkit-scrollbar-thumb { background-color: #333; border-radius: 10px; }

/* Accordion Item Styles */
.accordion-item {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0; 
}
.accordion-item.is-open { border-color: rgba(255, 59, 48, 0.3); }

.accordion-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px; background: transparent; border: none; color: #eee;
  font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: background 0.2s;
}
.accordion-header:hover { background: rgba(255,255,255,0.03); }
.accordion-item.is-open .accordion-header { color: var(--brand-red); background: rgba(255, 59, 48, 0.05); }

.chevron { font-size: 0.8rem; transition: transform 0.3s ease; }
.accordion-item.is-open .chevron { transform: rotate(180deg); }

.accordion-body { border-top: 1px solid var(--border-glass); }
.body-content { padding: 20px; }

/* Table & Form Inside Dropdowns */
.custom-table { width: 100%; border-collapse: collapse; }
.custom-table th, .custom-table td { padding: 12px; text-align: left; border-bottom: 1px solid #333; color: #eee; font-size: 0.9rem; }
.custom-table th { color: var(--text-muted); font-weight: 500; }
.custom-table tr:last-child td { border-bottom: none; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.full-width { grid-column: span 2; }
.project-detail-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
.detail-box { background: rgba(30, 60, 90, 0.3); border: 1px solid rgba(60, 100, 150, 0.3); padding: 15px; border-radius: 8px; }
.detail-label { color: #5dade2; font-size: 0.8rem; font-weight: 600; margin-bottom: 5px; }
.detail-content { color: white; font-size: 0.9rem; }
.custom-select { width: 100%; padding: 10px; background: var(--bg-input); border: 1px solid #333; color: white; border-radius: 6px; cursor: pointer; }
.btn-confirm { background: transparent; border: 1px solid var(--border-glass); color: white; padding: 10px 25px; border-radius: 6px; cursor: pointer; margin-top: 20px; transition: all 0.3s; }
.btn-confirm:hover { border-color: var(--brand-red); background: rgba(255,59,48,0.1); }

/* --- MODAL STYLES (NEW) --- */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(5, 5, 5, 0.85); /* Dark backdrop */
  backdrop-filter: blur(5px);
  z-index: 1000; /* Above sidebar */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal-box {
  background: #0d0d10;
  border: 1px solid #333;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  animation: modalPop 0.3s ease-out;
}

.large-box { max-width: 700px; }

.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px; border-bottom: 1px solid #222;
}
.modal-header h2 { font-size: 1.2rem; font-weight: 600; color: white; }
.close-btn { background: none; border: none; color: #888; font-size: 1.5rem; cursor: pointer; }
.close-btn:hover { color: white; }

.modal-body { padding: 25px; font-size: 0.95rem; color: #ccc; line-height: 1.6; }
.mb-4 { margin-bottom: 1.5rem; }

.section-title { font-size: 1rem; color: white; margin-bottom: 10px; font-weight: 600; }
.feature-list { list-style: disc; padding-left: 20px; margin-bottom: 1.5rem; }
.feature-list li { margin-bottom: 8px; }
.footer-note { font-weight: 600; color: white; margin-top: 20px; }

/* Report Textarea */
.modal-textarea {
  width: 100%;
  height: 120px;
  background: #1a1a1d;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 12px;
  color: white;
  resize: none;
  font-family: inherit;
  margin-bottom: 15px;
}
.modal-textarea:focus { border-color: var(--brand-red); outline: none; }

.btn-modal-send {
  background: transparent;
  border: 1px solid #444;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-modal-send:hover { border-color: var(--brand-red); background: rgba(255,255,255,0.05); }

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Mobile Response */
@media (max-width: 1100px) {
  .user-profile-page { height: auto; overflow: auto; }
  .main-content { height: auto; overflow: visible; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .content-split { grid-template-columns: 1fr; display: flex; flex-direction: column; }
  .sidebar { display: none; }
  .accordion-scroll-container { overflow: visible; height: auto; }
}
</style>