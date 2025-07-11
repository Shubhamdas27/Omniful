function deepClone(obj) {
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
        return obj.map(item => deepClone(item));
    }
    
    // Handle Functions
    if (typeof obj === 'function') {
        return obj;
    }
    
    // Handle Objects
    const clonedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    
    return clonedObj;
}

// Alternative implementation using JSON (with limitations)
function deepCloneJSON(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        console.error('Deep clone failed:', error);
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { deepClone, deepCloneJSON };
}

