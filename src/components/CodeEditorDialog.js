import CodeEditor from './CodeEditor'
import autobind from 'autobind-decorator'

class CodeEditorDialog {
  constructor(editor) {
    this.editor = editor
    this.active = false
  }

  open() {
    if (this.active) {
      return
    }

    if (!this.$container) {
      this.createContainer()
    }

    this.$container.show()
    this.$container.offset()
    this.$container.addClass('mce-in')
    this.codeEditor.refresh()
    this.active = true
  }

  close() {
    if (!this.active) {
      return
    }

    this.$container.removeClass('mce-in')
    this.$container.offset()
    this.$container.hide()
    
    this.active = false
  }

  @autobind
  handleClose(e) {
    this.close()
  }

  createContainer() {
    const { $, dom } = this.editor
    let container = dom.create('div', { class: 'mce-codeblock-dialog-container mce-window' })
    
    let shadow = dom.create('div', { class: 'mce-codeblock-shadow' })
    container.append(shadow)

    let dialog = dom.create('div', { class: 'mce-codeblock-dialog' })
    container.append(dialog)
    this.dialog = dialog

    let header = dom.create('div', { class: 'mce-codeblock-header mce-window-head' }, '<span class="mce-codeblock-title mce-title">코드블럭 삽입</span>')
    let btnClose = dom.create('button', { class: 'mce-close' }, '<i class="mce-ico mce-i-remove"></i>')
    header.append(btnClose)
    
    let content = dom.create('div', { class: 'mce-codeblock-content' })
    let textarea = dom.create('textarea', { class: 'textarea' })
    content.append(textarea)

    let footer = dom.create('div', { class: 'mce-codeblock-footer' })
    let btnCancel = dom.create('button', { class: 'mce-codeblock-btn mce-codeblock-btn-cancel' }, '취소')
    let btnSubmit = dom.create('button', { class: 'mce-codeblock-btn mce-codeblock-btn-submit', disabled:true }, '확인')
    footer.append(btnCancel)
    footer.append(btnSubmit)

    dialog.append(header)
    dialog.append(content)
    dialog.append(footer)
    
    document.body.append(container)
    this.$container = $(container)
    this.$btnSubmit = $(btnSubmit)
    this.codeEditor = new CodeEditor(this.editor, textarea)
    this.codeEditor.onChange((value) => {
      if (value && value.length > 0) {
        this.$btnSubmit.attr('disabled', null)
      } else {
        this.$btnSubmit.attr('disabled', true)
      }
      
    })
    $(btnSubmit).on('click', () => {
      if (!this.active) {
        return
      }
      this.codeEditor.insertCodeBlock()
      this.close()
    })

    $(btnClose).on('click', this.handleClose)

    $(btnCancel).on('click', this.handleClose)

    $(shadow).on('click', this.handleClose)

  }

}

export default CodeEditorDialog
