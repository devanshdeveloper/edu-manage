class DateHelper {
  /**
   * Format a date using specified format string
   * @param {Date|string|number} date - Date to format
   * @param {string} [format='YYYY-MM-DD'] - Format string
   * @returns {string} - Formatted date string
   */
  static format(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return format
      .replace('YYYY', year.toString())
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('HH', hours.toString().padStart(2, '0'))
      .replace('mm', minutes.toString().padStart(2, '0'))
      .replace('ss', seconds.toString().padStart(2, '0'));
  }

  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {Date|string|number} date - Date to compare
   * @returns {string} - Relative time string
   */
  static getRelativeTime(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 365) {
      return `${Math.floor(days / 365)} years ago`;
    } else if (days > 30) {
      return `${Math.floor(days / 30)} months ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  }

  /**
   * Add time to a date
   * @param {Date|string|number} date - Base date
   * @param {number} amount - Amount to add
   * @param {string} unit - Unit (years|months|days|hours|minutes|seconds)
   * @returns {Date} - New date
   */
  static add(date, amount, unit) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();

    switch (unit) {
      case 'years':
        d.setFullYear(d.getFullYear() + amount);
        break;
      case 'months':
        d.setMonth(d.getMonth() + amount);
        break;
      case 'days':
        d.setDate(d.getDate() + amount);
        break;
      case 'hours':
        d.setHours(d.getHours() + amount);
        break;
      case 'minutes':
        d.setMinutes(d.getMinutes() + amount);
        break;
      case 'seconds':
        d.setSeconds(d.getSeconds() + amount);
        break;
    }

    return d;
  }

  /**
   * Check if a date is between two other dates
   * @param {Date|string|number} date - Date to check
   * @param {Date|string|number} start - Start date
   * @param {Date|string|number} end - End date
   * @returns {boolean} - True if date is between start and end
   */
  static isBetween(date, start, end) {
    const d = new Date(date).getTime();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    return d >= s && d <= e;
  }

  /**
   * Get start of a time unit for a date
   * @param {Date|string|number} date - Date to process
   * @param {string} unit - Unit (year|month|week|day)
   * @returns {Date} - Start of unit
   */
  static startOf(date, unit) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();

    switch (unit) {
      case 'year':
        d.setMonth(0, 1);
        d.setHours(0, 0, 0, 0);
        break;
      case 'month':
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        break;
      case 'week':
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        break;
      case 'day':
        d.setHours(0, 0, 0, 0);
        break;
    }

    return d;
  }

  /**
   * Get end of a time unit for a date
   * @param {Date|string|number} date - Date to process
   * @param {string} unit - Unit (year|month|week|day)
   * @returns {Date} - End of unit
   */
  static endOf(date, unit) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();

    switch (unit) {
      case 'year':
        d.setMonth(11, 31);
        d.setHours(23, 59, 59, 999);
        break;
      case 'month':
        d.setMonth(d.getMonth() + 1, 0);
        d.setHours(23, 59, 59, 999);
        break;
      case 'week':
        d.setDate(d.getDate() - d.getDay() + 6);
        d.setHours(23, 59, 59, 999);
        break;
      case 'day':
        d.setHours(23, 59, 59, 999);
        break;
    }

    return d;
  }
}

/* Usage Examples:

// Format date
const now = new Date();
const formatted = DateHelper.format(now, 'YYYY-MM-DD HH:mm:ss');
console.log(formatted); // e.g., "2024-01-20 15:30:45"

// Get relative time
const pastDate = new Date('2024-01-01');
const relative = DateHelper.getRelativeTime(pastDate);
console.log(relative); // e.g., "20 days ago"

// Add time
const futureDate = DateHelper.add(now, 2, 'days');
console.log(DateHelper.format(futureDate)); // Date 2 days from now

// Check if date is between
const start = new Date('2024-01-01');
const end = new Date('2024-12-31');
const isInYear = DateHelper.isBetween(now, start, end);
console.log(isInYear); // true if current date is in 2024

// Get start/end of period
const monthStart = DateHelper.startOf(now, 'month');
const monthEnd = DateHelper.endOf(now, 'month');
console.log(DateHelper.format(monthStart)); // First day of current month
console.log(DateHelper.format(monthEnd)); // Last day of current month
*/

export default DateHelper;