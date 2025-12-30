<template>
  <div id="subscription-view">
    <!-- Backgrounds -->
    <div class="ambient-mesh"></div>

    <!-- Header -->
    <header>
      <button class="menu-trigger" @click="togglePaymentModal">
        <i class="fa-solid fa-bars"></i>
      </button>

      <div class="header-line"></div>
      <h1 class="header-title">The Premium Edition</h1>
      <p class="header-sub">Unlock editorial depth. Go darker, go deeper.</p>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="pricing-grid">

        <!-- Monthly Plan -->
        <div 
          class="plan-card" 
          :class="{ 'selected': selectedPlan === 'monthly' }"
          @click="selectPlan('monthly')"
        >
          <div class="plan-name">The Monthly</div>
          <div class="plan-price">
            <span class="currency">৳</span>200
          </div>
          <span class="duration">billed monthly</span>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> Ad-free Reading</li>
            <li><i class="fa-solid fa-check"></i> Unlimited Access</li>
            <li class="disabled"><i class="fa-solid fa-xmark"></i> Offline PDF</li>
          </ul>
          <a href="#" class="btn-action" @click.prevent="selectPlan('monthly')">Select Plan</a>
        </div>

        <!-- Annual Plan (Best Value) -->
        <div 
          class="plan-card best-value" 
          :class="{ 'selected': selectedPlan === 'annual' }"
          @click="selectPlan('annual')"
        >
          <div class="badge">Best Value</div>
          <div class="plan-name" style="color: #ffcccc;">The Annual</div>
          <div class="plan-price">
            <span class="currency">৳</span>1800
          </div>
          <span class="duration" style="color: #ff8a80;">billed yearly (Save ৳600)</span>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> <strong>Everything in Monthly</strong></li>
            <li><i class="fa-solid fa-check"></i> Offline & PDF Archives</li>
            <li><i class="fa-solid fa-check"></i> Priority Support 24/7</li>
            <li><i class="fa-solid fa-check"></i> Member Newsletter</li>
          </ul>
          <a href="#" class="btn-action" @click.prevent="selectPlan('annual')">Upgrade Now</a>
        </div>

        <!-- Semester Plan -->
        <div 
          class="plan-card" 
          :class="{ 'selected': selectedPlan === 'semester' }"
          @click="selectPlan('semester')"
        >
          <div class="plan-name">The Semester</div>
          <div class="plan-price">
            <span class="currency">৳</span>1000
          </div>
          <span class="duration">billed every 6 months</span>
          <div class="divider"></div>
          <ul class="features-list">
            <li><i class="fa-solid fa-check"></i> Ad-free Reading</li>
            <li><i class="fa-solid fa-check"></i> Unlimited Access</li>
            <li><i class="fa-solid fa-check"></i> Offline PDF</li>
          </ul>
          <a href="#" class="btn-action" @click.prevent="selectPlan('semester')">Select Plan</a>
        </div>

      </div>
    </main>

    <!-- Payment Modal -->
    <div 
      id="paymentModal" 
      class="payment-overlay" 
      :class="{ 'active': showPaymentModal }"
      @click="closePaymentModal"
    >
      <div class="payment-modal">
        <span class="close-modal" @click="togglePaymentModal">
          <i class="fa-solid fa-xmark"></i>
        </span>
        
        <i class="fa-solid fa-shield-halved secure-icon"></i>
        
        <h2 class="modal-title">Secure Transaction</h2>
        <p class="modal-text">
          Your financial data is protected by end-to-end 256-bit encryption. 
          We do not store your full card details.
          <br><br>
          <span style="color: #fff; font-weight: 500;">Cancel your subscription anytime.</span>
        </p>

        <div class="payment-icons">
          <i class="fa-brands fa-cc-visa" title="Visa"></i>
          <i class="fa-brands fa-cc-mastercard" title="Mastercard"></i>
          <i class="fa-brands fa-cc-amex" title="Amex"></i>
          <i class="fa-brands fa-apple-pay" title="Apple Pay"></i>
        </div>
        
        <p style="font-size: 0.75rem; color: #555;">AKI Payment Gateway &copy; 2025</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionView',
  data() {
    return {
      selectedPlan: null,
      showPaymentModal: false
    }
  },
  methods: {
    selectPlan(plan) {
      // Don't select best value plan as it should always be available
      if (plan !== 'annual') {
        this.selectedPlan = plan
      }
    },
    togglePaymentModal() {
      this.showPaymentModal = !this.showPaymentModal
    },
    closePaymentModal(event) {
      if (event.target.id === 'paymentModal') {
        this.showPaymentModal = false
      }
    }
  }
}
</script>

<style scoped>
/* --- 1. CORE LAYOUT (NO SCROLL) --- */
:global(:root) {
  --bg-body: #050505;
  --bg-card: rgba(20, 20, 23, 0.6);
  --text-main: #FFFFFF;         
  --text-muted: #A1A1AA;        
  --brand-red: #FF3B30;
  --border-glass: rgba(255, 255, 255, 0.1);
}

#subscription-view { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-body);
  color: var(--text-main);
  height: 100vh;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  position: relative;
}

.ambient-mesh {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1;
  background: 
    radial-gradient(circle at 15% 15%, rgba(255, 59, 48, 0.08), transparent 40%),
    radial-gradient(circle at 85% 85%, rgba(60, 10, 10, 0.5), transparent 40%);
}

