import _ from 'lodash'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import CodeMirror from 'codemirror/lib/codemirror'

class CodeEditor {
  constructor(tinymceEditor) {
    this.tinymceEditor = tinymceEditor
  }

  handleCloseWindow(obj) {
    console.log('closeWindow', obj.win)
    this.textarea = null
  }

  handleOpenWindow(obj) {
    console.log('openWindow', obj.win)
    this.textarea = obj.win.$el.find('textarea')
  }

  open() {
    const editor = this.tinymceEditor
    const windowManager = editor.windowManager
    const DOM = tinymce.dom.DOMUtils.DOM

    editor.on('CloseWindow', this.handleCloseWindow.bind(this))

    editor.on('OpenWindow', this.handleOpenWindow.bind(this))

    windowManager.open({
      title: 'Code Editor',
      layout: 'flex',
      minWidth: Math.min(DOM.getViewPort().w, editor.getParam('codesample_dialog_width', 800)),
      minHeight: Math.min(DOM.getViewPort().h, editor.getParam('codesample_dialog_height', 650)),
      direction: 'column',
      align: 'stretch',
      body: [
        {
          type: 'textbox',
          name: 'code',
          multiline: true,
          spellcheck: false,
          ariaLabel: 'Code view',
          flex: 1,
          style: 'direction: ltr; text-align: left',
          classes: 'monospace',
          value: this.getCurrentCode(),
          autofocus: true
        }
      ],
      onsubmit: this.insertCodeBlock.bind(this)
    });
  }

  insertCodeBlock(e) {
    const editor = this.tinymceEditor
    let code = e.data.code

    editor.undoManager.transact(function () {
      var node = getSelectedCodeSample(editor);

      code = DOM.encode(code);

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
