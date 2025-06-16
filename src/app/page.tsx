"use client";

import { useBlockData } from '../hooks/useBlockData';
import { BlockCharts } from '../components/BlockCharts';
import { PageHeader } from '../components/PageHeader';

function formatAbbreviatedNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}

export default function Home() {
  const blocks = useBlockData();
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  // Split blocks into two columns
  const leftColumn = blocks.slice(0, 5);
  const rightColumn = blocks.slice(5);
  
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <PageHeader />

        <section id="latest-blocks" className="blocks-container">
          <div className="blocks-header">
            <h2 className="chart-title">Latest Blocks</h2>
          </div>
          
          <div className="blocks-grid">
            {/* Left Column - Latest Blocks */}
            <div>
              {leftColumn.map((b) => (
                <div 
                  key={`left-${b.blockNumber}`} 
                  className={`block-item ${b.isNew ? 'new' : ''}`}
                >
                  <div className="block-info">
                    <div className="info-group">
                      <span className="info-label">Block</span>
                      <span className="info-value">#{b.blockNumber}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Time</span>
                      <span className="info-value">{formatTimestamp(b.timestamp)}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Base Fee</span>
                      <span className="info-value">{b.baseFee.toFixed(2)} gwei</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Gas Used</span>
                      <span className="info-value">{b.gasUsedPct.toFixed(1)}%</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">USDT Volume</span>
                      <span className="info-value">${formatAbbreviatedNumber(b.usdtVolume)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Older Blocks */}
            <div>
              {rightColumn.map((b) => (
                <div 
                  key={`right-${b.blockNumber}`} 
                  className={`block-item ${b.isNew ? 'new' : ''}`}
                >
                  <div className="block-info">
                    <div className="info-group">
                      <span className="info-label">Block</span>
                      <span className="info-value">#{b.blockNumber}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Time</span>
                      <span className="info-value">{formatTimestamp(b.timestamp)}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Base Fee</span>
                      <span className="info-value">{b.baseFee.toFixed(2)} gwei</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Gas Used</span>
                      <span className="info-value">{b.gasUsedPct.toFixed(1)}%</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">USDT Volume</span>
                      <span className="info-value">${formatAbbreviatedNumber(b.usdtVolume)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="volume-chart" className="charts-container">
          <BlockCharts blocks={blocks} />
        </section>
      </div>
      <footer className="footer">
        <p>
          Made with ❤️ by Sara 🌈
        </p>
      </footer>
    </div>
  );
}
