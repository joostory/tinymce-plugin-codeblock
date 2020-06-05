import CodeEditorDialog from './components/CodeEditorDialog'
import highlightjs from 'highlight.js'

import './styles/codeblock.css'

const isCodeBlock = (node) => node && node.nodeName == 'PRE'

export default (editor, pluginUrl) => {

  const $ = editor.$
  const dialog = new CodeEditorDialog(editor)
  
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
    $('pre[contenteditable=false]', e.node).each((idx, elm) => {
      if (!isCodeBlock(elm)) {
        return
      }
      let $elm = $(elm), code = elm.textContent
      let language = $elm.attr('data-language')
      $elm.removeAttr('data-language')
      $elm.removeAttr('contentEditable')

      let codeClass = language? ` class="${language}"` : ''
      $elm.empty().removeAttr('class').append($(`<code${codeClass}></code>`).each((idx, elm) => {
        elm.textContent = code
      }))
    })
  })

  editor.on('SetContent', () => {
    let unprocessedCodeSamples = $('pre')
      .filter((idx, elm) => isCodeBlock(elm))
      .filter((idx, elm) => elm.contentEditable !== "false")

    if (unprocessedCodeSamples.length) {
      editor.undoManager.transact(() => {
        unprocessedCodeSamples.each((idx, elm) => {
          const $elm = $(elm)
          $elm.find('br').each((idx, br) => {
            br.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), br)
          })

          let codes = $elm.find("code[class]")
          if (codes.length > 0) {
            codes.each((idx, code) => {
              if (code.getAttribute('class')) {
                $elm.attr('data-language', code.getAttribute('class'))
              }
              highlightjs.highlightBlock(code)
            })
          } else {
            highlightjs.highlightBlock(elm)
          }
          $elm.attr('contentEditable', false)
        })
      })
    }
  })

  editor.on('init', () => {
    if (editor.settings.codeblock && editor.settings.codeblock.highlightStyle) {
      let linkElm = editor.dom.create('link', {
        rel: 'stylesheet',
        href: editor.settings.codeblock.highlightStyle
      })

      editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm)
    }
    
  })
}
