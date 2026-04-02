/**
 * Definição das fases do jogo Branchland
 * Estruturado em 5 mundos temáticos, cada um ensinando conceitos progressivos de Python
 * 
 * Identidade: Plataforma educacional de Python com ambientação de fazenda inteligente
 */

import {
  Level,
  CellType,
  Direction,
  GameState,
  BlockColor,
  WorldId,
} from '@/game/types';

/**
 * MUNDO 1 — CAMPOS DE INÍCIO
 * Propósito: Introduzir a linguagem do jogo e ações básicas
 * Conceitos: execução simples, sequência, noção de função
 */

/**
 * Fase 1.1: Primeiros Passos
 * Conceito: Sequência simples de ações
 */
export const LEVEL_1_1: Level = {
  id: '1_1',
  worldId: WorldId.WORLD_1,
  name: 'Primeiros Passos',
  description: 'Aprenda a se mover no mapa',
  concept: 'Sequência de ações',
  objective: 'Ande até o destino seguindo em frente.',
  context: 'Você é um fazendeiro em uma fazenda inteligente. Seu primeiro desafio é aprender a se mover.',
  hint: 'Use andar() para se mover para frente. Chame a função várias vezes para alcançar o destino.',
  gridWidth: 6,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 1.1: Primeiros Passos
# Ande até o destino

andar()
andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você aprendeu a usar sequência de ações. Cada andar() move o personagem um passo.',
};

/**
 * Fase 1.2: Virando
 * Conceito: Mudança de direção
 */
export const LEVEL_1_2: Level = {
  id: '1_2',
  worldId: WorldId.WORLD_1,
  name: 'Virando',
  description: 'Aprenda a mudar de direção',
  concept: 'Mudança de direção',
  objective: 'Chegue ao destino virando quando necessário.',
  context: 'O caminho não é sempre reto. Você precisa aprender a virar.',
  hint: 'Use virar_direita() ou virar_esquerda() para mudar de direção. Depois use andar() para avançar.',
  gridWidth: 6,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.DESTINATION },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 5, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 1.2: Virando
# Ande para frente, depois vire e chegue ao destino

andar()
andar()
virar_esquerda()
andar()
andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você dominou a mudança de direção. Agora pode navegar em qualquer direção.',
};

/**
 * MUNDO 2 — DESVIOS E DECISÕES
 * Propósito: Ensinar estrutura de decisão básica
 * Conceitos: if, else, leitura de ambiente
 */

/**
 * Fase 2.1: Primeira Decisão (if simples)
 * Conceito: if
 */
export const LEVEL_2_1: Level = {
  id: '2_1',
  worldId: WorldId.WORLD_2,
  name: 'Primeira Decisão',
  description: 'Aprenda a usar if para tomar decisões simples',
  concept: 'if',
  objective: 'Se houver uma árvore na frente, vire à direita. Caso contrário, ande até o destino.',
  context: 'Há uma árvore no caminho da plantação. Seu código precisa decidir quando seguir e quando desviar.',
  hint: 'Use arvore_na_frente() para verificar se há árvore. Use if para decidir o que fazer.',
  gridWidth: 6,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.TREE },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 1, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 2.1: Primeira Decisão
# Use if para verificar se há árvore na frente

if arvore_na_frente():
    virar_direita()
    andar()
    virar_esquerda()

andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'arvore_na_frente', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Boa! Você usou uma condição para reagir ao ambiente. Isso é o coração da programação lógica.',
};

/**
 * Fase 2.2: Caminho Alternativo (if/else)
 * Conceito: if/else
 */
export const LEVEL_2_2: Level = {
  id: '2_2',
  worldId: WorldId.WORLD_2,
  name: 'Caminho Alternativo',
  description: 'Use if/else para escolher entre dois caminhos',
  concept: 'if/else',
  objective: 'Se houver parede na frente, vire à esquerda e ande. Caso contrário, ande reto até o destino.',
  context: 'Há paredes no caminho. Seu código precisa decidir qual caminho seguir.',
  hint: 'Use parede_na_frente() para verificar. Use else para definir o caminho alternativo.',
  gridWidth: 6,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 1, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 2.2: Caminho Alternativo
# Use if/else para escolher o caminho

if parede_na_frente():
    virar_esquerda()
    andar()
    virar_direita()
else:
    andar()

andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'parede_na_frente', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Muito bem! Você combinou if e else para lidar com duas possibilidades.',
};

/**
 * Exportar todas as fases
 */
export const ALL_LEVELS: Level[] = [
  LEVEL_1_1,
  LEVEL_1_2,
  LEVEL_2_1,
  LEVEL_2_2,
];

/**
 * Agrupar fases por mundo
 */
export const LEVELS_BY_WORLD = {
  [WorldId.WORLD_1]: [LEVEL_1_1, LEVEL_1_2],
  [WorldId.WORLD_2]: [LEVEL_2_1, LEVEL_2_2],
  [WorldId.WORLD_3]: [],
  [WorldId.WORLD_4]: [],
  [WorldId.WORLD_5]: [],
  [WorldId.WORLD_6]: [],
};
