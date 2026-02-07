<template>
  <div id="subscription-view">
    <div class="ambient-background">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <nav class="navbar">
      <div class="nav-content">
        <div class="brand-logo">
          <i class="fa-solid fa-layer-group"></i>
          <span>AKI<span class="highlight"> Pro</span></span>
        </div>
        
        <div class="nav-actions">
           <div class="usage-pill">
            <span class="dot" :class="{ 'warning': freeProjectsRemaining <= 1 }"></span>
            <span>{{ freeProjectsRemaining }} free projects left</span>
          </div>
          <button class="menu-btn" @click="togglePaymentModal">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>

    <main class="main-container">
      
      <section class="hero-section">
        <h1 class="hero-title">
          Upgrade your <span class="text-gradient">Plan</span>
        </h1>
        <!-- <p class="hero-subtitle">
          Scale your workflow with premium features. Cancel anytime.
        </p> -->

        <div class="billing-toggle-wrapper">
          <div class="segmented-control">
            <div 
              class="segment-bg" 
              :style="segmentStyle"
            ></div>
            <button 
              v-for="(period, index) in billingPeriods" 
              :key="period.id"
              class="segment-btn"
              :class="{ active: selectedBillingPeriod === period.id }"
              @click="selectedBillingPeriod = period.id"
              ref="periodButtons"
            >
              {{ period.label }}
              <span v-if="period.savings" class="save-tag">-{{ period.savings }}%</span>
            </button>
          </div>
        </div>
      </section>

      <div class="pricing-grid">
        
        <div 
          class="price-card starter"
          :class="{ 'focused': selectedPlan === 'basic' }"
          @click="selectPlan('basic')"
        >
          <div class="card-header">
            <h3 class="plan-name">Starter</h3>
            <div class="price-block">
              <span class="currency">৳</span>
              <span class="amount">{{ getPlanPrice('basic').amount }}</span>
              <span class="period">/{{ getPlanPrice('basic').period }}</span>
            </div>
            <p class="desc">{{ getPlanPrice('basic').description }}</p>
          </div>

          <div class="features-wrapper">
            <ul class="features">
              <li><i class="fa-solid fa-check-circle"></i> <span>1 Project/month</span></li>
              <li><i class="fa-solid fa-check-circle"></i> <span>10 GB Storage</span></li>
              <li><i class="fa-solid fa-check-circle"></i> <span>Standard Support</span></li>
              <li class="locked"><i class="fa-solid fa-lock"></i> <span>Analytics</span></li>
            </ul>
          </div>

          <button class="cta-btn outline" @click.stop="selectPlan('basic'); showPaymentModal = true">
            Choose Starter
          </button>
        </div>

        <div 
          class="price-card pro"
          :class="{ 'focused': selectedPlan === 'professional' }"
          @click="selectPlan('professional')"
        >
          <div class="popular-badge">Most Popular</div>
          <div class="glow-effect"></div>
          
          <div class="card-header">
            <h3 class="plan-name">Professional</h3>
            <div class="price-block">
              <span class="currency">৳</span>
              <span class="amount">{{ getPlanPrice('professional').amount }}</span>
              <span class="period">/{{ getPlanPrice('professional').period }}</span>
            </div>
            <p class="desc">{{ getPlanPrice('professional').description }}</p>
          </div>

          <div class="features-wrapper">
            <ul class="features">
              <li class="highlight"><i class="fa-solid fa-bolt"></i> <span><strong>3 Projects/month</strong></span></li>
              <li><i class="fa-solid fa-check-circle"></i> <span>50 GB NVMe Storage</span></li>
              <li><i class="fa-solid fa-check-circle"></i> <span>Priority Support</span></li>
              <li><i class="fa-solid fa-check-circle"></i> <span>Advanced Analytics</span></li>
            </ul>
          </div>

          <button class="cta-btn primary" @click.stop="selectPlan('professional'); showPaymentModal = true">
            Upgrade to Pro
          </button>
        </div>

        <div 
          class="price-card enterprise"
          :class="{ 'focused': selectedPlan === 'enterprise' }"
          @click="selectPlan('enterprise')"
        >
          <div class="card-header">
            <h3 class="plan-name">Enterprise</h3>
            <div class="price-block">
              <span class="currency">৳</span>
              <span class="amount">{{ getPlanPrice('enterprise').amount }}</span>
              <span class="period">/{{ getPlanPrice('enterprise').period }}</span>
            </div>
            <p class="desc">{{ getPlanPrice('enterprise').description }}</p>
          </div>

          <div class="features-wrapper">
            <ul class="features">
              <li><i class="fa-solid fa-infinity"></i> <span>Unlimited Projects</span></li>
              <li><i class="fa-solid fa-database"></i> <span>500 GB Storage</span></li>
              <li><i class="fa-solid fa-headset"></i> <span>24/7 Dedicated Agent</span></li>
              <li><i class="fa-solid fa-wand-magic-sparkles"></i> <span>Custom Integrations</span></li>
            </ul>
          </div>

          <button class="cta-btn outline" @click.stop="selectPlan('enterprise'); showPaymentModal = true">
            Contact Sales
          </button>
        </div>

      </div>
    </main>

    <transition name="modal-fade">
      <div v-if="showPaymentModal" class="modal-backdrop" @click="closePaymentModal">
        <div class="checkout-modal" @click.stop>
          
          <div class="modal-top">
            <h2>Secure Checkout</h2>
            <button class="close-btn" @click="showPaymentModal = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="checkout-grid">
            <div class="payment-section">
              <div class="section-label">Select Payment Method</div>
              
              <div class="region-tabs">
                <button 
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="region-tab"
                  :class="{ active: selectedPaymentMethod === method.id }"
                  @click="selectedPaymentMethod = method.id"
                >
                  {{ method.label }}
                </button>
              </div>

              <div v-if="selectedPaymentMethod === 'bangladesh'" class="gateway-grid">
                <div 
                  class="gateway-option bkash"
                  :class="{ active: selectedGateway === 'bkash' }"
                  @click="selectedGateway = 'bkash'"
                >
                  <div class="gateway-logo">
                    <img src="https://raw.githubusercontent.com/Shipu/bkash-example/master/bkash_payment_logo.png" alt="bKash" @error="handleImgError">
                    <span class="fallback-text">bKash</span>
                  </div>
                  <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
                </div>

                <div 
                  class="gateway-option nagad"
                  :class="{ active: selectedGateway === 'nagad' }"
                  @click="selectedGateway = 'nagad'"
                >
                  <div class="gateway-logo">
                    <img src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" alt="Nagad" @error="handleImgError">
                    <span class="fallback-text">Nagad</span>
                  </div>
                  <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
                </div>

                <div 
                  class="gateway-option rocket"
                  :class="{ active: selectedGateway === 'rocket' }"
                  @click="selectedGateway = 'rocket'"
                >
                  <div class="gateway-logo">
                    <img src="https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png" alt="Rocket" @error="handleImgError">
                    <span class="fallback-text">Rocket</span>
                  </div>
                  <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
                </div>

                <div 
                  class="gateway-option bank"
                  :class="{ active: selectedGateway === 'bank' }"
                  @click="selectedGateway = 'bank'"
                >
                  <div class="gateway-icon-box">
                    <i class="fa-solid fa-building-columns"></i>
                  </div>
                  <span class="gateway-name">Bank Transfer</span>
                  <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </div>

              <div v-if="selectedPaymentMethod === 'international'" class="gateway-grid">
                 <div 
                    v-for="card in ['visa', 'mastercard', 'paypal', 'amex']" 
                    :key="card"
                    class="gateway-option card-opt"
                    :class="{ active: selectedGateway === card }"
                    @click="selectedGateway = card"
                  >
                    <i :class="getCardIcon(card)"></i>
                    <span class="card-name">{{ card }}</span>
                 </div>
              </div>

              <div class="instruction-box" v-if="selectedGateway">
                <i class="fa-solid fa-shield-halved"></i>
                <p>You selected <strong>{{ getGatewayName() }}</strong>. Secure redirection initiated upon confirmation.</p>
              </div>
            </div>

            <div class="summary-section">
              <div class="summary-card">
                <h3>Order Summary</h3>
                <div class="summary-row">
                  <span>{{ getSelectedPlanName() }} Plan</span>
                  <span class="val">৳{{ getPlanPrice(selectedPlan).amount }}</span>
                </div>
                <div class="summary-row">
                  <span>Billing Cycle</span>
                  <span class="val text-cap">{{ selectedBillingPeriod }}</span>
                </div>
                <div class="divider"></div>
                <div class="summary-row total">
                  <span>Total Due</span>
                  <span class="total-val">৳{{ getPlanPrice(selectedPlan).amount }}</span>
                </div>

                <button class="pay-now-btn" @click="processPayment" :disabled="!selectedGateway">
                  <span>Confirm & Pay</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
                
                <p class="secure-note">
                  <i class="fa-solid fa-lock"></i> 256-bit SSL Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'SubscriptionView',
  data() {
    return {
      selectedPlan: 'professional',
      selectedBillingPeriod: 'monthly',
      showPaymentModal: false,
      selectedPaymentMethod: 'bangladesh',
      selectedGateway: 'bkash', // Default selection
      freeProjectsRemaining: 3,
      
      billingPeriods: [
        { id: 'monthly', label: 'Monthly', savings: 0 },
        { id: 'semester', label: 'Semester', savings: 10 },
        { id: 'annual', label: 'Annual', savings: 25 }
      ],

      planPrices: {
        basic: {
          monthly: { amount: 300, period: 'mo', description: 'Billed monthly' },
          semester: { amount: 1200, period: '4mo', description: 'Billed every 4 months' },
          annual: { amount: 3600, period: 'yr', description: 'Billed yearly' }
        },
        professional: {
          monthly: { amount: 900, period: 'mo', description: 'Billed monthly' },
          semester: { amount: 3600, period: '4mo', description: 'Billed every 4 months' },
          annual: { amount: 10800, period: 'yr', description: 'Billed yearly' }
        },
        enterprise: {
          monthly: { amount: 2400, period: 'mo', description: 'Billed monthly' },
          semester: { amount: 9600, period: '4mo', description: 'Billed every 4 months' },
          annual: { amount: 28800, period: 'yr', description: 'Billed yearly' }
        }
      },

      paymentMethods: [
        { id: 'bangladesh', label: 'Bangladesh' },
        { id: 'international', label: 'International' }
      ],

      gatewayNames: {
        bkash: 'bKash',
        nagad: 'Nagad',
        rocket: 'Rocket',
        bank: 'Bank Transfer',
        visa: 'Visa',
        mastercard: 'Mastercard',
        amex: 'American Express',
        paypal: 'PayPal'
      }
    }
  },
  computed: {
    // Calculates the position of the background pill for the toggle
    segmentStyle() {
      const count = this.billingPeriods.length;
      const index = this.billingPeriods.findIndex(p => p.id === this.selectedBillingPeriod);
      return {
        width: `${100 / count}%`,
        transform: `translateX(${index * 100}%)`
      };
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan
    },
    togglePaymentModal() {
      this.showPaymentModal = !this.showPaymentModal
    },
    closePaymentModal(event) {
      // Only close if clicking the backdrop, not children
      if (event.target.classList.contains('modal-backdrop')) {
        this.showPaymentModal = false
      }
    },
    getPlanPrice(plan) {
      return this.planPrices[plan][this.selectedBillingPeriod]
    },
    getSelectedPlanName() {
      const names = { basic: 'Starter', professional: 'Professional', enterprise: 'Enterprise' }
      return names[this.selectedPlan]
    },
    getGatewayName() {
      return this.gatewayNames[this.selectedGateway] || 'Selected Gateway'
    },
    getCardIcon(card) {
      const icons = {
        visa: 'fa-brands fa-cc-visa',
        mastercard: 'fa-brands fa-cc-mastercard',
        paypal: 'fa-brands fa-paypal',
        amex: 'fa-brands fa-cc-amex'
      };
      return icons[card] || 'fa-solid fa-credit-card';
    },
    handleImgError(e) {
      // Fallback if image fails to load
      e.target.style.display = 'none';
      e.target.nextElementSibling.style.display = 'block';
    },
    processPayment() {
      const amount = this.getPlanPrice(this.selectedPlan).amount
      const gateway = this.getGatewayName()
      
      // Simulate processing
      const btn = document.querySelector('.pay-now-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
      
      setTimeout(() => {
        alert(`Redirecting to ${gateway} for payment of ৳${amount}`);
        btn.innerHTML = originalText;
        this.showPaymentModal = false;
      }, 1500);
    }
  }
}
</script>

