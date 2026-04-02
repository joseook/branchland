import { Button } from '@/components/ui/button';
import { ALL_LEVELS } from '@/game/levels';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLocation } from 'wouter';

const stats = [
  { value: '5 mundos', label: 'progressão pedagógica' },
  { value: '20 fases', label: 'desafios guiados' },
  { value: 'Python real', label: 'execução no navegador' },
];

const objectives = [
  'Ensinar sequências, condicionais e funções com feedback imediato.',
  'Transformar teoria em prática com um fluxo visual e interativo.',
  'Manter a curva de aprendizado clara para iniciantes e turmas em sala.',
];

const audience = [
  'Ensino fundamental II e ensino médio',
  'Laboratórios de informática e aulas introdutórias',
  'Cursos livres, bootcamps e trilhas de autoestudo',
];

const journeyPreview = ALL_LEVELS.slice(0, 3);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const [, navigate] = useLocation();
  const reduceMotion = useReducedMotion();
  const firstLevel = ALL_LEVELS[0];

  const enterGame = () => {
    navigate(`/game/${firstLevel.id}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_28%),linear-gradient(180deg,_#fffaf1_0%,_#f6efe3_48%,_#f0e6d7_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 18, 0],
                  x: [0, 10, 0],
                }
          }
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-stone-900/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -14, 0],
                  x: [0, -12, 0],
                }
          }
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      </div>

      <header className="relative z-10 border-b border-white/60 bg-white/45 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-300 via-amber-200 to-stone-100 shadow-[0_16px_40px_-24px_rgba(120,93,34,0.7)]">
              <Sparkles className="h-5 w-5 text-stone-800" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-stone-900">
                Branchland
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                jogo educacional premium
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <a className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-white/80 hover:text-stone-900" href="#objetivo">
              Objetivo
            </a>
            <a className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-white/80 hover:text-stone-900" href="#sobre">
              Sobre
            </a>
            <a className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-white/80 hover:text-stone-900" href="#educacao">
              Educação
            </a>
            <a className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-white/80 hover:text-stone-900" href="#jogo">
              Jogo
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container py-10 md:py-16">
          <motion.div
            className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/75 px-4 py-2 text-sm text-stone-700 shadow-[0_10px_30px_-24px_rgba(120,93,34,0.5)]">
                <Compass className="h-4 w-4 text-amber-700" />
                Jornada educacional com acabamento premium
              </div>

              <div className="space-y-5">
                <h1 className="font-display max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 md:text-7xl">
                  Lógica de programação em uma experiência elegante, clara e interativa.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
                  Branchland ensina Python com uma narrativa visual de fazenda inteligente. O aluno
                  aprende fazendo, executando código real e recebendo resposta imediata da própria
                  mecânica do jogo.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={enterGame}
                  size="lg"
                  className="h-12 rounded-full bg-stone-950 px-6 text-sm text-white shadow-[0_18px_40px_-18px_rgba(17,24,39,0.75)] transition hover:-translate-y-0.5 hover:bg-stone-800"
                >
                  Entrar no jogo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-amber-200 bg-white/70 px-6 text-sm text-stone-700 shadow-[0_18px_40px_-24px_rgba(120,93,34,0.3)] hover:bg-white"
                >
                  <a href="#objetivo">Explorar a proposta</a>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_18px_50px_-34px_rgba(17,24,39,0.38)] backdrop-blur"
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-display text-2xl font-semibold text-stone-950">{stat.value}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(255,245,224,0.75))] shadow-[0_40px_120px_-70px_rgba(120,93,34,0.65)]" />
              <div className="relative space-y-4 rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_26px_90px_-54px_rgba(17,24,39,0.4)] backdrop-blur-xl md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                      visão do produto
                    </p>
                    <h2 className="font-display mt-2 text-3xl font-semibold text-stone-950">
                      Aprender com precisão visual
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-100 px-3 py-2 text-sm text-amber-900">
                    Educação
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-3xl border border-stone-200 bg-stone-950 p-5 text-white">
                    <div className="flex items-center gap-2 text-amber-300">
                      <ShieldCheck className="h-4 w-4" />
                      Objetivo
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-200">
                      Conduzir o aluno do primeiro comando até a resolução de desafios lógicos com
                      progressão segura e feedback imediato.
                    </p>
                  </div>

                  <div className="space-y-3 rounded-3xl border border-stone-200 bg-white p-5">
                    <div className="flex items-center gap-2 text-stone-900">
                      <BookOpen className="h-4 w-4 text-amber-700" />
                      Estrutura
                    </div>
                    <ul className="space-y-3 text-sm text-stone-600">
                      <li className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                        Sequência de comandos com aprendizado imediato.
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                        Condicionais e decisões com contexto narrativo.
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                        Funções e lógica modular com evolução clara.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-900/70">
                    destino
                  </p>
                  <p className="mt-2 text-base leading-7 text-stone-700">
                    Projeto desenhado para educação: escolas, cursos técnicos, tutoria individual e
                    ambientes de aprendizagem onde a lógica precisa ser ensinada com clareza e
                    engajamento.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="objetivo" className="container py-10 md:py-14">
          <motion.div
            className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={itemVariants} className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_70px_-48px_rgba(17,24,39,0.35)] backdrop-blur">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-stone-500">
                <Layers3 className="h-4 w-4 text-amber-700" />
                Objetivo do projeto
              </div>
              <h2 className="font-display mt-4 text-3xl font-semibold text-stone-950">
                Tornar programação tangível, elegante e menos abstrata.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
              {objectives.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-stone-200 bg-white/80 p-5 text-sm leading-7 text-stone-600 shadow-[0_20px_50px_-42px_rgba(17,24,39,0.28)]"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="sobre" className="container py-10 md:py-14">
          <motion.div
            className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={itemVariants} className="rounded-[2rem] border border-stone-200 bg-stone-950 p-7 text-white shadow-[0_26px_90px_-52px_rgba(17,24,39,0.55)]">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">sobre</p>
              <h2 className="font-display mt-4 text-3xl font-semibold">
                Um jogo didático com acabamento de produto premium.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-stone-300">
                O Branchland combina interface refinada, narrativa visual e execução real de Python
                para que o aluno aprenda por ação. Em vez de apenas ler regras, ele vê o resultado
                do código no jogo.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-44px_rgba(17,24,39,0.35)] backdrop-blur">
                <div className="flex items-center gap-2 text-stone-900">
                  <GraduationCap className="h-4 w-4 text-amber-700" />
                  Destino educacional
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  Pensado para ambientes de aprendizagem que precisam de retenção, clareza e
                  progressão: da sala de aula ao estudo autônomo.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-44px_rgba(17,24,39,0.35)] backdrop-blur">
                <div className="flex items-center gap-2 text-stone-900">
                  <PlayCircle className="h-4 w-4 text-amber-700" />
                  Navegação direta
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  O usuário entra no jogo com um clique e segue para a primeira fase sem ruído ou
                  fricção.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="educacao" className="container py-10 md:py-14">
          <motion.div
            className="rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(251,191,36,0.13))] p-7 shadow-[0_30px_100px_-60px_rgba(120,93,34,0.5)] backdrop-blur"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">destino</p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-stone-950">
                  Educação como produto principal.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-stone-600">
                O visual premium não é só estética. Ele reduz ruído, organiza foco e ajuda a
                sustentar atenção durante o aprendizado.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 grid gap-4 md:grid-cols-3">
              {audience.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/80 bg-white/90 p-5 text-sm leading-7 text-stone-700 shadow-[0_16px_40px_-34px_rgba(17,24,39,0.35)]"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="jogo" className="container py-10 md:py-16">
          <motion.div
            className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={itemVariants} className="rounded-[2rem] border border-stone-200 bg-white/85 p-7 shadow-[0_24px_70px_-48px_rgba(17,24,39,0.35)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                navegação para o jogo
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-stone-950">
                Entre na área do jogo e comece pela primeira fase.
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                A porta de entrada foi simplificada para que o usuário vá direto para a experiência
                prática. A trilha começa na primeira fase do mundo inicial.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={enterGame}
                  size="lg"
                  className="h-12 rounded-full bg-stone-950 px-6 text-white hover:bg-stone-800"
                >
                  Iniciar fase 1
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-amber-200 bg-white/80 px-6 text-stone-700 hover:bg-amber-50"
                >
                  <a href="#objetivo">Rever proposta</a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
              {journeyPreview.map((level) => (
                <motion.button
                  key={level.id}
                  type="button"
                  onClick={() => navigate(`/game/${level.id}`)}
                  whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-[1.75rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,240,227,0.95))] p-5 text-left shadow-[0_18px_50px_-38px_rgba(17,24,39,0.35)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
                      {level.worldId.replace('_', ' ')}
                    </p>
                    <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-900">
                      fase
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-semibold text-stone-950">
                    {level.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{level.objective}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-stone-900">
                    Entrar
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/60 bg-white/45 backdrop-blur-xl">
        <div className="container flex flex-col gap-2 py-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>Branchland © 2026</p>
          <p>Aprendizado de Python com direção visual, ritmo premium e foco educacional.</p>
        </div>
      </footer>
    </div>
  );
}
