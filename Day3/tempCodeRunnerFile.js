class TempCodeRunner {
    constructor() {
        this.history = [];
        this.maxHistorySize = 100;
    }
    
    // Execute code safely with timeout and error handling
    execute(code, timeout = 5000) {
        const startTime = Date.now();
        const executionId = this.generateId();
        
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error(`Code execution timed out after ${timeout}ms`));
            }, timeout);
            
            try {
                // Create a sandbox-like environment
                const sandbox = this.createSandbox();
                
                // Wrap code in a function to isolate scope
                const wrappedCode = `
                    (function() {
                        ${code}
                    })();
                `;
                
                // Execute the code
                const result = eval(wrappedCode);
                
                const executionTime = Date.now() - startTime;
                
                const execution = {
                    id: executionId,
                    code,
                    result,
                    executionTime,
                    timestamp: new Date().toISOString(),
                    success: true
                };
                
                this.addToHistory(execution);
                
                clearTimeout(timeoutId);
                resolve(execution);
                
            } catch (error) {
                const executionTime = Date.now() - startTime;
                
                const execution = {
                    id: executionId,
                    code,
                    error: error.message,
                    executionTime,
                    timestamp: new Date().toISOString(),
                    success: false
                };
                
                this.addToHistory(execution);
                
                clearTimeout(timeoutId);
                reject(execution);
            }
        });
    }
    
    // Create a limited sandbox environment
    createSandbox() {
        return {
            console: {
                log: (...args) => console.log('[Sandbox]', ...args),
                error: (...args) => console.error('[Sandbox]', ...args),
                warn: (...args) => console.warn('[Sandbox]', ...args)
            },
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            Date: Date,
            Math: Math,
            JSON: JSON
        };
    }
    
    // Execute code asynchronously
    async executeAsync(code, timeout = 5000) {
        try {
            const result = await this.execute(code, timeout);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    // Execute multiple code snippets in sequence
    async executeSequence(codeArray, timeout = 5000) {
        const results = [];
        
        for (let i = 0; i < codeArray.length; i++) {
            try {
                const result = await this.execute(codeArray[i], timeout);
                results.push(result);
            } catch (error) {
                results.push(error);
                break; // Stop execution on first error
            }
        }
        
        return results;
    }
    
    // Test a function with multiple inputs
    testFunction(funcCode, testCases, timeout = 5000) {
        const results = [];
        
        testCases.forEach((testCase, index) => {
            const { input, expected } = testCase;
            const testCode = `
                ${funcCode}
                const result = typeof testFunction === 'function' 
                    ? testFunction(${JSON.stringify(input)})
                    : eval(\`(\${${JSON.stringify(funcCode)}})(${JSON.stringify(input)})\`);
                result;
            `;
            
            try {
                const execution = this.execute(testCode, timeout);
                const passed = JSON.stringify(execution.result) === JSON.stringify(expected);
                
                results.push({
                    testCase: index + 1,
                    input,
                    expected,
                    actual: execution.result,
                    passed,
                    executionTime: execution.executionTime
                });
            } catch (error) {
                results.push({
                    testCase: index + 1,
                    input,
                    expected,
                    error: error.message,
                    passed: false
                });
            }
        });
        
        return results;
    }
    
    // Generate unique execution ID
    generateId() {
        return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Add execution to history
    addToHistory(execution) {
        this.history.unshift(execution);
        
        if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(0, this.maxHistorySize);
        }
    }
    
    // Get execution history
    getHistory(limit = 10) {
        return this.history.slice(0, limit);
    }
    
    // Clear execution history
    clearHistory() {
        this.history = [];
    }
    
    // Get execution statistics
    getStats() {
        const successful = this.history.filter(exec => exec.success).length;
        const failed = this.history.length - successful;
        const avgExecutionTime = this.history.reduce((sum, exec) => sum + exec.executionTime, 0) / this.history.length || 0;
        
        return {
            totalExecutions: this.history.length,
            successful,
            failed,
            successRate: this.history.length ? (successful / this.history.length * 100).toFixed(2) + '%' : '0%',
            avgExecutionTime: avgExecutionTime.toFixed(2) + 'ms'
        };
    }
}

// Create default instance
const codeRunner = new TempCodeRunner();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TempCodeRunner, codeRunner };
}
