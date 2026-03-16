'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketOverviewProps {
  data: {
    price: number;
    change: number;
    percentChange: number;
  } | null;
  loading: boolean;
}

export const MarketOverview = ({ data, loading }: MarketOverviewProps) => {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-zinc-900 animate-pulse rounded-2xl border border-zinc-800" />
        ))}
      </div>
    );
  }

  const isPositive = data.change >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-teal-500/30 transition-colors group"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-teal-500/10 transition-colors">
            <Activity className="text-teal-500 w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Index Value</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-zinc-400 font-medium">Nifty 50</h3>
          <div className="text-3xl font-bold text-white tabular-nums">
            {data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
            {isPositive ? (
              <ArrowUpRight className="text-emerald-500 w-5 h-5" />
            ) : (
              <ArrowDownRight className="text-rose-500 w-5 h-5" />
            )}
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Daily Change</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-zinc-400 font-medium">Absolute</h3>
          <div className={`text-3xl font-bold tabular-nums ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? '+' : ''}{data.change.toFixed(2)}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
            <span className="font-bold text-sm">%</span>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Percentage</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-zinc-400 font-medium">Growth</h3>
          <div className={`text-3xl font-bold tabular-nums ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? '+' : ''}{data.percentChange.toFixed(2)}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};
