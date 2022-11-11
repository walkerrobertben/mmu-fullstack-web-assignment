const self = {};

const db = require("../../database");

function DBRowToArticle(row) {
    return {
        article_id: row.article_id,
        title: row.title,
        author: row.author,
        date_published: new Date(row.date_published).toLocaleDateString(),
        date_edited: new Date(row.date_edited).toLocaleDateString(),
        article_text: row.article_text
    }
}

self.getAll = () => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM articles";
        const params = [];
    
        const articles = [];
    
        db.each(query, params, (error, row) => {
            if(error) {
                console.error("Row error" + error);
            } else {
                articles.push(DBRowToArticle(row));
            }
        }, (error, rowCount) => {
            if (error) {
                reject(error);
            } else {
                resolve(articles);
            }
        });
    });
}

self.addNew = (article) => {
    return new Promise((resolve, reject) => {
        const date = Date.now();

        const query = "INSERT INTO articles (title, author, date_published, date_edited, article_text, created_by) VALUES(?,?,?,?,?,?)";
        const params = [article.title, article.author, date, date, article.article_text, 1];
    
        db.run(query, params, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

self.getOne = (article_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM articles WHERE article_id=?";
        const params = [article_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(DBRowToArticle(row));
                } else {
                    resolve(null);
                }
            }
        });

    });
}

module.exports = self;