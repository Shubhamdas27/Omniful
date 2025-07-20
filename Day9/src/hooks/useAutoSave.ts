import { useEffect, useRef, useCallback, useState } from 'react';

// Custom debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  const debouncedFn = ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }) as T & { cancel: () => void };

  debouncedFn.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFn;
}

interface AutoSaveConfig {
  debounceMs?: number;
  key: string;
  enabled?: boolean;
  onSave?: (data: any) => Promise<void>;
  onError?: (error: Error) => void;
}

interface AutoSaveStatus {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  error?: string;
}

export function useAutoSave<T>(
  data: T,
  config: AutoSaveConfig
) {
  const {
    debounceMs = 2000,
    key,
    enabled = true,
    onSave,
    onError
  } = config;

  const previousDataRef = useRef<T>();
  const statusRef = useRef<AutoSaveStatus>({ status: 'idle' });
  const [status, setStatus] = useState<AutoSaveStatus>({ status: 'idle' });

  // Update status and trigger re-render
  const updateStatus = useCallback((newStatus: Partial<AutoSaveStatus>) => {
    statusRef.current = { ...statusRef.current, ...newStatus };
    setStatus({ ...statusRef.current });
  }, []);

  // Save to localStorage
  const saveToLocal = useCallback((data: T) => {
    try {
      localStorage.setItem(`autosave_${key}`, JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }, [key]);

  // Load from localStorage
  const loadFromLocal = useCallback((): T | null => {
    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.data;
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
    return null;
  }, [key]);

  // Clear localStorage
  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(`autosave_${key}`);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }, [key]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (dataToSave: T) => {
      if (!enabled) return;

      updateStatus({ status: 'saving' });

      try {
        // Save to localStorage first
        saveToLocal(dataToSave);

        // Call custom save function if provided
        if (onSave) {
          await onSave(dataToSave);
        }

        updateStatus({ 
          status: 'saved', 
          lastSaved: new Date(),
          error: undefined
        });

        // Auto-clear saved status after 3 seconds
        setTimeout(() => {
          updateStatus({ status: 'idle' });
        }, 3000);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Save failed';
        updateStatus({ 
          status: 'error',
          error: errorMessage
        });

        if (onError) {
          onError(error instanceof Error ? error : new Error(errorMessage));
        }
      }
    }, debounceMs),
    [enabled, debounceMs, onSave, onError, updateStatus, saveToLocal]
  );

  // Auto-save when data changes
  useEffect(() => {
    if (!enabled) return;

    // Skip first render and when data hasn't actually changed
    if (previousDataRef.current !== undefined && 
        JSON.stringify(previousDataRef.current) !== JSON.stringify(data)) {
      debouncedSave(data);
    }

    previousDataRef.current = data;
  }, [data, enabled, debouncedSave]);

  // Manual save function
  const save = useCallback(async () => {
    debouncedSave.cancel(); // Cancel any pending debounced save
    await debouncedSave(data);
  }, [data, debouncedSave]);

  // Check if there's unsaved data
  const hasUnsavedChanges = useCallback(() => {
    if (!enabled) return false;
    const saved = loadFromLocal();
    return JSON.stringify(saved) !== JSON.stringify(data);
  }, [data, enabled, loadFromLocal]);

  return {
    status,
    save,
    loadFromLocal,
    clearSaved,
    hasUnsavedChanges
  };
}

// Auto-save form hook with form validation
export function useAutoSaveForm<T extends Record<string, any>>(
  formData: T,
  config: AutoSaveConfig & {
    validate?: (data: T) => boolean;
    excludeFields?: (keyof T)[];
  }
) {
  const { validate, excludeFields = [], ...autoSaveConfig } = config;

  // Filter out excluded fields
  const filteredData = Object.fromEntries(
    Object.entries(formData).filter(([key]) => !excludeFields.includes(key))
  ) as T;

  // Only save if validation passes
  const shouldSave = !validate || validate(filteredData);

  const autoSave = useAutoSave(
    shouldSave ? filteredData : null,
    {
      ...autoSaveConfig,
      enabled: autoSaveConfig.enabled && shouldSave
    }
  );

  return autoSave;
}

// Hook for detecting unsaved changes and warning user
export function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
}

// Utility function to create a unique storage key
export function createAutoSaveKey(prefix: string, userId?: string, formId?: string) {
  const parts = [prefix];
  if (userId) parts.push(userId);
  if (formId) parts.push(formId);
  return parts.join('_');
}
