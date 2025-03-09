class BroadcastHelper {
  /**
   * Initialize BroadcastHelper with a unique namespace
   * @param {string} namespace - Unique namespace for the broadcast channel
   */
  constructor(namespace = "edu-manage") {
    this.namespace = namespace;
    this.eventPrefix = `${namespace}:event:`;
    this.listeners = new Map();
  }

  /**
   * Generate a storage key for an event
   * @private
   * @param {string} eventName - Name of the event
   * @returns {string} Storage key
   */
  _getStorageKey(eventName) {
    return `${this.eventPrefix}${eventName}`;
  }

  /**
   * Register an event listener
   * @param {string} eventName - Name of the event to listen for
   * @param {function} callback - Callback function to execute when event occurs
   * @returns {function} Unsubscribe function
   */
  on(eventName, callback) {
    const storageKey = this._getStorageKey(eventName);

    const storedData = localStorage.getItem(storageKey);
    if (storedData !== "undefined") {
      localStorage.setItem(storageKey, "undefined");
    }

    const handler = (event) => {
      if (!event.newValue) return;

      if (event.newValue === "undefined") return;

      if (event.key === storageKey) {
        try {
          const data = JSON.parse(event.newValue);
          callback(data);
        } catch (error) {
          callback(event.newValue);
        }
      }
    };

    window.addEventListener("storage", handler);
    this.listeners.set(callback, handler);

    // Return unsubscribe function
    return () => this.off(eventName, callback);
  }

  /**
   * Remove an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function to remove
   */
  off(eventName, callback) {
    const handler = this.listeners.get(callback);
    if (handler) {
      window.removeEventListener("storage", handler);
      this.listeners.delete(callback);
    }
  }

  /**
   * Emit an event to all tabs
   * @param {string} eventName - Name of the event to emit
   * @param {*} data - Data to send with the event
   */
  emit(eventName, data) {
    const storageKey = this._getStorageKey(eventName);

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      // Trigger the event for the current tab
      this.listeners.forEach((handler) => {
        handler({ key: storageKey, newValue: JSON.stringify(data) });
      });

      localStorage.setItem(storageKey, "undefined");

      // Clean up immediately to allow subsequent events of the same type
      //   localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Error emitting event:", error);
    }
  }

  /**
   * Clear all events in the current namespace
   */
  clear() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.eventPrefix)) {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Remove all event listeners
   */
  destroy() {
    this.listeners.forEach((handler) => {
      window.removeEventListener("storage", handler);
    });
    this.listeners.clear();
  }
}

export default BroadcastHelper;
