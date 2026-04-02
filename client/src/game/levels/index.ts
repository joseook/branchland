/**
 * Definição das 20 fases iniciais do Branchland
 * Organizado em 5 mundos com progressão pedagógica clara
 * 
 * Mundo 1: Campos de Início (sequência simples)
 * Mundo 2: Campo das Decisões (if/else)
 * Mundo 3: Vale dos Caminhos Múltiplos (elif)
 * Mundo 4: Irrigação Lógica (and/or/not)
 * Mundo 5: Celeiro das Funções (def)
 */

import {
  Level,
  CellType,
  Direction,
  GameState,
  BlockColor,
  WorldId,
} from '@/game/types';

// ============================================================
// MUNDO 1 — CAMPOS DE INÍCIO
// ============================================================

/**
 * Fase 1.1: Primeiro Passo
 * Conceito: Execução sequencial simples
 */
export const LEVEL_1_1: Level = {
  id: '1_1',
  worldId: WorldId.WORLD_1,
  name: 'Primeiro Passo',
  description: 'Faça o personagem andar até o bloco de destino',
  concept: 'Execução sequencial',
  objective: 'Ande até o destino logo à frente.',
  context: 'O robô fazendeiro precisa sair do ponto inicial e alcançar a primeira marcação da trilha.',
  hint: 'Use andar() para mover o personagem.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Primeiro Passo
# Ande até o destino

andar()`,
  allowedFunctions: ['andar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você completou seu primeiro passo no Branchland!',
};

/**
 * Fase 1.2: Dois Passos à Frente
 * Conceito: Sequência de comandos
 */
export const LEVEL_1_2: Level = {
  id: '1_2',
  worldId: WorldId.WORLD_1,
  name: 'Dois Passos à Frente',
  description: 'Avance duas casas até o destino',
  concept: 'Sequência de comandos',
  objective: 'Avance duas casas até o destino.',
  context: 'A trilha até o canteiro de teste exige mais de um movimento.',
  hint: 'Você pode usar o mesmo comando mais de uma vez.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 1, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Dois Passos à Frente
# Use andar() duas vezes

andar()
andar()`,
  allowedFunctions: ['andar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você dominou a sequência de comandos!',
};

/**
 * Fase 1.3: Virando na Cerca
 * Conceito: Sequência e direção
 */
export const LEVEL_1_3: Level = {
  id: '1_3',
  worldId: WorldId.WORLD_1,
  name: 'Virando na Cerca',
  description: 'Virar e seguir uma trilha em L até o destino',
  concept: 'Sequência e direção',
  objective: 'Virar e seguir uma trilha em L até o destino.',
  context: 'Uma cerca bloqueia o caminho reto, então o robô deve virar para seguir a trilha correta.',
  hint: 'Às vezes é preciso mudar a direção antes de andar.',
  gridWidth: 4,
  gridHeight: 4,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.WALL },
      { type: CellType.WALL },
      { type: CellType.WALL },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 2 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Virando na Cerca
# Virar e seguir a trilha

virar_esquerda()
andar()
andar()
virar_direita()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Perfeito! Você aprendeu a mudar de direção!',
};

/**
 * Fase 1.4: Mensagem no Campo
 * Conceito: Saída simples e depuração
 */
export const LEVEL_1_4: Level = {
  id: '1_4',
  worldId: WorldId.WORLD_1,
  name: 'Mensagem no Campo',
  description: 'Mover e exibir uma mensagem no console',
  concept: 'Saída simples',
  objective: 'Mover o personagem e exibir uma mensagem no console.',
  context: 'Antes de iniciar a tarefa, o robô fazendeiro deve avisar que está pronto.',
  hint: 'Use mostrar("texto") para enviar uma mensagem ao painel.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Mensagem no Campo
# Avise que está pronto e ande

mostrar("Iniciando!")
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION && state.console.length > 0;
  },
  pedagogicalMessage: 'Ótimo! Você aprendeu a usar mostrar() para feedback!',
};

// ============================================================
// MUNDO 2 — CAMPO DAS DECISÕES
// ============================================================

/**
 * Fase 2.1: Pedra à Frente
 * Conceito: if simples
 */
