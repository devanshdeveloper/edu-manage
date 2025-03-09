class ValidatorHelper {
  /**
   * Main validation method that processes an array of validation rules
   * @param {*} value - The value to validate
   * @param {Array<Function>} rules - Array of validation functions to apply
   * @returns {string|null} - Error message if validation fails, null if passes
   */
  static helper(...rules) {
    if (!Array.isArray(rules) || rules.length === 0) {
      return () => null;
    }

    return (value) => {
      try {
        for (const rule of rules) {
          if (typeof rule !== "function") {
            console.warn("Invalid validation rule: rule must be a function");
            continue;
          }

          const message = rule(value);
          if (message) return message;
        }
        return null;
      } catch (error) {
        console.error("Validation error:", error);
        return "Validation failed";
      }
    };
  }

  /**
   * Required field validation rule
   * @param {string} message - Custom error message
   * @returns {function} - Validation function
   */
  static required(message = "This field is required") {
    return (value) => {
      if (value === undefined || value === null || value === "") {
        return message;
      }
      return null;
    };
  }

  /**
   * Email validation rule
   * @param {string} message - Custom error message
   * @returns {function} - Validation function
   */
  static email(message = "Please enter a valid email address") {
    return (value) => {
      if (!value) return null; // Skip if empty (use required rule for empty check)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : message;
    };
  }

  /**
   * Minimum length validation rule
   * @param {number} length - Minimum length required
   * @param {string} message - Custom error message
   * @returns {function} - Validation function
   */
  static minLength(length, message = `Must be at least ${length} characters`) {
    return (value) => {
      if (!value) return null; // Skip if empty (use required rule for empty check)
      return String(value).length >= length ? null : message;
    };
  }

  /**
   * Maximum length validation rule
   * @param {number} length - Maximum length allowed
   * @param {string} message - Custom error message
   * @returns {function} - Validation function
   */
  static maxLength(length, message = `Must not exceed ${length} characters`) {
    return (value) => {
      if (!value) return null; // Skip if empty (use required rule for empty check)
      return String(value).length <= length ? null : message;
    };
  }

  /**
   * Pattern matching validation rule
   * @param {RegExp} pattern - Regular expression to test
   * @param {string} message - Custom error message
   * @returns {function} - Validation function
   */
  static pattern(pattern, message = "Invalid format") {
    return (value) => {
      if (!value) return null; // Skip if empty (use required rule for empty check)
      return pattern.test(value) ? null : message;
    };
  }

  /**
   * Custom validation rule
   * @param {function} validateFn - Custom validation function
   * @param {string} message - Error message
   * @returns {function} - Validation function
   */
  static custom(validateFn, message = "Validation failed") {
    return (value) => {
      return validateFn(value) ? null : message;
    };
  }
}

/* Usage Example:
const nameValidation = ValidatorHelper.helper(
  ValidatorHelper.required('Name is required'),
  ValidatorHelper.minLength(2, 'Name must be at least 2 characters'),
  ValidatorHelper.maxLength(50, 'Name must not exceed 50 characters')
);

const emailValidation = ValidatorHelper.helper(
  ValidatorHelper.required('Email is required'),
  ValidatorHelper.email('Please enter a valid email address')
);

const passwordValidation = ValidatorHelper.helper(
  ValidatorHelper.required('Password is required'),
  ValidatorHelper.minLength(8, 'Password must be at least 8 characters'),
  ValidatorHelper.pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain uppercase, lowercase, number and special character'
  )
);
*/

export default ValidatorHelper;
