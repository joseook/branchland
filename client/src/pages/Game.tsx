/**
 * Game Page
 * Página principal do jogo com integração de todos os componentes
 * 
 * Fluxo:
 * 1. Usuário escreve código no Monaco Editor
 * 2. Clica em "Executar"
 * 3. Código é enviado ao Pyodide
 * 4. Pyodide chama funções do jogo (andar, virar, etc)
 * 5. Cada função adiciona ação à fila
 * 6. Engine processa fila e atualiza grid
 * 7. UI renderiza novo estado
 */

import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import CodeEditor from '@/components/CodeEditor';
import GameBoard from '@/components/GameBoard';
import ConsolePanel from '@/components/ConsolePanel';
import MissionPanel from '@/components/MissionPanel';
import Controls from '@/components/Controls';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useGameEngine } from '@/hooks/useGameEngine';
import { usePyodide } from '@/hooks/usePyodide';
import { ALL_LEVELS } from '@/game/levels';
import { PythonContext, ActionType } from '@/game/types';
import { ChevronLeft } from 'lucide-react';

interface GamePageProps {
  levelId?: string;
}

export default function Game({ levelId = '1' }: GamePageProps) {
  const [, navigate] = useLocation();
  const level = ALL_LEVELS.find(l => l.id === levelId) || ALL_LEVELS[0];

  const [code, setCode] = useState(level.initialCode);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const { gameState, queueAction, processActionQueue, resetLevel, clearConsole } =
    useGameEngine(level);
  const { isReady: pyodideReady, isLoading: pyodideLoading, error: pyodideError, executePython } =
    usePyodide();

  /**
   * Criar contexto Python com funções do jogo
   */
  const createPythonContext = useCallback((): PythonContext => {
    return {
      andar: () => queueAction(ActionType.MOVE),
      virar_direita: () => queueAction(ActionType.TURN_RIGHT),
      virar_esquerda: () => queueAction(ActionType.TURN_LEFT),
      parede_na_frente: () => {
        // Verificar se há parede na frente
        const { character, grid } = gameState;
        const nextPos = getNextPosition(character.position, character.direction);

        if (
          nextPos.x < 0 ||
          nextPos.x >= grid[0].length ||
          nextPos.y < 0 ||
          nextPos.y >= grid.length
        ) {
          return true;
        }

        const cell = grid[nextPos.y][nextPos.x];
        return cell.type === 'WALL';
      },
      arvore_na_frente: () => {
        const { character, grid } = gameState;
        const nextPos = getNextPosition(character.position, character.direction);

        if (
          nextPos.x < 0 ||
          nextPos.x >= grid[0].length ||
          nextPos.y < 0 ||
          nextPos.y >= grid.length
        ) {
          return false;
        }

        const cell = grid[nextPos.y][nextPos.x];
        return cell.type === 'TREE';
      },
      destino_na_frente: () => {
        const { character, grid } = gameState;
        const nextPos = getNextPosition(character.position, character.direction);

        if (
          nextPos.x < 0 ||
          nextPos.x >= grid[0].length ||
          nextPos.y < 0 ||
          nextPos.y >= grid.length
        ) {
          return false;
        }

        const cell = grid[nextPos.y][nextPos.x];
        return cell.type === 'DESTINATION';
      },
      cor_do_bloco: () => {
        const { character, grid } = gameState;
        const cell = grid[character.position.y][character.position.x];

        if (cell.type === 'COLORED_BLOCK') {
          return cell.color || null;
        }
        return null;
      },
      coletar: () => queueAction(ActionType.COLLECT),
      parar: () => queueAction(ActionType.STOP),
      mostrar: (msg: string) => {
        // Adicionar mensagem ao console (será feito via logs do Python)
      },
      obstaculo_na_frente: () => {
        const { character, grid } = gameState;
        const nextPos = getNextPosition(character.position, character.direction);
        if (nextPos.x < 0 || nextPos.x >= grid[0].length || nextPos.y < 0 || nextPos.y >= grid.length) {
          return true;
        }
        const cell = grid[nextPos.y][nextPos.x];
        return cell.type === 'OBSTACLE' || cell.type === 'WALL';
      },
      planta_madura_na_frente: () => false,
      solo_seco: () => false,
      tem_semente: () => gameState.itemsCollected > 0,
      clima_favoravel: () => true,
      praga_detectada: () => false,
      plantar: () => queueAction(ActionType.PLANT),
      regar: () => queueAction(ActionType.WATER),
      remover_pedra: () => queueAction(ActionType.REMOVE_OBSTACLE),
      aplicar_protecao: () => {},
    };
  }, [gameState, queueAction]);

  /**
   * Executar código do usuário
   */
  const handleExecute = useCallback(async () => {
    setExecutionError(null);

    if (!pyodideReady) {
      setExecutionError('Pyodide ainda está carregando...');
      return;
    }

    try {
      const context = createPythonContext();
      const logs = await executePython(code, context);

      // Processar fila de ações
      await processActionQueue();

      // Adicionar logs ao console
      gameState.console.push(...logs);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setExecutionError(errorMsg);
    }
  }, [code, pyodideReady, executePython, createPythonContext, processActionQueue, gameState]);

  /**
   * Restaurar código inicial
   */
  const handleRestoreCode = useCallback(() => {
    setCode(level.initialCode);
  }, [level]);

  /**
   * Ir para próxima fase
   */
  const handleNextLevel = useCallback(() => {
    const currentIndex = ALL_LEVELS.findIndex(l => l.id === levelId);
    if (currentIndex >= 0 && currentIndex < ALL_LEVELS.length - 1) {
      navigate(`/game/${ALL_LEVELS[currentIndex + 1].id}`);
    } else {
      navigate('/');
    }
  }, [levelId, navigate]);

  /**
   * Voltar para menu
   */
  const handleBackToMenu = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Atalho Ctrl+Enter para executar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleExecute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExecute]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToMenu}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Branchland</h1>
              <p className="text-sm text-muted-foreground">
                {level.name} ({level.worldId})
              </p>
            </div>
          </div>

          {/* Status Pyodide */}
          <div className="flex items-center gap-2">
            {pyodideLoading && (
              <div className="flex items-center gap-2 text-yellow-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Carregando...</span>
              </div>
            )}
            {pyodideReady && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Pronto</span>
              </div>
            )}
            {pyodideError && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Erro</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8">
        {/* Erro global */}
        {pyodideError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <p className="font-semibold">Erro ao carregar Pyodide</p>
            <p className="text-sm mt-1">{pyodideError}</p>
          </div>
        )}

        {/* Vitória */}
        {gameState.isWon && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <p className="font-semibold text-lg">🎉 Fase Concluída!</p>
            <p className="text-sm mt-1">Parabéns! Você completou a fase com sucesso.</p>
          </div>
        )}

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda: Mapa e Console */}
          <div className="lg:col-span-1 space-y-6">
            <GameBoard grid={gameState.grid} character={gameState.character} />
            <ConsolePanel
              logs={gameState.console}
              error={executionError || undefined}
              onClear={clearConsole}
            />
          </div>

          {/* Coluna central: Editor e Controles */}
          <div className="lg:col-span-1 space-y-6">
            <CodeEditor code={code} onChange={setCode} height="500px" />
            <Controls
              onExecute={handleExecute}
              onReset={resetLevel}
              onRestoreCode={handleRestoreCode}
              onNextLevel={handleNextLevel}
              isExecuting={gameState.isExecuting}
              isWon={gameState.isWon}
              hasNextLevel={ALL_LEVELS.findIndex(l => l.id === levelId) < ALL_LEVELS.length - 1}
            />
          </div>

          {/* Coluna direita: Instruções */}
          <div className="lg:col-span-1">
            <MissionPanel level={level} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Calcular próxima posição baseada em direção
 */
function getNextPosition(pos: { x: number; y: number }, direction: string) {
  const directionMap: Record<string, [number, number]> = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0],
  };

  const [dx, dy] = directionMap[direction] || [0, 0];
  return {
    x: pos.x + dx,
    y: pos.y + dy,
  };
}