export const LEVEL_2_1: Level = {
  id: '2_1',
  worldId: WorldId.WORLD_2,
  name: 'Pedra à Frente',
  description: 'Verificar se há obstáculo e reagir corretamente',
  concept: 'if',
  objective: 'Se houver obstáculo na frente, vire à direita. Depois ande até o destino.',
  context: 'Uma pedra pode bloquear a trilha da plantação.',
  hint: 'Use if para decidir uma ação quando a condição for verdadeira.',
  gridWidth: 5,
  gridHeight: 4,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Pedra à Frente
# Verificar e reagir

if obstaculo_na_frente():
    virar_direita()

andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'obstaculo_na_frente', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você usou if para reagir ao ambiente!',
};

/**
 * Fase 2.2: Colheita Seletiva
 * Conceito: if com verificação de estado
 */
export const LEVEL_2_2: Level = {
  id: '2_2',
  worldId: WorldId.WORLD_2,
  name: 'Colheita Seletiva',
  description: 'Colher somente se houver planta madura na frente',
  concept: 'if',
  objective: 'Colha somente se houver planta madura na frente.',
  context: 'O robô deve colher apenas plantas prontas, evitando agir sem necessidade.',
  hint: 'A condição serve para verificar se a ação deve acontecer.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.TREE },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Colheita Seletiva
# Colher apenas se houver planta

if arvore_na_frente():
    coletar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'arvore_na_frente', 'coletar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você aprendeu a verificar estado antes de agir!',
};

/**
 * Fase 2.3: Caminho Livre ou Desvio
 * Conceito: if/else
 */
