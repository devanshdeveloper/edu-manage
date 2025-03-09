import useScript from "./useScript";

/**
 * @typedef {Object} RazorpayPrefill
 * @property {string} [name] - Customer name
 * @property {string} [email] - Customer email
 * @property {string} [contact] - Customer contact number
 */

/**
 * @typedef {Object} RazorpayPaymentOptions
 * @property {string} key - Your Razorpay API key
 * @property {number} amount - Amount to be paid (in smallest currency unit)
 * @property {string} [currency="INR"] - Currency code
 * @property {string} name - Business/site name
 * @property {string} description - Payment description
 * @property {string} [image] - URL of your logo
 * @property {string} orderId - Unique order identifier
 * @property {RazorpayPrefill} [prefill] - Pre-filled customer details
 * @property {Object} [notes] - Key-value pair for additional information
 * @property {Object} [theme] - Customization options for the checkout form
 */

/**
 * @typedef {Object} RazorpayHookResult
 * @property {boolean} isLoaded - Whether Razorpay SDK is loaded
 * @property {boolean} isError - Whether there was an error loading the SDK
 * @property {(options: RazorpayPaymentOptions) => Promise<any>} handlePayment - Function to initiate payment
 */

/**
 * Custom hook for integrating Razorpay payment gateway
 * @returns {RazorpayHookResult} Object containing Razorpay integration utilities
 */
const useRazorpay = () => {
  const { isLoaded, isError } = useScript({
    src: "https://checkout.razorpay.com/v1/checkout.js",
    id: "razorpay-script",
    async: true,
    onErrorCallback: () => console.error("Failed to load Razorpay SDK"),
  });

  /**
   * Initiates the Razorpay payment flow
   * @param {RazorpayPaymentOptions} options - Configuration for the payment
   * @returns {Promise<any>} Resolves with payment success details or rejects with error
   */
  const handlePayment = async ({
    key,
    amount,
    currency,
    name,
    description,
    image,
    orderId,
    prefill,
    notes,
    ...options
  }) => {
    if (!isLoaded) {
      throw new Error("Razorpay SDK is not loaded yet.");
    }

    return new Promise((resolve, reject) => {
      const defaultOptions = {
        key,
        amount,
        name,
        description,
        image,
        order_id: orderId,
        handler: (response) => resolve(response),
        prefill: {
          name: prefill?.name || "",
          email: prefill?.email || "",
          contact: prefill?.contact || "",
        },
        notes: notes || {},
        theme: {
          color: "#3399cc",
        },
        currency: "INR",
        ...options,
      };

      const rzp = new window.Razorpay(defaultOptions);
      rzp.on("payment.failed", (response) => reject(response));
      rzp.open();
    });
  };

  return { isLoaded, isError, handlePayment };
};

export default useRazorpay;

/* Usage Examples:

1. Basic payment integration:
```jsx
function PaymentButton({ orderId, amount }) {
  const { handlePayment, isLoaded, isError } = useRazorpay();

  const processPayment = async () => {
    try {
      const response = await handlePayment({
        key: "YOUR_RAZORPAY_KEY",
        amount: amount * 100, // Convert to smallest currency unit
        currency: "INR",
        name: "Your Company Name",
        description: "Order Payment",
        image: "https://your-logo-url.com/logo.png",
        orderId: orderId,
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        }
      });
      
      console.log("Payment successful", response);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  if (isError) return <div>Failed to load payment system</div>;
  if (!isLoaded) return <div>Loading payment system...</div>;

  return (
    <button onClick={processPayment}>
      Pay Now
    </button>
  );
}
```

2. Advanced usage with custom theme and notes:
```jsx
function CustomPaymentForm({ orderDetails }) {
  const { handlePayment, isLoaded } = useRazorpay();

  const initiatePayment = async () => {
    if (!isLoaded) return;

    try {
      const response = await handlePayment({
        key: process.env.RAZORPAY_KEY,
        amount: orderDetails.amount,
        name: "Premium Subscription",
        description: `Order #${orderDetails.id}`,
        orderId: orderDetails.razorpayOrderId,
        theme: {
          color: "#6772E5",
        },
        notes: {
          shipping_address: orderDetails.shippingAddress,
          order_type: "subscription"
        },
        prefill: {
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          contact: orderDetails.customerPhone
        }
      });

      await updateOrderStatus(orderDetails.id, response);
    } catch (error) {
      handlePaymentError(error);
    }
  };

  return (
    <div className="payment-form">
      <h2>Complete Your Purchase</h2>
      <button 
        onClick={initiatePayment}
        disabled={!isLoaded}
      >
        {isLoaded ? "Pay Now" : "Loading..."}
      </button>
    </div>
  );
}
```
*/
