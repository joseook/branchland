/**
 * ConsolePanel Component
 * Exibe logs, erros e mensagens do jogo
 * 
 * Design: Terminal com fundo escuro, logs coloridos por tipo
 * Funcionalidade: Auto-scroll, limpeza de console
 */

import { Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ConsolePanelProps {
  logs: string[];
  error?: string;
  onClear?: () => void;
}

export default function ConsolePanel({
  logs,
  error,
  onClear,
}: ConsolePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll para o final
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, error]);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card flex flex-col">
      <div className="bg-secondary px-4 py-2 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Console</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Limpar console"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-sm"
        style={{ minHeight: '150px', maxHeight: '300px' }}
      >
        {logs.length === 0 && !error && (
          <p className="text-muted-foreground italic">Nenhuma saída ainda...</p>
        )}

        {/* Logs normais */}
        {logs.map((log, index) => (
          <div key={index} className="text-green-400 mb-1">
            {'> '}{log}
          </div>
        ))}

        {/* Erro */}
        {error && (
          <div className="text-red-400 mb-1 font-semibold">
            {'⚠ '}{error}
          </div>
        )}
      </div>
    </div>
  );
}
