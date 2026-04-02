/**
 * GameBoard Component
 * Renderiza o grid 2D do jogo com células, personagem e elementos
 * 
 * Design: Grid visual com cores, ícones para diferentes tipos de célula
 * Funcionalidade: Animação suave de movimento, feedback visual
 */

import { Cell, CellType, Character, Direction, Position } from '@/game/types';
import { TreePine, Package, Flag, Zap, AlertCircle } from 'lucide-react';

interface GameBoardProps {
  grid: Cell[][];
  character: Character;
  cellSize?: number;
}

const CELL_SIZE = 50;

/**
 * Renderiza o ícone apropriado para cada tipo de célula
 */
function CellIcon({ cell }: { cell: Cell }) {
  switch (cell.type) {
    case CellType.TREE:
      return <TreePine className="w-6 h-6 text-green-600" />;
    case CellType.ITEM:
      return <Package className="w-6 h-6 text-yellow-500" />;
    case CellType.DESTINATION:
      return <Flag className="w-6 h-6 text-red-500" />;
    case CellType.OBSTACLE:
      return <AlertCircle className="w-6 h-6 text-orange-500" />;
    case CellType.COLORED_BLOCK:
      return (
        <div
          className="w-6 h-6 rounded"
          style={{
            backgroundColor: cell.color || 'gray',
          }}
        />
      );
    default:
      return null;
  }
}

/**
 * Renderiza o personagem com direção visual
 */
function CharacterSprite({ direction }: { direction: Direction }) {
  const rotationMap = {
    UP: 'rotate-0',
    RIGHT: 'rotate-90',
    DOWN: 'rotate-180',
    LEFT: 'rotate-270',
  };

  return (
    <div
      className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm ${rotationMap[direction]} transition-transform duration-200`}
    >
      ▶
    </div>
  );
}

export default function GameBoard({
  grid,
  character,
  cellSize = CELL_SIZE,
}: GameBoardProps) {
  const gridWidth = grid[0]?.length || 0;
  const gridHeight = grid.length;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card p-4">
      <div className="bg-secondary px-4 py-2 border-b border-border mb-4">
        <h3 className="text-sm font-semibold text-foreground">Mapa do Jogo</h3>
      </div>

      {/* Grid container */}
      <div
        className="inline-block border-2 border-foreground/20 bg-slate-900"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridWidth}, ${cellSize}px)`,
          gap: '1px',
          backgroundColor: '#1e293b',
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const isCharacterHere =
              character.position.x === x && character.position.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className="flex items-center justify-center relative transition-all duration-200"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor:
                    cell.type === CellType.WALL
                      ? '#334155'
                      : cell.type === CellType.COLORED_BLOCK
                        ? cell.color || '#94a3b8'
                        : '#0f172a',
                  border:
                    cell.type === CellType.FLOOR
                      ? '1px solid #334155'
                      : '1px solid #1e293b',
                }}
              >
                {/* Renderizar elemento da célula */}
                {!isCharacterHere && <CellIcon cell={cell} />}

                {/* Renderizar personagem se estiver nesta célula */}
                {isCharacterHere && (
                  <CharacterSprite direction={character.direction} />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Informações do grid */}
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Posição: ({character.position.x}, {character.position.y})</p>
        <p>Direção: {character.direction}</p>
      </div>
    </div>
  );
}
