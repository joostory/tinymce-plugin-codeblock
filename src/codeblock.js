import CodeEditorDialog from './components/CodeEditorDialog'
import highlightjs from 'highlight.js'

import './styles/codeblock.css'

const isCodeBlock = (node) => node && node.nodeName == 'PRE'

export default (editor, pluginUrl) => {

  const $ = editor.$

  let dialog = new CodeEditorDialog(editor)
  
  const handleButtonClick = () => {
    dialog.open()
  }

  editor.addCommand('codeblock', handleButtonClick)
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

      $elm.removeAttr('contentEditable')

      $elm.empty().removeAttr('class').append($('<code></code>').each((idx, elm) => {
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
          $(elm).find('br').each((idx, elm) => {
            elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm)
          })

          elm.contentEditable = false
          elm.innerHTML = editor.dom.encode(elm.textContent)
          if (highlightjs && highlightjs.highlightBlock) {
            highlightjs.highlightBlock(elm)
          }
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
