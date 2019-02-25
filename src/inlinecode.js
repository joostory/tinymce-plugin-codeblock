
export default (editor, pluginUrl) => {
	
	const handleButtonClick = () => {
		editor.formatter.toggle('code')
  }

  editor.addCommand('inlinecode', handleButtonClick)
  editor.ui.registry.addButton('inlinecode', {
    icon: 'code',
    tooltip: 'Code',
    stateSelector: 'code',
    onAction: () => {
      editor.execCommand('inlinecode')
    }
  })

}
