

const DEFAULT_HIGHLIGHT_STYLE = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css"
const DEFAULT_CODE_THEME = 'default'
const DEFAULT_LANGS = [
  { value: 'javascript', mode:'javascript', label: 'Javascript' },
  { value: 'html', mode:'xml', label: 'HTML' },
  { value: 'java', mode:'clike', label: 'Java' }
]

const DEFAULT_OPTIONS = {
  highlightStyle: DEFAULT_HIGHLIGHT_STYLE,
  codeTheme: DEFAULT_CODE_THEME,
  langs: DEFAULT_LANGS
}



let options = null

export function registerOptions(editor) {
  editor.options.register('codeblock', {
    processor: 'object',
    default: {
      highlightStyle: DEFAULT_HIGHLIGHT_STYLE,
      codeTheme: DEFAULT_CODE_THEME,
      langs: DEFAULT_LANGS
    }
  })
}

export function getOption(editor, key) {
  if (!options) {
    options = editor.options.get('codeblock')
  }

  return options[key] || DEFAULT_OPTIONS[key]
}
