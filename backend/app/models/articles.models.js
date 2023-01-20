const self = {};

const db = require("../../database");

const user_levels = require("../lib/user_levels");

function DBRowToArticle(row, user_id) {
    return {
        "article_id": row.article_id,

        "title"       : row.title,
        "author"      : row.author,
        "article_text": row.article_text,

        "date_published": new Date(row.date_published).toLocaleDateString(),
        "date_edited"   : (row.date_edited ? new Date(row.date_edited).toLocaleDateString() : null),

        //added these properties to support private/public articles
        //test.f.articles.retrival.js dissallows created_by in here, which makes things really messy!
        "is_private": !!row.is_private,
        "is_owned"  : row.created_by == user_id,

        //added this to make the date_edited appear once an article is edited
        "edit_count": row.edit_count,
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

        const query = "INSERT INTO articles (title, author, date_published, article_text, created_by, is_private, edit_count) VALUES(?,?,?,?,?,?,?)";
        const params = [article.title, article.author, date, article.article_text, created_by_user_id, article.is_private, 0];
    
        db.run(query, params, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

//is_private gets updated via this method, but doesnt count as an edit, so pass the content_was_edited to set the date
self.updateSingle = (article_id, article, content_was_edited) => {
    return new Promise((resolve, reject) => {

        let query = "UPDATE articles SET title=?, author=?, article_text=?, is_private=?";
        const params = [article.title, article.author, article.article_text, article.is_private];

        if (content_was_edited) {
            const date = Date.now();

            query += ", date_edited=?, edit_count = edit_count + 1";
            params.push(date);
        }

        query += " WHERE article_id=?";
        params.push(article_id);

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