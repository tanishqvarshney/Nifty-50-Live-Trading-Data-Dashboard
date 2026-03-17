'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { MarketData } from '@/lib/useStocks';

interface MarketPulseProps {
  data: MarketData['marketPulse'] | undefined;
  loading: boolean;
}

export const MarketPulse = ({ data, loading }: MarketPulseProps) => {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-zinc-900/50 rounded-2xl border border-zinc-800 animate-pulse" />
        ))}
      </div>
    );
  }

  const advanceRatio = (data.advancing / (data.advancing + data.declining)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Top Gainers */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5">
        <div className="flex items-center gap-2 mb-4 text-emerald-400">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-wider text-xs">Top Gainers</h3>
        </div>
        <div className="space-y-3">
          {data.topGainers.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center p-2 rounded-lg bg-zinc-800/30">
              <div>
                <div className="font-bold text-white text-sm">{stock.symbol}</div>
                <div className="text-[10px] text-zinc-500">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-emerald-400">₹{stock.price.toLocaleString()}</div>
                <div className="text-[10px] font-bold text-emerald-500">+{stock.percentChange}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Heat */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-4 text-teal-400">
          <Zap className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-wider text-xs">Market Heat</h3>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <div className="relative w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${advanceRatio}%` }}
              className="absolute left-0 top-0 h-full bg-emerald-500"
            />
          </div>
          <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-tighter">
            <span className="text-emerald-500">{data.advancing} Advancing</span>
            <span className="text-rose-500">{data.declining} Declining</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white italic">
              {advanceRatio > 50 ? 'BULLISH' : 'BEARISH'}
            </div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Sentiment Score: {advanceRatio.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5">
        <div className="flex items-center gap-2 mb-4 text-rose-400">
          <TrendingDown className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-wider text-xs">Top Losers</h3>
        </div>
        <div className="space-y-3">
          {data.topLosers.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center p-2 rounded-lg bg-zinc-800/30">
              <div>
                <div className="font-bold text-white text-sm">{stock.symbol}</div>
                <div className="text-[10px] text-zinc-500">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-rose-400">₹{stock.price.toLocaleString()}</div>
                <div className="text-[10px] font-bold text-rose-500">{stock.percentChange}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
