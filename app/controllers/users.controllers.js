const self = {};

const Joi = require("joi")

const model = require("../models/users.models");

self.getAll = (req, res) => {
    model.getAll().then((articles) => {
        res.status(200).send(articles);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.createSingle = (req, res) => {

    { //validation
        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "email": Joi.string().email().required(),
            "password": Joi.string().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }
    }

    const user = Object.assign({}, req.body);

    model.addSingle(user).then((user_id) => {
        res.status(201).send({user_id: user_id});
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.login = (req, res) => {
    res.sendStatus(500);
}

self.logout = (req, res) => {
    res.sendStatus(500);
}

self.deleteSingle = (req, res) => {
    console.error("delete user deprecated");
    res.sendStatus(500);
}

module.exports = self;