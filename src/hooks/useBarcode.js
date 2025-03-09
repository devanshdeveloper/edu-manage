/**
 * @typedef {Object} BarcodeResult
 * @property {string} type - The type of barcode data (URL, EMAIL, PHONE, VCARD, TEXT, UNKNOWN)
 * @property {string|Object} value - The decoded value of the barcode
 */

/**
 * @typedef {Object} UseBarcodeReturn
 * @property {boolean} isScanning - Whether the barcode scanner is currently active
 * @property {boolean} isLoading - Whether the scanner is initializing
 * @property {BarcodeResult|null} scanResult - The result of the barcode scan
 * @property {string|null} error - Any error message that occurred during scanning
 * @property {React.RefObject<HTMLVideoElement>} videoRef - Reference to the video element
 * @property {() => Promise<void>} startScanning - Function to start the barcode scanner
 * @property {() => void} stopScanning - Function to stop the barcode scanner
 * @property {() => void} resetScan - Function to reset the scan state
 * @property {() => void} restartScanning - Function to restart the scanning process
 */

import { useCallback, useRef, useState } from "react";
import BarcodeHelper from "../helpers/BarcodeHelper";
import CameraHelper from "../helpers/CameraHelper";

/**
 * A custom hook for handling barcode scanning functionality
 * @returns {UseBarcodeReturn} An object containing barcode scanning state and controls
 */
export default function useBarcode() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef();
  const scanIntervalRef = useRef(null);

  const startScanning = useCallback(async () => {
    console.log("[useBarcode] Starting barcode scanning...");
    try {
      setError(null);
      setIsLoading(true);
      setIsScanning(true);

      // Check if scanning is supported
      const isSupported = await BarcodeHelper.checkScannerSupport();
      console.log("[useBarcode] Scanner support check:", isSupported);

      if (!isSupported) {
        throw new Error("Barcode scanning is not supported on this device");
      }

      // Initialize scanner
      const video = await BarcodeHelper.initializeScanner({
        videoElement: videoRef?.current,
        constraints: {
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
      });
      console.log("[useBarcode] Scanner initialized successfully");

      // Start continuous scanning
      const intervalId = BarcodeHelper.startContinuousScan(
        video,
        (barcodeData) => {
          console.log("[useBarcode] Barcode detected:", barcodeData);
          const parsedData = BarcodeHelper.parseBarcode(barcodeData);
          setScanResult(parsedData);
          stopScanning(); // Stop scanning after successful detection
        }
      );

      scanIntervalRef.current = intervalId;
    } catch (err) {
      console.error("[useBarcode] Error:", err);
      setError(err.message);
      setIsScanning(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopScanning = useCallback(() => {
    console.log("[useBarcode] Stopping barcode scanning...");
    if (scanIntervalRef.current) {
      BarcodeHelper.stopContinuousScan(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    CameraHelper.stopCamera(videoRef?.current);
    setIsScanning(false);
  }, []);

  const resetScan = useCallback(() => {
    console.log("[useBarcode] Resetting scan state...");
    setScanResult(null);
    setError(null);
  }, []);

  const restartScanning = useCallback(() => {
    console.log("[useBarcode] restartScanning...");
    stopScanning();
    resetScan();
    startScanning();
  }, []);

  return {
    isScanning,
    isLoading,
    scanResult,
    error,
    videoRef,
    startScanning,
    stopScanning,
    resetScan,
    restartScanning,
  };
}

/* Usage Example:

import { useBarcode } from './hooks/useBarcode';

function BarcodeScanner() {
  const {
    isScanning,
    isLoading,
    scanResult,
    error,
    videoRef,
    startScanning,
    stopScanning,
    restartScanning
  } = useBarcode();

  return (
    <div>
      {error && <div className="error">{error}</div>}
      
      <div className="video-container">
        <video ref={videoRef} />
      </div>

      {scanResult && (
        <div>
          <p>Type: {scanResult.type}</p>
          <p>Value: {scanResult.value}</p>
        </div>
      )}

      {!isScanning ? (
        <button onClick={startScanning} disabled={isLoading}>
          {isLoading ? 'Initializing...' : 'Start Scanning'}
        </button>
      ) : (
        <button onClick={stopScanning}>Stop Scanning</button>
      )}

      {scanResult && (
        <button onClick={restartScanning}>Scan Again</button>
      )}
    </div>
  );
}
*/
