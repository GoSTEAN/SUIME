import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    solana?: any;
  }
}

function shortAddress(addr: string | null | undefined) {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ConnectWallet() {
  const [provider, setProvider] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastLog, setLastLog] = useState<string | null>(null);
  const [providerSummary, setProviderSummary] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    function detectProvider() {
      const w = window as any;
      if (w.solana && w.solana.isPhantom) {
        return w.solana;
      }
      return null;
    }

    function summarizeProvider(obj: any) {
      if (!obj) return null;
      const summary: any = { typeof: typeof obj };
      try {
        summary.keys = Object.keys(obj).slice(0, 20);
        summary.name = obj.isPhantom ? 'Phantom' : 'Solana Provider';
        summary.publicKey = obj.publicKey?.toString();
      } catch (e) {
        summary.keys = [];
      }
      return summary;
    }

    let p = detectProvider();
    if (p) {
      setProvider(p);
      setProviderName('Phantom');
      const s = summarizeProvider(p);
      setProviderSummary(s);
      setLastLog(`[Phantom] Detected immediately: ${JSON.stringify(s, null, 2)}`);
      console.log('[Phantom] Detected immediately:', s);
      subscribeAccountEvents(p);
      checkConnection(p);
    } else {
      const start = Date.now();
      const interval = setInterval(() => {
        p = detectProvider();
        if (p) {
          clearInterval(interval);
          setProvider(p);
          setProviderName('Phantom');
          const s = summarizeProvider(p);
          setProviderSummary(s);
          setLastLog(`[Phantom] Detected via polling: ${JSON.stringify(s, null, 2)}`);
          console.log('[Phantom] Detected via polling:', s);
          subscribeAccountEvents(p);
          checkConnection(p);
        } else if (Date.now() - start > 5000) {
          clearInterval(interval);
          setLastLog('[Phantom] No provider found after polling');
          console.debug('[Phantom] No provider found');
        }
      }, 500);
    }

    function subscribeAccountEvents(pp: any) {
      try {
        if (pp && typeof pp.on === 'function') {
          const handleConnect = (info: any) => {
            if (info && info.publicKey) {
              setAddress(info.publicKey.toString());
              setConnected(true);
            }
          };
          const handleDisconnect = () => {
            setConnected(false);
            setAddress(null);
          };
          pp.on('connect', handleConnect);
          pp.on('disconnect', handleDisconnect);
        }
      } catch (e) {
        console.debug('[Phantom] Event sub failed:', e);
      }
    }

    async function checkConnection(w: any) {
      try {
        if (w.publicKey) {
          setAddress(w.publicKey.toString());
          setConnected(true);
        }
      } catch (e) {
        console.debug('[Phantom] Connection check failed:', e);
      }
    }

    return () => {}; // Cleanup if needed
  }, []);

  async function handleConnect() {
    setError(null);
    setConnecting(true);
    if (!provider) {
      // Debug: Log potential window keys
      try {
        const w = window as any;
        const found = Object.keys(w).filter(k => /solana|phantom/i.test(k));
        setLastLog(`[Phantom] Window matches: ${JSON.stringify(found)}`);
        console.log('[Phantom] Window matches:', found);
      } catch (e) {}
      setError('Phantom Wallet not detected. Install/enable the extension from phantom.app/download.');
      setConnecting(false);
      return;
    }

    try {
      const res = await provider.connect();
      const addr = res.publicKey.toString();
      setAddress(addr);
      setConnected(true);
    //   setLastLog(`[Phantom] Connected: ${shortAddress(addr)}`);
    //   console.log('[Phantom] Connected:', addr);
    } catch (e: any) {
      setError(e?.message || 'Connection failed—check Phantom popup/permissions.');
      console.error('[Phantom] Connect error:', e);
    } finally {
      setConnecting(false);
    }
  }

  async function handleDisconnect() {
    try {
      if (provider?.disconnect) await provider.disconnect();
    } catch (e) {
      // Ignore errors
    }
    setConnected(false);
    setAddress(null);
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="text-red-400 text-xs bg-red-900/20 px-3 py-2 rounded border border-red-800/50">
          {error}
        </div>
      )}
      
      {connected ? (
        <div className="inline-flex items-center gap-2">
          <span className="text-sm px-3 py-2 rounded-md bg-white/5 text-neutral-200 ring-1 ring-white/10">
            {shortAddress(address)} ({providerName})
          </span>
          <button
            onClick={handleDisconnect}
            className="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={!provider || connecting}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-md ring-1 transition ${
            provider
              ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20 ring-emerald-400/25 hover:ring-emerald-400/35'
              : 'bg-gray-700/50 text-gray-500 cursor-not-allowed ring-gray-600/25'
          } ${connecting ? 'opacity-70' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 12V7a2 2 0 0 0-2-2H7" />
            <path d="M3 10V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
            <path d="M16 12h4v4h-4z" />
            <rect x="3" y="10" width="18" height="11" rx="2" />
          </svg>
          <span className="text-sm font-semibold tracking-tight">
            {connecting ? 'Connecting...' : provider ? 'Connect Phantom' : 'Phantom Not Detected'}
          </span>
        </button>
      )}
      {!provider && (
        <p className="text-xs text-gray-500">
          Install Phantom? <a href="https://phantom.app/download" target="_blank" rel="noopener" className="underline text-emerald-400">Download here</a>
        </p>
      )}
    </div>
  );
}