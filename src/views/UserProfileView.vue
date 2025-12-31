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
            QRARG operates as a non-profit research organization. Your kind support will help us to grow and provide quality services through educational and research support on AI and ML.
          </p>
        </div>
      </div>

      <div class="content-split">
        
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
              placeholder="e.g. 8H3K..."
              v-model="transactionId"
            >
          </div>

          <button class="btn-apply" @click="submitTransaction">Apply</button>
        </div>

        <div class="tabs-container">
          <div class="tabs-header">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'projectInfo' }"
              @click="activeTab = 'projectInfo'"
            >Project Info</button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'donation' }"
              @click="activeTab = 'donation'"
            >Donation</button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'loginHistory' }"
              @click="activeTab = 'loginHistory'"
            >Login History</button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'editInfo' }"
              @click="activeTab = 'editInfo'"
            >Edit Basic Info</button>
          </div>

          <div id="projectInfo" class="tab-content" :class="{ active: activeTab === 'projectInfo' }">
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

          <div id="donation" class="tab-content" :class="{ active: activeTab === 'donation' }">
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

          <div id="loginHistory" class="tab-content" :class="{ active: activeTab === 'loginHistory' }">
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

          <div id="editInfo" class="tab-content" :class="{ active: activeTab === 'editInfo' }">
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

    </main>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      activeTab: 'projectInfo',
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
    goToHome() {
      this.$router.push('/')
    },
    refreshPage() {
      window.location.reload()
    },
    logout() {
      this.$router.push('/signin')
    },
    showAbout() {
      alert('About Us: QRARG - Non-profit research organization')
    },
    reportProblem() {
      alert('Report a problem feature coming soon!')
    },
    submitTransaction() {
      if (!this.transactionId) {
        alert('Please enter a transaction ID')
        return
      }
      alert('Transaction Submitted for Review')
      this.transactionId = ''
    },
    updateProfile() {
      // Update user data with form data
      this.user.firstName = this.editForm.firstName
      this.user.lastName = this.editForm.lastName
      this.user.address = this.editForm.address
      this.user.dob = this.editForm.dob
      this.user.country = this.editForm.country
      
      alert('Profile Updated!')
    }
  }
}
</script>

<style scoped>
/* --- 1. DESIGN SYSTEM --- */
.user-profile-page {
  --bg-body: #050505;
  --bg-sidebar: #0a0a0a;
  --bg-card: rgba(20, 20, 23, 0.6);
  --bg-input: #1f1f1f;
  --text-main: #FFFFFF;
  --text-muted: #A1A1AA;
  --brand-red: #FF3B30;
  --brand-red-dark: #b92b23;
  --border-glass: rgba(255, 255, 255, 0.1);
  --success-green: #10b981;
  --font-main: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
  
  font-family: var(--font-main);
  background-color: var(--bg-body);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  overflow-x: hidden;
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
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.brand {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1rem;
  color: var(--brand-red);
  background: #000000;
  border: 1px solid var(--brand-red);
  box-shadow: 0 4px 15px rgba(255, 59, 48, 0.15);
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 40px;
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-btn {
  background: transparent;
  border: 1px solid var(--border-glass);
  color: var(--text-muted);
  padding: 12px 15px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.nav-btn:hover {
  border-color: var(--brand-red);
  color: white;
  background: rgba(255, 59, 48, 0.05);
  transform: translateY(-2px);
}

/* --- 3. MAIN CONTENT AREA --- */
.main-content {
  flex-grow: 1;
  margin-left: 260px;
  padding: 40px;
  max-width: 1600px;
}

/* Top Grid: Profile, Stats, Info */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  gap: 20px;
  margin-bottom: 25px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

/* Profile Card */
.user-name { font-size: 1.5rem; font-weight: 600; margin-bottom: 5px; color: white; }
.user-role { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; }
.user-inst { font-size: 0.9rem; color: #ddd; }

/* Stats Card */
.stat-group { margin-bottom: 15px; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 5px; }
.stat-value { font-size: 2rem; font-weight: 400; font-family: 'Playfair Display', serif; line-height: 1; }

/* Info Card */
.info-text { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

/* --- 4. BOTTOM SECTION: Donation & Tabs --- */
.content-split {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 25px;
}

/* Donation Side */
.donation-card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 25px;
  height: fit-content;
}

.btn-donate-header {
  width: 100%;
  background: #1e8e78;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: default;
  text-align: center;
}

.donation-info { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px; }
.radio-group { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.radio-dot { width: 12px; height: 12px; background: var(--brand-red); border-radius: 50%; display: inline-block; }

.payment-details { margin-top: 15px; font-size: 0.9rem; color: #ccc; }
.payment-details span { display: block; margin-bottom: 5px; }

.input-group { margin-top: 15px; }
.input-label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; }
.form-input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid #333;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-family: var(--font-main);
  outline: none;
  transition: border 0.3s;
}
.form-input:focus { border-color: var(--brand-red); }

.btn-apply {
  margin-top: 15px;
  background: transparent;
  border: 1px solid var(--border-glass);
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.btn-apply:hover { background: rgba(255,255,255,0.1); }

/* Tabs Section */
.tabs-container {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid var(--border-glass);
  padding: 0 20px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 20px 15px;
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  font-family: var(--font-main);
}

.tab-btn:hover { color: white; }

.tab-btn.active {
  color: var(--brand-red);
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; width: 100%;
  height: 2px;
  background: var(--brand-red);
}

.tab-content {
  padding: 30px;
  display: none;
  animation: fadeIn 0.4s ease;
}
.tab-content.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Tables (Login History / Donation) */
.custom-table {
  width: 100%;
  border-collapse: collapse;
}
.custom-table th {
  text-align: left;
  padding: 15px;
  color: var(--text-muted);
  border-bottom: 1px solid #333;
  font-weight: 500;
  font-size: 0.9rem;
}
.custom-table td {
  padding: 15px;
  border-bottom: 1px solid #222;
  color: #eee;
  font-size: 0.95rem;
}
.custom-table tr:last-child td { border-bottom: none; }

/* Edit Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.form-group { margin-bottom: 5px; }
.full-width { grid-column: span 2; }

.btn-confirm {
  background: transparent;
  border: 1px solid var(--border-glass);
  color: white;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
}
.btn-confirm:hover { border-color: var(--brand-red); background: rgba(255,59,48,0.1); }

/* Project Info Style */
.project-detail-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.detail-box {
  background: rgba(30, 60, 90, 0.3);
  border: 1px solid rgba(60, 100, 150, 0.3);
  padding: 20px;
  border-radius: 8px;
}
.detail-label { color: #5dade2; font-size: 0.9rem; font-weight: 600; margin-bottom: 5px; }
.detail-content { color: white; font-size: 0.95rem; }

/* Select Dropdown */
.custom-select {
  width: 100%;
  padding: 12px;
  background: var(--bg-input);
  border: 1px solid #333;
  color: white;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1100px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .content-split { grid-template-columns: 1fr; }
  .sidebar { width: 80px; padding: 20px 10px; }
  .brand span, .nav-btn span { display: none; }
  .main-content { margin-left: 80px; padding: 20px; }
  .nav-btn { text-align: center; justify-content: center; font-size: 1.2rem; }
  .form-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
}
</style>

