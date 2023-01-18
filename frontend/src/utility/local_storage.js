const self = {}

self.push = (key, value) => {
    if (value == null) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, value);
    }
}

self.pull = (key) => {
    return localStorage.getItem(key);
}

self.push_object = (key, object) => {
    if (object == null) {
        self.push(key, null);
    } else {
        self.push(key, JSON.stringify(object));
    }
}

self.pull_object = (key) => {
    const json = self.pull(key);
    if (json == null) {
        return null
    } else {
        return JSON.parse(json);
    }
}

export default self;