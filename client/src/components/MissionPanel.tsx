/**
 * MissionPanel Component
 * Exibe instruções, objetivo e dicas da fase atual
 * 
 * Design: Card com hierarquia clara, destacando conceito e objetivo
 * Funcionalidade: Informações didáticas, dicas contextuais
 */

import { Level } from '@/game/types';
import { Lightbulb } from 'lucide-react';

interface MissionPanelProps {
  level: Level;
}

export default function MissionPanel({ level }: MissionPanelProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="bg-secondary px-4 py-2 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Fase {level.id}</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Nome da fase */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            {level.name}
          </h2>
          <p className="text-sm text-muted-foreground">{level.description}</p>
        </div>

        {/* Conceito */}
        <div className="bg-accent/20 border border-accent/50 rounded p-3">
          <p className="text-xs font-semibold text-accent-foreground uppercase mb-1">
            Conceito
          </p>
          <p className="text-sm text-foreground font-mono bg-slate-900 p-2 rounded">
            {level.concept}
          </p>
        </div>

        {/* Objetivo */}
        <div className="bg-primary/10 border border-primary/30 rounded p-3">
          <p className="text-xs font-semibold text-primary uppercase mb-1">
            Objetivo
          </p>
          <p className="text-sm text-foreground">{level.objective}</p>
        </div>

        {/* Dica */}
        <div className="flex gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
          <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">
              Dica
            </p>
            <p className="text-sm text-foreground">{level.hint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
