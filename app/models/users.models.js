const self = {}

const crypto = require("crypto");

const db = require("../../database");

function DBRowToUser(row) {
    return {
        "user_id": row.user_id,
        "first_name": row.first_name,
        "last_name": row.last_name,
        "email": row.email
    }
}

function GenerateToken() {
    return crypto.randomBytes(16).toString("hex");
}
function GenerateSalt() {
    return crypto.randomBytes(64);
}
function HashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 256, "sha256");
}

self.getAll = () => {
    return new Promise((resolve, reject) => {

        const query = "SELECT * FROM users";
        const params = [];
    
        const users = [];
    
        db.each(query, params, (error, row) => {
            if(error) {
                console.error("Row error" + error);
            } else {
                users.push(DBRowToUser(row));
            }
        }, (error, rowCount) => {
            if (error) {
                reject(error);
            } else {
                resolve(users);
            }
        });
    });
}

self.getUserIdFromSessionToken = (session_token) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT user_id FROM users WHERE session_token=?";
        const params = [session_token];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(row.user_id);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

self.addSingle = (user) => {
    return new Promise((resolve, reject) => {

        const salt = GenerateSalt();
        const hash = HashPassword(user.password, salt); //crypto.pbkdf2Sync(user.password, salt, 100000, 256, "sha256");
    
        const query = "INSERT INTO users (first_name, last_name, email, password, salt) VALUES(?,?,?,?,?)";
        const params = [user.first_name, user.last_name, user.email, hash.toString("hex"), salt.toString("hex")];
    
        db.run(query, params, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

self.attemptLogin = (email, password) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT user_id, password, salt FROM users WHERE email=?";
        const params = [email];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {

                    const salt = Buffer.from(row.salt, "hex");
                    const attemptHash = HashPassword(password, salt);

                    if (row.password === attemptHash.toString("hex")) {
                        resolve({ //email & password match, success
                            success: true,
                            user_id: row.user_id
                        });
                    } else {
                        resolve({ //wrong password
                            success: false,
                            user_id: null
                        });
                    }
                } else {
                    resolve({ //wrong email
                        success: false,
                        user_id: null
                    });
                }
            }
        });
    });
}

self.getToken = (user_id) => {
    return new Promise((resolve, reject) => {

        const query = "SELECT session_token FROM users WHERE user_id=?";
        const params = [user_id];

        db.get(query, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                if (row != null) {
                    resolve(row.session_token);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

self.setToken = (user_id) => {
    return new Promise((resolve, reject) => {

        const session_token = GenerateToken();

        const query = "UPDATE users SET session_token=? WHERE user_id=?";
        const params = [session_token, user_id];

        db.run(query, params, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(session_token);
            }
        });
    });
}

self.deleteToken = (user_id) => {
    return new Promise((resolve, reject) => {

        const query = "UPDATE users SET session_token=NULL WHERE user_id=?";
        const params = [user_id];

        db.run(query, params, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })

    });
}



module.exports = self;