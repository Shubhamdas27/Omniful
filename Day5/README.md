# React Components Dashboard

A comprehensive React TypeScript project showcasing advanced React patterns and reusable components built with Vite.

## 🚀 Components Included

### 1. Modal Components
#### Center Modal
- **Features**: Portal rendering, focus management, keyboard navigation
- **Accessibility**: Focus trapping, escape key support, ARIA attributes
- **Usage**: Traditional center modal with overlay

#### Slide Modal (Side Panel)
- **Features**: Slides in from left, full-height panel design
- **Accessibility**: Same focus management as center modal
- **Usage**: Perfect for navigation menus, settings panels, detailed views

### 2. InfiniteScroll Component
- **Features**: Intersection Observer API, lazy loading, performance optimization
- **Usage**: Efficient rendering of large datasets with automatic loading

### 3. Accordion Component
- **Features**: Collapsible sections, keyboard navigation, single/multiple open modes
- **Accessibility**: ARIA attributes, keyboard support
- **Usage**: Organized content display with smooth animations

### 4. AutoComplete Component
- **Features**: Real-time search, keyboard navigation, customizable suggestions
- **Accessibility**: Screen reader support, ARIA attributes
- **Usage**: Enhanced search experience with suggestions

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for component styling
- **Custom Hooks** for reusable logic
- **Intersection Observer API** for infinite scroll
- **React Portals** for modal rendering

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Running the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

## 🏗️ Building for Production

```bash
npm run build
```

## 🧪 Project Structure

```
src/
├── components/
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   └── Modal.css
│   ├── SlideModal/
│   │   ├── SlideModal.tsx
│   │   └── SlideModal.css
│   ├── InfiniteScroll/
│   │   ├── InfiniteScroll.tsx
│   │   └── InfiniteScroll.css
│   ├── Accordion/
│   │   ├── Accordion.tsx
│   │   └── Accordion.css
│   └── AutoComplete/
│       ├── AutoComplete.tsx
│       └── AutoComplete.css
├── hooks/
│   ├── useModal.ts
│   ├── useSlideModal.ts
│   └── useInfiniteScroll.ts
├── App.tsx
├── App.css
└── main.tsx
```

## ✨ Features Demonstrated

- **React Hooks**: useState, useEffect, useRef, useCallback
- **Custom Hooks**: Reusable logic extraction
- **TypeScript**: Type safety and better development experience
- **Accessibility**: ARIA attributes, keyboard navigation, focus management
- **Performance**: Intersection Observer, lazy loading, efficient re-renders
- **Modern React Patterns**: Portal rendering, compound components

## 🎯 Learning Outcomes

This project demonstrates:
- Advanced React patterns and best practices
- TypeScript integration with React
- Component composition and reusability
- Performance optimization techniques
- Accessibility implementation
- Modern CSS techniques and animations
