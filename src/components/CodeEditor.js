import CodeMirror from 'codemirror/lib/codemirror'
import highlightjs from 'highlight.js'

function adjustLanguage(lang) {
  return lang.replace('lang-', '').replace('language-', '')
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
    const { $, dom, settings } = this.tinymceEditor
    let theme = 'default'
    let langs = []
    if (settings.codeblock) {
      if (settings.codeblock.codeTheme) {
        theme = settings.codeblock.codeTheme
      }

      if (settings.codeblock.langs) {
        langs = langs
      }
    }

    if (this.textarea && CodeMirror && CodeMirror.fromTextArea) {
      this.codeMirror = CodeMirror.fromTextArea(this.textarea, {
        lineNumbers: true,
        autofocus: true,
        theme: theme
      })
    }

    if (this.languageSelect) {
      settings.codeblock.langs.forEach((item, index) => {
        dom.add(this.languageSelect, 'option', { value: item.value }, item.label)
      })

      $(this.languageSelect).on('change', e => {
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

    this.setLanguage(currentCode.language)
  }

  setLanguage(language) {
    this.language = language
    if (this.codeMirror && language) {
      this.codeMirror.setOption('mode', language)
    }
    if (this.languageSelect) {
      this.languageSelect.value = language
    }
  }

  insertCodeBlock() {
    const editor = this.tinymceEditor
    let code = this.getValue()

    editor.undoManager.transact(() => {
      let node = this.getSelectedCodeBlock()
      code = editor.dom.encode(code)
      code = this.language? `<code class='${this.language}'>${code}</code>` : `<code>${code}</code>`

      if (node) {
        node.removeAttribute('class')
        node.setAttribute('data-language', this.language)
        node.innerHTML = code
        editor.selection.select(node)
      } else {
        editor.insertContent(`<pre id="__new">${code}</pre>`)
        node = editor.$('#__new').removeAttr('id')[0]
        editor.selection.select(node)
      }

      highlightjs.highlightBlock(editor.$(node).find('code')[0])
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
