/**
 * CodeEditor Component
 * Wrapper do Monaco Editor para edição de código Python
 * 
 * Design: Editor moderno com tema escuro, syntax highlighting para Python
 * Funcionalidade: Digitação em tempo real, validação de sintaxe
 */

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({
  code,
  onChange,
  readOnly = false,
  height = '400px',
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
    } catch (err) {
      // Ignorar erros de tema
      console.debug('Monaco theme configuration skipped');
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
        }}
      />
    </div>
  );
}
