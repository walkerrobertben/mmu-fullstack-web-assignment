const self = {}

import { auth_service } from  "./auth.service"

self.baseOptions = () => {
    const options = {
        method: "GET",
        headers: {}
    }

    if (auth_service.isAuthenticated()) {
        options.headers["X-Authorization"] = auth_service.getToken();
    }

    options.add_json = (json) => {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(json);
    };

    return options;
}

self.request = (url, options = null) => {
    if (options == null) {
        options = self.baseOptions();
    }
    
    return new Promise((resolve, reject) => {
        fetch(url, options)
        .then((response) => {
            if (response.ok) {
                resolve(response);
            } else {
                const error = `Response failed ${response.status}`
                console.error(error);
                reject(error);
            }
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        })
    });
}

self.request_json = (url, options = null) => {
    return new Promise((resolve, reject) => {
        self.request(url, options)
        .then((response) => {
            resolve(response.json());
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

export const request_service = self;