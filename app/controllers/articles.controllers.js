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
    return res.sendStatus(500);
}

self.getOne = (req, res) => {
    return res.sendStatus(500);
}

self.updateArticle = (req, res) => {
    return res.sendStatus(500);
}

self.deleteArticle = (req, res) => {
    return res.sendStatus(500);
}

module.exports = self;