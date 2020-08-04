const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const router = new Router({ prefix: '/news'})
const News = require('../modules/news')
const dbName = 'website.db'




// app.use(function *() {
//     const news = [{
//          createadAt: new Date(),
//         description: 'test description'
//     },
//                  {
//         title: 'test news2',
//         createadAt: new Date(),
//         description: 'test description2'
//     },
//                   {
//         title: 'test news22',
//         createadAt: new Date(),
//         description: 'test description22'}]
//     yield this.render('news',{
//         news: news
        
//     })})






router.get('/', async (ctx) =>{
    const list = [{
        title: 'testing',
        createdAt: new Date(),
        description: 'test2'
    },
    {
        title: 'testing2',
        createdAt: new Date(),
        description: 'test211'
    }]
    await ctx.render('news',{
        list: list 
    })
})
router.get('/show', async ctx => {
	try {
		await ctx.render('show', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})

router.post('/', koaBody, async ctx => {
	const news = await new News(dbName)
	try {
		// call the functions in the module
		await news.registerNews(ctx.request.body.title, ctx.request.body.description, ctx.request.body.markdown)
		
	} catch(err) {
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
        console.log(array)
		await ctx.render('news')
        
	} finally {
		news.tearDown()
	}
})












module.exports = router



                                                                                                                                