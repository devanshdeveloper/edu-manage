class FormHelper {
  /**
   * Get form data as an object
   * @param {HTMLFormElement} form - Form element
   * @returns {object} - Form data as key-value pairs
   */
  static getFormData(form) {
    try {
      const formData = new FormData(form);
      const data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      return data;
    } catch (error) {
      console.error('Error getting form data:', error);
      return {};
    }
  }

  /**
   * Validate required fields
   * @param {HTMLFormElement} form - Form element
   * @param {string[]} requiredFields - Array of required field names
   * @returns {object} - Validation result {isValid, errors}
   */
  static validateRequired(form, requiredFields) {
    const errors = {};
    const formData = this.getFormData(form);

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'This field is required';
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Validate email field
   * @param {string} email - Email to validate
   * @returns {boolean} - True if email is valid
   */
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @param {object} options - Validation options
   * @returns {object} - Validation result {isValid, errors}
   */
  static validatePassword(password, options = {}) {
    const {
      minLength = 8,
      requireNumbers = true,
      requireSpecialChars = true,
      requireUppercase = true,
      requireLowercase = true
    } = options;

    const errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Reset form fields
   * @param {HTMLFormElement} form - Form element
   */
  static resetForm(form) {
    try {
      form.reset();
    } catch (error) {
      console.error('Error resetting form:', error);
    }
  }

  /**
   * Serialize form data to URL encoded string
   * @param {HTMLFormElement} form - Form element
   * @returns {string} - URL encoded form data
   */
  static serializeForm(form) {
    try {
      const formData = new FormData(form);
      return new URLSearchParams(formData).toString();
    } catch (error) {
      console.error('Error serializing form:', error);
      return '';
    }
  }

  /**
   * Populate form fields with data
   * @param {HTMLFormElement} form - Form element
   * @param {object} data - Data to populate form with
   */
  static populateForm(form, data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        const field = form.elements[key];
        if (field) {
          if (field.type === 'checkbox') {
            field.checked = Boolean(value);
          } else if (field.type === 'radio') {
            const radio = form.querySelector(`input[name="${key}"][value="${value}"]`);
            if (radio) radio.checked = true;
          } else {
            field.value = value;
          }
        }
      });
    } catch (error) {
      console.error('Error populating form:', error);
    }
  }
}

/* Usage Examples:

// Get form data
const form = document.querySelector('#myForm');
const formData = FormHelper.getFormData(form);
console.log('Form data:', formData);

// Validate required fields
const validation = FormHelper.validateRequired(form, ['email', 'password']);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}

// Validate email
const isValidEmail = FormHelper.validateEmail('user@example.com');
console.log('Is email valid:', isValidEmail);

// Validate password
const passwordValidation = FormHelper.validatePassword('Password123!', {
  minLength: 8,
  requireNumbers: true,
  requireSpecialChars: true
});
if (!passwordValidation.isValid) {
  console.log('Password errors:', passwordValidation.errors);
}

// Reset form
FormHelper.resetForm(form);

// Serialize form
const serialized = FormHelper.serializeForm(form);
console.log('Serialized form:', serialized);

// Populate form
const userData = {
  email: 'user@example.com',
  name: 'John Doe',
  newsletter: true
};
FormHelper.populateForm(form, userData);
*/

export default FormHelper;