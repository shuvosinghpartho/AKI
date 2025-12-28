# Predict.html to Vue.js Conversion Plan

## Task Overview
Convert Predict.html file into Vue.js (PredictView.vue) and set up navigation from TrainingView.vue.

## Information Gathered

### Current State Analysis
1. **TrainingView.vue**: Already has a "Predict" button in the sidebar that calls `goToPredict()` method to navigate to `/predict`
2. **Router**: Currently missing `/predict` route in `src/router/index.js`
3. **Predict.html**: Contains prediction interface with input fields and result display

### Predict.html Structure Analysis
- **Layout**: Two-panel layout (input panel + result panel)
- **Input Fields**: 
  - Bedrooms (number input)
  - Bathrooms (number input) 
  - Square Footage (number input)
  - Year Built (number input)
  - Location Score (1-10) (number input)
- **Functionality**: 
  - "Run Prediction" button shows results
  - Displays predicted value and confidence percentage
  - Pipeline stepper showing current step as "PREDICT"
- **Styling**: Consistent with existing Vue views (dark theme, glass effects, AKI color scheme)

### Vue Project Structure Analysis
- **Consistent Theming**: Uses CSS custom properties for colors and styling
- **Component Pattern**: All views follow Vue SFC pattern with template, script, and scoped styles
- **Navigation**: Uses Vue Router for navigation between views
- **Styling Consistency**: All components use similar glass morphism effects and color schemes

## Conversion Plan

### Step 1: Create PredictView.vue
- Convert Predict.html HTML structure to Vue template
- Replace vanilla JavaScript with Vue reactive data and methods
- Implement form handling with v-model bindings
- Convert CSS to scoped Vue styles
- Ensure consistent styling with other views

### Step 2: Add Route Configuration
- Add `/predict` route to `src/router/index.js`
- Import PredictView.vue component
- Set up proper route naming

### Step 3: Verify Navigation Flow
- Ensure TrainingView.vue "Predict" button correctly navigates to `/predict`
- Test the complete navigation flow

### Step 4: Styling Integration
- Use consistent CSS custom properties from existing styles
- Implement glass morphism effects
- Ensure responsive design matches other views

## Files to be Created/Modified

### New Files
- `src/views/PredictView.vue` (main conversion file)

### Modified Files  
- `src/router/index.js` (add predict route)

### Existing Files (No Changes Required)
- `src/views/TrainingView.vue` (already has navigation logic)

## Technical Implementation Details

### Vue.js Features to Use
- **Reactive Data**: Form inputs bound to Vue data properties
- **Methods**: Prediction logic and form handling
- **Computed Properties**: If needed for calculated values
- **Lifecycle Hooks**: For initialization
- **Event Handling**: Form submission and button clicks

### Styling Approach
- **Scoped Styles**: Keep styles contained to the component
- **CSS Custom Properties**: Use existing theme variables
- **Glass Morphism**: Consistent with other views
- **Responsive Design**: Match existing view patterns

### Form Handling
- **v-model Bindings**: Two-way data binding for all input fields
- **Form Validation**: Basic validation before prediction
- **State Management**: Show/hide results based on user interaction

## Follow-up Steps
1. Test the Vue application to ensure PredictView loads correctly
2. Verify navigation from TrainingView.vue works properly
3. Test form functionality and result display
4. Ensure responsive design works on different screen sizes
5. Verify styling consistency with the overall application theme

## Success Criteria
- PredictView.vue successfully loads and displays prediction interface
- Navigation from TrainingView.vue "Predict" button works correctly
- Form inputs are properly bound to Vue data
- Prediction results display correctly when "Run Prediction" is clicked
- Styling is consistent with existing Vue views
- Application remains functional and responsive
