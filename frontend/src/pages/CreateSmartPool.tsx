import React, { useState } from 'react';

export type PoolData = {
  name: string;
  description?: string;
  targetAmount?: number;
  token?: string;
  startImmediately?: boolean;
};

type Props = {
  onCreate?: (data: PoolData) => void;
  className?: string;
};

const CreateSmartPool: React.FC<Props> = ({ onCreate, className = '' }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [token, setToken] = useState('SUI');
  const [startImmediately, setStartImmediately] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Pool name is required');
      return;
    }

    const data: PoolData = {
      name: name.trim(),
      description: description.trim() || undefined,
      targetAmount: targetAmount === '' ? undefined : Number(targetAmount),
      token: token || undefined,
      startImmediately,
    };

    if (onCreate) onCreate(data);

    // optional: reset form
    setName('');
    setDescription('');
    setTargetAmount('');
    setToken('SUI');
    setStartImmediately(true);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-neutral-300">Pool name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
          placeholder="e.g. SUI Grants Round #1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
          rows={3}
          placeholder="Short description for contributors"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-neutral-300">Target amount</label>
          <input
            type="number"
            min={0}
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Token</label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
            placeholder="SUI"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="startImmediately"
          type="checkbox"
          checked={startImmediately}
          onChange={(e) => setStartImmediately(e.target.checked)}
          className="h-3.5 w-3.5 text-indigo-600 bg-neutral-800 border-neutral-600 rounded"
        />
        <label htmlFor="startImmediately" className="text-sm text-neutral-300">Start immediately</label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Create pool
        </button>
      </div>
    </form>
  );
};

export default CreateSmartPool;
