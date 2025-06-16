"use client";

import { useState, useEffect } from 'react';
import { provider } from '../lib/provider';
import { USDT_ADDRESS, TRANSFER_TOPIC } from '../lib/constants';
import { ethers } from 'ethers';

type BlockMetrics = {
  blockNumber: number;
  baseFee: number;
  gasUsedPct: number;
  usdtVolume: number;
  timestamp: number;
  isNew?: boolean;
};

export function useBlockData() {
  const [blockData, setBlockData] = useState<BlockMetrics[]>([]);

  useEffect(() => {
    const fetchBlockData = async (blockNumber: number, isNew: boolean = false) => {
      const block = await provider.getBlock(blockNumber);
      const baseFee = block?.baseFeePerGas ? Number(ethers.formatUnits(block.baseFeePerGas, 'gwei')) : 0;
      const gasUsedPct = (Number(block?.gasUsed) / Number(block?.gasLimit)) * 100;

      // Get USDT Transfer volume
      const logs = await provider.getLogs({
        fromBlock: blockNumber,
        toBlock: blockNumber,
        address: USDT_ADDRESS,
        topics: [TRANSFER_TOPIC],
      });

      const iface = new ethers.Interface(['event Transfer(address indexed from, address indexed to, uint256 value)']);

      let volume = 0;

      for (const log of logs) {
        const parsed = iface.parseLog(log);
        if (!parsed) continue;
        const amount = parsed.args[2]; // value
        volume += Number(ethers.formatUnits(amount, 6)); // USDT has 6 decimals
      }

      return {
        blockNumber,
        baseFee,
        gasUsedPct,
        usdtVolume: Math.round(volume),
        timestamp: block?.timestamp || 0,
        isNew
      };
    };

    const fetchInitialBlocks = async () => {
      const latestBlockNum = await provider.getBlockNumber();
      const blockNumbers = Array.from({ length: 10 }, (_, i) => latestBlockNum - i);

      const newData = await Promise.all(blockNumbers.map(num => fetchBlockData(num)));
      setBlockData(newData);
    };

    // Set up real-time block updates
    const handleNewBlock = async (blockNumber: number) => {
      const newBlockData = await fetchBlockData(blockNumber, true);
      setBlockData(prevData => {
        const updatedData = [newBlockData, ...prevData.slice(0, 9)];
        return updatedData;
      });

      // Remove the new block indicator after 5 seconds
      setTimeout(() => {
        setBlockData(prevData => 
          prevData.map(block => 
            block.blockNumber === blockNumber 
              ? { ...block, isNew: false }
              : block
          )
        );
      }, 3000);
    };

    // Initial fetch
    fetchInitialBlocks();

    // Subscribe to new blocks
    provider.on('block', handleNewBlock);

    // Cleanup subscription
    return () => {
      provider.off('block', handleNewBlock);
    };
  }, []);

  return blockData;
}
