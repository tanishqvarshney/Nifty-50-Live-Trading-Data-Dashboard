'use client';

import { Header } from '@/components/Header';
import { MarketOverview } from '@/components/MarketOverview';
import { StockTable } from '@/components/StockTable';
import { MarketChart } from '@/components/MarketChart';
import { useStocks } from '@/lib/useStocks';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const { data, loading, error, refresh } = useStocks();

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 text-center space-y-4 max-w-md w-full">
          <div className="mx-auto w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="text-rose-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-zinc-500">{error}</p>
          <button 
            onClick={() => refresh()}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-teal-500/30">
      <Header />
      
      <div className="max-w-7xl mx-auto">
        <MarketOverview data={data?.niftyIndex || null} loading={loading && !data} />
        
        <div className="grid grid-cols-1 gap-0">
          <MarketChart price={data?.niftyIndex.price || 19500} />
          <StockTable stocks={data?.stocks || []} loading={loading && !data} />
        </div>
      </div>

      <footer className="py-8 px-4 md:px-8 border-t border-zinc-800 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
          <div>© 2026 Nifty 50 Live Dashboard. Developed by <span className="text-teal-400 font-medium">Tanishq Varshney</span></div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-400 transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
