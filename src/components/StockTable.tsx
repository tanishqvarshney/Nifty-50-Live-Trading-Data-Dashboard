'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
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
    return <div className="p-8"><div className="h-64 bg-zinc-900 animate-pulse rounded-2xl border border-zinc-800" /></div>;
  }

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Nifty 50 Constituents</h2>
          <span className="text-xs text-zinc-500 font-mono">Last refresh: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('symbol')}>Stock</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('price')}>Price</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('change')}>Change</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('percentChange')}>% Change</th>
                <th className="px-6 py-4 text-right hidden lg:table-cell cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('volume')}>Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sortedStocks.map((stock, index) => {
                const isPositive = stock.change >= 0;
                return (
                  <motion.tr 
                    layout
                    key={stock.symbol}
                    className="hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{stock.symbol}</div>
                      <div className="text-xs text-zinc-500">{stock.name}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-zinc-300">
                      ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold tabular-nums ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(stock.change).toFixed(2)}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold tabular-nums ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isPositive ? '+' : '-'}{Math.abs(stock.percentChange).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-500 text-sm font-mono hidden lg:table-cell">
                      {(stock.volume / 100000).toFixed(2)}L
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