<style scoped>
/* --- VARIABLES --- */
:root {
  --bg-dark: #09090b;
  --bg-card: rgba(24, 24, 27, 0.6);
  --bg-card-hover: rgba(39, 39, 42, 0.8);
  --primary: #FF3B30; /* Your brand red */
  --primary-glow: rgba(255, 59, 48, 0.4);
  --accent-blue: #3b82f6;
  --text-main: #ffffff;
  --text-muted: #a1a1aa;
  --border-light: rgba(255, 255, 255, 0.1);
  
  /* Brand Colors */
  --bkash: #e2136e;
  --nagad: #ec1d24;
  --rocket: #8c3494;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;700&display=swap');

#subscription-view {
  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  background-color: var(--bg-dark);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* --- ANIMATED BACKGROUND --- */
.ambient-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 10s infinite ease-in-out;
}

.orb-1 {
  width: 400px; height: 400px;
  background: var(--primary);
  top: -100px; left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px; height: 500px;
  background: purple;
  bottom: -100px; right: -100px;
  animation-delay: -5s;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 50px); }
}

/* --- NAVBAR --- */
.navbar {
  position: relative;
  z-index: 10;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo i { color: var(--primary); }
.brand-logo .highlight { color: var(--primary); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.usage-pill {
  background: rgba(255,255,255,0.05);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-light);
}

.dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }
.dot.warning { background: #eab308; }

.menu-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.menu-btn:hover { background: rgba(255,255,255,0.1); }

/* --- HERO SECTION --- */
.main-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-title {
  font-size: 3.5rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.1;
}

.text-gradient {
  background: linear-gradient(135deg, #fff 0%, #a5a5a5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 40px;
}

/* --- SEGMENTED TOGGLE --- */
.billing-toggle-wrapper {
  display: flex;
  justify-content: center;
}

.segmented-control {
  position: relative;
  display: flex;
  background: rgba(0,0,0,0.3);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
}

.segment-bg {
  position: absolute;
  top: 4px; bottom: 4px; left: 0;
  background: var(--primary);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
}

.segment-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s;
  flex: 1;
  white-space: nowrap;
}

.segment-btn.active { color: white; }

.save-tag {
  font-size: 0.7rem;
  background: #22c55e;
  color: #000;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 6px;
  font-weight: 700;
  vertical-align: middle;
}

/* --- PRICING GRID --- */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  align-items: start;
}

