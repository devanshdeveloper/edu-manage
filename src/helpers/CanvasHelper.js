class CanvasHelper {
  /**
   * Create a new canvas element with specified dimensions
   * @param {number} width - Canvas width in pixels
   * @param {number} height - Canvas height in pixels
   * @returns {HTMLCanvasElement} - New canvas element
   */
  static createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  /**
   * Get 2D rendering context from canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @returns {CanvasRenderingContext2D|null} - 2D rendering context
   */
  static getContext2D(canvas) {
    return canvas.getContext('2d');
  }

  /**
   * Clear the entire canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   */
  static clearCanvas(canvas) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Draw an image on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {HTMLImageElement} image - Image to draw
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} [width] - Optional width to scale image
   * @param {number} [height] - Optional height to scale image
   */
  static drawImage(canvas, image, x, y, width, height) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      if (width && height) {
        ctx.drawImage(image, x, y, width, height);
      } else {
        ctx.drawImage(image, x, y);
      }
    }
  }

  /**
   * Draw text on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {string} text - Text to draw
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {object} [options] - Text drawing options
   */
  static drawText(canvas, text, x, y, options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      ctx.font = options.font || '16px Arial';
      ctx.fillStyle = options.color || 'black';
      ctx.textAlign = options.align || 'start';
      ctx.fillText(text, x, y);
    }
  }

  /**
   * Convert canvas to data URL
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {string} [type='image/png'] - Image type
   * @param {number} [quality=0.92] - Image quality (0 to 1)
   * @returns {string} - Data URL
   */
  static toDataURL(canvas, type = 'image/png', quality = 0.92) {
    return canvas.toDataURL(type, quality);
  }

  /**
   * Resize canvas maintaining aspect ratio
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   */
  static resizeCanvas(canvas, maxWidth, maxHeight) {
    let width = canvas.width;
    let height = canvas.height;

    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
  }

  /**
   * Load an image and return a promise
   * @param {string} src - Image source URL
   * @returns {Promise<HTMLImageElement>} - Promise resolving to loaded image
   */
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  /**
   * Draw a rectangle on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} width - Rectangle width
   * @param {number} height - Rectangle height
   * @param {object} [options] - Drawing options
   */
  static drawRectangle(canvas, x, y, width, height, options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      ctx.fillStyle = options.fillStyle || 'black';
      ctx.strokeStyle = options.strokeStyle || 'black';
      ctx.lineWidth = options.lineWidth || 1;
      
      if (options.fill !== false) {
        ctx.fillRect(x, y, width, height);
      }
      if (options.stroke !== false) {
        ctx.strokeRect(x, y, width, height);
      }
    }
  }

  /**
   * Draw a circle on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {number} x - Center X coordinate
   * @param {number} y - Center Y coordinate
   * @param {number} radius - Circle radius
   * @param {object} [options] - Drawing options
   */
  static drawCircle(canvas, x, y, radius, options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = options.fillStyle || 'black';
      ctx.strokeStyle = options.strokeStyle || 'black';
      ctx.lineWidth = options.lineWidth || 1;
      
      if (options.fill !== false) {
        ctx.fill();
      }
      if (options.stroke !== false) {
        ctx.stroke();
      }
    }
  }

  /**
   * Draw a line on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {number} x1 - Start X coordinate
   * @param {number} y1 - Start Y coordinate
   * @param {number} x2 - End X coordinate
   * @param {number} y2 - End Y coordinate
   * @param {object} [options] - Drawing options
   */
  static drawLine(canvas, x1, y1, x2, y2, options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = options.strokeStyle || 'black';
      ctx.lineWidth = options.lineWidth || 1;
      ctx.lineCap = options.lineCap || 'butt';
      ctx.stroke();
    }
  }

  /**
   * Draw a polygon on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {Array<{x: number, y: number}>} points - Array of points
   * @param {object} [options] - Drawing options
   */
  static drawPolygon(canvas, points, options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx && points.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.closePath();
      ctx.fillStyle = options.fillStyle || 'black';
      ctx.strokeStyle = options.strokeStyle || 'black';
      ctx.lineWidth = options.lineWidth || 1;
      
      if (options.fill !== false) {
        ctx.fill();
      }
      if (options.stroke !== false) {
        ctx.stroke();
      }
    }
  }

  /**
   * Draw a gradient on canvas
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {Array<string>} colors - Array of colors
   * @param {string} [type='linear'] - Gradient type ('linear' or 'radial')
   * @param {object} [options] - Gradient options
   */
  static drawGradient(canvas, colors, type = 'linear', options = {}) {
    const ctx = this.getContext2D(canvas);
    if (ctx && colors.length >= 2) {
      let gradient;
      
      if (type === 'radial') {
        const { x = canvas.width / 2, y = canvas.height / 2, innerRadius = 0, outerRadius = canvas.width / 2 } = options;
        gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
      } else {
        const { x1 = 0, y1 = 0, x2 = canvas.width, y2 = canvas.height } = options;
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      }
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}


/* Usage Examples:

// Create a new canvas
const canvas = CanvasHelper.createCanvas(800, 600);
document.body.appendChild(canvas);

// Draw text
CanvasHelper.drawText(canvas, 'Hello World', 100, 100, {
  font: '24px Arial',
  color: 'blue',
  align: 'center'
});

// Load and draw image
const image = new Image();
image.onload = () => {
  CanvasHelper.drawImage(canvas, image, 0, 0, 400, 300);
};
image.src = 'path/to/image.jpg';

// Clear canvas
CanvasHelper.clearCanvas(canvas);

// Resize canvas
CanvasHelper.resizeCanvas(canvas, 1200, 800);

// Export canvas as data URL
const dataURL = CanvasHelper.toDataURL(canvas, 'image/jpeg', 0.8);
*/

export default CanvasHelper;