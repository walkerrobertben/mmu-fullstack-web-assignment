const self = {};

const model = require("../models/articles.models");

self.getAll = (req, res) => {
    model.getAll().then((articles) => {
        res.status(200).send(articles);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.create = (req, res) => {

    { //validation
        const schema = Joi.object({
            "title": Joi.string().required(),
            "author": Joi.string().required(),
            "article_text": Joi.string().required()
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(error.details[0].message);
        }
    }

    const article = Object.assign({}, req.body);

    model.addNew(article).then((article_id) => {
        res.status(201).send({article_id: article_id});
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.getOne = (req, res) => {

    const article_id = parseInt(req.params.article_id);

    model.getOne(article_id).then((article) => {
        if (row != null) {
            res.status(200).send(article);
        } else {
            res.sendStatus(404);    
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.updateArticle = (req, res) => {
    return res.sendStatus(500);
}

self.deleteArticle = (req, res) => {
    return res.sendStatus(500);
}

module.exports = self;