.price-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 24px;
  padding: 32px;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.price-card:hover {
  transform: translateY(-8px);
  background: var(--bg-card-hover);
  border-color: rgba(255,255,255,0.2);
}

.price-card.starter:hover { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
.price-card.enterprise:hover { box-shadow: 0 20px 40px -10px rgba(100,100,255,0.1); }

/* Pro Card Special Styles */
.price-card.pro {
  border-color: var(--primary);
  background: linear-gradient(160deg, rgba(20,20,23,0.9) 0%, rgba(40,10,10,0.4) 100%);
  transform: scale(1.05);
  z-index: 2;
  box-shadow: 0 0 0 1px var(--primary), 0 20px 50px -10px rgba(255, 59, 48, 0.2);
}

.price-card.pro:hover {
  transform: scale(1.08);
}

.popular-badge {
  position: absolute;
  top: -12px; left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.4);
}

/* Card Content */
.plan-name {
  font-size: 1.1rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 20px;
}

.price-card.pro .plan-name { color: #feaeb8; }

.price-block {
  display: flex;
  align-items: baseline;
  margin-bottom: 12px;
}

.currency { font-size: 1.5rem; vertical-align: top; margin-right: 4px; }
.amount { font-size: 3.5rem; font-family: 'Outfit', sans-serif; font-weight: 700; line-height: 1; }
.period { color: var(--text-muted); margin-left: 6px; }

.desc { font-size: 0.9rem; color: var(--text-muted); height: 40px; }

.features-wrapper {
  margin: 32px 0;
  flex-grow: 1;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: #e4e4e7;
}

.features li i { color: #22c55e; }
.features li.locked { color: #52525b; }
.features li.locked i { color: #52525b; }
.features li.highlight { color: white; }
.features li.highlight i { color: var(--primary); }

/* Buttons */
.cta-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-btn.outline {
  background: transparent;
  border: 1px solid var(--border-light);
  color: white;
}

.cta-btn.outline:hover {
  background: white;
  color: black;
}

.cta-btn.primary {
  background: var(--primary);
  border: none;
  color: white;
  box-shadow: 0 4px 20px rgba(255, 59, 48, 0.3);
}

.cta-btn.primary:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

/* --- CHECKOUT MODAL --- */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s; }
.modal-fade-enter, .modal-fade-leave-to { opacity: 0; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.checkout-modal {
  background: #18181b;
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  border: 1px solid var(--border-light);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-light);
}

.modal-top h2 { font-family: 'Outfit', sans-serif; font-size: 1.5rem; }
.close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }
.close-btn:hover { color: white; }

.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  min-height: 400px;
}

.payment-section {
  padding: 32px;
}

.region-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: rgba(255,255,255,0.03);
  padding: 4px;
  border-radius: 10px;
  width: fit-content;
}

