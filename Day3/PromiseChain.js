class PromiseChain {
    constructor() {
        this.chain = Promise.resolve();
    }
    
    // Add a new promise to the chain
    add(promiseFunction) {
        this.chain = this.chain.then(promiseFunction);
        return this;
    }
    
    // Execute the chain and return the final result
    execute() {
        return this.chain;
    }
    
    // Static method for sequential execution of an array of promise functions
    static sequential(promiseFunctions) {
        return promiseFunctions.reduce((chain, promiseFunction) => {
            return chain.then(promiseFunction);
        }, Promise.resolve());
    }
    
    // Static method for sequential API calls with data passing
    static sequentialAPICalls(apiCalls) {
        return apiCalls.reduce((chain, apiCall) => {
            return chain.then(result => {
                return apiCall(result);
            });
        }, Promise.resolve());
    }
}

// Utility function for creating delayed promises (useful for testing)
function delay(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

// Example API call simulator
function simulateAPICall(endpoint, data = null) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate
                resolve({
                    endpoint,
                    data,
                    timestamp: new Date().toISOString(),
                    success: true
                });
            } else {
                reject(new Error(`API call to ${endpoint} failed`));
            }
        }, Math.random() * 1000 + 500); // Random delay 500-1500ms
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PromiseChain, delay, simulateAPICall };
}
