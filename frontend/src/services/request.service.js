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

    return options;
}

self.request = (url, options = null) => {
    if (options == null) {
        options = self.baseOptions();
    }
    return fetch(url, options);
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