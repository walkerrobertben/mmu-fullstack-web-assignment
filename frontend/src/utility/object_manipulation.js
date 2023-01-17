const self = {}

self.copy = (obj1, deep=false) => {
    const obj2 = {};
    for (const [key1, value1] of Object.entries(obj1)) {
        const key2 = (deep && typeof key1 == "object") ? self.copy(key1, true) : key1;
        const value2 = (deep && typeof value1 == "object") ? self.copy(value1, true) : value1;
        obj2[key2] = value2;
    }
    return obj2;
}

self.deepcopy = (obj1) => {
    return self.copy(obj1, true);
}

export default self;