.region-tab {
  background: none;
  border: none;
  padding: 8px 20px;
  color: var(--text-muted);
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
}

.region-tab.active { background: rgba(255,255,255,0.1); color: white; }

/* Gateways */
.gateway-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.gateway-option {
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background: rgba(255,255,255,0.02);
}

.gateway-option:hover { background: rgba(255,255,255,0.05); }

/* Gateway Branding */
.gateway-logo img { width: 60px; height: auto; object-fit: contain; display: block; }
.fallback-text { display: none; font-weight: 700; font-size: 0.9rem; }

/* bKash Specific */
.gateway-option.bkash.active { border-color: var(--bkash); background: rgba(226, 19, 110, 0.05); }
.gateway-option.bkash .check-mark { color: var(--bkash); }
.gateway-option.bkash .fallback-text { color: var(--bkash); }

/* Nagad Specific */
.gateway-option.nagad.active { border-color: var(--nagad); background: rgba(236, 29, 36, 0.05); }
.gateway-option.nagad .check-mark { color: var(--nagad); }
.gateway-option.nagad .fallback-text { color: var(--nagad); }

/* Rocket Specific */
.gateway-option.rocket.active { border-color: var(--rocket); background: rgba(140, 52, 148, 0.05); }
.gateway-option.rocket .check-mark { color: var(--rocket); }
.gateway-option.rocket .fallback-text { color: var(--rocket); }

