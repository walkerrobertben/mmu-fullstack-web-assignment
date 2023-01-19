const self = {};

const Joi = require("joi")

const model = require("../models/users.models");

const user_levels = require("../lib/user_levels");

self.getAll = (req, res) => {

    //require admin
    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
        return res.sendStatus(401);
    }

    model.getAll().then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.createSingle = (req, res) => {

    //require admin
    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
        return res.sendStatus(401);
    }

    { //validation

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "email": Joi.string().email().required(),
            "password": Joi.string().regex(passwordPattern).required(),
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

self.deleteSingle = (req, res) => {

    //require admin
    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
        return res.sendStatus(401);
    }

    const user_id = parseInt(req.params.user_id);

    model.getSingle(user_id).then((user) => {
        if (user != null) {

            model.deleteSingle(user_id).then(() => {
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


self.login = (req, res) => {
    
    { //validation
        const schema = Joi.object({
            "email": Joi.string().email().required(),
            "password": Joi.string().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }
    }

    model.attemptLogin(req.body.email, req.body.password).then((loginAttemptResult) => {
        
        if (loginAttemptResult.success) {
            const user_id = loginAttemptResult.user_id;

            model.getUserData(user_id).then((user_data) => {

                if (user_data == null) {
                    throw "Login attempt succeeded, but no user data found";
                }

                if (user_data.session_token != null) {

                    //already logged in
                    res.status(200).send(user_data);

                } else {
                    
                    //give the user a session token
                    model.setToken(user_id).then((session_token) => {

                        //logged in
                        user_data.session_token = session_token;
                        res.status(200).send(user_data); 

                    }).catch((error) => {
                        console.error(error);
                        res.sendStatus(500);
                    });
                }
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(400);
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.logout = (req, res) => {
    model.deleteToken(req.authenticated.user_id).then(() => {
        //logged out
        res.sendStatus(200);

    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

module.exports = self;