"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type BlockMetrics = {
    blockNumber: number;
    baseFee: number;
    gasUsedPct: number;
    usdtVolume: number;
    timestamp: number;
    isNew?: boolean;
};

type BlockChartsProps = {
    blocks: BlockMetrics[];
};

const volumeChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 300
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black',
                callback: function (value: string | number) {
                    const numValue = Number(value);
                    if (numValue === 0) return '';
                    if (numValue >= 1000) {
                        return '$' + (numValue / 1000000).toFixed(1) + 'M';
                    }
                    return '$' + numValue;
                },
                // maxTicksLimit: 5
            },
            title: {
                display: true,
                text: 'USDT Volume',
                color: '#1217f2'
            }
        },
        x: {
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black'
            },
            title: {
                display: true,
                text: 'Block Number',
                color: '#1217f2'
            }
        }
    },
    plugins: {
        legend: {
            display: false,
            labels: {
                color: '#1217f2'
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const value = context.raw;
                    return `USDT Volume: $${Number(value).toLocaleString()}`;
                }
            }
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
    }
};

const baseFeeChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 300
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black',
                callback: function (value: string | number) {
                    const numValue = Number(value);
                    if (numValue === 0) return '';
                    return numValue.toFixed(1) + ' gwei';
                },
                maxTicksLimit: 5,
            },
            title: {
                display: true,
                text: 'Base Fee',
                color: '#1217f2'
            }
        },
        x: {
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black'
            },
            title: {
                display: true,
                text: 'Block Number',
                color: '#1217f2'
            }
        }
    },
    plugins: {
        legend: {
            display: false,
            labels: {
                color: '#1217f2'
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const value = context.raw;
                    return `Base Fee: ${Number(value).toFixed(2)} gwei`;
                }
            }
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
    }
};

const gasUsedChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 300
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black',
                callback: function (value: string | number) {
                    const numValue = Number(value);
                    if (numValue === 0) return '';
                    return numValue.toFixed(1) + '%';
                },
                maxTicksLimit: 5
            },
            title: {
                display: true,
                text: 'Gas Used',
                color: '#1217f2'
            }
        },
        x: {
            grid: {
                color: 'rgba(255, 192, 203, 0.1)'
            },
            ticks: {
                color: 'black'
            },
            title: {
                display: true,
                text: 'Block Number',
                color: '#1217f2'
            }
        }
    },
    plugins: {
        legend: {
            display: false,
            labels: {
                color: '#1217f2'
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const value = context.raw;
                    return `Gas Used: ${Number(value).toFixed(1)}%`;
                }
            }
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
    }
};

export function BlockCharts({ blocks }: BlockChartsProps) {
    // Reverse the blocks array to show latest blocks on the right
    const reversedBlocks = [...blocks].reverse();

    const volumeData = {
        labels: reversedBlocks.map(b => `#${b.blockNumber}`),
        datasets: [
            {
                label: 'USDT Volume',
                data: reversedBlocks.map(b => b.usdtVolume),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(225, 209, 240, 0.1)',
                tension: 0.4
            }
        ]
    };

    const baseFeeData = {
        labels: reversedBlocks.map(b => `#${b.blockNumber}`),
        datasets: [
            {
                label: 'Base Fee',
                data: reversedBlocks.map(b => b.baseFee),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(225, 209, 240, 0.1)',
                tension: 0.4
            }
        ]
    };

    const gasUsedData = {
        labels: reversedBlocks.map(b => `#${b.blockNumber}`),
        datasets: [
            {
                label: 'Gas Used',
                data: reversedBlocks.map(b => b.gasUsedPct),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(225, 209, 240, 0.1)',
                tension: 0.4
            }
        ]
    };

    return (
        <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-black/20 dark:border-black/80 p-6">
                <h2 className="chart-title">USDT Volume per Block</h2>
                <div className="h-[300px]">
                    <Line options={volumeChartOptions} data={volumeData} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-black/20 dark:border-black/80 p-6">
                    <h2 className="chart-title">Base Fee per Block</h2>
                    <div className="h-[300px]">
                        <Line options={baseFeeChartOptions} data={baseFeeData} />
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-black/20 dark:border-black/80 p-6">
                    <h2 className="chart-title">Gas Used per Block</h2>
                    <div className="h-[300px]">
                        <Line options={gasUsedChartOptions} data={gasUsedData} />
                    </div>
                </div>
            </div>
        </div>
    );
} 