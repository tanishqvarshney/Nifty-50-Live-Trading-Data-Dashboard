'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Clock } from 'lucide-react';

export const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-4 md:px-8 bg-zinc-950 border-b border-zinc-800 gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-500 rounded-lg">
          <TrendingUp className="text-black w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Nifty 50 <span className="text-teal-400">Live Dashboard</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Real-time market analytics by Tanishq Varshney</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4 text-teal-500" />
          <span className="text-sm font-mono">{time.toLocaleTimeString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-zinc-800 hidden md:block" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Market Open</span>
        </div>
      </div>
    </header>
  );
};
