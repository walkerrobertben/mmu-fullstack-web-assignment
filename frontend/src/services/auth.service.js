const self = {}

self.getToken = () => {
    return localStorage.getItem("session_token");
}

self.isAuthenticated = () => {
    return self.getToken() != null;
}

export const auth_service = self;