import CodeEditor from './components/CodeEditor'

const plugin = (editor) => {

  let codeEditor = new CodeEditor(editor)

  function handleButtonClick() {
    codeEditor.open()
  }

  editor.addCommand('codeblock', handleButtonClick)

  editor.addButton('codeblock', {
    cmd: 'codeblock',
    text: 'codeblock',
    icon: false
  });
};

export default plugin;
