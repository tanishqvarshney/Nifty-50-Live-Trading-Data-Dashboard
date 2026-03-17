import { NextResponse, NextRequest } from 'next/server';

// Top 10 Nifty 50 stocks for demonstration
const NIFTY_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'HUL', name: 'Hindustan Unilever' },
  { symbol: 'ITC', name: 'ITC Limited' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel' },
  { symbol: 'L&T', name: 'Larsen & Toubro' },
];

const SECTORS = [
  { name: 'Nifty Bank', price: 44230.50, change: 120.40, percentChange: 0.27 },
  { name: 'Nifty IT', price: 31250.20, change: -45.60, percentChange: -0.15 },
  { name: 'Nifty Auto', price: 15420.80, change: 85.30, percentChange: 0.55 },
  { name: 'Nifty FMCG', price: 52180.40, change: 210.10, percentChange: 0.40 },
];

// Helper to generate random price fluctuations
const getFluctuatedPrice = (basePrice: number) => {
  const fluctuation = (Math.random() - 0.5) * (basePrice * 0.002); // 0.2% fluctuation
  return basePrice + fluctuation;
};

// Data generation for different timeframes
const generateHistoricalData = (currentPrice: number, timeframe: string) => {
  const data = [];
  let points = 50;
  let interval = 5; // minutes for 1D

  switch (timeframe) {
    case '1W': points = 70; interval = 60; break;
    case '1M': points = 30; interval = 1440; break;
    case '3M': points = 90; interval = 1440; break;
    case '1Y': points = 52; interval = 10080; break;
    default: points = 50; interval = 5; break;
  }

  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * interval * 60000);
    const noise = (Math.random() - 0.5) * (currentPrice * 0.02);
    const trend = Math.sin(i / 10) * (currentPrice * 0.01);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', ...(timeframe !== '1D' && { day: 'numeric', month: 'short' }) }),
      price: Number((currentPrice + noise + trend).toFixed(2)),
    });
  }
  return data;
};

// Initial state (simulating real base prices)
let stockData = NIFTY_STOCKS.map((stock, index) => {
  const basePrice = 2500 + index * 150;
  return {
    ...stock,
    price: basePrice,
    open: basePrice - (Math.random() * 10),
    high: basePrice + (Math.random() * 20),
    low: basePrice - (Math.random() * 20),
    prevClose: basePrice - (Math.random() * 15),
    high52w: basePrice * 1.2,
    low52w: basePrice * 0.8,
    change: 0,
    percentChange: 0,
    volume: Math.floor(Math.random() * 1000000) + 500000,
    logo: `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`, // Fallback/demo logos
    lastUpdated: new Date().toISOString(),
  };
});

let niftyIndex = {
  price: 19500,
  change: 0,
  percentChange: 0,
  lastUpdated: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe') || '1D';

  // Update data to simulate live market
  stockData = stockData.map((stock) => {
    const newPrice = getFluctuatedPrice(stock.price);
    const change = newPrice - stock.prevClose;
    const percentChange = (change / stock.prevClose) * 100;
    
    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      high: Math.max(stock.high, newPrice),
      low: Math.min(stock.low, newPrice),
      change: Number(change.toFixed(2)),
      percentChange: Number(percentChange.toFixed(2)),
      lastUpdated: new Date().toISOString(),
    };
  });

  const newNiftyPrice = getFluctuatedPrice(niftyIndex.price);
  const niftyChange = newNiftyPrice - (niftyIndex.price - niftyIndex.change);
  const niftyPercentChange = (niftyChange / (newNiftyPrice - niftyChange)) * 100;

  niftyIndex = {
    price: Number(newNiftyPrice.toFixed(2)),
    change: Number(niftyChange.toFixed(2)),
    percentChange: Number(niftyPercentChange.toFixed(2)),
    lastUpdated: new Date().toISOString(),
  };

  const chartData = generateHistoricalData(niftyIndex.price, timeframe);

  // Market Pulse logic
  const sortedStocks = [...stockData].sort((a, b) => b.percentChange - a.percentChange);
  const topGainers = sortedStocks.slice(0, 3);
  const topLosers = [...sortedStocks].reverse().slice(0, 3);
  
  const advancing = stockData.filter(s => s.change > 0).length;
  const declining = stockData.length - advancing;

  return NextResponse.json({
    niftyIndex,
    stocks: stockData,
    chartData,
    marketPulse: {
      topGainers,
      topLosers,
      advancing,
      declining,
      sectors: SECTORS.map(s => ({
        ...s,
        price: getFluctuatedPrice(s.price).toFixed(2),
      }))
    },
    timestamp: new Date().toISOString(),
  });
}
