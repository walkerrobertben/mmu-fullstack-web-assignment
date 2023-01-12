const self = {};

const db = require("../../database");

function DBRowToComment(row) {
    return {
        "comment_id": row.comment_id,
        "date_published": new Date(row.date_published).toLocaleDateString(),
        "comment_text": row.comment_text
    }
}

self.getAll = (article_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM comments WHERE article_id=?";
        const params = [article_id];

        const comments = [];

        db.each(query, params, (error, row) => {
            if (error) {
                console.error("Row error" + error);
            } else {
                comments.push(DBRowToComment(row));
            }
        }, (error, rowCount) => {
            if (error) {
                reject(error);
            } else {
                resolve(comments);
            }
        });
    });
}

self.getSingle = (comment_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM comments WHERE comment_id=?";
        const params = [comment_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(DBRowToComment(row));
                } else {
                    resolve(null);
                }
            }
        });

    });
}

self.getArticleId = (comment_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT article_id FROM comments WHERE comment_id=?";
        const params = [comment_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(row.article_id);
                } else {
                    resolve(null);
                }
            }
        });

    });
}

self.addSingle = (article_id, comment) => {
    return new Promise((resolve, reject) => {
        const date = Date.now();

        const query = "INSERT INTO comments (comment_text, date_published, article_id) VALUES(?,?,?)";
        const params = [comment.comment_text, date, article_id];

        db.run(query, params, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

self.deleteSingle = (comment_id) => {
    return new Promise((resolve, reject) => {

        const query = "DELETE FROM comments WHERE comment_id=?";
        const params = [comment_id];

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