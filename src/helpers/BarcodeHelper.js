import jsQR from 'jsqr';
import CameraHelper from './CameraHelper';

class BarcodeHelper {
  /**
   * Initialize barcode scanner with camera
   * @param {object} options - Scanner initialization options
   * @param {string} [options.videoElementId] - ID for the video element
   * @param {object} [options.constraints] - Media stream constraints
   * @returns {Promise<HTMLVideoElement>} - Video element with camera stream
   */
  static async initializeScanner(options = {}) {
    try {
      return await CameraHelper.initializeCamera(options);
    } catch (error) {
      console.error('Error initializing barcode scanner:', error);
      throw error;
    }
  }

  /**
   * Scan for barcode from video stream
   * @param {HTMLVideoElement} videoElement - Video element to scan from
   * @returns {Promise<string|null>} - Decoded barcode data or null if not found
   */
  static async scanBarcode(videoElement) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      return code ? code.data : null;
    } catch (error) {
      console.error('Error scanning barcode:', error);
      return null;
    }
  }

  /**
   * Start continuous barcode scanning
   * @param {HTMLVideoElement} videoElement - Video element to scan from
   * @param {function} onScan - Callback function when barcode is detected
   * @param {object} [options] - Scanning options
   * @param {number} [options.scanInterval=100] - Interval between scans in milliseconds
   * @returns {number} - Interval ID for stopping the scan
   */
  static startContinuousScan(videoElement, onScan, options = {}) {
    const scanInterval = options.scanInterval || 100;

    return setInterval(async () => {
      const barcodeData = await this.scanBarcode(videoElement);
      if (barcodeData) {
        onScan(barcodeData);
      }
    }, scanInterval);
  }

  /**
   * Stop continuous barcode scanning
   * @param {number} intervalId - Interval ID from startContinuousScan
   */
  static stopContinuousScan(intervalId) {
    clearInterval(intervalId);
  }

  /**
   * Check if the device supports barcode scanning
   * @returns {Promise<boolean>} - True if scanning is supported
   */
  static async checkScannerSupport() {
    return await CameraHelper.checkCameraSupport();
  }

  /**
   * Generate a QR code data URL
   * @param {string} data - Data to encode in QR code
   * @param {object} [options] - QR code options
   * @param {number} [options.size=200] - Size of QR code in pixels
   * @param {string} [options.errorCorrectionLevel='M'] - Error correction level (L,M,Q,H)
   * @returns {Promise<string>} - Data URL of generated QR code
   */
  static async generateQRCode(data, options = {}) {
    try {
      const QRCode = (await import('qrcode')).default;
      const opts = {
        errorCorrectionLevel: options.errorCorrectionLevel || 'M',
        width: options.size || 200,
        margin: 1
      };
      return await QRCode.toDataURL(data, opts);
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  }

  /**
   * Parse barcode data based on format
   * @param {string} data - Raw barcode data
   * @returns {object} - Parsed barcode data
   */
  static parseBarcode(data) {
    try {
      // Check for common barcode formats
      if (this.isURL(data)) {
        return { type: 'URL', value: data };
      }
      if (this.isEmail(data)) {
        return { type: 'EMAIL', value: data };
      }
      if (this.isPhoneNumber(data)) {
        return { type: 'PHONE', value: data };
      }
      if (this.isVCard(data)) {
        return { type: 'VCARD', value: this.parseVCard(data) };
      }
      return { type: 'TEXT', value: data };
    } catch (error) {
      console.error('Error parsing barcode:', error);
      return { type: 'UNKNOWN', value: data };
    }
  }

  /**
   * Check if string is a valid URL
   * @private
   * @param {string} str - String to check
   * @returns {boolean} - True if valid URL
   */
  static isURL(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if string is a valid email
   * @private
   * @param {string} str - String to check
   * @returns {boolean} - True if valid email
   */
  static isEmail(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  /**
   * Check if string is a phone number
   * @private
   * @param {string} str - String to check
   * @returns {boolean} - True if phone number
   */
  static isPhoneNumber(str) {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(str);
  }

  /**
   * Check if string is a vCard
   * @private
   * @param {string} str - String to check
   * @returns {boolean} - True if vCard
   */
  static isVCard(str) {
    return str.startsWith('BEGIN:VCARD') && str.endsWith('END:VCARD');
  }

  /**
   * Parse vCard data
   * @private
   * @param {string} vcard - vCard string
   * @returns {object} - Parsed vCard data
   */
  static parseVCard(vcard) {
    const lines = vcard.split('\n');
    const data = {};

    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        data[key] = value;
      }
    });

    return data;
  }
}

/* Usage Examples:

// 1. Initialize scanner and start scanning
const startScanning = async () => {
  try {
    const video = await BarcodeHelper.initializeScanner({
      videoElementId: 'barcode-scanner'
    });
    document.body.appendChild(video);

    const intervalId = BarcodeHelper.startContinuousScan(video, (barcodeData) => {
      console.log('Scanned barcode:', BarcodeHelper.parseBarcode(barcodeData));
    });

    // Stop scanning after 1 minute
    setTimeout(() => {
      BarcodeHelper.stopContinuousScan(intervalId);
      CameraHelper.stopCamera(video);
    }, 60000);
  } catch (error) {
    console.error('Failed to start scanning:', error);
  }
};

// 2. Generate QR code
const generateQR = async () => {
  try {
    const qrDataUrl = await BarcodeHelper.generateQRCode('https://example.com', {
      size: 300,
      errorCorrectionLevel: 'H'
    });
    const img = document.createElement('img');
    img.src = qrDataUrl;
    document.body.appendChild(img);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
  }
};

// 3. Single barcode scan
const scanOnce = async (videoElement) => {
  try {
    const barcodeData = await BarcodeHelper.scanBarcode(videoElement);
    if (barcodeData) {
      const parsedData = BarcodeHelper.parseBarcode(barcodeData);
      console.log('Scanned data:', parsedData);
    }
  } catch (error) {
    console.error('Failed to scan barcode:', error);
  }
};

// 4. Check scanner support
const checkSupport = async () => {
  const isSupported = await BarcodeHelper.checkScannerSupport();
  if (isSupported) {
    console.log('Barcode scanning is supported on this device');
  } else {
    console.error('Barcode scanning is not supported on this device');
  }
};
*/

export default BarcodeHelper;