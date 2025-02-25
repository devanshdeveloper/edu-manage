class ColorHelper {
  /**
   * Convert RGB to HEX color
   * @param {number} r - Red (0-255)
   * @param {number} g - Green (0-255)
   * @param {number} b - Blue (0-255)
   * @returns {string} - HEX color code
   */
  static rgbToHex(r, g, b) {
    return '#' + [r, g, b]
      .map(x => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  }

  /**
   * Convert HEX to RGB color
   * @param {string} hex - HEX color code
   * @returns {object|null} - RGB color object or null if invalid
   */
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Validate HEX color code
   * @param {string} hex - HEX color code
   * @returns {boolean} - True if valid HEX color
   */
  static isValidHex(hex) {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  /**
   * Get contrasting text color (black or white) for a background color
   * @param {string} bgColor - Background color in HEX
   * @returns {string} - '#000000' for light backgrounds, '#FFFFFF' for dark
   */
  static getContrastColor(bgColor) {
    const rgb = this.hexToRgb(bgColor);
    if (!rgb) return '#000000';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  /**
   * Lighten a color by a percentage
   * @param {string} hex - HEX color code
   * @param {number} percent - Percentage to lighten (0-100)
   * @returns {string} - Lightened color in HEX
   */
  static lighten(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const amount = Math.floor((255 - rgb.r) * (percent / 100));
    return this.rgbToHex(
      rgb.r + amount,
      rgb.g + amount,
      rgb.b + amount
    );
  }

  /**
   * Darken a color by a percentage
   * @param {string} hex - HEX color code
   * @param {number} percent - Percentage to darken (0-100)
   * @returns {string} - Darkened color in HEX
   */
  static darken(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const amount = Math.floor(rgb.r * (percent / 100));
    return this.rgbToHex(
      rgb.r - amount,
      rgb.g - amount,
      rgb.b - amount
    );
  }

  /**
   * Generate a random color
   * @returns {string} - Random HEX color code
   */
  static random() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }
}

/* Usage Examples:

// Convert RGB to HEX
const hexColor = ColorHelper.rgbToHex(255, 128, 0); // Returns '#FF8000'

// Convert HEX to RGB
const rgbColor = ColorHelper.hexToRgb('#FF8000');
// Returns { r: 255, g: 128, b: 0 }

// Validate HEX color
const isValid = ColorHelper.isValidHex('#FF8000'); // Returns true
const isInvalid = ColorHelper.isValidHex('invalid'); // Returns false

// Get contrasting text color
const textColor = ColorHelper.getContrastColor('#FFFFFF'); // Returns '#000000'
const darkTextColor = ColorHelper.getContrastColor('#000000'); // Returns '#FFFFFF'

// Lighten color
const lighterColor = ColorHelper.lighten('#FF8000', 20);

// Darken color
const darkerColor = ColorHelper.darken('#FF8000', 20);

// Generate random color
const randomColor = ColorHelper.random(); // Returns random HEX color
*/

export default ColorHelper;