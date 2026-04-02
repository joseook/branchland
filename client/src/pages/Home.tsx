/**
 * Home Page
 * Menu principal do jogo com seleção de fases
 * 
 * Design: Limpo e didático, com cards para cada fase
 */

import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ALL_LEVELS } from '@/game/levels';
import type { Level } from '@/game/types';
import { ArrowRight, BookOpen, Zap } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  const handleStartLevel = (levelId: string) => {
    navigate(`/game/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container py-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Branchland</h1>
            <p className="text-lg text-slate-300">
              Aprenda estruturas de decisão em Python de forma interativa
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-12">
        {/* Introdução */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex gap-4">
              <BookOpen className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Bem-vindo ao Branchland!
                </h2>
                <p className="text-slate-300 mb-3">
                  Um jogo educativo que ensina estruturas de decisão em Python através de desafios
                  visuais. Escreva código real em Python, execute-o no navegador e veja seu
                  personagem se mover no mapa.
                </p>
                <p className="text-slate-400 text-sm">
                  Cada fase introduz um novo conceito: if, else, elif, operadores lógicos e funções.
                </p>
              </div>
            </div>
          </div>

          {/* Como funciona */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Como Funciona
            </h3>
            <ol className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="font-bold text-blue-400 min-w-fit">1.</span>
                <span>Leia as instruções da fase e entenda o objetivo</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-400 min-w-fit">2.</span>
                <span>Escreva código Python no editor usando as funções disponíveis</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-400 min-w-fit">3.</span>
                <span>Clique em "Executar" (ou Ctrl+Enter) para rodar seu código</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-400 min-w-fit">4.</span>
                <span>Veja o personagem se mover no mapa e complete o objetivo</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Fases */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Fases Disponíveis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_LEVELS.map((level: Level) => (
              <div
                key={level.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{level.name}</h3>
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {level.worldId.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{level.description}</p>
                </div>

                {/* Conceito */}
                <div className="mb-4 p-3 bg-slate-900 rounded border border-slate-700">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                    Conceito
                  </p>
                  <code className="text-sm text-blue-300 font-mono">{level.concept}</code>
                </div>

                {/* Objetivo */}
                <p className="text-sm text-slate-400 mb-4">{level.description}</p>
                <p className="text-xs text-slate-500 mb-3"><strong>Conceito:</strong> {level.concept}</p>                {/* Botão */}
                <Button
                  onClick={() => handleStartLevel(level.id)}
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Começar Fase
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Funções disponíveis */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Funções Disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <code className="text-blue-300 font-mono">andar()</code>
                <p className="text-slate-400 mt-1">Move o personagem para frente</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">virar_direita()</code>
                <p className="text-slate-400 mt-1">Vira 90° para a direita</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">virar_esquerda()</code>
                <p className="text-slate-400 mt-1">Vira 90° para a esquerda</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">parede_na_frente()</code>
                <p className="text-slate-400 mt-1">Retorna True se há parede na frente</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">arvore_na_frente()</code>
                <p className="text-slate-400 mt-1">Retorna True se há árvore na frente</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">destino_na_frente()</code>
                <p className="text-slate-400 mt-1">Retorna True se há destino na frente</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">cor_do_bloco()</code>
                <p className="text-slate-400 mt-1">Retorna a cor do bloco atual</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">coletar()</code>
                <p className="text-slate-400 mt-1">Coleta um item se houver</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">parar()</code>
                <p className="text-slate-400 mt-1">Para a execução</p>
              </div>
              <div>
                <code className="text-blue-300 font-mono">mostrar(msg)</code>
                <p className="text-slate-400 mt-1">Exibe uma mensagem no console</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-12 py-6 text-center text-slate-400 text-sm">
        <p>Branchland © 2026 - Um jogo educativo de estruturas de decisão em Python</p>
      </div>
    </div>
  );
}
