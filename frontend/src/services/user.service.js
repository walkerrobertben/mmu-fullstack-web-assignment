const self = {}

import { request_service } from  "./request.service"

self.getAll = () => {
    return request_service.request_json("http://localhost:3333/users");
}

self.createSingle = (new_user) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "POST";
        options.add_json({
            first_name: new_user.first_name,
            last_name: new_user.last_name,
            email: new_user.email,
            password: new_user.password,
        });

        request_service.request_json("http://localhost:3333/users", options)
        .then((json) => {
            resolve({
                success: true,
                json: json,
            });
        })
        .catch((error) => {
            resolve({
                success: false,
                json: null,
            });
        });
    });
}

self.deleteSingle = (user_id) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "DELETE";

        request_service.request(`http://localhost:3333/users/${user_id}`, options)
        .then((response) => {
            resolve(true);
        })
        .catch((error) => {
            resolve(false);
        });
    });
}

export const user_service = self;