/* --- 2. HEADER & MENU BUTTON --- */
header {
  text-align: center;
  padding-top: 5vh; 
  flex-shrink: 0;
  position: relative;
  padding-bottom: 2vh;
}

/* Menu Trigger */
.menu-trigger {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 50;
}

.menu-trigger i {
  font-size: 1.2rem;
  color: var(--text-muted);
  transition: color 0.3s;
}

.menu-trigger:hover {
  background: var(--brand-red);
  border-color: var(--brand-red);
  box-shadow: 0 0 15px rgba(255, 59, 48, 0.4);
}

.menu-trigger:hover i { color: white; }

.header-line {
  width: 40px;
  height: 2px;
  background: var(--brand-red);
  margin: 0 auto 10px;
  box-shadow: 0 0 10px var(--brand-red);
}

.header-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
}

.header-sub {
  color: var(--text-muted);
  font-size: 0.9rem;
  max-width: 500px;
  margin: 0 auto;
}

/* --- 3. PRICING GRID (Adjusted for Size) --- */
.main-content {
  flex-grow: 1;
  display: flex;
  align-items: center; 
  justify-content: center;
  width: 100%;
  /* Minimal bottom padding to center visually */
  padding: 0 40px 20px 40px; 
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px; /* Increased Gap */
  width: 100%;
  max-width: 1250px; /* Wider container */
  margin: 0 auto;
}

/* --- 4. CARD STYLES (Enlarged) --- */
.plan-card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 40px 30px; /* Much larger padding */
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* Ensure even height */
  height: 100%; 
  min-height: 500px; /* Force taller cards */
}

.plan-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.plan-card.selected { border-color: var(--brand-red); }

.plan-name {
  font-size: 0.9rem; /* Larger */
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 15px;
  font-weight: 600;
}

.plan-price {
  font-family: 'Playfair Display', serif;
  font-size: 3.8rem; /* BIGGER Price */
  line-height: 1;
  margin-bottom: 8px;
  color: white;
  display: flex;
  align-items: flex-start;
}

.currency {
  font-size: 1.5rem;
  margin-top: 8px;
  margin-right: 6px;
  font-family: 'Inter', sans-serif;
  color: var(--brand-red);
}

.duration { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 25px; }
.divider { height: 1px; background: var(--border-glass); margin-bottom: 25px; width: 100%; }

/* Features */
.features-list { list-style: none; margin-bottom: auto; }
.features-list li { 
  display: flex; align-items: center; gap: 12px; margin-bottom: 14px; 
  color: #d4d4d8; font-size: 1rem; /* Larger Text */
}
.features-list li i { color: var(--brand-red); font-size: 1rem; }
.features-list li.disabled { color: #555; }

/* Buttons */
.btn-action {
  width: 100%; padding: 16px; border-radius: 12px; font-size: 1rem; font-weight: 600; 
  text-decoration: none; text-align: center; transition: all 0.3s ease; 
  background: transparent; border: 1px solid var(--border-glass); color: white; margin-top: 25px;
  cursor: pointer;
}

/* --- Best Value Card --- */
.plan-card.best-value {
  border: 1px solid var(--brand-red);
  background: linear-gradient(160deg, rgba(20,20,23,0.95) 0%, rgba(40,10,10,0.8) 100%);
  transform: scale(1.08); /* Pop out even more */
  z-index: 10;
  box-shadow: 0 0 40px rgba(255, 59, 48, 0.15);
}
.plan-card.best-value:hover { transform: scale(1.12); }
.badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%); 
  background: var(--brand-red); color: white; padding: 6px 16px; border-radius: 20px; 
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.plan-card.best-value .btn-action { background: var(--brand-red); border-color: var(--brand-red); }
.plan-card.best-value .btn-action:hover { background: #ff5252; box-shadow: 0 0 20px rgba(255, 82, 82, 0.4); }

/* --- 5. PAYMENT METHOD MODAL --- */
.payment-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.payment-overlay.active { opacity: 1; pointer-events: all; }

.payment-modal {
  background: #111;
  border: 1px solid var(--border-glass);
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  transform: translateY(20px);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.payment-overlay.active .payment-modal { transform: translateY(0); }

.close-modal {
  position: absolute; top: 15px; right: 15px; color: var(--text-muted); cursor: pointer; font-size: 1.2rem; padding: 5px;
}
.close-modal:hover { color: white; }

.secure-icon { font-size: 3rem; color: var(--brand-red); margin-bottom: 20px; text-shadow: 0 0 20px rgba(255, 59, 48, 0.4); }
.modal-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 10px; color: white; }
.modal-text { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 30px; line-height: 1.5; }
.payment-icons { display: flex; justify-content: center; gap: 20px; font-size: 2rem; color: #ccc; margin-bottom: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }

/* Responsive */
@media (max-width: 1024px) {
  #subscription-view { height: auto; overflow-y: auto; display: block; padding: 40px 0; }
  .pricing-grid { grid-template-columns: 1fr; gap: 60px; padding: 0 30px; }
  .plan-card.best-value { transform: scale(1); margin: 30px 0; order: -1; }
  .menu-trigger { top: 20px; right: 20px; }
}
</style>
