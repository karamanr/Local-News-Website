
const Router = require('koa-router')

const publicRouter = require('./public')
const secureRouter = require('./secure')
const newsRouter = require('./news')

const apiRouter = new Router()

const nestedRoutes = [publicRouter, secureRouter, newsRouter]
for (const router of nestedRoutes) apiRouter.use(router.routes(), router.allowedMethods())

module.exports = apiRouter
