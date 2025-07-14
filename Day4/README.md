# Day 4 - Custom React Hooks ✨

A beautiful demonstration of custom React hooks with modern UI design and glass morphism effects.

## 🎯 Features Overview

This project showcases 6 essential custom React hooks with a stunning visual interface featuring gradient backgrounds, smooth animations, and responsive design.

### Custom Hooks Implemented

1. **🗄️ useLocalStorage** - Persist state to localStorage with automatic serialization
2. **⏱️ useDebounce** - Debounce any value changes to optimize performance  
3. **🌐 useFetch** - Generic data fetching with loading/error states
4. **🔢 useCounter** - Counter with increment/decrement/reset and constraints
5. **⏮️ usePrevious** - Track previous value of any state
6. **🔄 useToggle** - Boolean state with toggle functionality

### UI Features

- 🎨 Beautiful gradient backgrounds with floating animations
- 🌙 Dark/Light theme toggle with localStorage persistence
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and micro-interactions
- 🔍 Real-time search with debouncing
- 📊 Interactive counter with visual constraints
- 🎭 Glass morphism design elements
- 🌈 Gradient text effects and animated borders

## 🗄️ useLocalStorage Hook

Persists state to localStorage with automatic JSON serialization/deserialization.

```typescript
const [name, setName] = useLocalStorage('user-name', '');
const [theme, setTheme] = useLocalStorage('app-theme', 'light');
```

**Features:**
- Automatic persistence to localStorage
- JSON serialization/deserialization
- Error handling for invalid JSON
- Same API as useState

## ⏱️ useDebounce Hook

Debounces any value changes to prevent excessive API calls or calculations.

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

**Features:**
- Configurable delay
- Works with any type of value
- Automatically cancels previous timeouts

## 🌐 useFetch Hook

Generic data fetching hook with loading and error states.

```typescript
const { data, loading, error, refetch } = useFetch<User[]>('https://api.example.com/users');
```

**Features:**
- TypeScript generic support
- Loading and error states
- Refetch functionality
- Configurable HTTP methods and headers
- Automatic JSON parsing

## 🔢 useCounter Hook

Counter with increment, decrement, and reset functionality with optional constraints.

```typescript
const { count, increment, decrement, reset, setValue } = useCounter(0, {
  min: 0,
  max: 100,
  step: 1
});
```

**Features:**
- Optional min/max constraints
- Configurable step size
- Manual value setting
- Reset to initial value

## ⏮️ usePrevious Hook

Tracks the previous value of any state variable.

```typescript
const previousCount = usePrevious(count);
const previousSearchTerm = usePrevious(searchTerm);
```

**Features:**
- Works with any type
- Returns undefined on first render
- Useful for comparing current vs previous values

## 🔄 useToggle Hook

Boolean state management with toggle functionality and additional utilities.

```typescript
const [isVisible, toggle, setTrue, setFalse, setValue] = useToggle(false);
```

**Features:**
- Toggle between true/false
- Explicit setTrue/setFalse functions
- Direct value setting
- Perfect for modals, dropdowns, etc.

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to see the demo application showcasing all hooks.

## 📁 Project Structure

```
src/
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useFetch.ts
│   ├── useCounter.ts
│   ├── usePrevious.ts
│   ├── useToggle.ts
│   └── index.ts
├── App.tsx
├── App.css
└── main.tsx
```

## 🎯 Key Learning Points

- **Custom Hook Patterns**: Each hook follows React's hook conventions
- **TypeScript Integration**: Proper typing for better developer experience
- **State Management**: Different approaches to managing various types of state
- **Side Effects**: Using useEffect for localStorage, debouncing, and API calls
- **Ref Usage**: Using useRef for tracking previous values
- **Error Handling**: Graceful error handling in localStorage and fetch operations

## 🔧 Technical Implementation

### useLocalStorage
- Uses useState for local state
- Reads from localStorage on initialization
- Syncs changes back to localStorage
- Handles JSON serialization errors

### useDebounce
- Uses useState and useEffect
- setTimeout for delay implementation
- Cleanup function to cancel previous timeouts

### useFetch
- Manages loading, data, and error states
- Uses fetch API with proper error handling
- Supports refetching functionality

### useCounter
- Implements min/max constraints
- Supports custom step values
- Provides multiple ways to update counter

### usePrevious
- Uses useRef to store previous value
- Updates ref after each render
- Returns previous value

### useToggle
- Extends useState with boolean-specific methods
- Provides convenience functions for common operations

Each hook is designed to be reusable, type-safe, and follows React best practices.
