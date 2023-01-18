const self = {}

import { request_service } from  "./request.service"

self.getAll = (article_id) => {
    return request_service.request_json(`http://localhost:3333/articles/${article_id}/comments`);
}

self.createSingle = (article_id, new_comment) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "POST";
        options.add_json({
            comment_text: new_comment.comment_text,
        });

        request_service.request_json(`http://localhost:3333/articles/${article_id}/comments`, options)
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

export const comment_service = self;