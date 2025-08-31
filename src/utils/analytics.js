import { ANALYTICS, FEATURES } from '../config/constants';

// Google Analytics helper functions
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag && FEATURES.analytics) {
    window.gtag(...args);
  }
};

// Track page views
export const trackPageView = (url, title) => {
  gtag('config', ANALYTICS.gaTrackingId, {
    page_title: title,
    page_location: url,
  });
};

// Track custom events
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', 'form', formName, success ? 1 : 0);
};

// Track button clicks
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('click', 'button', `${buttonName}${location ? `_${location}` : ''}`, 1);
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage);
};

// Track time on page
export const trackTimeOnPage = (seconds) => {
  trackEvent('timing_complete', 'engagement', 'time_on_page', seconds);
};

// Track errors
export const trackError = (error, errorInfo = '') => {
  gtag('event', 'exception', {
    description: error.toString(),
    fatal: false,
    custom_map: { custom_parameter_1: errorInfo }
  });
};

// Initialize scroll tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined' || !FEATURES.analytics) return;

  let scrollDepths = [25, 50, 75, 90];
  let trackedDepths = new Set();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackScrollDepth(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Initialize time tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined' || !FEATURES.analytics) return;

  const startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  };

  // Track time when user leaves the page
  window.addEventListener('beforeunload', trackTime);
  
  return () => window.removeEventListener('beforeunload', trackTime);
};