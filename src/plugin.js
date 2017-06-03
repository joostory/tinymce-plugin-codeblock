import codeblock from './codeblock'
import inlinecode from './inlinecode'

const plugin = (editor, pluginUrl) => {
  codeblock(editor, pluginUrl)
  inlinecode(editor, pluginUrl)
}

export default plugin
