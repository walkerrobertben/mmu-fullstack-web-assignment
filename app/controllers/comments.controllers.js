const self = {}

const model = require("../models/comments.models");
const articles_model = require("../models/articles.models");

self.getAll = (req, res) => {

    const article_id = parseInt(req.params.article_id);

    articles_model.getSingle(article_id).then((article) => {
        if (article != null) {
            model.getAll(article_id).then((comments) => {
                res.status(200).send(comments);
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(404);    
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

module.exports = self;