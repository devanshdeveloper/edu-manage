import axios from "axios";
export default class RequestHelper {
  constructor({ baseURL = "", timeout = 30000 }) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
    this.pendingRequests = new Map();
    this.requestQueue = [];
  }

  /**
   * Setup request and response interceptors
   * @private
   */
  setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add request to pending map
        const requestKey = this.getRequestKey(config);
        this.pendingRequests.set(requestKey, config);

        // Add authorization token if available
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Remove request from pending map
        const requestKey = this.getRequestKey(response.config);
        this.pendingRequests.delete(requestKey);

        return response.data;
      },
      (error) => {
        // Remove request from pending map
        if (error.config) {
          const requestKey = this.getRequestKey(error.config);
          this.pendingRequests.delete(requestKey);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  /**
   * Generate a unique key for each request
   * @private
   */
  getRequestKey(config) {
    return `${config.method}:${config.url}`;
  }

  /**
   * Normalize error object
   * @private
   */
  normalizeError(error) {
    return {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  /**
   * Cancel all pending requests
   */
  cancelPendingRequests() {
    for (const [key, config] of this.pendingRequests.entries()) {
      if (config.cancelToken) {
        config.cancelToken.cancel(`Request cancelled: ${key}`);
      }
      this.pendingRequests.delete(key);
    }
  }

  /**
   * Make a GET request
   * @param {string} url - The URL to make the request to
   * @param {Object} config - Additional axios config
   * @returns {Promise} - The response promise
   */
  async get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  /**
   * Make a POST request
   * @param {string} url - The URL to make the request to
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} - The response promise
   */
  async post(url, data = {}, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * Make a PUT request
   * @param {string} url - The URL to make the request to
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} - The response promise
   */
  async put(url, data = {}, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * Make a DELETE request
   * @param {string} url - The URL to make the request to
   * @param {Object} config - Additional axios config
   * @returns {Promise} - The response promise
   */
  async delete(url, config = {}) {
    return this.axiosInstance.delete(url, config);
  }

  /**
   * Make a PATCH request
   * @param {string} url - The URL to make the request to
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} - The response promise
   */
  async patch(url, data = {}, config = {}) {
    return this.axiosInstance.patch(url, data, config);
  }

  /**
   * Make multiple requests concurrently
   * @param {Array} requests - Array of request configs
   * @returns {Promise} - Promise that resolves when all requests complete
   */
  async all(requests) {
    return Promise.all(
      requests.map((request) => {
        const method = request.method?.toLowerCase() || "get";
        return this[method](request.url, request.data, request.config);
      })
    );
  }

/**
 * Make a request with specified method
 * @param {Object} options - Request options
 * @param {string} options.url - The URL to make the request to
 * @param {string} options.method - The HTTP method to use (get, post, put, delete, patch)
 * @param {Object} [options.data] - The data to send with the request
 * @param {Object} [options.config] - Additional axios config
 * @returns {Promise} - The response promise
 */
async request({ url, method = 'get', data = {}, config = {} }) {
  const lowercaseMethod = method.toLowerCase();
  
  if (!this.axiosInstance[lowercaseMethod]) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }

  if (['get', 'delete'].includes(lowercaseMethod)) {
    return this.axiosInstance[lowercaseMethod](url, config);
  }

  return this.axiosInstance[lowercaseMethod](url, data, config);
}



  /**
   * Retry a failed request
   * @param {Function} request - The request to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Delay between retries in milliseconds
   * @returns {Promise} - The response promise
   */
  async retry(request, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await request();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

const requestHelper = new RequestHelper({
  baseURL: "",
});

export { requestHelper };
