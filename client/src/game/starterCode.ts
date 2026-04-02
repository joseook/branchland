import { Level, WorldId } from '@/game/types';

function getPhase(level: Level): number {
  const phase = Number(level.id.split('_')[1]);
  return Number.isFinite(phase) ? phase : 1;
}

function functionList(level: Level): string {
  return level.allowedFunctions.join(', ');
}

function buildHeader(level: Level, tone: string): string {
  return `# ${level.name}
# ${tone}
# Use: ${functionList(level)}
`;
}

function world1Starter(level: Level, phase: number): string {
  const header = buildHeader(level, 'Campanha de abertura');

  switch (phase) {
    case 1:
      return `${header}
# Missao: chegar ao alvo em um unico passo.

andar()
`;
    case 2:
      return `${header}
# Missao: repetir o mesmo movimento.

andar()
andar()
# Adicione o restante da sequencia.
`;
    case 3:
      return `${header}
# Missao: virar, avancar e seguir a trilha.

virar_esquerda()
# Complete a rotacao correta aqui.
andar()
andar()
`;
    default:
      return `${header}
# Missao: avisar, andar e finalizar a fase.

mostrar("Pronto para avancar!")
andar()
# Complete o caminho ate o destino.
`;
  }
}

function world2Starter(level: Level, phase: number): string {
  const header = buildHeader(level, 'Desafios com decisao');

  switch (phase) {
    case 1:
      return `${header}
# Complete a condicao e escolha a acao.

if parede_na_frente():
    # vire_direita()
    pass
else:
    # andar()
    pass
`;
    case 2:
      return `${header}
# Complete a verificacao antes de seguir.

if arvore_na_frente():
    coletar()
else:
    # siga em frente quando nao houver planta
    pass

# Continue a rota depois da decisao.
`;
    case 3:
      return `${header}
# Escolha entre desviar ou seguir.

if obstaculo_na_frente():
    virar_direita()
else:
    andar()

# Ajuste o restante da caminhada.
`;
    default:
      return `${header}
# Reaja ao estado do solo antes de continuar.

if solo_seco():
    # regar()
    pass
else:
    andar()
`;
  }
}

function world3Starter(level: Level, phase: number): string {
  const header = buildHeader(level, 'Rotas com multiplos caminhos');

  switch (phase) {
    case 1:
      return `${header}
# Complete a escolha entre tres casos.

if cor_do_bloco() == "verde":
    andar()
elif cor_do_bloco() == "amarelo":
    virar_direita()
else:
    # parar()
    pass
`;
    case 2:
      return `${header}
# Complete a resposta para cada sinal.

if arvore_na_frente():
    coletar()
elif solo_seco():
    regar()
else:
    andar()
`;
    case 3:
      return `${header}
# Organize o fluxo com tres estados.

if solo_seco():
    regar()
elif tem_semente():
    plantar()
else:
    remover_pedra()
`;
    default:
      return `${header}
# Tome a decisao correta para a rota final.

if cor_do_bloco() == "azul":
    virar_esquerda()
elif cor_do_bloco() == "verde":
    andar()
elif cor_do_bloco() == "amarelo":
    virar_direita()
else:
    # parar()
    pass
`;
  }
}

function world4Starter(level: Level, phase: number): string {
  const header = buildHeader(level, 'Logica composta');

  switch (phase) {
    case 1:
      return `${header}
# Combine duas condicoes antes de agir.
# Escreva a solucao completa do zero.
`;
    case 2:
      return `${header}
# Use or para aceitar mais de uma possibilidade.
# Escreva a solucao completa do zero.
`;
    case 3:
      return `${header}
# Inverta a condicao quando precisar.
# Escreva a solucao completa do zero.
`;
    default:
      return `${header}
# Monte a decisao completa com and, or e not.
# Resolva a fase sozinho.
`;
  }
}

function world5Starter(level: Level, phase: number): string {
  const header = buildHeader(level, 'Funcoes e autonomia');

  switch (phase) {
    case 1:
      return `${header}
# Escreva uma funcao simples que decide o proximo passo.
# Resolva a fase sozinho.
`;
    case 2:
      return `${header}
# Crie uma funcao reutilizavel para cuidar da frente.
# Resolva a fase sozinho.
`;
    case 3:
      return `${header}
# Organize a logica com if e elif dentro da funcao.
# Resolva a fase sozinho.
`;
    default:
      return `${header}
# Finalize a automacao com uma funcao principal.
# Escreva toda a logica sozinho.
`;
  }
}

export function getStarterCode(level: Level): string {
  const phase = getPhase(level);

  switch (level.worldId) {
    case WorldId.WORLD_1:
      return world1Starter(level, phase);
    case WorldId.WORLD_2:
      return world2Starter(level, phase);
    case WorldId.WORLD_3:
      return world3Starter(level, phase);
    case WorldId.WORLD_4:
      return world4Starter(level, phase);
    case WorldId.WORLD_5:
    default:
      return world5Starter(level, phase);
  }
}
