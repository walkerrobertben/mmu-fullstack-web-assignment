const self = {};

const Joi = require("joi")

const model = require("../models/articles.models");

self.getAll = (req, res) => {
    model.getAll().then((articles) => {
        res.status(200).send(articles);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.getSingle = (req, res) => {
    
    const article_id = parseInt(req.params.article_id);

    model.getSingle(article_id).then((article) => {
        if (article != null) {
            res.status(200).send(article);
        } else {
            res.sendStatus(404);    
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.createSingle = (req, res) => {

    { //validation
        const schema = Joi.object({
            "title": Joi.string().required(),
            "author": Joi.string().required(),
            "article_text": Joi.string().required()
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }
    }

    const article = Object.assign({}, req.body);

    model.addSingle(article, req.authenticated.user_id).then((article_id) => {
        res.status(201).send({article_id: article_id});
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.updateSingle = (req, res) => {

    const article_id = parseInt(req.params.article_id);

    model.getSingle(article_id).then((article) => {
        if (article != null) {

            { //validation
                const schema = Joi.object({
                    "title": Joi.string(),
                    "author": Joi.string(),
                    "article_text": Joi.string()
                });

                const validation = schema.validate(req.body);

                if (validation.error) {
                    return res.status(400).send(error.details[0].message);
                }
            }

            if (req.body.hasOwnProperty("title")) {
                article.title = req.body.title;
            }
            if (req.body.hasOwnProperty("author")) {
                article.author = req.body.author;
            }
            if (req.body.hasOwnProperty("article_text")) {
                article.article_text = req.body.article_text;
            }

            model.updateSingle(article_id, article).then(() => {
                res.sendStatus(200);
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

self.deleteSingle = (req, res) => {

    const article_id = parseInt(req.params.article_id);

    model.getSingle(article_id).then((article) => {
        if (article != null) {

            model.deleteSingle(article_id).then(() => {
                res.sendStatus(200);
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