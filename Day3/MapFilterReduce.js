Array.prototype.customMap = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('Array.prototype.customMap called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const result = new Array(len);
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            result[i] = callback.call(thisArg, O[i], i, O);
        }
    }
    
    return result;
};

// Custom Filter Implementation
Array.prototype.customFilter = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('Array.prototype.customFilter called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const result = [];
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                result.push(O[i]);
            }
        }
    }
    
    return result;
};

// Custom Reduce Implementation
Array.prototype.customReduce = function(callback, initialValue) {
    if (this == null) {
        throw new TypeError('Array.prototype.customReduce called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    
    if (len === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value');
    }
    
    let k = 0;
    let accumulator;
    
    if (arguments.length >= 2) {
        accumulator = initialValue;
    } else {
        let kPresent = false;
        while (k < len && !kPresent) {
            if (k in O) {
                accumulator = O[k];
                kPresent = true;
            }
            k++;
        }
        
        if (!kPresent) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
    }
    
    while (k < len) {
        if (k in O) {
            accumulator = callback(accumulator, O[k], k, O);
        }
        k++;
    }
    
    return accumulator;
};

// Standalone functions (without modifying Array.prototype)
function map(array, callback, thisArg) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            result[i] = callback.call(thisArg, array[i], i, array);
        }
    }
    return result;
}

function filter(array, callback, thisArg) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i in array && callback.call(thisArg, array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

function reduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;
    
    if (arguments.length < 3) {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }
    
    for (let i = startIndex; i < array.length; i++) {
        if (i in array) {
            accumulator = callback(accumulator, array[i], i, array);
        }
    }
    
    return accumulator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { map, filter, reduce };
}

