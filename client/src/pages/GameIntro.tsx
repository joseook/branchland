import { Button } from '@/components/ui/button';
import { ALL_LEVELS } from '@/game/levels';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, GraduationCap, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

const worldSummaries = [
  {
    title: 'Mundo 1',
    focus: 'Movimento e sequência',
    levels: '1 a 4',
  },
  {
    title: 'Mundo 2',
    focus: 'if e desvio',
    levels: '5 a 8',
  },
  {
    title: 'Mundo 3',
    focus: 'elif e rotas',
    levels: '9 a 12',
  },
  {
    title: 'Mundo 4',
    focus: 'and, or e not',
    levels: '13 a 16',
  },
  {
    title: 'Mundo 5',
    focus: 'def e autonomia',
    levels: '17 a 20',
  },
];

const highlights = [
  'Cada mundo libera um conceito novo.',
  'No começo você recebe apoio.',
  'No final, resolve sozinho.',
];

export default function GameIntro() {
  const [, navigate] = useLocation();
  const reduceMotion = useReducedMotion();
  const firstLevel = ALL_LEVELS[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_30%),linear-gradient(180deg,_#fffaf1_0%,_#f3eadc_48%,_#ebe0d0_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute left-8 top-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-stone-900/10 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, -12, 0], x: [0, -8, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      </div>

      <header className="relative z-10 border-b border-white/60 bg-white/45 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-300 via-amber-200 to-stone-100 shadow-[0_16px_40px_-24px_rgba(120,93,34,0.7)]">
              <Sparkles className="h-5 w-5 text-stone-800" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-stone-900">Branchland</p>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                introducao ao jogo
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="rounded-full text-stone-700 hover:bg-white/70 hover:text-stone-950"
          >
            Voltar para o home
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/75 px-4 py-2 text-sm text-stone-700 shadow-[0_10px_30px_-24px_rgba(120,93,34,0.5)]">
                <Compass className="h-4 w-4 text-amber-700" />
                Antes da missão
              </div>

              <div className="space-y-5">
                <h1 className="font-display max-w-2xl text-5xl font-semibold tracking-tight text-stone-950 md:text-7xl">
                  Seu robô vai do primeiro passo a missões avançadas.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
                  Um jogo curto de abertura para entender o mapa, a regra e o ritmo da campanha.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-34px_rgba(17,24,39,0.38)] backdrop-blur">
                  <p className="font-display text-2xl font-semibold text-stone-950">20 fases</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">em 5 mundos</p>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-34px_rgba(17,24,39,0.38)] backdrop-blur">
                  <p className="font-display text-2xl font-semibold text-stone-950">3 ritmos</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">apoio, guia e autonomia</p>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-34px_rgba(17,24,39,0.38)] backdrop-blur">
                  <p className="font-display text-2xl font-semibold text-stone-950">Python</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">rodando no navegador</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_26px_90px_-54px_rgba(17,24,39,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-stone-900">
                <GraduationCap className="h-5 w-5 text-amber-700" />
                <h2 className="font-display text-3xl font-semibold">Como jogar</h2>
              </div>

              <div className="space-y-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-stone-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-stone-200 bg-stone-950 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">missao</p>
                <p className="mt-3 text-sm leading-7 text-stone-200">
                  Levar o personagem do ponto inicial ao alvo, aprendendo uma regra de cada vez.
                </p>
              </div>

              <Button
                onClick={() => navigate(`/game/${firstLevel.id}`)}
                size="lg"
                className="h-12 w-full rounded-full bg-stone-950 px-6 text-white shadow-[0_18px_40px_-18px_rgba(17,24,39,0.75)] transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Iniciar missão
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {worldSummaries.map((world) => (
              <div
                key={world.title}
                className="rounded-[1.75rem] border border-stone-200 bg-white/80 p-5 shadow-[0_18px_50px_-40px_rgba(17,24,39,0.35)] backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.26em] text-stone-500">{world.levels}</p>
                  <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-900">
                    mundo
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-semibold text-stone-950">{world.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{world.focus}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
