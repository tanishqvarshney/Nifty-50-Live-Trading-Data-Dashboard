'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stock {
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

interface StockTableProps {
  stocks: Stock[];
  loading: boolean;
}

export const StockTable = ({ stocks, loading }: StockTableProps) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Stock; direction: 'asc' | 'desc' } | null>(null);

  const requestSort = (key: keyof Stock) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = React.useMemo(() => {
    let sortableItems = [...stocks];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [stocks, sortConfig]);

  if (loading && stocks.length === 0) {
    return <div className="px-4 md:px-8 pb-8"><div className="h-64 bg-zinc-900 animate-pulse rounded-2xl border border-zinc-800" /></div>;
  }

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-xl font-bold text-white">Nifty 50 Constituents</h2>
          <span className="text-xs text-zinc-500 font-mono">Last refresh: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/80 text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800">
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('symbol')}>Stock</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('price')}>Price</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('change')}>Change</th>
                <th className="px-6 py-4 text-right hidden lg:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('open')}>Open</th>
                <th className="px-6 py-4 text-right hidden xl:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('high')}>High</th>
                <th className="px-6 py-4 text-right hidden xl:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('low')}>Low</th>
                <th className="px-6 py-4 text-right hidden 2xl:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('prevClose')}>Prev Close</th>
                <th className="px-6 py-4 text-right hidden 2xl:table-cell cursor-pointer hover:text-white transition-colors whitespace-nowrap">52W H/L</th>
                <th className="px-6 py-4 text-right hidden md:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('volume')}>Vol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sortedStocks.map((stock) => {
                const isPositive = stock.change >= 0;
                return (
                  <motion.tr 
                    layout
                    key={stock.symbol}
                    className="hover:bg-zinc-800/40 transition-all group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 p-1.5 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-teal-500/50 transition-colors">
                          <img 
                            src={stock.logo} 
                            alt={stock.symbol}
                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${stock.symbol}&background=18181b&color=14b8a6&bold=true`;
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm tracking-tight">{stock.symbol}</div>
                          <div className="text-[10px] text-zinc-500 font-medium uppercase truncate max-w-[120px]">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono text-white text-sm font-bold">
                      ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`px-6 py-5 text-right font-bold tabular-nums`}>
                      <div className={`flex flex-col items-end`}>
                        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(stock.change).toFixed(2)}
                        </div>
                        <div className={`text-[10px] ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isPositive ? '+' : '-'}{Math.abs(stock.percentChange).toFixed(2)}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right text-zinc-400 text-sm font-mono hidden lg:table-cell">
                      ₹{stock.open.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-right text-emerald-500/80 text-sm font-mono hidden xl:table-cell">
                      ₹{stock.high.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-right text-rose-500/80 text-sm font-mono hidden xl:table-cell">
                      ₹{stock.low.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-right text-zinc-400 text-sm font-mono hidden 2xl:table-cell">
                      ₹{stock.prevClose.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-right hidden 2xl:table-cell">
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-[10px] text-emerald-500 font-bold">H: {stock.high52w.toLocaleString()}</div>
                        <div className="text-[10px] text-rose-500 font-bold">L: {stock.low52w.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right text-zinc-500 text-xs font-mono hidden md:table-cell">
                      {(stock.volume / 100000).toFixed(1)}L
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
