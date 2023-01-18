const self = {}

import { ref } from "vue";
import { request_service } from  "./request.service"

import store from "../utility/local_storage"

import router from "../router/index";

const x_user_ref = ref(store.pull_object("x-user"));

//copied from backend. could probably come up with a better way of getting these to the client
self.USER_LEVELS = {
    LEVEL_NONE:  -1,
    LEVEL_AUTHOR: 0,
    LEVEL_ADMIN:  1,
}

self.USER_LEVEL_NAMES = {
    [self.USER_LEVELS.LEVEL_NONE]:   "None",
    [self.USER_LEVELS.LEVEL_AUTHOR]: "Author",
    [self.USER_LEVELS.LEVEL_ADMIN]:  "Admin",
}

self.reload_for_auth = () => {
    // window.location.reload(true);
    router.go();
}

self.getUser = () => {
    return x_user_ref.value;
}

self.setUser = (new_user) => {
    store.push_object("x-user", new_user);
    x_user_ref.value = new_user;
}

self.isAuthenticated = () => {
    return self.getUser() != null;
}

self.getUserLevel = () => {
    if (self.isAuthenticated()) {
        return self.getUser().user_level;
    } else {
        return self.USER_LEVELS.LEVEL_NONE;
    }
}

self.login = (email, password) => {
    return new Promise((resolve) => {
        
        const options = request_service.baseOptions();
        options.method = "POST";
        options.add_json({email, password});

        request_service.request_json("http://localhost:3333/login", options)
        .then((user_data) => {

            console.log(user_data);

            self.setUser(user_data);
            resolve(true);
        })
        .catch((error) => {
            resolve(false);
        });

    });
}

self.logout = () => {
    return new Promise((resolve) => {
        if (self.isAuthenticated()) {
    
            //send actual logout request
            const options = request_service.baseOptions();
            options.method = "POST";
            request_service.request("http://localhost:3333/logout", options)
            .catch()
            .finally(resolve); //resolve no matter what

            //immediately delete token
            self.setUser(null);

        } else {
            resolve();
        }
    });
    
}

export const auth_service = self;