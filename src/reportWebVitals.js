// Define a function to analyze web performance based on passed callback.
const analyzeWebPerformance = onPerfEntry => {
  // Check if the callback function is provided and is a valid function.
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Dynamically import functions from 'web-vitals' for different performance metrics.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call the respective web-vitals functions with the provided callback.
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Export the analyzeWebPerformance function as the default export.
export default analyzeWebPerformance;
