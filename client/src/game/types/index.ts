/**
 * Tipos TypeScript para o motor do jogo Branchland
 * Estruturas de dados para grid, personagem, fases, mundos e ações
 * 
 * Identidade: Plataforma educacional de Python com ambientação de fazenda inteligente
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
 * Representam elementos da fazenda inteligente
 */
export enum CellType {
  FLOOR = 'FLOOR',                    // Chão vazio
  WALL = 'WALL',                      // Parede/obstáculo
  TREE = 'TREE',                      // Árvore
  ITEM = 'ITEM',                      // Item para coletar
  DESTINATION = 'DESTINATION',        // Destino/objetivo
  COLORED_BLOCK = 'COLORED_BLOCK',    // Bloco colorido (para lógica)
  OBSTACLE = 'OBSTACLE',              // Obstáculo (pedra, etc)
  PLANT = 'PLANT',                    // Planta
  WATER = 'WATER',                    // Água/irrigação
  SENSOR = 'SENSOR',                  // Sensor de ambiente
}

/**
 * Cores possíveis para blocos coloridos e elementos
 */
export type BlockColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange';

/**
 * Estados de uma planta
 */
export enum PlantState {
  SEED = 'SEED',
  GROWING = 'GROWING',
  MATURE = 'MATURE',
  WITHERED = 'WITHERED',
}

/**
 * Estados do solo
 */
export enum SoilState {
  DRY = 'DRY',
  MOIST = 'MOIST',
  WET = 'WET',
}

/**
 * Definição de uma célula no grid
 */
export interface Cell {
  type: CellType;
  color?: BlockColor;
  hasItem?: boolean;
  plantState?: PlantState;
  soilState?: SoilState;
}

/**
 * Posição no grid (x, y)
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Estado do personagem (fazendeiro/robô)
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
  PLANT = 'PLANT',
  WATER = 'WATER',
  REMOVE_OBSTACLE = 'REMOVE_OBSTACLE',
  STOP = 'STOP',
}

/**
 * Uma ação na fila de ações
 */
export interface Action {
  type: ActionType;
  timestamp: number;
  description?: string;
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
 * Identificadores dos mundos do Branchland
 */
export enum WorldId {
  WORLD_1 = 'world_1',  // Campos de Início
  WORLD_2 = 'world_2',  // Desvios e Decisões
  WORLD_3 = 'world_3',  // Vale dos Caminhos Múltiplos
  WORLD_4 = 'world_4',  // Irrigação Lógica
  WORLD_5 = 'world_5',  // Celeiro das Funções
  WORLD_6 = 'world_6',  // Estufa dos Desafios (futuro)
}

/**
 * Metadados de um mundo temático
 */
export interface World {
  id: WorldId;
  name: string;
  description: string;
  theme: string;
  pedagogicalFocus: string[];
  conceptsIntroduced: string[];
  levelCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Definição de uma fase do jogo
 */
export interface Level {
  id: string;
  worldId: WorldId;
  name: string;
  description: string;
  concept: string;                    // Conceito de Python ensinado
  objective: string;                  // Objetivo da fase
  context: string;                    // Contexto narrativo
  hint: string;                       // Dica pedagógica
  gridWidth: number;
  gridHeight: number;
  grid: Cell[][];
  characterStartPosition: Position;
  characterStartDirection: Direction;
  initialCode: string;
  allowedFunctions: string[];         // Funções disponíveis nesta fase
  winCondition: (gameState: GameState) => boolean;
  pedagogicalMessage?: string;        // Mensagem de reforço pedagógico
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
  executionLog: ExecutionLogEntry[];  // Log de execução para feedback
}

/**
 * Entrada no log de execução
 * Usado para feedback pedagógico durante a execução
 */
export interface ExecutionLogEntry {
  timestamp: number;
  type: 'condition' | 'action' | 'function_call' | 'state_change' | 'error';
  message: string;
  details?: Record<string, any>;
}

/**
 * Contexto da execução Python
 * Funções expostas ao código Python do aluno
 */
export interface PythonContext {
  // Ações de movimento
  andar: () => void;
  virar_direita: () => void;
  virar_esquerda: () => void;
  
  // Sensores (leitura do ambiente)
  parede_na_frente: () => boolean;
  arvore_na_frente: () => boolean;
  destino_na_frente: () => boolean;
  obstaculo_na_frente: () => boolean;
  planta_madura_na_frente: () => boolean;
  
  // Leitura de estado
  cor_do_bloco: () => BlockColor | null;
  solo_seco: () => boolean;
  tem_semente: () => boolean;
  clima_favoravel: () => boolean;
  praga_detectada: () => boolean;
  
  // Ações de interação
  coletar: () => void;
  plantar: () => void;
  regar: () => void;
  remover_pedra: () => void;
  aplicar_protecao: () => void;
  
  // Controle
  parar: () => void;
  mostrar: (msg: string) => void;
}

/**
 * Configuração de dificuldade
 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Progresso do jogador
 */
export interface PlayerProgress {
  completedLevels: string[];
  currentWorldId: WorldId;
  currentLevelId: string;
  totalAttempts: number;
  totalTimeSpent: number;
}
