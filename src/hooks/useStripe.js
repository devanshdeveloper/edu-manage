import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.VITE_STRIPE_PUBLIC_KEY || 'your_stripe_public_key';

/**
 * A custom hook for managing Stripe payments integration.
 * @typedef {Object} UseStripeReturn
 * @property {import('@stripe/stripe-js').Stripe|null} stripe - The Stripe instance
 * @property {boolean} loading - Whether Stripe is currently initializing
 * @property {string|null} error - Any error that occurred during Stripe operations
 * @property {function(number, string): Promise<string>} createPaymentIntent - Creates a new payment intent
 * @property {function(string, string): Promise<import('@stripe/stripe-js').PaymentIntent>} handleCardPayment - Handles card payment confirmation
 * @property {function(import('@stripe/stripe-js').StripeCardElement): Promise<import('@stripe/stripe-js').PaymentMethod>} createPaymentMethod - Creates a new payment method
 *
 * @returns {UseStripeReturn} The Stripe hook interface
 *
 * @example
 * // Basic usage
 * function PaymentComponent() {
 *   const { stripe, loading, error, createPaymentIntent } = useStripe();
 *   
 *   const handlePayment = async () => {
 *     try {
 *       const clientSecret = await createPaymentIntent(1000, 'USD'); // $10.00
 *       // Handle the payment...
 *     } catch (err) {
 *       console.error(err);
 *     }
 *   };
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return <button onClick={handlePayment}>Pay</button>;
 * }
 */
export default function useStripe() {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await loadStripe(STRIPE_PUBLIC_KEY);
        setStripe(stripeInstance);
        setError(null);
      } catch (err) {
        setError('Failed to initialize Stripe');
        console.error('Stripe initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  const createPaymentIntent = async (amount, currency = 'USD') => {
    if (!stripe) {
      throw new Error('Stripe has not been initialized');
    }

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (err) {
      setError('Payment initialization failed');
      throw err;
    }
  };

  const handleCardPayment = async (clientSecret, paymentMethod) => {
    if (!stripe) {
      throw new Error('Stripe has not been initialized');
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      });

      if (error) {
        setError(error.message);
        throw error;
      }

      return paymentIntent;
    } catch (err) {
      setError('Payment failed');
      throw err;
    }
  };

  const createPaymentMethod = async (cardElement) => {
    if (!stripe) {
      throw new Error('Stripe has not been initialized');
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        throw error;
      }

      return paymentMethod;
    } catch (err) {
      setError('Failed to create payment method');
      throw err;
    }
  };

  return {
    stripe,
    loading,
    error,
    createPaymentIntent,
    handleCardPayment,
    createPaymentMethod,
  };
}