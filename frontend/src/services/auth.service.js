const self = {}

import { ref } from "vue";
import { request_service } from  "./request.service"

self.token = ref(localStorage.getItem("session_token"));

self.getToken = () => {
    return self.token.value;
}

self.setToken = (new_value) => {
    if (new_value !== null) {
        localStorage.setItem("session_token", new_value);
    } else {
        localStorage.removeItem("session_token");
    }
    self.token.value = new_value;
}

self.isAuthenticated = () => {
    return self.getToken() !== null;
}

self.login = (email, password) => {
    return new Promise((resolve) => {
        
        const options = request_service.baseOptions();
        options.method = "POST";
        options.add_json({email, password});

        request_service.request_json("http://localhost:3333/login", options)
        .then((json) => {
            self.setToken(json.session_token);
            resolve(true);
        })
        .catch((error) => {
            resolve(false);
        });

    });
}

self.logout = () => {
    if (self.isAuthenticated()) {
        self.setToken(null);
    }
}

export const auth_service = self;