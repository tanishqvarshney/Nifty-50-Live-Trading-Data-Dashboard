# Walkthrough - Nifty 50 Live Trading Data Dashboard

I have successfully built and verified the Nifty 50 Live Trading Data Dashboard. The application is a modern, responsive web app that simulates a real-time trading environment with live-updating data and interactive charts.

## Key Features Implemented

- **Live Data Polling**: Fetches market data every 10 seconds from a simulated backend API.
- **Multi-Timeframe Charts**: Interactive performance charts for 1D, 1W, 1M, 3M, and 1Y periods.
- **Market Pulse Section**: Real-time Top Gainers, Top Losers, and Market Heat/Sentiment barometer.
- **Market Overview**: Real-time display of Nifty 50 index value and daily changes.
- **Premium Design**: Dark mode aesthetic with teal accents and responsive layout.

## Verification Results

### 1. Functionality Check
- [x] **Data Refresh**: Confirmed that price values and timestamps update every 10 seconds.
- [x] **Sorting**: Verified sorting by clicking on table headers.
### 2. Detailed Market Stats & Official Logos
![Nifty 50 Constituents with Official Logos](/Users/tanishqvarshney/.gemini/antigravity/brain/1261d24d-b16f-4259-a0d3-9478ba97ca23/nifty_constituents_logos_verification.png)

### 3. Verification Recording
![Nifty 50 Dashboard Verification Recording](../public/assets/verify_dashboard_1773659368764.webp)

## Technical Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Visualization**: Recharts, Lucide Icons
- **Animations**: Framer Motion
- **Data Fetching**: Axios

## How to Run Locally
1. Navigate to the project directory: `cd nifty-dashboard`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel
The project is ready for one-click deployment to Vercel. 

**GitHub Repository:** [Nifty-50-Live-Trading-Data-Dashboard](https://github.com/tanishqvarshney/Nifty-50-Live-Trading-Data-Dashboard.git)

Simply:
1. Connect your Vercel account to GitHub.
2. Select the repository `Nifty-50-Live-Trading-Data-Dashboard`.
3. Click **Deploy**.
