'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  lastUpdated: string;
}

interface MarketData {
  niftyIndex: {
    price: number;
    change: number;
    percentChange: number;
    lastUpdated: string;
  };
  stocks: Stock[];
}

export const useStocks = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/stocks');
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stocks:', err);
      // Fallback to error state only if we have no data at all
      if (!data) setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refresh: fetchData };
};
