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
import '../index.css'
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
    <div style={{ flex: 1, background: '#1e1e1e', padding: 20 }}>
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

      <button onClick={runCode}>Run</button>

      <div ref={editorRef} style={{ width: '100%', height: '400px' }} />
      <div id="output" style={{ color: 'white', marginTop: 10 }} />
    </div>
  )
}

export default CodeEditor