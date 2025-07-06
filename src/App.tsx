// App.tsx
import { useState } from 'react';
import SwapSimulator from './SwapSimulator';

export default function App() {
  const [tokenA, setTokenA] = useState<number>(100);
  const [tokenB, setTokenB] = useState<number>(300);
  const price = tokenB / tokenA;
  const solPercentage = (tokenA / (tokenA + tokenB)) * 100;
  const usdcPercentage = 100 - solPercentage;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">AMM Visualization</h1>
        <p className="text-center text-gray-600 mb-6">
          A visualization of how AMM works under the hood and how the price is decided in a liquidity pool on a DEX.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-purple-600 mb-1">SOL Amount</label>
            <input
              type="number"
              value={tokenA}
              onChange={(e) => setTokenA(Number(e.target.value))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-green-600 mb-1">USDC Amount</label>
            <input
              type="number"
              value={tokenB}
              onChange={(e) => setTokenB(Number(e.target.value))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="flex h-4 rounded-full overflow-hidden mb-2">
          <div
            className="bg-purple-500"
            style={{ width: `${solPercentage}%` }}
          ></div>
          <div
            className="bg-green-500"
            style={{ width: `${usdcPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-purple-600">SOL Value: {solPercentage.toFixed(1)}%</p>
          <p className="text-green-600">USDC Value: {usdcPercentage.toFixed(1)}%</p>
        </div>

        <SwapSimulator 
          tokenA={tokenA} 
          tokenB={tokenB} 
          setTokenA={setTokenA} 
          setTokenB={setTokenB} 
        />

        <div className="mt-6 text-center text-lg font-medium">
          Cost of 1 SOL: <span className="text-green-600">{price.toFixed(2)} USDC</span>
        </div>
      </div>
    </main>
  );
}
