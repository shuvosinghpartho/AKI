<template>
  <div class="predict-container">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="brand-text" style="font-weight:800; color:white;">
        AKI <span style="color:var(--aki-teal)">PREDICT</span>
      </div>
      <div class="pipeline-stepper">
        <div class="step">CLEAN</div>
        <div class="step">FILTER</div>
        <div class="step">PROCESS</div>
        <div class="step">TRAIN</div>
        <div class="step active">PREDICT</div>
      </div>
      <button class="action-btn" title="Home" @click="goHome">
        <ion-icon name="home-outline" style="font-size:1.5rem; color:white;"></ion-icon>
      </button>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Input Panel -->
      <div class="input-panel">
        <div class="panel-title">Input Features</div>
        <div class="form-scroll">
          <div class="form-group">
            <label>Bedrooms</label>
            <input 
              type="number" 
              class="custom-input" 
              placeholder="e.g. 3"
              v-model.number="formData.bedrooms"
            >
          </div>
          <div class="form-group">
            <label>Bathrooms</label>
            <input 
              type="number" 
              class="custom-input" 
              placeholder="e.g. 2"
              v-model.number="formData.bathrooms"
            >
          </div>
          <div class="form-group">
            <label>Square Footage</label>
            <input 
              type="number" 
              class="custom-input" 
              placeholder="e.g. 1500"
              v-model.number="formData.squareFootage"
            >
          </div>
          <div class="form-group">
            <label>Year Built</label>
            <input 
              type="number" 
              class="custom-input" 
              placeholder="e.g. 2010"
              v-model.number="formData.yearBuilt"
            >
          </div>
          <div class="form-group">
            <label>Location Score (1-10)</label>
            <input 
              type="number" 
              class="custom-input" 
              placeholder="e.g. 8"
              v-model.number="formData.locationScore"
              min="1"
              max="10"
            >
          </div>
        </div>
        <button class="predict-btn" @click="runPrediction" :disabled="!isFormValid">
          Run Prediction
        </button>
      </div>

      <!-- Result Panel -->
      <div class="result-panel">
        <div class="empty-state" v-if="!showResults">
          <ion-icon name="cube-outline" style="font-size:3rem; margin-bottom:10px; opacity:0.5;"></ion-icon>
          <p>Fill in the features and click "Run Prediction" to see results.</p>
        </div>

        <div class="result-card" v-if="showResults" :class="{ show: showResults }">
          <div style="font-size:0.8rem; text-transform:uppercase; color:#888; letter-spacing:1px;">
            Predicted Value
          </div>
          <div class="prediction-value">${{ formatNumber(predictionResult.value) }}</div>
          <div class="confidence">Confidence: {{ predictionResult.confidence }}%</div>
          <div style="margin-top:20px; font-size:0.8rem; color:#666;">
            Model: {{ predictionResult.model }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PredictView',
  data() {
    return {
      formData: {
        bedrooms: null,
        bathrooms: null,
        squareFootage: null,
        yearBuilt: null,
        locationScore: null
      },
      showResults: false,
      predictionResult: {
        value: 0,
        confidence: 0,
        model: 'Random Forest v1.0'
      }
    }
  },

  computed: {
    isFormValid() {
      return Object.values(this.formData).every(value => 
        value !== null && value !== '' && value !== undefined
      )
    }
  },

  methods: {
    runPrediction() {
      if (!this.isFormValid) {
        alert('Please fill in all the input fields before running prediction.')
        return
      }

      // Simulate prediction process
      this.showResults = false

      // Calculate prediction based on input values
      const baseValue = 500000
      const bedroomsValue = (this.formData.bedrooms || 0) * 50000
      const bathroomsValue = (this.formData.bathrooms || 0) * 30000
      const squareFootageValue = (this.formData.squareFootage || 0) * 200
      const agePenalty = Math.max(0, 2024 - (this.formData.yearBuilt || 2024)) * 1000
      const locationMultiplier = (this.formData.locationScore || 5) * 0.1

      const calculatedValue = Math.round(
        (baseValue + bedroomsValue + bathroomsValue + squareFootageValue - agePenalty) * 
        (1 + locationMultiplier)
      )

      // Calculate confidence based on input completeness and validity
      let confidence = 85 + Math.random() * 10 // Base confidence 85-95%
      
      // Adjust confidence based on input values
      if (this.formData.bedrooms > 0 && this.formData.bedrooms < 10) confidence += 2
      if (this.formData.bathrooms > 0 && this.formData.bathrooms < 8) confidence += 2
      if (this.formData.squareFootage > 500 && this.formData.squareFootage < 10000) confidence += 3
      if (this.formData.yearBuilt > 1900 && this.formData.yearBuilt <= 2024) confidence += 2
      if (this.formData.locationScore >= 1 && this.formData.locationScore <= 10) confidence += 1

      this.predictionResult = {
        value: Math.max(calculatedValue, 100000), // Minimum value of $100,000
        confidence: Math.min(Math.round(confidence), 99), // Maximum 99%
        model: 'Random Forest v1.0'
      }

      // Show results after a short delay for better UX
      setTimeout(() => {
        this.showResults = true
      }, 500)
    },

    formatNumber(number) {
      return new Intl.NumberFormat('en-US').format(number)
    },

    goHome() {
      this.$router.push('/')
    }
  },

  mounted() {
    // Auto-focus first input for better UX
    const firstInput = this.$el.querySelector('input[type="number"]')
    if (firstInput) {
      firstInput.focus()
    }
  }
}
</script>

