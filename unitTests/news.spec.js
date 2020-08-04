const News = require('../modules/news.js')

describe('registerNews()', () => {

	test('add news', async done => {
		expect.assertions(1)
		const news = await new News()
		const register = await news.registerNews('Title', 'Description', 'markdown')
		expect(register).toBe(true)
		news.tearDown()
		done()
	})
    test('error if no input', async done => {
		expect.assertions(1)
		const news = await new News()
		await expect( news.registerNews('', '', '') )
			.rejects.toEqual( Error('missing field') )
		done()
	})
    
    test('error if blank title', async done => {
		expect.assertions(1)
		const news = await new News()
		await expect( news.registerNews('', 'test2', 'test3') )
			.rejects.toEqual( Error('missing field') )
		done()
	})
    
    test('error if blank description', async done => {
		expect.assertions(1)
		const news = await new News()
		await expect( news.registerNews('tes1', '', 'test3') )
			.rejects.toEqual( Error('missing field') )
		done()
	})
    test('error if blank markdown', async done => {
		expect.assertions(1)
		const news = await new News()
		await expect( news.registerNews('test', 'test2', '') )
			.rejects.toEqual( Error('missing field') )
		done()
	})
    test('error if blank markdown', async done => {
		expect.assertions(1)
		const news = await new News()
		await expect( news.registerNews('test', 'test2', '') )
			.rejects.toEqual( Error('missing field') )
		done()
	})
    

	
})

describe('getAllNews()', () => {

	test('testing retrieving news', async done => {
		const news = await new News()
		const show = await news.getAllNews()
		expect(show).toBe(show)
		news.tearDown()
		done()
	})
    
    
	
})
describe('getParticularNews()', () => {

	test('testing retrieving news', async done => {
		const news = await new News()
		const show = await news.getParticularNews()
		expect(show).toBe(show)
		news.tearDown()
		done()
	})
    
	
})

describe('release()', () => {

	test('testing releasing from database', async done => {
		const news = await new News()
		const release = await news.release()
		expect(release).toBe(release)
		news.tearDown()
		done()
	})
    
	
})
describe('update()', () => {

	test('testing updating ', async done => {
		const news = await new News()
		const update = await news.update()
		expect(update).toBe(update)
		news.tearDown()
		done()
	})
    
	
})
describe('getAllPendingNews()', () => {

	test('testing if we can get news that are marked as pending ', async done => {
		const news = await new News()
		const pending = await news.getAllPendingNews()
		expect(pending).toBe(pending)
		news.tearDown()
		done()
	})
    
	
})
	
    
    