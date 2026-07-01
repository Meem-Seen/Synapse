import { useRef, useEffect, useState } from 'react'
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/theme-github'
import '../CodeEditor.css'

ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.44.0/')

function CodeEditor() {
  const editorRef = useRef(null)
  const editorInstance = useRef(null)
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('monokai')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const editor = ace.edit(editorRef.current)
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode('ace/mode/javascript')
    editor.setOptions({ fontSize: '20px', showPrintMargin: false })
    editorInstance.current = editor
    return () => editor.destroy()
  }, [])

  useEffect(() => {
    editorInstance.current?.session.setMode('ace/mode/' + language)
  }, [language])

  useEffect(() => {
    editorInstance.current?.setTheme('ace/theme/' + theme)
  }, [theme])

  const runCode = () => {
    const code = editorInstance.current.getValue()
    const output = document.getElementById('output')
    output.innerHTML = ''
    const originalLog = console.log
    console.log = (...args) => {
      const line = document.createElement('p')
      line.textContent = args.join(' ')
      output.appendChild(line)
      originalLog(...args)
    }
    try {
      new Function(code)()
    } catch (err) {
      const line = document.createElement('p')
      line.style.color = 'red'
      line.textContent = 'Error: ' + err.message
      output.appendChild(line)
    }
    console.log = originalLog
  }

  return (
    <>
      {!isOpen && (
        <button className="code-editor-toggle" onClick={() => setIsOpen(true)}>💻</button>
      )}

      <div className={`editor-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
        <div className="editor-box" onClick={e => e.stopPropagation()}>
          <button className="editor-close" onClick={() => setIsOpen(false)}>✕</button>

          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="typescript">TypeScript</option>
            <option value="sql">SQL</option>
          </select>

          <select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="monokai">Monokai</option>
            <option value="one_dark">One Dark</option>
            <option value="github">GitHub (Light)</option>
          </select>

          <button className="editor-run-btn" onClick={runCode}>Run</button>

          <div className="editor-ace" ref={editorRef} />
          <div className="editor-output" id="output" />
        </div>
      </div>
    </>
  )
}

export default CodeEditor
