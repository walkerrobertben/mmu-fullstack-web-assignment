const self = {};

const db = require("../../database");

const user_levels = require("../lib/user_levels");

function DBRowToArticle(row, user_id) {
    return {
        "article_id": row.article_id,
        "title": row.title,
        "author": row.author,
        "date_published": new Date(row.date_published).toLocaleDateString(),
        "date_edited": new Date(row.date_edited).toLocaleDateString(),
        "article_text": row.article_text,

        //added these properties to support private/public articles
        //test.f.articles.retrival.js dissallows created_by in here, which makes things really messy!
        "is_private": !!row.is_private,
        "is_owned": row.created_by == user_id,
    }
}

function canAccess(article, auth) {
    return !article.is_private || (article.is_private && (article.is_owned || auth.user_level >= user_levels.LEVEL_ADMIN));
}

self.getAll = (auth) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM articles ORDER BY date_published DESC, article_id DESC";
        const params = [];
    
        const articles = [];
    
        db.each(query, params, (error, row) => {
            if(error) {
                console.error("Row error" + error);
            } else {
                const article = DBRowToArticle(row, auth.user_id);
                if (canAccess(article, auth)) {
                    articles.push(article);
                }
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

self.getSingle = (article_id, auth) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM articles WHERE article_id=?";
        const params = [article_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    const article = DBRowToArticle(row, auth.user_id);
                    if (canAccess(article, auth)) {
                        resolve(article);
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            }
        });

    });
}

self.getAuthor = (article_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT created_by FROM articles WHERE article_id=?";
        const params = [article_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(row.created_by);
                } else {
                    resolve(null);
                }
            }
        });

    });
}

self.addSingle = (article, created_by_user_id) => {
    return new Promise((resolve, reject) => {
        const date = Date.now();

        const query = "INSERT INTO articles (title, author, date_published, date_edited, article_text, created_by, is_private) VALUES(?,?,?,?,?,?,?)";
        const params = [article.title, article.author, date, date, article.article_text, created_by_user_id, article.is_private];
    
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

        const query = "UPDATE articles SET title=?, author=?, article_text=?, is_private=? WHERE article_id=?";
        const params = [article.title, article.author, article.article_text, article.is_private, article_id];

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