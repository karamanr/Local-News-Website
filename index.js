const Koa = require('koa')
const session = require('koa-session')
const staticDir = require('koa-static')
const views = require('koa-views')
const sqlite3 = require('./modules/news')
const apiRouter = require('./routes/routes')
const newsRouter = require('./routes/news')

const app = new Koa()
app.keys = ['darkSecret']

const defaultPort = 8080
const port = process.env.PORT || defaultPort

app.use(staticDir('public'))
app.use(session(app))
app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))



app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	ctx.hbs = {
		authorised: ctx.session.authorised,
		host: `https://${ctx.host}`
	}
	for(const key in ctx.query) ctx.hbs[key] = ctx.query[key]
	await next()
})

function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}









app.use(apiRouter.routes(), apiRouter.allowedMethods())



module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
