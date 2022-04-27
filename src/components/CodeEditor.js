import CodeMirror from 'codemirror/lib/codemirror'
import highlightjs from 'highlight.js'
import { getOption } from '../options'

function adjustLanguage(lang) {
  if (lang) {
    return lang.replace('lang-', '').replace('language-', '')
  } else {
    return ''
  }
}

class CodeEditor {
  constructor(tinymceEditor, textarea, languageSelect) {
    this.language = ''

    this.tinymceEditor = tinymceEditor
    this.textarea = textarea
    this.languageSelect = languageSelect
    this.codeMirror = null

    this.init()
  }

  init() {
    const { dom } = this.tinymceEditor
    let theme = getOption(this.tinymceEditor, "codeTheme")
    this.langs = getOption(this.tinymceEditor, "langs")


    if (this.textarea && CodeMirror && CodeMirror.fromTextArea) {
      this.codeMirror = CodeMirror.fromTextArea(this.textarea, {
        lineNumbers: true,
        autofocus: true,
        theme: theme
      })
    }

    if (this.languageSelect) {
      this.langs.forEach((item) => {
        dom.add(this.languageSelect, 'option', { value: item.value }, item.label)
      })

      
      dom.bind(this.languageSelect, 'change', e => {
        this.setLanguage(e.target.value)
      })
    }
  }

  refresh() {
    this.selectedNode = null
    let currentCode = this.getCurrentCode()
    if (this.codeMirror) {
      this.codeMirror.refresh()
      this.codeMirror.setValue(currentCode.value)
      this.codeMirror.focus()
    } else {
      this.textarea.value = currentCode.value
      this.textarea.focus()
    }

    this.setLanguage(adjustLanguage(currentCode.language))
  }

  setLanguage(language) {
    const codeblockLanguage = this.langs.find(item => item.value == language)

    if (!codeblockLanguage) {
      if (this.codeMirror) {
        this.codeMirror.setOption('mode', 'text')
      }
  
      if (this.languageSelect) {
        this.languageSelect.selectedIndex = 0
      }  
    } else {
      this.language = codeblockLanguage.value
      if (this.codeMirror) {
        this.codeMirror.setOption('mode', codeblockLanguage.mode)
      }
  
      if (this.languageSelect) {
        this.languageSelect.value = codeblockLanguage.value
      }
    }
  }

  insertCodeBlock() {
    const editor = this.tinymceEditor
    let code = this.getValue()

    editor.undoManager.transact(() => {
      const dom = editor.dom
      let node = this.getSelectedCodeBlock()
      code = dom.encode(code)
      code = this.language? `<code class='${this.language}'>${code}</code>` : `<code>${code}</code>`

      if (node) {
        node.removeAttribute('class')
        node.setAttribute('data-language', this.language)
        node.innerHTML = code
        editor.selection.select(node)
      } else {
        editor.insertContent(`<pre id="__new">${code}</pre>`)
        node = dom.select('#__new')[0]
        dom.setAttrib(node, 'id', null)
        editor.selection.select(node)
      }

      highlightjs.highlightElement(dom.select('code', node)[0])
    })
  }

  getValue() {
    return this.codeMirror ? this.codeMirror.getValue() : this.textarea.value
  }

  getCurrentCode() {
    let node = this.getSelectedCodeBlock()
    if (node) {
      return {
        value: node.textContent,
        language: node.getAttribute('data-language')
      }
    } else {
      return {
        value: this.tinymceEditor.selection.getContent({format: 'text'}),
        language: ''
      }
    }
  }

  getSelectedCodeBlock() {
    if (!this.selectedNode) {
      let node = this.tinymceEditor.selection.getNode();
      if (node && node.nodeName == 'PRE') {
        this.selectedNode = node
      }
    }

    return this.selectedNode
  }

  onChange(callback) {
    if (this.codeMirror) {
      this.codeMirror.on('change', (doc) => {
        callback(doc.getValue())
      })
    } else {
      this.textarea.addEventListener("keyup", (e) => {
        callback(e.target.value)
      })
    }
    
  }
}

export default CodeEditor
