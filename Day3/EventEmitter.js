class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    // Add an event listener
    on(event, listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener must be a function');
        }
        
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
        this.events[event].push(listener);
        return this;
    }
    
    // Add a one-time event listener
    once(event, listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener must be a function');
        }
        
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, onceWrapper);
        };
        
        return this.on(event, onceWrapper);
    }
    
    // Remove an event listener
    off(event, listenerToRemove) {
        if (!this.events[event]) {
            return this;
        }
        
        if (!listenerToRemove) {
            delete this.events[event];
            return this;
        }
        
        this.events[event] = this.events[event].filter(
            listener => listener !== listenerToRemove
        );
        
        if (this.events[event].length === 0) {
            delete this.events[event];
        }
        
        return this;
    }
    
    // Emit an event
    emit(event, ...args) {
        if (!this.events[event]) {
            return false;
        }
        
        this.events[event].forEach(listener => {
            try {
                listener.apply(this, args);
            } catch (error) {
                console.error('Error in event listener:', error);
            }
        });
        
        return true;
    }
    
    // Get all listeners for an event
    listeners(event) {
        return this.events[event] ? [...this.events[event]] : [];
    }
    
    // Get the number of listeners for an event
    listenerCount(event) {
        return this.events[event] ? this.events[event].length : 0;
    }
    
    // Remove all listeners
    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
        return this;
    }
    
    // Get all event names
    eventNames() {
        return Object.keys(this.events);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventEmitter;
}

