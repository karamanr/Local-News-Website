const bcrypt = require('bcrypt-promise')
const sqlite = require('sqlite-async')



const dbName = 'website.db'
const User = require('../modules/user')


module.exports = class News {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS news\
				(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, photo TEXT, authorName TEXT, date TEXT, article TEXT, released TEXT, createdById TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async registerNews(title, description, markdown,date,article, released) {
        try {
            Array.from(arguments).forEach( val => {
                if(val.length === 0) throw new Error('missing field')
            })
            let array = []
            let date = new Date()
            let sql = `INSERT INTO news(title, photo, authorName,date,article) VALUES("${title}", "${description}", "${markdown}", "${date}", "test2")`
            console.log("Inserting into the table values: " + title + " " + description + " " + markdown + " " + date)
            let newNews = await this.db.run(sql)
            return true
        } catch(error){
            //console.log(error);
            throw error;
        }
    }
    
    async getAllNews(){
        try {
            let sql = `SELECT * FROM news WHERE released=?`;
            let allNews = await this.db.all(sql, ['yes']);
            return allNews;
        } catch (error) {
            console.log(error);
        }
    }
    
   
    async getAllPendingNews(){
        try {
            let sql = `SELECT * FROM news WHERE released=?`;
            let allNews = await this.db.all(sql, ['no'])
            return allNews;
        } catch (error) {
            console.log(error);
        }
    }


    async getParticularNews(id){
        try {
            let sql = `SELECT * FROM news WHERE id=?`;
            let allNews = await this.db.all(sql, id)
            return allNews;
        } catch (error) {
            console.log(error);
        }
    }

	
    async release(id){
        try {
            console.log(id,"inside id")
            let inputData = ['yes',id];
            let sql = `UPDATE news SET released=? WHERE id=?`;
            let updated = await this.db.run(sql, inputData)
            return updated;
        } catch (error) {
            console.log(error);
        }
    }


    async update(id,article){
        try {
            let inputData = [article,'no',id];
            let sql = `UPDATE news SET article=?,released=? WHERE id=?`;
            let updated = await this.db.run(sql, inputData)
            return updated;
        } catch (error) {
            console.log(error);
        }
    }

    
	async tearDown() {
		await this.db.close()
	}
}