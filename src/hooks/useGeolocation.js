import { useState, useEffect } from "react";

/**
 * A custom hook that provides access to the browser's Geolocation API with real-time position tracking.
 * 
 * @param {Object} [options={}] - The Geolocation API options
 * @param {boolean} [options.enableHighAccuracy] - Provides a more accurate position if true
 * @param {number} [options.timeout] - Maximum length of time to wait for a position
 * @param {number} [options.maximumAge] - Maximum age in milliseconds of a possible cached position
 * @returns {Object} An object containing the following:
 * @returns {Object|null} position - The current position with coordinates and metadata
 * @returns {number} position.latitude - The latitude in decimal degrees
 * @returns {number} position.longitude - The longitude in decimal degrees
 * @returns {number} position.accuracy - The accuracy of the position in meters
 * @returns {number|null} position.altitude - The altitude in meters above the WGS84 ellipsoid
 * @returns {number|null} position.altitudeAccuracy - The accuracy of the altitude in meters
 * @returns {number|null} position.heading - The heading in degrees clockwise from true north
 * @returns {number|null} position.speed - The speed in meters per second
 * @returns {number} position.timestamp - The timestamp of the position
 * @returns {string|null} error - Error message if geolocation fails
 * @returns {boolean} loading - Whether the hook is currently fetching the position
 */
const useGeolocation = (options = {}) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let watchId;

    // Success handler for geolocation API
    const handleSuccess = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        altitudeAccuracy: pos.coords.altitudeAccuracy,
        heading: pos.coords.heading,
        speed: pos.coords.speed,
        timestamp: pos.timestamp,
      });
      setLoading(false);
      setError(null);
    };

    // Error handler for geolocation API
    const handleError = (error) => {
      setError(error.message);
      setLoading(false);
    };

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );

    // Watch position if supported
    watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // Cleanup
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  return { position, error, loading };
};

export default useGeolocation;
