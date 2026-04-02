# Branchland - Jogo Educativo de Estruturas de Decisão em Python

Um jogo web interativo que ensina estruturas de decisão em Python (if/else/elif) através de desafios visuais em um grid 2D. O jogador escreve código Python real em um editor integrado (Monaco) e o executa com Pyodide para controlar um personagem no mapa.

## 🎮 Características

- **Editor de Código Integrado**: Monaco Editor com syntax highlighting para Python
- **Execução Real de Python**: Pyodide permite executar Python no navegador sem backend
- **5 Fases Progressivas**: Cada fase ensina um conceito novo
  - Fase 1: `if` simples
  - Fase 2: `if/else`
  - Fase 3: `elif`
  - Fase 4: Operadores lógicos (`and`/`or`/`not`)
  - Fase 5: Funções com `def`
- **Grid 2D Visual**: Mapa interativo com elementos variados
- **Console em Tempo Real**: Feedback imediato da execução
- **Validação de Vitória**: Cada fase tem um objetivo claro
- **Interface Didática**: Instruções, dicas e conceitos explicados

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 22+
- pnpm 10+

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/branchland.git
cd branchland

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O jogo estará disponível em `http://localhost:3000`

### Build para Produção

```bash
pnpm build
pnpm start
```

## 📚 Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: TailwindCSS 4
- **Editor de Código**: Monaco Editor
- **Python no Browser**: Pyodide (via CDN)
- **UI Components**: shadcn/ui
- **Routing**: Wouter

## 🎯 Como Jogar

1. **Selecione uma Fase**: Na página inicial, escolha uma das 5 fases
2. **Leia as Instruções**: Entenda o conceito, objetivo e dica
3. **Escreva Código Python**: Use o editor para escrever seu código
4. **Execute**: Clique em "Executar" (ou Ctrl+Enter) para rodar
5. **Veja o Resultado**: O personagem se move no mapa conforme seu código
6. **Complete o Objetivo**: Quando atingir o objetivo, avance para a próxima fase

## 🔧 API de Comandos Disponíveis

```python
# Movimento
andar()                    # Move o personagem para frente
virar_direita()           # Vira 90° para a direita
virar_esquerda()          # Vira 90° para a esquerda

# Sensores (retornam True/False)
parede_na_frente()        # Verifica se há parede na frente
arvore_na_frente()        # Verifica se há árvore na frente
destino_na_frente()       # Verifica se há destino na frente

# Informações
cor_do_bloco()            # Retorna a cor do bloco atual ('red', 'green', 'blue', 'yellow', 'purple')

# Ações
coletar()                 # Coleta um item se houver
parar()                   # Para a execução
mostrar(msg)              # Exibe uma mensagem no console
```

## 📝 Exemplos de Código

### Fase 1: If Simples
```python
if arvore_na_frente():
    virar_direita()
else:
    for i in range(4):
        andar()
```

### Fase 2: If/Else
```python
for i in range(7):
    if parede_na_frente():
        virar_esquerda()
        andar()
        virar_direita()
    else:
        andar()
```

### Fase 3: Elif
```python
for i in range(10):
    cor = cor_do_bloco()
    
    if cor == 'green':
        andar()
    elif cor == 'yellow':
        virar_direita()
        andar()
    elif cor == 'red':
        parar()
```

### Fase 5: Funções
```python
def contornar():
    if parede_na_frente():
        virar_esquerda()
        andar()
        virar_direita()
    else:
        andar()

for i in range(8):
    contornar()
```

## 🏗️ Estrutura do Projeto

```
branchland/
├── client/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── GameBoard.tsx
│   │   │   ├── ConsolePanel.tsx
│   │   │   ├── MissionPanel.tsx
│   │   │   └── Controls.tsx
│   │   ├── game/
│   │   │   ├── types/         # Tipos TypeScript
│   │   │   ├── levels/        # Definição das fases
│   │   │   └── engine/        # Motor do jogo
│   │   ├── hooks/
│   │   │   ├── useGameEngine.ts
│   │   │   └── usePyodide.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx       # Menu principal
│   │   │   └── Game.tsx       # Página do jogo
│   │   └── App.tsx
│   └── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 🔄 Fluxo de Execução

1. **Usuário escreve código** no Monaco Editor
2. **Clica em "Executar"**
3. **Código é enviado ao Pyodide** para execução
4. **Pyodide chama funções do jogo** (andar, virar, etc)
5. **Cada função adiciona ação à fila** de ações
6. **Engine processa a fila** e atualiza o estado do jogo
7. **UI renderiza novo estado** do grid
8. **Condição de vitória é verificada**
9. **Feedback visual** é exibido ao usuário

## 🎨 Customização

### Adicionar Nova Fase

1. Crie um novo objeto `Level` em `client/src/game/levels/index.ts`:

```typescript
export const LEVEL_6: Level = {
  id: '6',
  name: 'Sua Nova Fase',
  description: 'Descrição da fase',
  concept: 'Conceito a ensinar',
  objective: 'Objetivo da fase',
  hint: 'Dica para o aluno',
  gridWidth: 8,
  gridHeight: 5,
  grid: [
    // Defina seu grid aqui
  ],
  characterStartPosition: { x: 0, y: 0 },
  characterStartDirection: Direction.RIGHT,
  initialCode: `# Código inicial sugerido`,
  winCondition: (state: GameState) => {
    // Defina a condição de vitória
    return state.character.position.x === 7;
  },
};
```

2. Adicione à lista `LEVELS`:

```typescript
export const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6];
```

### Modificar Elementos do Grid

Os tipos de célula disponíveis são:
- `CellType.FLOOR` - Chão vazio
- `CellType.WALL` - Parede
- `CellType.TREE` - Árvore
- `CellType.ITEM` - Item para coletar
- `CellType.DESTINATION` - Destino (objetivo)
- `CellType.COLORED_BLOCK` - Bloco colorido
- `CellType.OBSTACLE` - Obstáculo

## 📖 Conceitos Educacionais

O jogo foi desenhado para ensinar:

1. **Estruturas de Decisão**: if/else/elif
2. **Operadores de Comparação**: ==, !=, <, >, <=, >=
3. **Operadores Lógicos**: and, or, not
4. **Loops**: for, while
5. **Funções**: def, return, parâmetros
6. **Pensamento Computacional**: Decomposição, abstração, reconhecimento de padrões

## 🐛 Troubleshooting

### Pyodide não carrega
- Verifique sua conexão com a internet (Pyodide é carregado via CDN)
- Limpe o cache do navegador
- Tente em outro navegador

### Código não executa
- Verifique a sintaxe Python
- Veja as mensagens de erro no console
- Tente um código mais simples primeiro

### Personagem não se move
- Verifique se o código chama `andar()`
- Verifique se há paredes bloqueando o caminho
- Use `parede_na_frente()` para verificar

## 📄 Licença

MIT

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto, abra uma issue no GitHub.

---

**Branchland** © 2026 - Um jogo educativo de estruturas de decisão em Python
