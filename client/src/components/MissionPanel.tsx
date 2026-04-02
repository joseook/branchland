/**
 * MissionPanel Component
 * Exibe instruções, objetivo e dicas da fase atual
 * 
 * Design: Card com hierarquia clara, destacando conceito e objetivo
 * Funcionalidade: Informações didáticas, dicas contextuais
 */

import { Level } from '@/game/types';
import { Lightbulb, Code2 } from 'lucide-react';

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

        {/* Funções Disponíveis */}
        <div className="border-t border-border pt-4">
          <div className="flex gap-2 items-start mb-3">
            <Code2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-700 uppercase">
                Funções Disponíveis
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Use estas funções no seu código:
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            {level.allowedFunctions.map((func) => {
              const funcDescriptions: Record<string, string> = {
                andar: 'Move o personagem para frente',
                virar_direita: 'Vira 90° para a direita',
                virar_esquerda: 'Vira 90° para a esquerda',
                parede_na_frente: 'Retorna True se há parede na frente',
                arvore_na_frente: 'Retorna True se há árvore na frente',
                destino_na_frente: 'Retorna True se há destino na frente',
                cor_do_bloco: 'Retorna a cor do bloco atual',
                coletar: 'Coleta um item se houver',
                parar: 'Para a execução',
                mostrar: 'Exibe uma mensagem no console',
                obstaculo_na_frente: 'Retorna True se há obstáculo na frente',
                planta_madura_na_frente: 'Retorna True se há planta madura na frente',
                solo_seco: 'Retorna True se o solo está seco',
                tem_semente: 'Retorna True se há semente coletada',
                clima_favoravel: 'Retorna True se o clima é favorável',
                praga_detectada: 'Retorna True se há praga detectada',
                regar: 'Rega o solo',
                plantar: 'Planta uma semente',
                remover_pedra: 'Remove um obstáculo',
                aplicar_protecao: 'Aplica proteção contra pragas',
              };
              return (
                <div key={func} className="bg-slate-900/50 p-2 rounded border border-slate-700">
                  <p className="font-mono text-blue-400">{func}()</p>
                  <p className="text-muted-foreground mt-0.5">
                    {funcDescriptions[func] || 'Função disponível'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
