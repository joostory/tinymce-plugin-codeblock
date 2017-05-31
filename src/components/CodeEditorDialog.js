import CodeEditor from './CodeEditor'

class CodeEditorDialog {
  constructor(editor) {
    this.editor = editor
    this.active = false
  }

  open() {
    if (this.active) {
      return
    }

    if (!this.container) {
      this.createContainer()
    }

    this.container.style.display = 'block'
    this.codeEditor.refresh()
    this.active = true
  }

  close() {
    if (!this.active) {
      return
    }

    this.container.style.display = 'none'
    this.active = false
  }

  createContainer() {
    const { $, dom } = this.editor
    let container = dom.create('div', { class: 'code-editor-dialog' })
    
    let shadow = dom.create('div', { class: 'shadow' })
    container.append(shadow)

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

    dialog.append(header)
    dialog.append(content)
    dialog.append(footer)
    
    document.body.append(container)
    this.container = container
    this.codeEditor = new CodeEditor(this.editor, textarea)

    $(btnSubmit).on('click', () => {
      if (!this.active) {
        return
      }
      this.codeEditor.insertCodeBlock()
      this.close()
    })

    $(btnCancel).on('click', () => {
      this.close()
    })

    $(shadow).on('click', () => {
      this.close()
    })

    $(window).on("keyup", (e) => {
      if (!this.active) {
        return
      }
      if (e.keyCode == 27 && confirm('Close CodeBlock?')) {
        this.close()
      }
    })

  }

}

export default CodeEditorDialog
