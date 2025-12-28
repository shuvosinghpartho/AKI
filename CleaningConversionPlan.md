# Cleaning HTML to Vue Conversion Plan

## Information Gathered
- Current project has Vue.js structure with views and components
- DataProcessingView.vue exists with "Next: Preprocessing" button
- Cleaning.html contains a complete data cleaning interface with:
  - Collapsible sidebar with cleaning tools (Value Replacer, Encoder, Rename, Drop Col)
  - Data tables showing before/after transformation
  - Pipeline navigation (CLEAN, FILTER, PROCESS, TRAIN, PREDICT)
  - Dark theme with cyber aesthetic

## Plan
1. **Create CleaningView.vue**: Convert Cleaning.html HTML/CSS/JS into Vue component
2. **Update Router**: Add cleaning route to src/router/index.js
3. **Update DataProcessingView.vue**: Change "Next: Preprocessing" to "Next: Processing" and navigate to /cleaning
4. **Maintain Styling**: Preserve the existing dark theme and cyber aesthetic
5. **Preserve Functionality**: Keep all interactive features (sidebar toggle, tool accordion, data tables)

## Dependent Files to be edited
- src/views/CleaningView.vue (new file)
- src/router/index.js (add cleaning route)
- src/views/DataProcessingView.vue (update button and navigation)

## Followup Steps
- Test navigation from DataProcessing to Cleaning page
- Verify all interactive features work properly
- Ensure responsive design is maintained
