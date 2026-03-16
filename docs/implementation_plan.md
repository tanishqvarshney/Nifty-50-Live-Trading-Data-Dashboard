# Implementation Plan - Nifty 50 Live Trading Data Dashboard

Build a modern, responsive trading dashboard that fetches and displays live Nifty 50 data with periodic updates.

## Proposed Changes

### Project Setup
- [NEW] Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router.
- [NEW] Install dependencies: `axios`, `lucide-react`, `recharts`, `framer-motion`, `clsx`, `tailwind-merge`.

### API Integration
- [NEW] `src/app/api/stocks/route.ts`: API route to fetch Nifty 50 index and top constituent stock data from a public API (Alpha Vantage or FMP).
- Implement a fallback mechanism with mock data if the API limit is reached or the key is missing.

### UI Components
- [NEW] `src/components/Header.tsx`: Dashboard title and live clock.
- [NEW] `src/components/MarketOverview.tsx`: Cards showing Nifty 50 price, change, and percentage change.
- [NEW] `src/components/StockTable.tsx`: Interactive table with 10s auto-refresh, color-coded changes, and sorting.
- [NEW] `src/components/MarketChart.tsx`: Area chart showing Nifty 50 intraday movement.

### Styling & UX
- Modern "Dark Mode" aesthetic inspired by GammaFlow Capital.
- Responsive grid layout for cards and tables.
- Loading skeletons and error boundary components.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no TypeScript or build errors.

### Manual Verification
- **Data Polling**: Check the network tab to ensure `/api/stocks` is called every 10 seconds.
- **Responsive Review**: Verify the layout on mobile and desktop viewports.
- **UI State**: Mock an API failure to verify the error state displays correctly.
- **Sorting**: Click on table headers (Price, Change) to verify sorting logic.
