import { NextResponse } from 'next/server';

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

// Helper to generate random price fluctuations
const getFluctuatedPrice = (basePrice: number) => {
  const fluctuation = (Math.random() - 0.5) * (basePrice * 0.002); // 0.2% fluctuation
  return basePrice + fluctuation;
};

// Initial state (simulating real base prices)
let stockData = NIFTY_STOCKS.map((stock, index) => ({
  ...stock,
  price: 2500 + index * 150,
  change: 0,
  percentChange: 0,
  volume: Math.floor(Math.random() * 1000000) + 500000,
  lastUpdated: new Date().toISOString(),
}));

let niftyIndex = {
  price: 19500,
  change: 0,
  percentChange: 0,
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  // Update data to simulate live market
  stockData = stockData.map((stock) => {
    const newPrice = getFluctuatedPrice(stock.price);
    const change = newPrice - (stock.price - stock.change);
    const percentChange = (change / (newPrice - change)) * 100;
    
    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
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

  return NextResponse.json({
    niftyIndex,
    stocks: stockData,
    timestamp: new Date().toISOString(),
  });
}
