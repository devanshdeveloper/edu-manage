class DomHelper {
  /**
   * Select a single element
   * @param {string} selector - CSS selector
   * @param {Element} [context=document] - Context to search within
   * @returns {Element|null} - Found element or null
   */
  static select(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.error('Error selecting element:', error);
      return null;
    }
  }

  /**
   * Select multiple elements
   * @param {string} selector - CSS selector
   * @param {Element} [context=document] - Context to search within
   * @returns {Element[]} - Array of found elements
   */
  static selectAll(selector, context = document) {
    try {
      return Array.from(context.querySelectorAll(selector));
    } catch (error) {
      console.error('Error selecting elements:', error);
      return [];
    }
  }

  /**
   * Create an element with attributes and properties
   * @param {string} tag - HTML tag name
   * @param {object} [props={}] - Properties to set
   * @returns {Element} - Created element
   */
  static createElement(tag, props = {}) {
    try {
      const element = document.createElement(tag);
      Object.entries(props).forEach(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
          Object.assign(element.style, value);
        } else if (key === 'className') {
          element.className = value;
        } else if (key === 'dataset') {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
        } else {
          element[key] = value;
        }
      });
      return element;
    } catch (error) {
      console.error('Error creating element:', error);
      return null;
    }
  }

  /**
   * Add event listener with error handling
   * @param {Element} element - Target element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {object} [options] - Event listener options
   */
  static addEvent(element, event, handler, options = {}) {
    try {
      element.addEventListener(event, handler, options);
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
  }

  /**
   * Remove event listener
   * @param {Element} element - Target element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {object} [options] - Event listener options
   */
  static removeEvent(element, event, handler, options = {}) {
    try {
      element.removeEventListener(event, handler, options);
    } catch (error) {
      console.error('Error removing event listener:', error);
    }
  }

  /**
   * Add or remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class to toggle
   * @param {boolean} [force] - Force add or remove
   * @returns {boolean} - True if class is added, false if removed
   */
  static toggleClass(element, className, force) {
    try {
      return element.classList.toggle(className, force);
    } catch (error) {
      console.error('Error toggling class:', error);
      return false;
    }
  }

  /**
   * Get or set element attributes
   * @param {Element} element - Target element
   * @param {string|object} attr - Attribute name or object of attributes
   * @param {string} [value] - Value to set
   * @returns {string|null} - Attribute value when getting
   */
  static attr(element, attr, value) {
    try {
      if (typeof attr === 'object') {
        Object.entries(attr).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });
        return null;
      }
      if (value === undefined) {
        return element.getAttribute(attr);
      }
      element.setAttribute(attr, value);
      return value;
    } catch (error) {
      console.error('Error handling attribute:', error);
      return null;
    }
  }

  /**
   * Get element position relative to viewport
   * @param {Element} element - Target element
   * @returns {object} - Element position {top, left, bottom, right}
   */
  static getPosition(element) {
    try {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
      };
    } catch (error) {
      console.error('Error getting position:', error);
      return { top: 0, left: 0, bottom: 0, right: 0 };
    }
  }

  /**
   * Check if element is visible in viewport
   * @param {Element} element - Target element
   * @param {number} [threshold=0] - Visibility threshold (0-1)
   * @returns {boolean} - True if element is visible
   */
  static isInViewport(element, threshold = 0) {
    try {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= -threshold &&
        rect.left >= -threshold &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
      );
    } catch (error) {
      console.error('Error checking viewport visibility:', error);
      return false;
    }
  }

  /**
   * Insert element after a reference element
   * @param {Element} newElement - Element to insert
   * @param {Element} referenceElement - Element to insert after
   */
  static insertAfter(newElement, referenceElement) {
    try {
      referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    } catch (error) {
      console.error('Error inserting element:', error);
    }
  }

  /**
   * Get closest parent matching selector
   * @param {Element} element - Starting element
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Matching parent or null
   */
  static closest(element, selector) {
    try {
      return element.closest(selector);
    } catch (error) {
      console.error('Error finding closest element:', error);
      return null;
    }
  }

  /**
   * Get or set element's inner HTML safely
   * @param {Element} element - Target element
   * @param {string} [html] - HTML to set
   * @returns {string|null} - Inner HTML when getting
   */
  static html(element, html) {
    try {
      if (html === undefined) {
        return element.innerHTML;
      }
      element.innerHTML = html;
      return html;
    } catch (error) {
      console.error('Error handling innerHTML:', error);
      return null;
    }
  }

  /**
   * Get computed style value
   * @param {Element} element - Target element
   * @param {string} property - CSS property name
   * @returns {string} - Computed style value
   */
  static getStyle(element, property) {
    try {
      return window.getComputedStyle(element)[property];
    } catch (error) {
      console.error('Error getting computed style:', error);
      return '';
    }
  }

  /**
   * Check if element matches selector
   * @param {Element} element - Element to check
   * @param {string} selector - CSS selector
   * @returns {boolean} - True if element matches
   */
  static matches(element, selector) {
    try {
      return element.matches(selector);
    } catch (error) {
      console.error('Error checking selector match:', error);
      return false;
    }
  }

  /**
   * Scroll element into view with smooth animation
   * @param {Element} element - Element to scroll to
   * @param {object} [options] - Scroll options
   * @param {string} [options.behavior='smooth'] - Scroll behavior
   * @param {string} [options.block='start'] - Vertical alignment
   * @param {string} [options.inline='nearest'] - Horizontal alignment
   */
  static scrollTo(element, options = {}) {
    try {
      element.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'start',
        inline: options.inline || 'nearest'
      });
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }

  /**
   * Get element dimensions including padding and border
   * @param {Element} element - Target element
   * @returns {object} - Element dimensions {width, height}
   */
  static getDimensions(element) {
    try {
      const rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    } catch (error) {
      console.error('Error getting dimensions:', error);
      return { width: 0, height: 0 };
    }
  }

  /**
   * Fade in element with animation
   * @param {Element} element - Element to fade in
   * @param {number} [duration=400] - Animation duration in ms
   */
  static fadeIn(element, duration = 400) {
    try {
      element.style.opacity = '0';
      element.style.display = '';

      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;

        if (progress < duration) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error fading in element:', error);
    }
  }

  /**
   * Fade out element with animation
   * @param {Element} element - Element to fade out
   * @param {number} [duration=400] - Animation duration in ms
   */
  static fadeOut(element, duration = 400) {
    try {
      let start = null;
      const initialOpacity = parseFloat(getComputedStyle(element).opacity);

      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(initialOpacity - (progress / duration), 0);
        element.style.opacity = opacity;

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
        }
      }
      requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error fading out element:', error);
    }
  }

  /**
   * Add multiple classes to an element
   * @param {Element} element - Target element
   * @param {...string} classes - Classes to add
   */
  static addClass(element, ...classes) {
    try {
      element.classList.add(...classes);
    } catch (error) {
      console.error('Error adding classes:', error);
    }
  }

  /**
   * Remove multiple classes from an element
   * @param {Element} element - Target element
   * @param {...string} classes - Classes to remove
   */
  static removeClass(element, ...classes) {
    try {
      element.classList.remove(...classes);
    } catch (error) {
      console.error('Error removing classes:', error);
    }
  }

  /**
   * Replace an element with another element
   * @param {Element} oldElement - Element to replace
   * @param {Element} newElement - Replacement element
   */
  static replaceElement(oldElement, newElement) {
    try {
      oldElement.parentNode.replaceChild(newElement, oldElement);
    } catch (error) {
      console.error('Error replacing element:', error);
    }
  }

  /**
   * Add or remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class to toggle
   * @param {boolean} [force] - Force add or remove
   * @returns {boolean} - True if class is added, false if removed
   */
  static toggleClass(element, className, force) {
    try {
      return element.classList.toggle(className, force);
    } catch (error) {
      console.error('Error toggling class:', error);
      return false;
    }
  }

  /**
   * Get or set element attributes
   * @param {Element} element - Target element
   * @param {string|object} attr - Attribute name or object of attributes
   * @param {string} [value] - Value to set
   * @returns {string|null} - Attribute value when getting
   */
  static attr(element, attr, value) {
    try {
      if (typeof attr === 'object') {
        Object.entries(attr).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });
        return null;
      }
      if (value === undefined) {
        return element.getAttribute(attr);
      }
      element.setAttribute(attr, value);
      return value;
    } catch (error) {
      console.error('Error handling attribute:', error);
      return null;
    }
  }

  /**
   * Get element position relative to viewport
   * @param {Element} element - Target element
   * @returns {object} - Element position {top, left, bottom, right}
   */
  static getPosition(element) {
    try {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
      };
    } catch (error) {
      console.error('Error getting position:', error);
      return { top: 0, left: 0, bottom: 0, right: 0 };
    }
  }

  /**
   * Check if element is visible in viewport
   * @param {Element} element - Target element
   * @param {number} [threshold=0] - Visibility threshold (0-1)
   * @returns {boolean} - True if element is visible
   */
  static isInViewport(element, threshold = 0) {
    try {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= -threshold &&
        rect.left >= -threshold &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
      );
    } catch (error) {
      console.error('Error checking viewport visibility:', error);
      return false;
    }
  }

  /**
   * Insert element after a reference element
   * @param {Element} newElement - Element to insert
   * @param {Element} referenceElement - Element to insert after
   */
  static insertAfter(newElement, referenceElement) {
    try {
      referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    } catch (error) {
      console.error('Error inserting element:', error);
    }
  }

  /**
   * Get closest parent matching selector
   * @param {Element} element - Starting element
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Matching parent or null
   */
  static closest(element, selector) {
    try {
      return element.closest(selector);
    } catch (error) {
      console.error('Error finding closest element:', error);
      return null;
    }
  }

  /**
   * Get or set element's inner HTML safely
   * @param {Element} element - Target element
   * @param {string} [html] - HTML to set
   * @returns {string|null} - Inner HTML when getting
   */
  static html(element, html) {
    try {
      if (html === undefined) {
        return element.innerHTML;
      }
      element.innerHTML = html;
      return html;
    } catch (error) {
      console.error('Error handling innerHTML:', error);
      return null;
    }
  }

  /**
   * Get computed style value
   * @param {Element} element - Target element
   * @param {string} property - CSS property name
   * @returns {string} - Computed style value
   */
  static getStyle(element, property) {
    try {
      return window.getComputedStyle(element)[property];
    } catch (error) {
      console.error('Error getting computed style:', error);
      return '';
    }
  }

  /**
   * Check if element matches selector
   * @param {Element} element - Element to check
   * @param {string} selector - CSS selector
   * @returns {boolean} - True if element matches
   */
  static matches(element, selector) {
    try {
      return element.matches(selector);
    } catch (error) {
      console.error('Error checking selector match:', error);
      return false;
    }
  }
}

/* Usage Examples:

// Select elements
const button = DomHelper.select('#submitButton');
const listItems = DomHelper.selectAll('.list-item');

// Create element with properties
const div = DomHelper.createElement('div', {
  className: 'container',
  style: { backgroundColor: '#f0f0f0', padding: '20px' },
  dataset: { id: '123', type: 'wrapper' }
});

// Event handling
const clickHandler = (e) => console.log('Clicked:', e.target);
DomHelper.addEvent(button, 'click', clickHandler);
DomHelper.removeEvent(button, 'click', clickHandler);

// Class manipulation
DomHelper.toggleClass(div, 'active', true); // Force add class
DomHelper.toggleClass(div, 'hidden'); // Toggle class

// Attribute handling
DomHelper.attr(button, 'disabled', 'true');
DomHelper.attr(div, {
  role: 'dialog',
  'aria-label': 'Modal'
});

// Position and visibility
const position = DomHelper.getPosition(div);
console.log('Element position:', position);

const isVisible = DomHelper.isInViewport(div, 0.5);
console.log('Is element visible:', isVisible);
*/

export default DomHelper;