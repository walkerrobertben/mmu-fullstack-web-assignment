const self = {}

import { auth_service } from  "./auth.service"

const fake_delay = 0;

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
    
    const result = fetch(url, options);

    if (fake_delay > 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                result.then(resolve).catch(reject);
            }, fake_delay);
        });
    } else {
        return result;
    }
    
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