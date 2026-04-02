/**
 * Controls Component
 * Botões para executar código, resetar fase, etc.
 * 
 * Design: Botões com estados visuais claros
 * Funcionalidade: Ações principais do jogo
 */

import { Button } from '@/components/ui/button';
import { Play, RotateCcw, SkipForward, Loader2 } from 'lucide-react';

interface ControlsProps {
  onExecute: () => void;
  onReset: () => void;
  onRestoreCode?: () => void;
  onNextLevel?: () => void;
  isExecuting?: boolean;
  isWon?: boolean;
  hasNextLevel?: boolean;
}

export default function Controls({
  onExecute,
  onReset,
  onRestoreCode,
  onNextLevel,
  isExecuting = false,
  isWon = false,
  hasNextLevel = false,
}: ControlsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {/* Executar código */}
      <Button
        onClick={onExecute}
        disabled={isExecuting}
        className="gap-2"
        size="sm"
      >
        {isExecuting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Executando...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Executar (Ctrl+Enter)
          </>
        )}
      </Button>

      {/* Resetar fase */}
      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="gap-2"
        disabled={isExecuting}
      >
        <RotateCcw className="w-4 h-4" />
        Resetar Fase
      </Button>

      {/* Restaurar código inicial */}
      {onRestoreCode && (
        <Button
          onClick={onRestoreCode}
          variant="ghost"
          size="sm"
          className="gap-2"
          disabled={isExecuting}
        >
          Restaurar Código
        </Button>
      )}

      {/* Próxima fase */}
      {isWon && hasNextLevel && onNextLevel && (
        <Button
          onClick={onNextLevel}
          variant="default"
          size="sm"
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <SkipForward className="w-4 h-4" />
          Próxima Fase
        </Button>
      )}
    </div>
  );
}
