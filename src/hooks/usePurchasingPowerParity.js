import { useState, useEffect, useCallback } from 'react';

// Cache object to store PPP rates
const PPP_CACHE = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Custom hook to handle purchasing power parity calculations using real-world data
 * @param {number} baseAmount - The base amount in the source currency
 * @param {string} sourceCurrency - The source currency code (e.g., 'USD')
 * @param {string} targetCurrency - The target currency code (e.g., 'INR')
 * @returns {Object} - Returns the converted amount and status
 */
const usePurchasingPowerParity = (baseAmount, sourceCurrency = 'USD', targetCurrency = 'INR') => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate cache key for the currency pair
  const getCacheKey = useCallback((source, target) => `${source}-${target}`, []);

  // Check if the cached rate is still valid
  const isValidCache = useCallback((cacheEntry) => {
    if (!cacheEntry) return false;
    const { timestamp } = cacheEntry;
    return Date.now() - timestamp < CACHE_DURATION;
  }, []);

  // Fetch PPP rate from World Bank API
  const fetchPPPRate = useCallback(async (source, target) => {
    const cacheKey = getCacheKey(source, target);
    const cachedData = PPP_CACHE.get(cacheKey);

    if (isValidCache(cachedData)) {
      return cachedData.rate;
    }

    try {
      // World Bank API endpoint for PPP data
      const response = await fetch(
        `https://api.worldbank.org/v2/country/all/indicator/PA.NUS.PPP?date=latest&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch PPP data');
      }

      const data = await response.json();
      
      if (!data[1] || !Array.isArray(data[1])) {
        throw new Error('Invalid API response format');
      }

      // Find PPP rates for both currencies
      const sourcePPP = data[1].find(item => item.country.id === source)?.value;
      const targetPPP = data[1].find(item => item.country.id === target)?.value;

      if (!sourcePPP || !targetPPP) {
        throw new Error('PPP rates not available for specified currencies');
      }

      // Calculate cross-PPP rate
      const pppRate = targetPPP / sourcePPP;

      // Cache the result
      PPP_CACHE.set(cacheKey, {
        rate: pppRate,
        timestamp: Date.now()
      });

      return pppRate;
    } catch (err) {
      throw new Error(`Failed to fetch PPP rate: ${err.message}`);
    }
  }, [getCacheKey, isValidCache]);

  useEffect(() => {
    const calculatePPP = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!baseAmount) {
          setConvertedAmount(null);
          return;
        }

        const pppRate = await fetchPPPRate(sourceCurrency, targetCurrency);
        const calculated = baseAmount * pppRate;
        setConvertedAmount(calculated);
      } catch (err) {
        setError(err.message || 'Failed to calculate PPP conversion');
      } finally {
        setLoading(false);
      }
    };

    calculatePPP();
  }, [baseAmount, sourceCurrency, targetCurrency, fetchPPPRate]);

  return {
    convertedAmount,
    loading,
    error,
    sourceCurrency,
    targetCurrency
  };
};

export default usePurchasingPowerParity;