/**
 * GameBoard Component
 * Renderiza o grid 2D do jogo com células, personagem e elementos
 *
 * Design: Grid visual com cores, ícones para diferentes tipos de célula
 * Funcionalidade: Animação suave de movimento, feedback visual
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, Flag, Package, TreePine, AlertCircle } from 'lucide-react';
import { Cell, CellType, Character, Direction, Position } from '@/game/types';

interface GameBoardProps {
  grid: Cell[][];
  character: Character;
  trail?: Position[];
  cellSize?: number;
  isExecuting?: boolean;
}

const CELL_SIZE = 50;

function CellIcon({ cell }: { cell: Cell }) {
  switch (cell.type) {
    case CellType.TREE:
      return <TreePine className="h-6 w-6 text-green-600" />;
    case CellType.ITEM:
      return <Package className="h-6 w-6 text-yellow-500" />;
    case CellType.DESTINATION:
      return <Flag className="h-6 w-6 text-red-500" />;
    case CellType.OBSTACLE:
      return <AlertCircle className="h-6 w-6 text-orange-500" />;
    case CellType.COLORED_BLOCK:
      return (
        <div
          className="h-6 w-6 rounded"
          style={{
            backgroundColor: cell.color || 'gray',
          }}
        />
      );
    default:
      return null;
  }
}

function CharacterSprite({
  direction,
  isExecuting,
}: {
  direction: Direction;
  isExecuting?: boolean;
}) {
  const rotationMap: Record<Direction, number> = {
    UP: 0,
    RIGHT: 90,
    DOWN: 180,
    LEFT: 270,
  };

  return (
    <motion.div
      className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 via-white to-stone-100 text-stone-800 shadow-[0_18px_30px_-20px_rgba(17,24,39,0.45)]"
      animate={
        isExecuting
          ? { y: [0, -3, 0], scale: [1, 1.03, 1], rotate: [0, -2, 2, 0] }
          : { y: [0, -1, 0], scale: [1, 1.01, 1] }
      }
      transition={
        isExecuting
          ? { duration: 0.65, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
      }
    >
      <Bot
        className="h-5 w-5 transition-transform duration-300"
        style={{ rotate: `${rotationMap[direction]}deg` }}
      />
      <span className="absolute -bottom-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.16)]" />
    </motion.div>
  );
}

export default function GameBoard({
  grid,
  character,
  trail = [],
  cellSize = CELL_SIZE,
  isExecuting = false,
}: GameBoardProps) {
  const gridWidth = grid[0]?.length || 0;
  const gridHeight = grid.length;
  const reduceMotion = useReducedMotion();
  const gap = 1;
  const boardWidth = gridWidth * cellSize + Math.max(0, gridWidth - 1) * gap;
  const boardHeight = gridHeight * cellSize + Math.max(0, gridHeight - 1) * gap;
  const displayTrail = trail.slice(-12);
  const pathPoints = [...displayTrail, character.position];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card p-4">
      <div className="mb-4 border-b border-border bg-secondary px-4 py-2">
        <h3 className="text-sm font-semibold text-foreground">Mapa do Jogo</h3>
      </div>

      <div
        className="relative inline-block border-2 border-foreground/20 bg-slate-900"
        style={{
          width: `${boardWidth}px`,
          height: `${boardHeight}px`,
          backgroundColor: '#1e293b',
        }}
      >
        <AnimatePresence initial={false}>
          {displayTrail.map((point, index) => {
            const opacity = Math.max(0.14, 0.82 - (displayTrail.length - index) * 0.05);

            return (
              <motion.div
                key={`trail-${point.x}-${point.y}-${index}`}
                className="pointer-events-none absolute z-10"
                style={{
                  left: `${point.x * (cellSize + gap)}px`,
                  top: `${point.y * (cellSize + gap)}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                initial={{ opacity: 0, scale: 0.5, y: 6 }}
                animate={{ opacity, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-amber-200/70 shadow-[0_0_18px_rgba(245,158,11,0.35)]" />
                  <div className="absolute h-8 w-8 rounded-full border border-amber-100/30 bg-amber-100/10" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {pathPoints.slice(1).map((point, index) => {
            const previous = pathPoints[index];
            if (previous.x === point.x && previous.y === point.y) {
              return null;
            }
            const isHorizontal = previous.y === point.y;
            const left = Math.min(previous.x, point.x) * (cellSize + gap) + cellSize * 0.5;
            const top = Math.min(previous.y, point.y) * (cellSize + gap) + cellSize * 0.5;

            return (
              <motion.div
                key={`segment-${previous.x}-${previous.y}-${point.x}-${point.y}-${index}`}
                className="pointer-events-none absolute z-10 rounded-full bg-gradient-to-r from-amber-300/60 via-amber-200/40 to-transparent"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: isHorizontal ? `${cellSize + gap}px` : '4px',
                  height: isHorizontal ? '4px' : `${cellSize + gap}px`,
                  transform: isHorizontal ? 'translateY(-2px)' : 'translateX(-2px)',
                }}
                initial={{ opacity: 0, scaleX: 0.6, scaleY: 0.6 }}
                animate={{ opacity: 0.9, scaleX: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
            );
          })}
        </AnimatePresence>

        <motion.div
          className="absolute z-20"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
          initial={false}
          animate={{
            x: character.position.x * (cellSize + gap),
            y: character.position.y * (cellSize + gap),
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }
          }
        >
          <div className="flex h-full w-full items-center justify-center">
            <CharacterSprite direction={character.direction} isExecuting={isExecuting} />
          </div>
        </motion.div>

        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="absolute z-0 flex items-center justify-center transition-all duration-200"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                left: `${x * (cellSize + gap)}px`,
                top: `${y * (cellSize + gap)}px`,
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
              <CellIcon cell={cell} />
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Posição: ({character.position.x}, {character.position.y})
        </p>
        <p>Direção: {character.direction}</p>
      </div>
    </div>
  );
}