export const LEVEL_2_3: Level = {
  id: '2_3',
  worldId: WorldId.WORLD_2,
  name: 'Caminho Livre ou Desvio',
  description: 'Se houver obstáculo, desviar; caso contrário, seguir em frente',
  concept: 'if/else',
  objective: 'Se houver obstáculo, desvie; caso contrário, siga em frente até o destino.',
  context: 'A trilha muda conforme a presença de uma caixa de ferramentas esquecida.',
  hint: 'Use else para definir o que acontece quando a condição for falsa.',
  gridWidth: 5,
  gridHeight: 4,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
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
  characterStartPosition: { x: 0, y: 1 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Caminho Livre ou Desvio
# Decidir entre dois caminhos

if obstaculo_na_frente():
    virar_direita()
else:
    andar()

andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'obstaculo_na_frente', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Muito bem! Você dominou if/else!',
};

/**
 * Fase 2.4: Solo Seco
 * Conceito: if/else com verificação de estado
 */
export const LEVEL_2_4: Level = {
  id: '2_4',
  worldId: WorldId.WORLD_2,
  name: 'Solo Seco',
  description: 'Regar se o solo estiver seco; caso contrário, seguir pela trilha',
  concept: 'if/else',
  objective: 'Regar se o solo estiver seco; caso contrário, siga até o destino.',
  context: 'Sensores simples ajudam o robô a decidir se deve cuidar da plantação antes de continuar.',
  hint: 'Pense em duas possibilidades: solo seco ou solo não seco.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Solo Seco
# Decidir entre regar ou andar

if solo_seco():
    regar()
else:
    andar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'solo_seco', 'regar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Perfeito! Você aprendeu a tomar decisões contextualizadas!',
};

// ============================================================
// MUNDO 3 — VALE DOS CAMINHOS MÚLTIPLOS
// ============================================================

/**
 * Fase 3.1: Cor do Caminho
 * Conceito: if/elif/else com comparação
 */
export const LEVEL_3_1: Level = {
  id: '3_1',
  worldId: WorldId.WORLD_3,
  name: 'Cor do Caminho',
  description: 'Decidir a ação com base na cor do bloco atual',
  concept: 'if/elif/else',
  objective: 'Agir de acordo com a cor do bloco: verde = andar, amarelo = virar, outro = parar.',
  context: 'As trilhas coloridas indicam o próximo comportamento do robô.',
  hint: 'Compare o valor retornado pela função com ==',
  gridWidth: 5,
  gridHeight: 3,
  grid: [
    [
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
  initialCode: `# Cor do Caminho
# Agir conforme a cor

if cor_do_bloco() == "verde":
    andar()
elif cor_do_bloco() == "amarelo":
    virar_direita()
else:
    parar()`,
  allowedFunctions: ['andar', 'virar_direita', 'cor_do_bloco', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você aprendeu elif para múltiplos casos!',
};

/**
 * Fase 3.2: Sinalização do Campo
 * Conceito: elif com múltiplas rotas
 */
export const LEVEL_3_2: Level = {
  id: '3_2',
  worldId: WorldId.WORLD_3,
  name: 'Sinalização do Campo',
  description: 'Reagir a três tipos de sinal do terreno',
  concept: 'elif',
  objective: 'Agir de acordo com o tipo de sinal: irrigação = regar, colheita = colher, outro = andar.',
  context: 'Placas da fazenda indicam diferentes operações conforme o setor.',
  hint: 'elif ajuda quando existem mais de dois casos possíveis.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Sinalização do Campo
# Agir conforme o sinal

if arvore_na_frente():
    coletar()
elif solo_seco():
    regar()
else:
    andar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'arvore_na_frente', 'solo_seco', 'coletar', 'regar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você está dominando múltiplos casos!',
};

/**
 * Fase 3.3: Três Estados do Solo
 * Conceito: elif com múltiplos estados
 */
export const LEVEL_3_3: Level = {
  id: '3_3',
  worldId: WorldId.WORLD_3,
  name: 'Três Estados do Solo',
  description: 'Decidir a ação conforme o estado do solo',
  concept: 'elif',
  objective: 'Agir conforme o estado: seco = regar, pronto = plantar, bloqueado = remover.',
  context: 'O solo pode estar seco, pronto ou bloqueado, e cada caso exige uma resposta diferente.',
  hint: 'Use if/elif/else para tratar todos os estados possíveis.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Três Estados do Solo
# Agir conforme o estado

if solo_seco():
    regar()
elif tem_semente():
    plantar()
else:
    remover_pedra()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'solo_seco', 'tem_semente', 'regar', 'plantar', 'remover_pedra', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Perfeito! Você domina cobertura completa de casos!',
};

/**
 * Fase 3.4: Rota do Celeiro
 * Conceito: if/elif/else com navegação
 */
export const LEVEL_3_4: Level = {
  id: '3_4',
  worldId: WorldId.WORLD_3,
  name: 'Rota do Celeiro',
  description: 'Seguir instruções de rota baseadas na cor do piso',
  concept: 'if/elif/else',
  objective: 'Seguir a rota: azul = esquerda, verde = frente, amarelo = direita, outro = parar.',
  context: 'O caminho até o celeiro muda conforme as marcações de navegação do chão.',
  hint: 'Trate os casos um por um, em ordem clara.',
  gridWidth: 5,
  gridHeight: 4,
  grid: [
    [
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
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Rota do Celeiro
# Seguir as marcações

if cor_do_bloco() == "azul":
    virar_esquerda()
elif cor_do_bloco() == "verde":
    andar()
elif cor_do_bloco() == "amarelo":
    virar_direita()
else:
    parar()

andar()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'cor_do_bloco', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você domina navegação por regras!',
};

// ============================================================
// MUNDO 4 — IRRIGAÇÃO LÓGICA
// ============================================================

/**
 * Fase 4.1: Rega Segura
 * Conceito: and
 */
export const LEVEL_4_1: Level = {
  id: '4_1',
  worldId: WorldId.WORLD_4,
  name: 'Rega Segura',
  description: 'Regar apenas se o solo estiver seco E houver água disponível',
  concept: 'and',
  objective: 'Regar apenas quando AMBAS as condições forem verdadeiras.',
  context: 'A fazenda quer evitar desperdício de água.',
  hint: 'and exige que ambas as condições sejam verdadeiras.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Rega Segura
# Regar apenas se seguro

if solo_seco() and tem_agua():
    regar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'solo_seco', 'tem_agua', 'regar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você aprendeu and para condições compostas!',
};

/**
 * Fase 4.2: Plantio Flexível
 * Conceito: or
 */
export const LEVEL_4_2: Level = {
  id: '4_2',
  worldId: WorldId.WORLD_4,
  name: 'Plantio Flexível',
  description: 'Plantar se houver semente OU muda disponível',
  concept: 'or',
  objective: 'Plantar quando PELO MENOS UMA condição for verdadeira.',
  context: 'O robô pode iniciar o plantio usando qualquer um dos dois recursos permitidos.',
  hint: 'or permite agir quando uma entre várias possibilidades acontece.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Plantio Flexível
# Plantar com qualquer recurso

if tem_semente() or tem_muda():
    plantar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'tem_semente', 'tem_muda', 'plantar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Muito bem! Você domina or para alternativas!',
};

/**
 * Fase 4.3: Área Livre de Praga
 * Conceito: not
 */
export const LEVEL_4_3: Level = {
  id: '4_3',
  worldId: WorldId.WORLD_4,
  name: 'Área Livre de Praga',
  description: 'Avançar apenas se NÃO houver praga detectada',
  concept: 'not',
  objective: 'Avançar apenas quando a área estiver segura (sem praga).',
  context: 'A equipe da fazenda não deve entrar em uma área comprometida.',
  hint: 'not inverte o valor lógico de uma condição.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Área Livre de Praga
# Avançar apenas se seguro

if not praga_detectada():
    andar()
else:
    parar()

andar()
andar()`,
  allowedFunctions: ['andar', 'praga_detectada', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Perfeito! Você aprendeu not para negação lógica!',
};

/**
 * Fase 4.4: Cuidado Completo
 * Conceito: and/or/not combinados
 */
export const LEVEL_4_4: Level = {
  id: '4_4',
  worldId: WorldId.WORLD_4,
  name: 'Cuidado Completo',
  description: 'Decidir entre regar, plantar ou parar usando múltiplas condições',
  concept: 'and/or/not',
  objective: 'Combinar múltiplas condições para tomar a decisão correta.',
  context: 'Esta área exige uma lógica mais completa de manejo.',
  hint: 'Quebre o problema em blocos: quando regar, quando plantar, quando parar.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Cuidado Completo
# Lógica completa de manejo

if solo_seco() and tem_agua() and not praga_detectada():
    regar()
elif tem_semente() and not praga_detectada():
    plantar()
else:
    parar()

andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'solo_seco', 'tem_agua', 'tem_semente', 'praga_detectada', 'regar', 'plantar', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você domina lógica composta!',
};

// ============================================================
// MUNDO 5 — CELEIRO DAS FUNÇÕES
// ============================================================

/**
 * Fase 5.1: Decidir o Próximo Passo
 * Conceito: def simples
 */
export const LEVEL_5_1: Level = {
  id: '5_1',
  worldId: WorldId.WORLD_5,
  name: 'Decidir o Próximo Passo',
  description: 'Criar uma função que decide se deve andar ou virar',
  concept: 'def',
  objective: 'Criar uma função que encapsula a decisão.',
  context: 'O robô começa a transformar decisões repetidas em pequenas rotinas.',
  hint: 'Use def para colocar a decisão dentro de uma função.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Decidir o Próximo Passo
# Criar função para decisão

def decidir_passo():
    if obstaculo_na_frente():
        virar_direita()
    else:
        andar()

decidir_passo()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'obstaculo_na_frente', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Ótimo! Você criou sua primeira função!',
};

/**
 * Fase 5.2: Função de Colheita
 * Conceito: def com reutilização
 */
export const LEVEL_5_2: Level = {
  id: '5_2',
  worldId: WorldId.WORLD_5,
  name: 'Função de Colheita',
  description: 'Criar uma função para verificar planta e colher',
  concept: 'def',
  objective: 'Criar uma função reutilizável para cuidar da frente.',
  context: 'Tarefas frequentes da fazenda podem ser agrupadas em funções reutilizáveis.',
  hint: 'Pense na função como uma pequena ação nomeada.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
      { type: CellType.FLOOR },
      { type: CellType.TREE },
      { type: CellType.FLOOR },
      { type: CellType.DESTINATION },
    ],
    [
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
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Função de Colheita
# Criar função reutilizável

def cuidar_frente():
    if arvore_na_frente():
        coletar()
    else:
        andar()

cuidar_frente()
andar()
andar()`,
  allowedFunctions: ['andar', 'arvore_na_frente', 'coletar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Muito bem! Você domina reutilização com funções!',
};

/**
 * Fase 5.3: Rota Organizada
 * Conceito: def com elif
 */
export const LEVEL_5_3: Level = {
  id: '5_3',
  worldId: WorldId.WORLD_5,
  name: 'Rota Organizada',
  description: 'Criar uma função que trata vários casos',
  concept: 'def',
  objective: 'Organizar lógica complexa dentro de uma função.',
  context: 'A logística até o depósito ficou mais complexa e exige uma rotina organizada.',
  hint: 'A função pode guardar toda a lógica da decisão.',
  gridWidth: 5,
  gridHeight: 3,
  grid: [
    [
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
  initialCode: `# Rota Organizada
# Função com múltiplos casos

def seguir_regra():
    if cor_do_bloco() == "verde":
        andar()
    elif cor_do_bloco() == "amarelo":
        virar_direita()
    elif cor_do_bloco() == "azul":
        virar_esquerda()
    else:
        parar()

seguir_regra()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'virar_direita', 'virar_esquerda', 'cor_do_bloco', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Perfeito! Você organiza lógica complexa em funções!',
};

/**
 * Fase 5.4: Automação do Canteiro
 * Conceito: def com lógica composta
 */
export const LEVEL_5_4: Level = {
  id: '5_4',
  worldId: WorldId.WORLD_5,
  name: 'Automação do Canteiro',
  description: 'Criar uma função principal com lógica completa',
  concept: 'def',
  objective: 'Integrar todos os conhecimentos em uma função final.',
  context: 'O robô está pronto para cuidar sozinho de um pequeno canteiro inteligente.',
  hint: 'Combine tudo que você já aprendeu dentro de uma única função.',
  gridWidth: 4,
  gridHeight: 3,
  grid: [
    [
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
    ],
    [
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
      { type: CellType.FLOOR },
    ],
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Automação do Canteiro
# Função completa de manejo

def cuidar_canteiro():
    if solo_seco() and tem_agua() and not praga_detectada():
        regar()
    elif tem_semente() and not praga_detectada():
        plantar()
    else:
        parar()

cuidar_canteiro()
andar()
andar()
andar()`,
  allowedFunctions: ['andar', 'solo_seco', 'tem_agua', 'tem_semente', 'praga_detectada', 'regar', 'plantar', 'parar', 'mostrar'],
  winCondition: (state: GameState) => {
    const { character, currentLevel } = state;
    const destCell = currentLevel.grid[character.position.y]?.[character.position.x];
    return destCell?.type === CellType.DESTINATION;
  },
  pedagogicalMessage: 'Excelente! Você completou o Branchland MVP! 🎉',
};

// ============================================================
// EXPORTAÇÃO
// ============================================================

export const ALL_LEVELS: Level[] = [
  // Mundo 1
  LEVEL_1_1,
  LEVEL_1_2,
  LEVEL_1_3,
  LEVEL_1_4,
  // Mundo 2
  LEVEL_2_1,
  LEVEL_2_2,
  LEVEL_2_3,
  LEVEL_2_4,
  // Mundo 3
  LEVEL_3_1,
  LEVEL_3_2,
  LEVEL_3_3,
  LEVEL_3_4,
  // Mundo 4
  LEVEL_4_1,
  LEVEL_4_2,
  LEVEL_4_3,
  LEVEL_4_4,
  // Mundo 5
  LEVEL_5_1,
  LEVEL_5_2,
  LEVEL_5_3,
  LEVEL_5_4,
];

export const LEVELS_BY_WORLD = {
  [WorldId.WORLD_1]: [LEVEL_1_1, LEVEL_1_2, LEVEL_1_3, LEVEL_1_4],
  [WorldId.WORLD_2]: [LEVEL_2_1, LEVEL_2_2, LEVEL_2_3, LEVEL_2_4],
  [WorldId.WORLD_3]: [LEVEL_3_1, LEVEL_3_2, LEVEL_3_3, LEVEL_3_4],
  [WorldId.WORLD_4]: [LEVEL_4_1, LEVEL_4_2, LEVEL_4_3, LEVEL_4_4],
  [WorldId.WORLD_5]: [LEVEL_5_1, LEVEL_5_2, LEVEL_5_3, LEVEL_5_4],
  [WorldId.WORLD_6]: [],
};