<style scoped>
/* --- THEME VARIABLES --- */
:host {
  --bg-color: #050505;
  --card-bg: rgba(24, 24, 27, 0.6);
  --input-bg: #27272a;
  --aki-teal: #26a69a;
  --aki-red: #e53935;
  --aki-red-glow: rgba(229, 57, 53, 0.5);
  --text-white: #ffffff;
  --text-gray: #a1a1aa;
  --border-color: rgba(255, 255, 255, 0.1);
}

* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
  font-family: 'Inter', sans-serif; 
}

.predict-container {
  background-color: var(--bg-color);
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(38, 166, 154, 0.05), transparent 60%);
  color: var(--text-white);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Top Bar */
.top-bar {
  padding: 20px 30px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  border-bottom: 1px solid var(--border-color); 
  background: rgba(5, 5, 5, 0.8); 
  backdrop-filter: blur(10px);
}

.pipeline-stepper { 
  display: flex; 
  gap: 2px; 
  background: #111; 
  padding: 4px; 
  border-radius: 8px; 
  border: 1px solid #333; 
}
.step { 
  padding: 6px 12px; 
  border-radius: 6px; 
  font-size: 0.75rem; 
  font-weight: 700; 
  color: #555; 
  cursor: pointer; 
}
.step.active { 
  background: #222; 
  color: var(--aki-red); 
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
}

.action-btn { 
  background: transparent; 
  border: 1px solid var(--border-color); 
  padding: 8px; 
  border-radius: 8px; 
  color: var(--text-gray); 
  font-size: 1.2rem; 
  cursor: pointer; 
  transition: 0.2s; 
}
.action-btn:hover { 
  border-color: var(--aki-teal); 
  color: var(--aki-teal); 
}

/* Main Container */
.container {
  flex: 1; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 40px;
  padding: 40px; 
  max-width: 1200px; 
  margin: 0 auto; 
  width: 100%;
}

