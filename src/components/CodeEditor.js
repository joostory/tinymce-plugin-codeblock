import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import CodeMirror from 'codemirror/lib/codemirror'

import 'codemirror/lib/codemirror.css'
import './CodeEditor.css'

class CodeEditor {
  constructor(tinymceEditor, textarea) {
    this.tinymceEditor = tinymceEditor
    this.textarea = textarea
    this.codeMirror = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      autofocus: true,
      theme: 'default'
    })
  }

  refresh() {
    this.codeMirror.refresh()
    this.codeMirror.setValue(this.getCurrentCode())
  }

  insertCodeBlock() {
    const editor = this.tinymceEditor
    let code = this.codeMirror.getValue()

    editor.undoManager.transact(() => {
      var node = this.getSelectedCodeBlock();

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

  getCurrentCode() {
    let node = this.getSelectedCodeBlock()
    if (node) {
      return node.textContent
    }

    return ''
  }

  getSelectedCodeBlock() {
    let node = this.tinymceEditor.selection.getNode();
    if (node && node.nodeName == 'PRE') {
      return node
    }

    return null
  }
}

export default CodeEditor
