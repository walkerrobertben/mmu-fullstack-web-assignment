const self = {};

const db = require("../../database");

function DbRowToArticle(row) {
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
                articles.push(RowToArticle(row));
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

module.exports = self;