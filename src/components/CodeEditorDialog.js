import CodeEditor from './CodeEditor'
import autobind from 'autobind-decorator'

class CodeEditorDialog {
  constructor(editor) {
    this.editor = editor
    this.active = false
    this.$container = null
    this.codeEditor = null
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
    let container = dom.add(document.body, 'div', { class: 'mce-codeblock-dialog-container' })
    let shadow = dom.add(container, 'div', { class: 'mce-codeblock-shadow' })
    let dialog = dom.add(container, 'div', { class: 'mce-codeblock-dialog' })
    let header = dom.add(dialog, 'div', { class: 'mce-codeblock-header mce-window-head' }, '<span class="mce-codeblock-title mce-title">코드블럭 삽입</span>')
    let languageSelect = dom.add(header, 'select', { class: 'mce-codeblock-language' }, '<option>TEXT</option>')
    let content = dom.add(dialog, 'div', { class: 'mce-codeblock-content' })
    let textarea = dom.add(content, 'textarea', { class: 'textarea' })
    let footer = dom.add(dialog, 'div', { class: 'mce-codeblock-footer' })
    let btnCancel = dom.add(footer, 'button', { class: 'mce-codeblock-btn mce-codeblock-btn-cancel' }, '취소')
    let btnSubmit = dom.add(footer, 'button', { class: 'mce-codeblock-btn mce-codeblock-btn-submit', disabled:true }, '확인')

    this.$container = $(container)
    let $btnSubmit = $(btnSubmit)
    
    this.createEditor(textarea, languageSelect, (value) => {
      if (value && value.length > 0) {
        $btnSubmit.attr('disabled', null)
      } else {
        $btnSubmit.attr('disabled', true)
      }
    })

    $btnSubmit.on('click', () => {
      if (!this.active) {
        return
      }
      this.codeEditor.insertCodeBlock()
      this.close()
    })

    $(btnCancel).on('click', this.handleClose)
    $(shadow).on('click', this.handleClose)
  }

  createEditor(textarea, languageSelect, onChange) {
    this.codeEditor = new CodeEditor(this.editor, textarea, languageSelect)
    this.codeEditor.onChange(onChange)
  }

}

export default CodeEditorDialog
