import CodeEditor from './CodeEditor'
import autobind from 'autobind-decorator'

class CodeEditorDialog {
  constructor(editor) {
    this.editor = editor
    this.active = false
    this.container = null
    this.codeEditor = null
  }

  open() {
    if (this.active) {
      return
    }

    if (!this.container) {
      this.createContainer()
    }

    const dom = this.editor.dom
    dom.show(this.container)
    dom.getPos(this.container)
    dom.addClass(this.container, 'mce-in')
    this.codeEditor.refresh()
    this.active = true
  }

  close() {
    if (!this.active) {
      return
    }

    const dom = this.editor.dom
    dom.removeClass(this.container, 'mce-in')
    dom.getPos(this.container)
    dom.hide(this.container)
    
    this.active = false
  }

  @autobind
  handleClose(e) {
    this.close()
  }

  createContainer() {
    const { dom } = this.editor
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

    this.container = container
    this.createEditor(textarea, languageSelect, (value) => {
      if (value && value.length > 0) {
        dom.setAttrib(btnSubmit, 'disabled', null)
      } else {
        dom.setAttrib(btnSubmit, 'disabled', true)
      }
    })

    dom.bind(btnSubmit, 'click', () => {
      if (!this.active) {
        return
      }
      this.codeEditor.insertCodeBlock()
      this.close()
    })

    dom.bind(btnCancel, 'click', this.handleClose)
    dom.bind(shadow, 'click', this.handleClose)
  }

  createEditor(textarea, languageSelect, onChange) {
    this.codeEditor = new CodeEditor(this.editor, textarea, languageSelect)
    this.codeEditor.onChange(onChange)
  }

}

export default CodeEditorDialog
