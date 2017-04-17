import CodeEditor from './components/CodeEditor'
import CodeEditorDialog from './components/CodeEditorDialog'
import highlightjs from 'highlightjs'

const isCodeBlock = (node) => node && node.nodeName == 'PRE'

const plugin = (editor, pluginUrl) => {

  const $ = editor.$

  let dialog = new CodeEditorDialog(editor)
  
  const handleButtonClick = () => {
    var node = editor.selection.getNode();
    if (editor.selection.isCollapsed() || isCodeBlock(node)) {
      dialog.open()
    } else {
      editor.formatter.toggle('code');
    }

  }

  editor.addCommand('codeblock', handleButtonClick)
  editor.addButton('codeblock', {
    cmd: 'codeblock',
    icon: 'codesample'
  });

  editor.on('PreProcess', (e) => {
    $('pre[contenteditable=false]', e.node).each((idx, elm) => {
      if (!isCodeBlock(elm)) {
        return
      }
      let $elm = $(elm), code = elm.textContent;

      $elm.removeAttr('contentEditable');

      $elm.empty().removeAttr('class').append($('<code></code>').each((idx, elm) => {
        elm.textContent = code;
      }));
    });
  });

  editor.on('SetContent', () => {
    let unprocessedCodeSamples = $('pre')
      .filter((idx, elm) => { return isCodeBlock(elm) })
      .filter((idx, elm) => { return elm.contentEditable !== "false" });

    if (unprocessedCodeSamples.length) {
      editor.undoManager.transact(() => {
        unprocessedCodeSamples.each((idx, elm) => {
          $(elm).find('br').each((idx, elm) => {
            elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
          });

          elm.contentEditable = false;
          elm.innerHTML = editor.dom.encode(elm.textContent);
          if (highlightjs && highlightjs.highlightBlock) {
            highlightjs.highlightBlock(elm)
          }
        });
      });
    }
  })

  editor.on('init', () => {
    if (editor.settings.codeblock && editor.settings.codeblock.highlightStyle) {
      let linkElm = editor.dom.create('link', {
        rel: 'stylesheet',
        href: editor.settings.codeblock.highlightStyle
      });

      editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm);
    }
    
  })
};

export default plugin;
