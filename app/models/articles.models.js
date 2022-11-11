const self = {};

const db = require("../../database");

function DBRowToArticle(row) {
    return {
        "article_id": row.article_id,
        "title": row.title,
        "author": row.author,
        "date_published": new Date(row.date_published).toLocaleDateString(),
        "date_edited": new Date(row.date_edited).toLocaleDateString(),
        "article_text": row.article_text
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

self.getSingle = (article_id) => {
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

self.addSingle = (article) => {
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

self.updateSingle = (article_id, article) => {
    return new Promise((resolve, reject) => {

        const query = "UPDATE articles SET title=?, author=?, article_text=? WHERE article_id=?";
        const params = [article.title, article.author, article.article_text, article_id];

        db.run(query, params, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

self.deleteSingle = (article_id) => {
    return new Promise((resolve, reject) => {

        const query = "DELETE FROM articles WHERE article_id=?";
        const params = [article_id];

        db.run(query, params, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = self;