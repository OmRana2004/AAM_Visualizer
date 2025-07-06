// SwapSimulator.tsx
import React, { useState } from 'react';

interface Props {
  tokenA: number;
  tokenB: number;
  setTokenA: React.Dispatch<React.SetStateAction<number>>;
  setTokenB: React.Dispatch<React.SetStateAction<number>>;
}

export default function SwapSimulator({
  tokenA,
  tokenB,
  setTokenA,
  setTokenB
}: Props) {
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number | null>(null);

  const handleSwap = () => {
    if (inputAmount <= 0 || inputAmount >= tokenA) {
      alert("Please enter a valid SOL amount.");
      return;
    }

    const k = tokenA * tokenB;
    const newTokenA = tokenA + inputAmount;
    const newTokenB = k / newTokenA;
    const receivedUSDC = tokenB - newTokenB;

    setTokenA(newTokenA);
    setTokenB(newTokenB);
    setOutputAmount(receivedUSDC);
  };

  return (
    <div className="mt-6">
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Enter SOL"
          value={inputAmount}
          onChange={(e) => setInputAmount(parseFloat(e.target.value))}
          className="w-1/2 p-2 border rounded focus:outline-none"
        />
        <input
          type="number"
          placeholder="You’ll receive USDC"
          value={outputAmount ? outputAmount.toFixed(4) : ''}
          readOnly
          className="w-1/2 p-2 border rounded bg-gray-100 text-gray-700"
        />
      </div>

      <button
        onClick={handleSwap}
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded hover:opacity-90"
      >
        Start Buying
      </button>

      {outputAmount !== null && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          You received {outputAmount.toFixed(4)} USDC
        </div>
      )}
    </div>
  );
}