/* Input Panel */
.input-panel {
  flex: 1; 
  background: var(--card-bg); 
  border: 1px solid var(--border-color);
  border-radius: 16px; 
  padding: 30px; 
  max-width: 500px; 
  height: 100%; 
  max-height: 600px;
  display: flex; 
  flex-direction: column;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.panel-title { 
  font-size: 1.2rem; 
  font-weight: 700; 
  margin-bottom: 20px; 
  color: white; 
  border-bottom: 1px solid var(--border-color); 
  padding-bottom: 15px; 
}

.form-scroll { 
  overflow-y: auto; 
  flex: 1; 
  padding-right: 10px; 
}

.form-group { 
  margin-bottom: 15px; 
}
.form-group label { 
  display: block; 
  font-size: 0.8rem; 
  color: var(--text-gray); 
  margin-bottom: 8px; 
}

.custom-input { 
  width: 100%; 
  background: var(--input-bg); 
  border: 1px solid var(--border-color); 
  color: white; 
  padding: 12px; 
  border-radius: 8px; 
  outline: none; 
  transition: 0.2s;
  font-size: 0.9rem;
}
.custom-input:focus { 
  border-color: var(--aki-teal); 
  box-shadow: 0 0 10px rgba(38, 166, 154, 0.2);
}
.custom-input::placeholder {
  color: #666;
}

.predict-btn {
  width: 100%; 
  padding: 15px; 
  background: var(--aki-teal); 
  color: white; 
  border: none; 
  border-radius: 8px; 
  font-weight: 700; 
  cursor: pointer; 
  margin-top: 20px; 
  font-size: 1rem;
  box-shadow: 0 0 20px rgba(38, 166, 154, 0.4); 
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.predict-btn:hover:not(:disabled) { 
  transform: translateY(-2px); 
  box-shadow: 0 0 30px rgba(38, 166, 154, 0.6); 
}
.predict-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Result Panel */
.result-panel {
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  text-align: center; 
  max-width: 400px;
}

.empty-state {
  color: var(--text-gray); 
  font-size: 0.9rem; 
  border: 2px dashed var(--border-color);
  padding: 40px; 
  border-radius: 20px; 
  width: 100%;
  text-align: center;
}

.result-card {
  background: rgba(20, 20, 20, 0.8); 
  border: 1px solid var(--border-color); 
  padding: 40px;
  border-radius: 20px; 
  width: 100%; 
  position: relative; 
  overflow: hidden;
  display: none;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.result-card.show { 
  display: block; 
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
}

@keyframes popIn {
  0% { 
    opacity: 0; 
    transform: scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1); 
  }
}

.prediction-value { 
  font-size: 3rem; 
  font-weight: 800; 
  color: var(--aki-teal); 
  margin: 10px 0; 
  text-shadow: 0 0 20px rgba(38, 166, 154, 0.3);
}

.confidence { 
  font-size: 0.9rem; 
  color: var(--text-gray); 
  background: rgba(255,255,255,0.05); 
  padding: 5px 10px; 
  border-radius: 20px; 
  display: inline-block; 
  border: 1px solid rgba(255,255,255,0.1);
}

/* Custom Scrollbar */
.form-scroll::-webkit-scrollbar {
  width: 6px;
}

.form-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.form-scroll::-webkit-scrollbar-thumb {
  background: rgba(38, 166, 154, 0.5);
  border-radius: 3px;
}

.form-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(38, 166, 154, 0.7);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    gap: 30px;
  }
  
  .input-panel,
  .result-panel {
    max-width: 100%;
    width: 100%;
  }
  
  .input-panel {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 15px 20px;
  }
  
  .container {
    padding: 20px;
  }
  
  .input-panel,
  .result-panel {
    padding: 20px;
  }
  
  .prediction-value {
    font-size: 2.5rem;
  }
  
  .pipeline-stepper {
    display: none;
  }
}

@media (max-width: 480px) {
  .top-bar {
    padding: 10px 15px;
  }
  
  .container {
    padding: 15px;
  }
  
  .prediction-value {
    font-size: 2rem;
  }
  
  .input-panel,
  .result-panel {
    padding: 15px;
  }
}
</style>
