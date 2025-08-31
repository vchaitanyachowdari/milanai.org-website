import { trackError } from './analytics';
import { FEATURES } from '../config/constants';

// Global error handler
export const handleError = (error, errorInfo = '', context = 'unknown') => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.error(`Error in ${context}:`, error, errorInfo);
  }

  // Track error in analytics
  if (FEATURES.analytics) {
    trackError(error, `${context}: ${errorInfo}`);
  }

  // In production, you might want to send to error reporting service
  if (FEATURES.errorReporting && !import.meta.env.DEV) {
    // Example: Send to Sentry, LogRocket, etc.
    // sentryCapture(error, { context, errorInfo });
  }
};

// Async error handler for promises
export const handleAsyncError = (error, context = 'async_operation') => {
  handleError(error, '', context);
  
  // Return a user-friendly error message
  return {
    success: false,
    message: 'Something went wrong. Please try again.',
    error: import.meta.env.DEV ? error.message : undefined
  };
};

// Network error handler
export const handleNetworkError = (error, url = '') => {
  const context = `network_request${url ? `_${url}` : ''}`;
  
  if (error.name === 'AbortError') {
    return { success: false, message: 'Request was cancelled.' };
  }
  
  if (!navigator.onLine) {
    return { success: false, message: 'No internet connection. Please check your network.' };
  }
  
  handleError(error, '', context);
  
  return {
    success: false,
    message: 'Network error. Please check your connection and try again.',
    error: import.meta.env.DEV ? error.message : undefined
  };
};

// Form submission error handler
export const handleFormError = (error, formName = 'unknown_form') => {
  handleError(error, '', `form_${formName}`);
  
  // Return specific error messages based on error type
  if (error.message?.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.message?.includes('validation')) {
    return 'Please check your input and try again.';
  }
  
  return 'There was an error submitting the form. Please try again.';
};

// Setup global error handlers
export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, '', 'unhandled_promise_rejection');
    event.preventDefault(); // Prevent the default browser behavior
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    handleError(event.error, event.message, 'javascript_error');
  });

  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      handleError(
        new Error(`Failed to load resource: ${event.target.src || event.target.href}`),
        '',
        'resource_loading_error'
      );
    }
  }, true);
};