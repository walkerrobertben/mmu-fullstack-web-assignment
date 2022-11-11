const self = {}

const crypto = require("crypto");

const db = require("../../database");

function DBRowToUser(row) {
    return {
        "user_id": row.user_id,
        "first_name": row.first_name,
        "last_name": row.last_name,
        "email": row.email,
        "password": row.password,
        "salt": row.salt
    }
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

self.addSingle = (user) => {
    return new Promise((resolve, reject) => {

        const salt = crypto.randomBytes(64);
        const hash = crypto.pbkdf2Sync(user.password, salt, 100000, 256, "sha256");
    
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

module.exports = self;