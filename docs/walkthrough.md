# Walkthrough - Nifty 50 Live Trading Data Dashboard

I have successfully built and verified the Nifty 50 Live Trading Data Dashboard. The application is a modern, responsive web app that simulates a real-time trading environment with live-updating data and interactive charts.

## Key Features Implemented

- **Live Data Polling**: Fetches market data every 10 seconds from a simulated backend API (designed for easy integration with Alpha Vantage/NSE).
- **Market Overview**: Real-time display of Nifty 50 index value, daily absolute change, and percentage change.
- **Interactive Stock Table**: Lists Nifty 50 constituent stocks with sorting by Price, Change, and % Change.
- **Intraday Trend Chart**: Dynamic area chart showing price movements over time using Recharts.
- **Premium Design**: Dark mode aesthetic with teal accents, smooth animations (Framer Motion), and responsive layout.

## Verification Results

### 1. Functionality Check
- [x] **Data Refresh**: Confirmed that price values and timestamps update every 10 seconds.
- [x] **Sorting**: Verified sorting by clicking on table headers.
- [x] **Charts**: Trend chart updates dynamically as data changes.
- [x] **Responsive UI**: Verified the layout adapts correctly to mobile and desktop screen sizes.

### 2. UI/UX Recording
![Nifty 50 Dashboard Verification Recording](/Users/tanishqvarshney/.gemini/antigravity/brain/1261d24d-b16f-4259-a0d3-9478ba97ca23/verify_dashboard_1773659368764.webp)

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
