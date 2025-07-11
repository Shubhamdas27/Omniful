class LocalStorageManager {
    constructor(prefix = 'app_') {
        this.prefix = prefix;
        this.isSupported = this.checkSupport();
    }
    
    // Check if localStorage is supported
    checkSupport() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Get prefixed key
    getKey(key) {
        return `${this.prefix}${key}`;
    }
    
    // Set item with optional expiration
    set(key, value, expirationMinutes = null) {
        if (!this.isSupported) {
            console.warn('localStorage is not supported');
            return false;
        }
        
        try {
            const item = {
                value: value,
                timestamp: Date.now(),
                expiration: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
            };
            
            localStorage.setItem(this.getKey(key), JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Failed to set localStorage item:', error);
            return false;
        }
    }
    
    // Get item with expiration check
    get(key, defaultValue = null) {
        if (!this.isSupported) {
            console.warn('localStorage is not supported');
            return defaultValue;
        }
        
        try {
            const itemStr = localStorage.getItem(this.getKey(key));
            
            if (!itemStr) {
                return defaultValue;
            }
            
            const item = JSON.parse(itemStr);
            
            // Check expiration
            if (item.expiration && Date.now() > item.expiration) {
                this.remove(key);
                return defaultValue;
            }
            
            return item.value;
        } catch (error) {
            console.error('Failed to get localStorage item:', error);
            return defaultValue;
        }
    }
    
    // Remove item
    remove(key) {
        if (!this.isSupported) {
            console.warn('localStorage is not supported');
            return false;
        }
        
        try {
            localStorage.removeItem(this.getKey(key));
            return true;
        } catch (error) {
            console.error('Failed to remove localStorage item:', error);
            return false;
        }
    }
    
    // Check if item exists and is not expired
    has(key) {
        return this.get(key) !== null;
    }
    
    // Clear all items with the current prefix
    clear() {
        if (!this.isSupported) {
            console.warn('localStorage is not supported');
            return false;
        }
        
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
    
    // Get all items with the current prefix
    getAll() {
        if (!this.isSupported) {
            console.warn('localStorage is not supported');
            return {};
        }
        
        const items = {};
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                const originalKey = key.replace(this.prefix, '');
                items[originalKey] = this.get(originalKey);
            }
        });
        
        return items;
    }
    
    // Get storage size in bytes
    getSize() {
        if (!this.isSupported) {
            return 0;
        }
        
        let size = 0;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                size += localStorage.getItem(key).length;
            }
        });
        
        return size;
    }
    
    // Clean expired items
    cleanExpired() {
        if (!this.isSupported) {
            return 0;
        }
        
        let cleaned = 0;
        const keys = Object.keys(localStorage);
        const now = Date.now();
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item.expiration && now > item.expiration) {
                        localStorage.removeItem(key);
                        cleaned++;
                    }
                } catch (error) {
                    // If parsing fails, remove the corrupted item
                    localStorage.removeItem(key);
                    cleaned++;
                }
            }
        });
        
        return cleaned;
    }
}

// Create default instance
const storage = new LocalStorageManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LocalStorageManager, storage };
}
