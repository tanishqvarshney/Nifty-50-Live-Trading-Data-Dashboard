'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  high52w: number;
  low52w: number;
  change: number;
  percentChange: number;
  volume: number;
  logo: string;
  lastUpdated: string;
}

export interface MarketData {
  niftyIndex: {
    price: number;
    change: number;
    percentChange: number;
    lastUpdated: string;
  };
  stocks: Stock[];
  chartData: Array<{ time: string, price: number }>;
  marketPulse: {
    topGainers: Stock[];
    topLosers: Stock[];
    advancing: number;
    declining: number;
    sectors: Array<{ name: string, price: string, change: number, percentChange: number }>;
  };
}

export const useStocks = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('1D');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/stocks?timeframe=${timeframe}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stocks:', err);
      if (!data) setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [timeframe]); // Re-fetch when timeframe changes

  return { data, loading, error, refresh: fetchData, timeframe, setTimeframe };
};
