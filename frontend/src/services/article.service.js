const self = {}

import { request_service } from  "./request.service"

self.getAll = () => {
    return request_service.request_json("http://localhost:3333/articles");
}

self.getSingle = (article_id) => {
    return request_service.request_json(`http://localhost:3333/articles/${article_id}`);
}

export const article_service = self;