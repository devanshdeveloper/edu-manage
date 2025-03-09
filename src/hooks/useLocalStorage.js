import { useCallback, useState, useEffect } from "react";

/**
 * Custom hook for managing data in localStorage with automatic JSON serialization
 * @template T
 * @param {string} key - The storage key
 * @param {T | ((prevValue: T | null) => T)} defaultValue - The initial value or function to compute it
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.runIfMissing=false] - Run defaultValue function on existing storage value
 * @returns {[T, (value: T | ((prevValue: T) => T)) => void, () => void]} Tuple containing value, setter, and remove function
 */
export function useLocalStorage(key, defaultValue, options) {
  if (typeof window === "undefined") return [defaultValue, () => {}];
  return useStorage(key, defaultValue, window.localStorage, options);
}

/**
 * Custom hook for managing data in sessionStorage with automatic JSON serialization
 * @template T
 * @param {string} key - The storage key
 * @param {T | ((prevValue: T | null) => T)} defaultValue - The initial value or function to compute it
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.runIfMissing=false] - Run defaultValue function on existing storage value
 * @returns {[T, (value: T | ((prevValue: T) => T)) => void, () => void]} Tuple containing value, setter, and remove function
 */
export function useSessionStorage(key, defaultValue, options) {
  if (typeof window === "undefined") return [defaultValue, () => {}];
  return useStorage(key, defaultValue, window.sessionStorage, options);
}

/**
 * Internal hook for managing data in web storage with automatic JSON serialization
 * @template T
 * @param {string} key - The storage key
 * @param {T | ((prevValue: T | null) => T)} defaultValue - The initial value or function to compute it
 * @param {Storage} storageObject - The storage object (localStorage or sessionStorage)
 * @param {Object} [options={}] - Additional options
 * @param {boolean} [options.runIfMissing=false] - Run defaultValue function on existing storage value
 * @returns {[T, (value: T | ((prevValue: T) => T)) => void, () => void]} Tuple containing value, setter, and remove function
 */
function useStorage(key, defaultValue, storageObject, options = {}) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) {
      if (typeof defaultValue === "function" && options.runIfMissing) {
        return defaultValue(JSON.parse(jsonValue));
      } else {
        return JSON.parse(jsonValue);
      }
    } else {
      if (typeof defaultValue === "function") {
        return defaultValue(null);
      } else {
        return defaultValue;
      }
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

/* Usage Examples:

1. Basic usage with primitive value:
```jsx
function ExampleComponent() {
  const [name, setName, removeName] = useLocalStorage('user-name', 'John');
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={removeName}>Clear Name</button>
    </div>
  );
}
```

2. Using with objects:
```jsx
function UserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('user-prefs', {
    theme: 'light',
    notifications: true
  });
  
  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };
  
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Current theme: {preferences.theme}</p>
    </div>
  );
}
```

3. Using with session storage:
```jsx
function TemporaryData() {
  const [formData, setFormData, clearForm] = useSessionStorage('form-data', {
    step: 1,
    data: {}
  });
  
  const nextStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step + 1 }));
  };
  
  return (
    <div>
      <p>Current step: {formData.step}</p>
      <button onClick={nextStep}>Next</button>
      <button onClick={clearForm}>Reset</button>
    </div>
  );
}
```

4. Using with function as default value:
```jsx
function ComplexDataComponent() {
  const [data, setData] = useLocalStorage('complex-data', () => {
    // Compute initial value
    return { timestamp: Date.now(), id: Math.random().toString(36) };
  });
  
  return (
    <div>
      <p>Created at: {new Date(data.timestamp).toLocaleString()}</p>
      <p>ID: {data.id}</p>
    </div>
  );
}
```
*/
