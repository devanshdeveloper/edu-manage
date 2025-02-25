class StorageHelper {
  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} - True if successful
   */
  static setLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  }

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key not found
   * @returns {any} - Stored value or default value
   */
  static getLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - True if successful
   */
  static removeLocal(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  }

  /**
   * Clear all items from localStorage
   * @returns {boolean} - True if successful
   */
  static clearLocal() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Set item in sessionStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} - True if successful
   */
  static setSession(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Get item from sessionStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key not found
   * @returns {any} - Stored value or default value
   */
  static getSession(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting sessionStorage item:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item from sessionStorage
   * @param {string} key - Storage key
   * @returns {boolean} - True if successful
   */
  static removeSession(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Clear all items from sessionStorage
   * @returns {boolean} - True if successful
   */
  static clearSession() {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }

  /**
   * Check if storage is available
   * @param {string} type - Storage type ('localStorage' or 'sessionStorage')
   * @returns {boolean} - True if storage is available
   */
  static isStorageAvailable(type) {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get storage usage information
   * @param {string} type - Storage type ('localStorage' or 'sessionStorage')
   * @returns {object} - Storage usage information
   */
  static getStorageInfo(type) {
    try {
      const storage = window[type];
      const used = new Blob(Object.values(storage)).size;
      const quota = 5 * 1024 * 1024; // Approximate quota (5MB)
      
      return {
        used,
        quota,
        remaining: quota - used,
        items: storage.length
      };
    } catch (error) {
      console.error(`Error getting ${type} info:`, error);
      return null;
    }
  }
}

/* Usage Examples:

// Local Storage Operations
StorageHelper.setLocal('user', { id: 1, name: 'John' });
const user = StorageHelper.getLocal('user');
console.log('User from localStorage:', user);

StorageHelper.removeLocal('user');
StorageHelper.clearLocal();

// Session Storage Operations
StorageHelper.setSession('token', 'abc123');
const token = StorageHelper.getSession('token');
console.log('Token from sessionStorage:', token);

StorageHelper.removeSession('token');
StorageHelper.clearSession();

// Check Storage Availability
const isLocalAvailable = StorageHelper.isStorageAvailable('localStorage');
console.log('Is localStorage available:', isLocalAvailable);

// Get Storage Usage Information
const localStorageInfo = StorageHelper.getStorageInfo('localStorage');
console.log('localStorage usage:', localStorageInfo);
*/

export default StorageHelper;