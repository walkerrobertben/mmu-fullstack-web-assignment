const self = {}

function safe_type(v) {
    if (v === null) {
        return "null"
    } else {
        return typeof v;
    }
}

self.copy = (obj1, deep=false) => {
    const obj2 = {};
    for (const [key1, value1] of Object.entries(obj1)) {
        const key2 = (deep && safe_type(key1) === "object") ? self.copy(key1, true) : key1;
        const value2 = (deep && safe_type(value1) === "object") ? self.copy(value1, true) : value1;
        obj2[key2] = value2;
    }
    return obj2;
}

self.deepcopy = (obj1) => {
    return self.copy(obj1, true);
}

self.equals = (obj1, obj2) => { //deep-compare two objects
    const equals = (a, b) => {
        for (const [key, va] of Object.entries(a)) {

            const vb = b[key];
            if (vb === undefined) return false; //key not present in b

            const ta = safe_type(va);
            const tb = safe_type(vb);
            if (ta !== tb) return false; //type mismatch

            if (ta === "object") {
                if (!self.equals(va, vb)) return false; //object mismatch

            } else {
                if (va !== vb) return false; //value mismatch

            }
        }
        return true;
    }

    return equals(obj1, obj2) && equals(obj2, obj1);
}

export default self;