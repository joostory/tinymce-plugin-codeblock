import CodeEditor from './CodeEditor'
import './CodeEditorDialog.css'

class CodeEditorDialog {
  constructor(editor) {
    this.editor = editor
  }

  open() {
    if (!this.container) {
      this.createContainer()
    }

    this.container.style.display = 'block'
    this.codeEditor.refresh()
  }

  close() {
    this.container.style.display = 'none'
  }

  createContainer() {
    const { $, dom } = this.editor
    let container = dom.create('div', { class: 'code-editor-dialog' })
    
    container.append(dom.create('div', { class: 'shadow' }))

    let dialog = dom.create('div', { class: 'dialog' })
    container.append(dialog)
    this.dialog = dialog

    let header = dom.create('div', { class: 'header' }, '<span class="title">CodeBlock</span>')
    
    let content = dom.create('div', { class: 'content' })
    let textarea = dom.create('textarea', { class: 'textarea' })
    content.append(textarea)

    let footer = dom.create('div', { class: 'footer' })
    let btnSubmit = dom.create('button', { class: 'btn btn-submit' }, '확인')
    let btnCancel = dom.create('button', { class: 'btn btn-cancel' }, '취소')
    footer.append(btnSubmit)
    footer.append(btnCancel)

    $(btnSubmit).on('click', e => {
      this.codeEditor.insertCodeBlock()
      this.close()
    })

    $(btnCancel).on('click', e => {
      this.close()
    })

    dialog.append(header)
    dialog.append(content)
    dialog.append(footer)
    
    document.body.append(container)
    this.container = container
    this.codeEditor = new CodeEditor(this.editor, textarea)
  }

  createFooter() {

  }
}

export default CodeEditorDialog
