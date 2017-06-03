
export default (editor, pluginUrl) => {
	
	const handleButtonClick = () => {
		editor.formatter.toggle('code')
  }

  editor.addCommand('inlinecode', handleButtonClick)
  editor.addButton('inlinecode', {
    cmd: 'inlinecode',
    icon: 'code',
    tooltip: 'Code',
    stateSelector: 'code'
  })

}