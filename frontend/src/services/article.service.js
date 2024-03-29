const self = {}

import { request_service } from  "./request.service"

self.getAll = () => {
    return request_service.request_json("http://localhost:3333/articles");
}

self.getSingle = (article_id) => {
    return request_service.request_json(`http://localhost:3333/articles/${article_id}`);
}

self.createSingle = (new_article) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "POST";
        options.add_json({
            title: new_article.title,
            author: new_article.author,
            article_text: new_article.article_text,
            is_private: new_article.is_private,
        });

        request_service.request_json("http://localhost:3333/articles", options)
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

self.updateSingle = (article_id, new_article) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "PATCH";
        options.add_json({
            title: new_article.title,
            author: new_article.author,
            article_text: new_article.article_text,
            is_private: new_article.is_private,
        });

        request_service.request(`http://localhost:3333/articles/${article_id}`, options)
        .then((response) => {
            resolve(true);
        })
        .catch((error) => {
            resolve(false);
        });
    });
}

self.deleteSingle = (article_id) => {
    return new Promise((resolve) => {
        const options = request_service.baseOptions();
        options.method = "DELETE";

        request_service.request(`http://localhost:3333/articles/${article_id}`, options)
        .then((response) => {
            resolve(true);
        })
        .catch((error) => {
            resolve(false);
        });
    });
}

export const article_service = self;