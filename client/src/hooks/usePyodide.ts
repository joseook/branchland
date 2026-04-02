/**
 * usePyodide Hook
 * Gerencia carregamento e execução de código Python via Pyodide (CDN)
 * 
 * Estratégia progressiva:
 * 1. Carregar Pyodide via CDN
 * 2. Validar execução simples
 * 3. Expor funções JS ao Python usando globals
 * 4. Conectar ao estado do jogo
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { PythonContext } from '@/game/types';

interface PyodideInstance {
  runPython: (code: string) => any;
  runPythonAsync: (code: string) => Promise<any>;
  globals: any;
  toPy: (obj: any) => any;
}

interface UsePyodideReturn {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  executePython: (code: string, context: PythonContext) => Promise<string[]>;
}

let pyodideInstance: PyodideInstance | null = null;

export function usePyodide(): UsePyodideReturn {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  /**
   * Inicializar Pyodide (uma única vez)
   */
  useEffect(() => {
    if (initPromiseRef.current) {
      return; // Já está inicializando
    }

    const initPyodide = async () => {
      try {
        setIsLoading(true);

        // Carregar Pyodide via CDN usando script tag
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.async = true;

        script.onload = async () => {
          try {
            // Acessar loadPyodide do window
            const loadPyodide = (window as any).loadPyodide;

            if (!loadPyodide) {
              throw new Error('loadPyodide não encontrado no window');
            }

            // Carregar Pyodide
            const pyodide = await loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
            });

            pyodideInstance = pyodide;
            setIsReady(true);
            setError(null);
            setIsLoading(false);
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            setError(`Erro ao inicializar Pyodide: ${errorMsg}`);
            console.error('Pyodide initialization error:', err);
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Erro ao carregar Pyodide do CDN');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(`Erro ao carregar Pyodide: ${errorMsg}`);
        console.error('Pyodide loading error:', err);
        setIsLoading(false);
      }
    };

    initPromiseRef.current = initPyodide();
  }, []);

  /**
   * Executar código Python com contexto do jogo
   */
  const executePython = useCallback(
    async (code: string, context: PythonContext): Promise<string[]> => {
      if (!pyodideInstance) {
        throw new Error('Pyodide não está pronto');
      }

      const logs: string[] = [];

      try {
        // Criar função de print customizada
        const printFunction = (msg: string) => {
          logs.push(String(msg));
        };

        // Expor funções do jogo ao Python como globals
        pyodideInstance.globals.set('andar', context.andar);
        pyodideInstance.globals.set('virar_direita', context.virar_direita);
        pyodideInstance.globals.set('virar_esquerda', context.virar_esquerda);
        pyodideInstance.globals.set('parede_na_frente', context.parede_na_frente);
        pyodideInstance.globals.set('arvore_na_frente', context.arvore_na_frente);
        pyodideInstance.globals.set('destino_na_frente', context.destino_na_frente);
        pyodideInstance.globals.set('cor_do_bloco', context.cor_do_bloco);
        pyodideInstance.globals.set('coletar', context.coletar);
        pyodideInstance.globals.set('parar', context.parar);
        pyodideInstance.globals.set('mostrar', context.mostrar);

        // Expor print customizado
        pyodideInstance.globals.set('print', printFunction);

        // Executar código do usuário diretamente
        await pyodideInstance.runPythonAsync(code);

        return logs;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        throw new Error(`Erro ao executar Python: ${errorMsg}`);
      }
    },
    []
  );

  return {
    isReady,
    isLoading,
    error,
    executePython,
  };
}
