/**
 * CodeEditor Component
 * Wrapper do Monaco Editor para edição de código Python
 * 
 * Design: Editor moderno com tema escuro, syntax highlighting para Python
 * Funcionalidade: Digitação em tempo real, validação de sintaxe
 */

import Editor from '@monaco-editor/react';
import { useRef } from 'react';

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

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    // Configurar atalhos customizados se necessário
    editor.addCommand(
      // Ctrl+Enter para executar (será capturado pelo componente pai)
      2048 + 13, // Ctrl+Enter
      () => {
        // Disparar evento customizado
        window.dispatchEvent(new CustomEvent('executeCode'));
      }
    );
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="bg-secondary px-4 py-2 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Código Python</h3>
      </div>
      <Editor
        height={height}
        defaultLanguage="python"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
          insertSpaces: true,
          autoIndent: 'full',
          bracketPairColorization: {
            enabled: true,
          },
        }}
      />
    </div>
  );
}
