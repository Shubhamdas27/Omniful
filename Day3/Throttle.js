function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Advanced throttle with leading and trailing options
function throttleAdvanced(func, limit, options = {}) {
    let timeout;
    let previous = 0;
    const { leading = true, trailing = true } = options;
    
    return function(...args) {
        const now = Date.now();
        
        if (!previous && !leading) {
            previous = now;
        }
        
        const remaining = limit - (now - previous);
        
        if (remaining <= 0 || remaining > limit) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout && trailing) {
            timeout = setTimeout(() => {
                previous = leading ? Date.now() : 0;
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// Throttle specifically designed for scroll events
function throttleScroll(func, limit = 16) { // ~60fps
    let ticking = false;
    
    return function(event) {
        if (!ticking) {
            requestAnimationFrame(() => {
                func.call(this, event);
                ticking = false;
            });
            ticking = true;
        }
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { throttle, throttleAdvanced, throttleScroll };
}
