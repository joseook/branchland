/**
 * Definição das fases do jogo Branchland
 * Cada fase ensina um conceito de estrutura de decisão em Python
 */

import {
  Level,
  CellType,
  Direction,
  GameState,
  BlockColor,
} from '@/game/types';

/**
 * Fase 1: Primeira Decisão (if simples)
 * Conceito: if
 * Objetivo: Se houver árvore na frente, desviar; senão, andar até o destino
 */
export const LEVEL_1: Level = {
  id: '1',
  name: 'Primeira Decisão',
  description: 'Aprenda a usar if para tomar decisões simples',
  concept: 'if',
  objective:
    'Se houver uma árvore na frente, vire à direita. Caso contrário, ande até o destino.',
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
  initialCode: `# Fase 1: Use if para verificar se há árvore na frente
# Se houver árvore, vire à direita
# Caso contrário, ande até o destino

if arvore_na_frente():
    virar_direita()
else:
    # Ande até o destino
    for i in range(4):
        andar()
`,
  winCondition: (state: GameState) => {
    const destCell = state.grid[state.character.position.y][
      state.character.position.x
    ];
    return destCell.type === CellType.DESTINATION;
  },
};

/**
 * Fase 2: Caminho Alternativo (if/else)
 * Conceito: if/else
 * Objetivo: Se houver obstáculo, virar; caso contrário, seguir
 */
export const LEVEL_2: Level = {
  id: '2',
  name: 'Caminho Alternativo',
  description: 'Use if/else para escolher entre dois caminhos',
  concept: 'if/else',
  objective:
    'Se houver parede na frente, vire à esquerda e ande. Caso contrário, ande reto até o destino.',
  hint: 'Use parede_na_frente() para verificar obstáculos. Use if/else para escolher a ação.',
  gridWidth: 7,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
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
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
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
  initialCode: `# Fase 2: Use if/else para contornar obstáculos
# Se há parede na frente, vire à esquerda
# Caso contrário, ande

for i in range(7):
    if parede_na_frente():
        virar_esquerda()
        andar()
        virar_direita()
    else:
        andar()
`,
  winCondition: (state: GameState) => {
    const destCell = state.grid[state.character.position.y][
      state.character.position.x
    ];
    return destCell.type === CellType.DESTINATION;
  },
};

/**
 * Fase 3: Múltiplos Casos (elif)
 * Conceito: elif
 * Objetivo: Decidir ação baseada na cor do bloco
 */
export const LEVEL_3: Level = {
  id: '3',
  name: 'Múltiplos Casos',
  description: 'Use elif para lidar com múltiplas condições',
  concept: 'elif',
  objective:
    'Siga as regras: verde = andar, amarelo = virar direita, vermelho = parar',
  hint: 'Use cor_do_bloco() para obter a cor. Use if/elif/else para decidir a ação.',
  gridWidth: 5,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.COLORED_BLOCK, color: 'green' as BlockColor },
      { type: CellType.COLORED_BLOCK, color: 'green' as BlockColor },
      { type: CellType.COLORED_BLOCK, color: 'yellow' as BlockColor },
      { type: CellType.COLORED_BLOCK, color: 'green' as BlockColor },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.COLORED_BLOCK, color: 'green' as BlockColor },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.COLORED_BLOCK, color: 'red' as BlockColor },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 3: Use elif para múltiplas condições
# Verde = andar, Amarelo = virar direita, Vermelho = parar

for i in range(10):
    cor = cor_do_bloco()
    
    if cor == 'green':
        andar()
    elif cor == 'yellow':
        virar_direita()
        andar()
    elif cor == 'red':
        parar()
`,
  winCondition: (state: GameState) => {
    const destCell = state.grid[state.character.position.y][
      state.character.position.x
    ];
    return destCell.type === CellType.DESTINATION;
  },
};

/**
 * Fase 4: Lógica Composta (and/or)
 * Conceito: and / or / not
 * Objetivo: Combinar múltiplas condições
 */
export const LEVEL_4: Level = {
  id: '4',
  name: 'Lógica Composta',
  description: 'Use and/or/not para combinar condições',
  concept: 'and / or / not',
  objective:
    'Colete todos os itens sem bater em paredes. Use lógica composta para decidir.',
  hint: 'Use parede_na_frente() e destino_na_frente() juntos com and/or.',
  gridWidth: 6,
  gridHeight: 4,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.ITEM },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.ITEM },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.ITEM },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.ITEM },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 4: Use and/or para lógica composta
# Colete itens e chegue ao destino

for i in range(20):
    if not parede_na_frente():
        andar()
        coletar()
    else:
        virar_direita()
`,
  winCondition: (state: GameState) => {
    const destCell = state.grid[state.character.position.y][
      state.character.position.x
    ];
    return destCell.type === CellType.DESTINATION && state.itemsCollected >= 4;
  },
};

/**
 * Fase 5: Reutilização com Função (def)
 * Conceito: def
 * Objetivo: Criar função auxiliar para decidir ação
 */
export const LEVEL_5: Level = {
  id: '5',
  name: 'Reutilização com Função',
  description: 'Use def para criar funções reutilizáveis',
  concept: 'def',
  objective: 'Crie uma função para contornar obstáculos e chegue ao destino',
  hint: 'Use def para criar uma função que contorna obstáculos. Chame-a várias vezes.',
  gridWidth: 8,
  gridHeight: 5,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.WALL },
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
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Fase 5: Use def para criar funções reutilizáveis
# Crie uma função para contornar obstáculos

def contornar():
    if parede_na_frente():
        virar_esquerda()
        andar()
        virar_direita()
    else:
        andar()

# Chame a função para chegar ao destino
for i in range(8):
    contornar()
`,
  winCondition: (state: GameState) => {
    const destCell = state.grid[state.character.position.y][
      state.character.position.x
    ];
    return destCell.type === CellType.DESTINATION;
  },
};

/**
 * Lista de todas as fases
 */
export const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];
