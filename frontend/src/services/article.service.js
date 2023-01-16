const self = {}

self.getAll = () => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3333/articles")
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw "Server responsed with " + response.status.toString();
            }
        })
        .then((json) => {
            resolve(json);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

export const article_service = self;