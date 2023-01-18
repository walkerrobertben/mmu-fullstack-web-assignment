const self = {}

import router from "../router/index";

self.error_400 = () => {
    router.push({
        path: "/denied",
        replace: true,
    });
}

self.error_404 = () => {
    router.push({
        path: "/404",
        replace: true,
    });
}

export const redirect_service = self;