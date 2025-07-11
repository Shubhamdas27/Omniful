function shallowClone(obj) {
    // Handle null, undefined, and primitive types
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    // Handle Arrays
    if (Array.isArray(obj)) {
        return [...obj];
    }
    
    // Handle Objects
    return { ...obj };
}

// Alternative implementations
function shallowCloneObject(obj) {
    return Object.assign({}, obj);
}

function shallowCloneArray(arr) {
    return arr.slice();
}

// Object.create based shallow clone
function shallowCloneWithPrototype(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    const clone = Object.create(Object.getPrototypeOf(obj));
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = obj[key];
        }
    }
    
    return clone;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        shallowClone, 
        shallowCloneObject, 
        shallowCloneArray, 
        shallowCloneWithPrototype 
    };
}
