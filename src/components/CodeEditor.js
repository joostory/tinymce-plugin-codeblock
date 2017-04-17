import CodeMirror from 'codemirror/lib/codemirror'

class CodeEditor {
  constructor(tinymceEditor, textarea) {
    let theme = tinymceEditor.settings.codeblock && tinymceEditor.settings.codeblock.codeTheme? tinymceEditor.settings.codeblock.codeTheme:'default'

    this.tinymceEditor = tinymceEditor
    this.textarea = textarea
    if (CodeMirror && CodeMirror.fromTextArea) {
      this.codeMirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        autofocus: true,
        theme: theme
      })
    }
  }

  refresh() {
    this.selectedNode = null
    if (this.codeMirror) {
      this.codeMirror.refresh()
      this.codeMirror.setValue(this.getCurrentCode())
      this.codeMirror.focus()
    } else {
      this.textarea.value = this.getCurrentCode()
      this.textarea.focus()
    }
  }

  insertCodeBlock() {
    const editor = this.tinymceEditor
    let code = this.getValue()

    editor.undoManager.transact(() => {
      let node = this.getSelectedCodeBlock()
      code = editor.dom.encode(code);

      if (node) {
        node.innerHTML = code;
        editor.selection.select(node);
      } else {
        editor.insertContent('<pre id="__new">' + code + '</pre>');
        editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
      }
    });
  }

  getValue() {
    return this.codeMirror? this.codeMirror.getValue() : this.textarea.value
  }

  getCurrentCode() {
    let node = this.getSelectedCodeBlock()
    if (node) {
      return node.textContent
    }

    return ''
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
}

export default CodeEditor
