'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketChartProps {
  data: { time: string; price: number }[];
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
}

export const MarketChart = ({ data, timeframe, onTimeframeChange }: MarketChartProps) => {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-white">Market Performance (Nifty 50)</h2>
          <div className="flex bg-zinc-800/50 p-1 rounded-lg border border-zinc-700">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  timeframe === tf 
                    ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#71717a" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                itemStyle={{ color: '#14b8a6' }}
                labelStyle={{ color: '#71717a', marginBottom: '4px', fontSize: '10px' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#14b8a6" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
