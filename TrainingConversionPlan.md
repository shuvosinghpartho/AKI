# Training.html to Vue.js Conversion Plan

## Information Gathered

### Training.html Analysis:
- **File**: Training.html (Model Training interface for AKI DataSuite)
- **Styling**: Custom CSS with theme variables, glassmorphism effects, and dark theme
- **Icons**: Ionicons 7.1.0
- **Fonts**: Inter font family
- **Main Components**: 
  - Sidebar with model selection (9 ML models)
  - Configuration panel with hyperparameters
  - Model performance visualization area
  - Modal for target column selection
  - Pipeline stepper navigation

### Current Vue.js Project Structure:
- Located in `/home/partho/AKi Test UI with JS Only/`
- Uses Vue 3 with Vite build system
- Has existing views: HomeView, ProcessView, CleaningView, etc.
- Routing is configured in `src/router/index.js`
- ProcessView.vue already navigates to `/training` route

## Vue.js Conversion Plan

### 1. Create TrainingView.vue
```
src/views/TrainingView.vue
```

### 2. Component Structure
- **Template Section**: Convert HTML structure to Vue template syntax
- **Script Section**: Convert JavaScript logic to Vue component logic
- **Style Section**: Extract and adapt CSS styling

### 3. Key Features to Implement

#### Reactive Data:
- `selectedModel` - Currently selected ML model
- `showTargetModal` - Controls target selection modal visibility
- `selectedTarget` - Currently selected target column
- `isTraining` - Training status
- `modelPerformance` - Performance metrics
- `hyperparameters` - Model configuration values

#### Methods:
- `selectModel(model)` - Handle model selection from sidebar
- `openTargetModal()` - Show target column selection modal
- `confirmTarget()` - Confirm target column selection
- `startTraining()` - Initiate model training
- `goToPredict()` - Navigate to prediction step
- `goToProcess()` - Navigate back to processing step

#### Vue Router Integration:
- Add `/training` route to `src/router/index.js`
- Update navigation logic to use Vue Router

### 4. Styling Conversion Strategy

#### Maintain Current Design:
- Extract all CSS custom properties and styles
- Preserve glassmorphism effects and dark theme
- Keep all animations and transitions
- Maintain responsive design patterns

#### Vue-Specific Enhancements:
- Use `v-model` for form bindings
- Implement `v-for` for model list rendering
- Add Vue transitions for modal and interactions
- Use computed properties for dynamic styling

### 5. Interactive Features

#### Model Selection:
- Convert static model list to dynamic array
- Implement click handlers for model selection
- Add visual feedback for active model

#### Modal System:
- Convert JavaScript modal to Vue reactive modal
- Handle modal open/close states
- Implement target column selection logic

#### Configuration Panel:
- Bind form inputs to reactive data
- Handle hyperparameter updates
- Validate configuration before training

#### Performance Visualization:
- Implement placeholder charts with Vue reactive data
- Add training status indicators
- Display performance metrics

### 6. Navigation Integration

#### Pipeline Stepper:
- Update ProcessView.vue navigation to use Vue Router
- Add breadcrumb navigation
- Implement step validation

#### Step Flow:
- Cleaning → Filtering → Processing → **Training** → Prediction

## Implementation Steps

1. **Create TrainingView.vue file**
2. **Add /training route to router**
3. **Implement model selection functionality**
4. **Create target selection modal**
5. **Add hyperparameter configuration**
6. **Implement training simulation**
7. **Add performance visualization**
8. **Test navigation flow**
9. **Verify responsive design**
10. **Optimize performance**

## Files to be Created/Modified

### New Files:
- `src/views/TrainingView.vue` - Main training interface component

### Modified Files:
- `src/router/index.js` - Add training route
- `src/views/ProcessView.vue` - Update navigation method

## Expected Outcome
- Fully functional TrainingView.vue component
- Seamless navigation from ProcessView to TrainingView
- Interactive model selection and configuration
- Target column selection modal
- Training simulation with performance metrics
- Consistent styling with existing Vue components
