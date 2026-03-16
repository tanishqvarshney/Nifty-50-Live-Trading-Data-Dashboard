'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketChartProps {
  price: number;
}

export const MarketChart = ({ price }: MarketChartProps) => {
  // Simulating dummy historical data for the chart based on current price
  const [data, setData] = React.useState<{ time: string; price: number }[]>([]);

  React.useEffect(() => {
    if (data.length === 0) {
      // Initialize with some data
      const initialData = Array.from({ length: 20 }, (_, i) => ({
        time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
        price: price - (20 - i) * 5 + (Math.random() * 10),
      }));
      setData(initialData);
    } else {
      // Add a new point and remove the oldest
      const lastPoint = data[data.length - 1];
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      const newData = [...data.slice(1), { time: timeStr, price }];
      setData(newData);
    }
  }, [price]);

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Intraday Trend (Nifty 50)</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-500 rounded-full text-xs font-bold uppercase tracking-wider">Live</span>
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
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
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
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                itemStyle={{ color: '#14b8a6' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#14b8a6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
