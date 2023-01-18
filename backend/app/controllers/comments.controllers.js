const self = {}

const Joi = require("joi")

const model = require("../models/comments.models");

const articles_model = require("../models/articles.models");

const user_levels = require("../lib/user_levels");

const ProfanityFilter = require("bad-words");
const profanity_filter = new ProfanityFilter({
    placeHolder: "#"
});

self.getAll = (req, res) => {

    const article_id = parseInt(req.params.article_id);
    const auth = req.authenticated;

    articles_model.getSingle(article_id, auth).then((article) => {
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

self.createSingle = (req, res) => {

    const article_id = parseInt(req.params.article_id);
    const auth = req.authenticated;

    articles_model.getSingle(article_id, auth).then((article) => {
        if (article != null) {

            { //validation
                const schema = Joi.object({
                    "comment_text": Joi.string().required(),
                });

                const validation = schema.validate(req.body);

                if (validation.error) {
                    return res.status(400).send(validation.error.details[0].message);
                }
            }

            { //profanity filter
                const original_text = req.body.comment_text;
                const clean_text = profanity_filter.clean(original_text);

                req.body.comment_text = clean_text
            }

            const comment = Object.assign({}, req.body);

            model.addSingle(article_id, comment).then((comment_id) => {
                res.status(201).send({comment_id: comment_id});
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

    const comment_id = parseInt(req.params.comment_id);

    model.getSingle(comment_id).then((comment) => {
        if (comment != null) {

            model.getArticleId(comment_id).then((article_id) => {
                articles_model.getAuthor(article_id).then((author_id) => {

                    //require user is author or admin
                    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
                        if (req.authenticated.user_id != author_id) {
                            return res.sendStatus(401);
                        }
                    }

                    model.deleteSingle(comment_id).then(() => {
                        res.sendStatus(200);
                    }).catch((error) => {
                        console.error(error);
                        res.sendStatus(500);
                    });

                }).catch((error) => {
                    console.error(error);
                    res.sendStatus(500);
                });
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