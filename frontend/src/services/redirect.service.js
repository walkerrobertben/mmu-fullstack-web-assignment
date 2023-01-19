const self = {}

import router from "../router/index";

self.go = (path) => {
    router.push({
        path: path,
        replace: true,
    });
}

self.error_400 = () => {
    self.go("/denied");
}

self.error_404 = () => {
    self.go("/404");
}

export const redirect_service = self;