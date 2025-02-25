import useScript from "./useScript";

const useRazorpay = () => {
  const { isLoaded, isError } = useScript({
    src: "https://checkout.razorpay.com/v1/checkout.js",
    id: "razorpay-script",
    async: true,

    onErrorCallback: () => console.error("Failed to load Razorpay SDK"),
  });

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
