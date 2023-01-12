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

module.exports = self;