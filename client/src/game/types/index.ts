/**
 * Tipos TypeScript para o motor do jogo Branchland
 * Estruturas de dados para grid, personagem, fases e ações
 */

/**
 * Direções possíveis do personagem
 */
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

/**
 * Tipos de células no grid
 */
export enum CellType {
  FLOOR = 'FLOOR',
  WALL = 'WALL',
  TREE = 'TREE',
  ITEM = 'ITEM',
  DESTINATION = 'DESTINATION',
  COLORED_BLOCK = 'COLORED_BLOCK',
  OBSTACLE = 'OBSTACLE',
}

/**
 * Cores possíveis para blocos coloridos
 */
export type BlockColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple';

/**
 * Definição de uma célula no grid
 */
export interface Cell {
  type: CellType;
  color?: BlockColor;
  hasItem?: boolean;
}

/**
 * Posição no grid (x, y)
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Estado do personagem
 */
export interface Character {
  position: Position;
  direction: Direction;
}

/**
 * Tipos de ações que o personagem pode executar
 */
export enum ActionType {
  MOVE = 'MOVE',
  TURN_RIGHT = 'TURN_RIGHT',
  TURN_LEFT = 'TURN_LEFT',
  COLLECT = 'COLLECT',
  STOP = 'STOP',
}

/**
 * Uma ação na fila de ações
 */
export interface Action {
  type: ActionType;
  timestamp: number;
}

/**
 * Resultado da execução de uma ação
 */
export interface ActionResult {
  success: boolean;
  message?: string;
  newPosition?: Position;
  newDirection?: Direction;
  itemCollected?: boolean;
}

/**
 * Definição de uma fase do jogo
 */
export interface Level {
  id: string;
  name: string;
  description: string;
  concept: string;
  objective: string;
  hint: string;
  gridWidth: number;
  gridHeight: number;
  grid: Cell[][];
  characterStartPosition: Position;
  characterStartDirection: Direction;
  initialCode: string;
  winCondition: (gameState: GameState) => boolean;
}

/**
 * Estado completo do jogo
 */
export interface GameState {
  currentLevel: Level;
  character: Character;
  grid: Cell[][];
  actionQueue: Action[];
  isExecuting: boolean;
  isWon: boolean;
  itemsCollected: number;
  console: string[];
  error?: string;
}

/**
 * Contexto da execução Python
 */
export interface PythonContext {
  // Funções expostas ao Python
  andar: () => void;
  virar_direita: () => void;
  virar_esquerda: () => void;
  parede_na_frente: () => boolean;
  arvore_na_frente: () => boolean;
  destino_na_frente: () => boolean;
  cor_do_bloco: () => BlockColor | null;
  coletar: () => void;
  parar: () => void;
  mostrar: (msg: string) => void;
}
