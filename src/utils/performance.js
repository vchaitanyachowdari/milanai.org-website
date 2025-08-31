import { trackEvent } from './analytics';
import { FEATURES } from '../config/constants';

// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = new Map();
  }

  // Start timing an operation
  startTiming(name) {
    if (typeof performance !== 'undefined') {
      const markName = `${name}-start`;
      performance.mark(markName);
      this.marks.set(name, markName);
    }
  }

  // End timing an operation
  endTiming(name) {
    if (typeof performance !== 'undefined' && this.marks.has(name)) {
      const startMark = this.marks.get(name);
      const endMark = `${name}-end`;
      const measureName = `${name}-duration`;
      
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);
      
      const measure = performance.getEntriesByName(measureName)[0];
      this.measures.set(name, measure.duration);
      
      // Track performance in analytics
      if (FEATURES.analytics) {
        trackEvent('timing_complete', 'performance', name, Math.round(measure.duration));
      }
      
      // Clean up marks
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
      
      return measure.duration;
    }
    return 0;
  }

  // Get timing result
  getTiming(name) {
    return this.measures.get(name) || 0;
  }

  // Clear all timings
  clear() {
    this.marks.clear();
    this.measures.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Monitor Core Web Vitals
export const monitorWebVitals = () => {
  if (typeof window === 'undefined' || !FEATURES.analytics) return;

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackEvent('web_vital', 'performance', 'LCP', Math.round(lastEntry.startTime));
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP monitoring not supported:', error.message);
    }
  };

  // First Input Delay (FID)
  const observeFID = () => {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          trackEvent('web_vital', 'performance', 'FID', Math.round(entry.processingStart - entry.startTime));
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID monitoring not supported:', error.message);
    }
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });

      // Report CLS when page is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          trackEvent('web_vital', 'performance', 'CLS', Math.round(clsValue * 1000));
        }
      });
    } catch (error) {
      console.warn('CLS monitoring not supported:', error.message);
    }
  };

  observeLCP();
  observeFID();
  observeCLS();
};

// Monitor resource loading performance
export const monitorResourceLoading = () => {
  if (typeof window === 'undefined' || !FEATURES.analytics) return;

  window.addEventListener('load', () => {
    // Monitor navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      trackEvent('timing_complete', 'performance', 'page_load', Math.round(navigation.loadEventEnd));
      trackEvent('timing_complete', 'performance', 'dom_content_loaded', Math.round(navigation.domContentLoadedEventEnd));
    }

    // Monitor resource timing
    const resources = performance.getEntriesByType('resource');
    resources.forEach((resource) => {
      if (resource.duration > 1000) { // Only track slow resources (>1s)
        const resourceType = resource.initiatorType || 'unknown';
        trackEvent('timing_complete', 'performance', `slow_${resourceType}`, Math.round(resource.duration));
      }
    });
  });
};

// Debounce function for performance optimization
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility
export const lazyLoad = (target, options = {}) => {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback for browsers without IntersectionObserver
    return;
  }

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, defaultOptions);

  if (target instanceof NodeList) {
    target.forEach((el) => observer.observe(el));
  } else {
    observer.observe(target);
  }

  return observer;
};