/* Generic */
.gateway-option.active { border-color: var(--primary); }
.check-mark { position: absolute; top: 8px; right: 8px; opacity: 0; transform: scale(0.5); transition: 0.2s; }
.gateway-option.active .check-mark { opacity: 1; transform: scale(1); }

.instruction-box {
  margin-top: 32px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 0.9rem;
  color: #60a5fa;
}

/* Summary Section */
.summary-section {
  background: rgba(255,255,255,0.02);
  border-left: 1px solid var(--border-light);
  padding: 32px;
}

.summary-card h3 { font-size: 1.1rem; margin-bottom: 24px; }

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: var(--text-muted);
}

.summary-row .val { color: white; font-weight: 500; }
.text-cap { text-transform: capitalize; }

.divider { height: 1px; background: var(--border-light); margin: 20px 0; }

.summary-row.total { font-size: 1.2rem; font-weight: 700; color: white; align-items: center; }
.total-val { font-size: 1.5rem; color: var(--primary); }

.pay-now-btn {
  width: 100%;
  background: var(--primary);
  border: none;
  padding: 16px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: 0.2s;
}

.pay-now-btn:hover:not(:disabled) { background: #ff5252; box-shadow: 0 4px 15px rgba(255,59,48,0.3); }
.pay-now-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }

.secure-note {
  text-align: center;
  margin-top: 16px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* --- RESPONSIVE --- */
@media (max-width: 900px) {
  .pricing-grid { grid-template-columns: 1fr; gap: 40px; }
  .price-card.pro { transform: scale(1); }
  .price-card.pro:hover { transform: scale(1.02); }
  
  .checkout-grid { grid-template-columns: 1fr; }
  .summary-section { border-left: none; border-top: 1px solid var(--border-light); }
}

@media (max-width: 480px) {
  .hero-title { font-size: 2.5rem; }
  .segmented-control { width: 100%; }
  .segment-btn { padding: 10px 12px; font-size: 0.8rem; }
  .gateway-grid { grid-template-columns: repeat(2, 1fr); }
  .checkout-modal { height: 100%; border-radius: 0; }
}
</style>