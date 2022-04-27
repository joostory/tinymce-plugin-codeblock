import CodeEditorDialog from './components/CodeEditorDialog'
import highlightjs from 'highlight.js'

import './styles/codeblock.css'
import { getOption, registerOptions } from './options'

const isCodeBlock = (node) => node && node.nodeName == 'PRE'

export default (editor, pluginUrl) => {

  const dialog = new CodeEditorDialog(editor)

  registerOptions(editor)
  
  editor.addCommand('codeblock', () => {
    dialog.open()
  })
  editor.ui.registry.addButton('codeblock', {
    icon: 'code-sample',
    tooltip: '코드블럭',
    stateSelector: 'pre',
    onAction: () => {
      editor.execCommand('codeblock')
    }
  })

  editor.on('PreProcess', (e) => {
    const dom = editor.dom
    dom.select('pre[contenteditable=false]', e.node).forEach((elm) => {
      if (!isCodeBlock(elm)) {
        return
      }
      let code = elm.textContent
      let language = dom.getAttrib(elm, 'data-language')
      dom.setAttrib(elm, 'data-language', undefined)
      dom.setAttrib(elm, 'contentEditable', undefined)

      let codeClass = language? ` class="${language}"` : ''
      dom.setHTML(elm, "")
      dom.setAttrib(elm, "class", undefined)
      dom.setHTML(elm, `<code${codeClass}>${code}</code>`)
    })
  })

  editor.on('SetContent', () => {
    const dom = editor.dom
    let unprocessedCodeSamples = dom.select('pre')
      .filter((elm) => isCodeBlock(elm))
      .filter((elm) => elm.contentEditable !== "false")

    if (unprocessedCodeSamples.length) {
      editor.undoManager.transact(() => {
        unprocessedCodeSamples.forEach((elm, idx) => {
          dom.select('br', elm).forEach((br) => {
            br.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), br)
          })

          let codes = dom.select("code[class]", elm)
          if (codes.length > 0) {
            codes.forEach((code) => {
              if (dom.getAttrib(code, 'class')) {
                dom.setAttrib(elm, 'data-language', dom.getAttrib(code, 'class'))
              }
              highlightjs.highlightElement(code)
            })
          } else {
            highlightjs.highlightElement(elm)
          }
          dom.setAttrib(elm, 'contentEditable', false)
        })
      })
    }
  })

  editor.on('init', () => {
    const highlightStyle = getOption(editor, "highlightStyle")
    if (highlightStyle) {
      let linkElm = editor.dom.create('link', {
        rel: 'stylesheet',
        href: highlightStyle
      })

      editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm)
    }
    
  })
}
