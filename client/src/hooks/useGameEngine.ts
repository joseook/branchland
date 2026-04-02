/**
 * useGameEngine Hook
 * Gerencia o estado completo do jogo, fila de ações e validação de vitória
 * 
 * Responsabilidades:
 * - Manter estado do jogo centralizado
 * - Processar fila de ações
 * - Validar condições de vitória
 * - Resetar fase
 */

import { useState, useCallback, useRef } from 'react';
import {
  GameState,
  Level,
  Character,
  Direction,
  Action,
  ActionType,
  Position,
  CellType,
} from '@/game/types';

export function useGameEngine(level: Level) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    currentLevel: level,
    character: {
      position: { ...level.characterStartPosition },
      direction: level.characterStartDirection,
    },
    grid: level.grid.map(row => [...row]),
    actionQueue: [],
    isExecuting: false,
    isWon: false,
    itemsCollected: 0,
    console: [],
    executionLog: [],
  }));

  const actionQueueRef = useRef<Action[]>([]);

  /**
   * Adiciona uma ação à fila
   */
  const queueAction = useCallback((type: ActionType) => {
    actionQueueRef.current.push({
      type,
      timestamp: Date.now(),
    });
  }, []);

  /**
   * Processa a fila de ações
   */
  const processActionQueue = useCallback(async () => {
    setGameState(prev => ({ ...prev, isExecuting: true }));

    const queue = [...actionQueueRef.current];
    actionQueueRef.current = [];

    let currentState = gameState;

    for (const action of queue) {
      // Pequeno delay para visualizar animação
      await new Promise(resolve => setTimeout(resolve, 300));

      switch (action.type) {
        case ActionType.MOVE:
          currentState = executeMove(currentState);
          break;
        case ActionType.TURN_RIGHT:
          currentState = executeTurnRight(currentState);
          break;
        case ActionType.TURN_LEFT:
          currentState = executeTurnLeft(currentState);
          break;
        case ActionType.COLLECT:
          currentState = executeCollect(currentState);
          break;
        case ActionType.STOP:
          break;
      }
    }

    // Verificar vitória
    const isWon = level.winCondition(currentState);

    setGameState(prev => ({
      ...prev,
      ...currentState,
      isExecuting: false,
      isWon,
    }));
  }, [gameState, level]);

  /**
   * Executa movimento para frente
   */
  const executeMove = (state: GameState): GameState => {
    const { character } = state;
    const newPosition = getNextPosition(character.position, character.direction);

    // Verificar se posição é válida
    if (
      newPosition.x < 0 ||
      newPosition.x >= state.grid[0].length ||
      newPosition.y < 0 ||
      newPosition.y >= state.grid.length
    ) {
      return {
        ...state,
        console: [...state.console, 'Não posso andar para fora do mapa!'],
      };
    }

    const cell = state.grid[newPosition.y][newPosition.x];

    // Verificar se é parede
    if (cell.type === CellType.WALL) {
      return {
        ...state,
        console: [...state.console, 'Há uma parede na frente!'],
      };
    }

    return {
      ...state,
      character: {
        ...character,
        position: newPosition,
      },
      console: [...state.console, `Andei para (${newPosition.x}, ${newPosition.y})`],
    };
  };

  /**
   * Executa virada para direita
   */
  const executeTurnRight = (state: GameState): GameState => {
    const directionMap: Record<Direction, Direction> = {
      UP: Direction.RIGHT,
      RIGHT: Direction.DOWN,
      DOWN: Direction.LEFT,
      LEFT: Direction.UP,
    };

    return {
      ...state,
      character: {
        ...state.character,
        direction: directionMap[state.character.direction],
      },
      console: [...state.console, 'Virei para a direita'],
    };
  };

  /**
   * Executa virada para esquerda
   */
  const executeTurnLeft = (state: GameState): GameState => {
    const directionMap: Record<Direction, Direction> = {
      UP: Direction.LEFT,
      LEFT: Direction.DOWN,
      DOWN: Direction.RIGHT,
      RIGHT: Direction.UP,
    };

    return {
      ...state,
      character: {
        ...state.character,
        direction: directionMap[state.character.direction],
      },
      console: [...state.console, 'Virei para a esquerda'],
    };
  };

  /**
   * Executa coleta de item
   */
  const executeCollect = (state: GameState): GameState => {
    const { character } = state;
    const cell = state.grid[character.position.y][character.position.x];

    if (cell.type === CellType.ITEM) {
      const newGrid = state.grid.map(row => [...row]);
      newGrid[character.position.y][character.position.x] = {
        ...cell,
        hasItem: false,
      };

      return {
        ...state,
        grid: newGrid,
        itemsCollected: state.itemsCollected + 1,
        console: [...state.console, 'Coletei um item!'],
      };
    }

    return {
      ...state,
      console: [...state.console, 'Não há item aqui'],
    };
  };

  /**
   * Reseta a fase
   */
  const resetLevel = useCallback(() => {
    actionQueueRef.current = [];
    setGameState({
      currentLevel: level,
      character: {
        position: { ...level.characterStartPosition },
        direction: level.characterStartDirection,
      },
      grid: level.grid.map(row => [...row]),
      actionQueue: [],
      isExecuting: false,
      isWon: false,
      itemsCollected: 0,
      console: [],
      executionLog: [],
    });
  }, [level]);

  /**
   * Limpa console
   */
  const clearConsole = useCallback(() => {
    setGameState(prev => ({ ...prev, console: [] }));
  }, []);

  return {
    gameState,
    queueAction,
    processActionQueue,
    resetLevel,
    clearConsole,
  };
}

/**
 * Calcula próxima posição baseada em direção
 */
function getNextPosition(pos: Position, direction: Direction): Position {
  const directionMap: Record<Direction, [number, number]> = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0],
  };

  const [dx, dy] = directionMap[direction];
  return {
    x: pos.x + dx,
    y: pos.y + dy,
  };
}

// Re-exportar Direction para facilitar uso
export { Direction };
