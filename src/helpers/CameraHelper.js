class CameraHelper {
  /**
   * Initialize camera stream and create video element
   * @param {object} options - Camera initialization options
   * @param {string} [options.videoElementId] - ID for the video element
   * @param {object} [options.constraints] - Media stream constraints
   * @returns {Promise<HTMLVideoElement>} - Video element with camera stream
   */
  static async initializeCamera(options = {}) {
    try {
      const constraints = options.constraints || {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (!stream) {
        throw new Error("No camera stream available");
      }

      console.log(
        "[useBarcode] Camera stream initialized successfully",
        stream
      );

      const videoElement =
        options.videoElement || this.createVideoElement(options.videoElementId);
      
        videoElement.srcObject = stream;

      return new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          resolve(videoElement);
        };
      });
    } catch (error) {
      console.error("Error initializing camera:", error);
      throw error;
    }
  }

  /**
   * Create a video element with specified attributes
   * @param {string} [id] - ID for the video element
   * @returns {HTMLVideoElement} - Created video element
   */
  static createVideoElement(id = "camera-feed") {
    try {
      const videoElement = document.createElement("video");
      videoElement.id = id;
      videoElement.autoplay = true;
      videoElement.playsInline = true; // Important for iOS
      return videoElement;
    } catch (error) {
      console.error("Error creating video element:", error);
      throw error;
    }
  }

  /**
   * Stop camera stream
   * @param {HTMLVideoElement} videoElement - Video element to stop
   */
  static stopCamera(videoElement) {
    try {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoElement.srcObject = null;
      }
    } catch (error) {
      console.error("Error stopping camera:", error);
      throw error;
    }
  }

  /**
   * Capture image from video stream
   * @param {HTMLVideoElement} videoElement - Video element to capture from
   * @param {object} [options] - Capture options
   * @param {string} [options.format='image/jpeg'] - Image format
   * @param {number} [options.quality=0.92] - Image quality (0 to 1)
   * @returns {string} - Data URL of captured image
   */
  static captureImage(videoElement, options = {}) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0);

      return canvas.toDataURL(
        options.format || "image/jpeg",
        options.quality || 0.92
      );
    } catch (error) {
      console.error("Error capturing image:", error);
      throw error;
    }
  }

  /**
   * Switch between available cameras
   * @param {HTMLVideoElement} videoElement - Current video element
   * @returns {Promise<HTMLVideoElement>} - Video element with new camera stream
   */
  static async switchCamera(videoElement) {
    try {
      const currentStream = videoElement.srcObject;
      const currentTrack = currentStream?.getVideoTracks()[0];
      const currentFacingMode = currentTrack?.getSettings().facingMode;

      const newFacingMode =
        currentFacingMode === "environment" ? "user" : "environment";
      const constraints = {
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      this.stopCamera(videoElement);
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = newStream;

      return new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          resolve(videoElement);
        };
      });
    } catch (error) {
      console.error("Error switching camera:", error);
      throw error;
    }
  }

  /**
   * Check if device has camera support
   * @returns {Promise<boolean>} - True if camera is supported
   */
  static async checkCameraSupport() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some((device) => device.kind === "videoinput");
    } catch (error) {
      console.error("Error checking camera support:", error);
      return false;
    }
  }

  /**
   * Get available camera devices
   * @returns {Promise<MediaDeviceInfo[]>} - Array of available camera devices
   */
  static async getCameraDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter((device) => device.kind === "videoinput");
    } catch (error) {
      console.error("Error getting camera devices:", error);
      throw error;
    }
  }

  /**
   * Apply video constraints to existing stream
   * @param {HTMLVideoElement} videoElement - Video element to update
   * @param {MediaTrackConstraints} constraints - New video constraints
   * @returns {Promise<HTMLVideoElement>} - Updated video element
   */
  static async applyConstraints(videoElement, constraints) {
    try {
      const stream = videoElement.srcObject;
      const videoTrack = stream?.getVideoTracks()[0];

      if (videoTrack) {
        await videoTrack.applyConstraints(constraints);
        return videoElement;
      }
      throw new Error("No video track found");
    } catch (error) {
      console.error("Error applying constraints:", error);
      throw error;
    }
  }
}

/* Usage Examples:

// 1. Initialize camera and create video element
const initCamera = async () => {
  try {
    const video = await CameraHelper.initializeCamera({
      videoElementId: 'my-camera',
      constraints: {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      }
    });
    document.body.appendChild(video);
  } catch (error) {
    console.error('Failed to initialize camera:', error);
  }
};

// 2. Capture image from video stream
const captureImage = (videoElement) => {
  const imageDataUrl = CameraHelper.captureImage(videoElement, {
    format: 'image/jpeg',
    quality: 0.9
  });
  const img = document.createElement('img');
  img.src = imageDataUrl;
  document.body.appendChild(img);
};

// 3. Switch between front and back cameras
const switchCamera = async (videoElement) => {
  try {
    await CameraHelper.switchCamera(videoElement);
  } catch (error) {
    console.error('Failed to switch camera:', error);
  }
};

// 4. Check camera support before initialization
const checkAndInitCamera = async () => {
  const hasCamera = await CameraHelper.checkCameraSupport();
  if (hasCamera) {
    const video = await CameraHelper.initializeCamera();
    document.body.appendChild(video);
  } else {
    console.error('No camera available on this device');
  }
};

// 5. Stop camera when component unmounts
const cleanup = (videoElement) => {
  CameraHelper.stopCamera(videoElement);
};
*/

export default CameraHelper;
