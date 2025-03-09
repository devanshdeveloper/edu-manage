import React, { useEffect } from "react";

/**
 * @typedef {Object} ScriptProps
 * @property {string} src - URL of the script to load
 * @property {boolean} [async=false] - Whether to load the script asynchronously
 * @property {boolean} [defer=false] - Whether to defer script loading
 * @property {string} [id] - Optional ID for the script element
 * @property {string} [type='text/javascript'] - MIME type of the script
 * @property {() => void} [onLoad] - Callback function when script loads successfully
 * @property {(error: Error) => void} [onError] - Callback function when script fails to load
 * @property {Object} [attributes] - Additional HTML attributes to add to the script tag
 */

/**
 * A component for dynamically loading external JavaScript files
 * @param {ScriptProps} props - Component props
 * @returns {null} - This component doesn't render anything visible
 */
const Script = ({
  src,
  async = false,
  defer = false,
  id = "script",
  type = "text/javascript",
  onLoad,
  onError,
  attributes = {},
}) => {
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById(id)) return;

    const script = document.createElement("script");

    // Set required attributes
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.type = type;

    // Set optional id if provided
    if (id) script.id = id;

    // Add any additional attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    // Add event listeners
    script.addEventListener("load", () => {
      if (onLoad) onLoad();
    });

    script.addEventListener("error", (error) => {
      if (onError) onError(error);
    });

    // Append script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script) {
        script.removeEventListener("load", onLoad);
        script.removeEventListener("error", onError);
        document.body.removeChild(script);
      }
    };
  }, [src, async, defer, id, type, onLoad, onError, attributes]);

  return null;
};

export default Script;

/**
 * Usage Examples:
 *
 * 1. Basic script loading:
 * ```jsx
 * import Script from './components/common/Script';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
 *     </div>
 *   );
 * }
 * ```
 *
 * 2. Loading with callbacks:
 * ```jsx
 * function MapComponent() {
 *   const handleScriptLoad = () => {
 *     // Initialize map after Google Maps script loads
 *     new google.maps.Map(document.getElementById('map'), {
 *       center: { lat: -34.397, lng: 150.644 },
 *       zoom: 8
 *     });
 *   };
 *
 *   const handleScriptError = (error) => {
 *     console.error('Failed to load Google Maps:', error);
 *   };
 *
 *   return (
 *     <div>
 *       <div id="map" style={{ height: '400px' }} />
 *       <Script
 *         src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
 *         onLoad={handleScriptLoad}
 *         onError={handleScriptError}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * 3. Loading multiple scripts with dependencies:
 * ```jsx
 * function PaymentForm() {
 *   return (
 *     <div>
 *       // Load Stripe.js first
 *       <Script
 *         src="https://js.stripe.com/v3/"
 *         onLoad={() => console.log('Stripe loaded')}
 *       />
 *       Load custom payment script after Stripe
 *       <Script
 *         src="/js/payment-form.js"
 *         defer
 *         onLoad={() => console.log('Payment form initialized')}
 *       />
 *       <form id="payment-form">
 *         {/* Payment form fields
 *       </form>
 *     </div>
 *   );
 * }
 * ```
 *
 * 4. Loading with custom attributes:
 * ```jsx
 * function Analytics() {
 *   return (
 *     <Script
 *       src="https://www.google-analytics.com/analytics.js"
 *       async
 *       id="ga-script"
 *       attributes={{
 *         'data-site-id': 'GA-XXXXXXXXX',
 *         'data-tracking-type': 'spa',
 *         crossOrigin: 'anonymous'
 *       }}
 *     />
 *   );
 * }
 * ```
 */
