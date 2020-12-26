const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const handlebars = require('express-handlebars')
const express = require('express')
const app = express()
const config = webpackConfig(process.env, { mode: 'development' })


app.engine('hbs', handlebars({
  defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

app.use('/styles', express.static('styles'))
app.use(middleware(webpack(config), {
  publicPath: config.output.publicPath
}))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => console.log('tinymce-plugin-codeblock dev app listening on port 3000.'))
