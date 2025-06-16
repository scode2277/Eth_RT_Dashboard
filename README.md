# 📦 Ethereum Real-Time Dashboard

A real-time dashboard that visualizes key Ethereum blockchain metrics using Next.js and Web3 technologies.

## 🚀 Features

### Real-Time Block Data
- Displays data from the most recent 10 blocks
- Auto-updates with each new block produced
- Maintains a rolling window of the latest 10 blocks

### Interactive Charts

1. **ERC20 Token Transfer Volume**
   - Tracks total transfer volume of selected ERC20 tokens
   - Updates with each new block
   - Supports popular ERC20 tokens for sufficient data visualization

2. **Block Base Fee Analysis**
   - Displays BASEFEE for each block
   - X-axis: Block number
   - Y-axis: BASEFEE value
   - Helps understand EIP-1559 fee mechanism

3. **Gas Usage Ratio**
   - Plots gasUsed/gasLimit ratio as percentage
   - Correlates with BASEFEE data
   - Provides insights into block space utilization

## 🛠️ Technical Stack

- **Frontend Framework**: Next.js
- **Web3 Integration**: ethers.js
- **Data Visualization**: Chart.js/Recharts
- **Real-time Updates**: WebSocket connections
- **Styling**: Tailwind CSS

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/scode2277/Ethereum-RealTime-Dashboard.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Add your required API keys and configuration

4. Run the development server
```bash
npm run dev
```

## 📊 Data Sources

- Ethereum JSON-RPC API for block data
- ERC20 token contract events for transfer data
- WebSocket connection for real-time updates

## 🧪 Testing

The dashboard has been tested with:
- Popular ERC20 tokens (USDT, USDC, DAI)
- Various network conditions
- Real-time update performance
- Data accuracy and consistency

## 📝 License

MIT License - See LICENSE file for details
