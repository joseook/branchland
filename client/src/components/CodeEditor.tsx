/**
 * CodeEditor Component
 * Wrapper do Monaco Editor para edição de código Python
 * 
 * Design: Editor moderno com tema escuro, syntax highlighting para Python
 * Funcionalidade: Digitação em tempo real, validação de sintaxe, autocomplete
 */

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  availableFunctions?: string[];
}

export default function CodeEditor({
  code,
  onChange,
  readOnly = false,
  height = '400px',
  availableFunctions = [],
}: CodeEditorProps) {
  const editorRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
    
    try {
      // Configurar atalhos customizados se necessário
      editor.addCommand(
        // Ctrl+Enter para executar (será capturado pelo componente pai)
        2048 + 13, // Ctrl+Enter
        () => {
          // Disparar evento customizado
          window.dispatchEvent(new CustomEvent('executeCode'));
        }
      );
    } catch (err) {
      console.warn('Erro ao configurar atalhos do Monaco:', err);
    }
  };

  const handleEditorWillMount = (monaco: any) => {
    // Configurar Monaco antes de montar
    try {
      // Desabilitar carregamento de dependências problemáticas
      if (monaco && monaco.editor) {
        monaco.editor.defineTheme('custom-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {},
        });
      }

      // Registrar completion provider para funções Python
      if (monaco && monaco.languages) {
        monaco.languages.registerCompletionItemProvider('python', {
          provideCompletionItems: (model: any, position: any) => {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            };

            // Criar completion items para funções disponíveis
            const suggestions = availableFunctions.map((func) => {
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

              return {
                label: func,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: func + '()',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: funcDescriptions[func] || 'Função disponível',
                documentation: funcDescriptions[func],
                range: range,
              };
            });

            return { suggestions };
          },
        });
      }
    } catch (err) {
      // Ignorar erros de tema e completion
      console.debug('Monaco configuration skipped');
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="bg-secondary px-4 py-2 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-semibold text-foreground">Código Python</h3>
        {!isEditorReady && <span className="text-xs text-muted-foreground animate-pulse">Carregando...</span>}
      </div>
      <Editor
        height={height}
        defaultLanguage="python"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        beforeMount={handleEditorWillMount}
        theme="vs-dark"
        loading={<div className="p-4 text-foreground text-sm">Carregando editor...</div>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          autoIndent: 'full',
          bracketPairColorization: {
            enabled: false,
          },
          automaticLayout: true,
          contextmenu: true,
          smoothScrolling: true,
          occurrencesHighlight: 'off',
          selectionHighlight: false,
          renderLineHighlight: 'line',
          lineNumbersMinChars: 3,
          suggestOnTriggerCharacters: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
        }}
      />
    </div>
  );
}
