# Redux Toolkit Assignment - ToDo & Team Management

A React TypeScript application demonstrating Redux Toolkit implementation with multiple slices for state management.

## 🚀 Features

### ToDo List
- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Display todo statistics (total, completed, pending)

### Team Management
- 👥 Add team members with name, intern type, and work assignment
- 📝 Edit team member information
- 🔄 Update work assignments
- 🗑️ Remove team members
- 📊 Display team statistics

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── TodoList.tsx     # Todo list component
│   ├── TodoList.css     # Todo list styles
│   ├── TeamManagement.tsx # Team management component
│   └── TeamManagement.css # Team management styles
├── store/               # Redux store configuration
│   ├── store.ts         # Main store configuration
│   ├── hooks.ts         # Typed Redux hooks
│   └── slices/          # Redux slices
│       ├── todoSlice.ts # Todo state management
│       └── teamSlice.ts # Team state management
├── App.tsx              # Main App component
├── App.css              # Global styles
└── main.tsx             # App entry point
```

## 🎯 Redux Store Architecture

### Todo Slice
- **State**: Array of todo items
- **Actions**: 
  - `addTodo` - Add new todo
  - `toggleTodo` - Toggle completion status
  - `deleteTodo` - Remove todo
  - `editTodo` - Update todo text

### Team Slice
- **State**: Array of team members
- **Actions**:
  - `addTeamMember` - Add new team member
  - `updateTeamMember` - Update member information
  - `deleteTeamMember` - Remove team member
  - `updateWorkAssignment` - Update work assignment

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Day6
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 UI Features

- **Responsive Design** - Works on desktop and mobile devices
- **Modern Styling** - Clean and intuitive interface
- **Interactive Elements** - Hover effects and smooth transitions
- **Accessibility** - ARIA labels and keyboard navigation support

## 🔧 Key Learning Points

1. **Redux Toolkit Setup** - Configured store with multiple slices
2. **TypeScript Integration** - Proper typing for actions and state
3. **React-Redux Hooks** - Using `useSelector` and `useDispatch`
4. **Immutable Updates** - Using Immer through Redux Toolkit
5. **Component Architecture** - Separation of concerns and reusability

## 📋 Assignment Requirements Met

✅ Implemented Redux Toolkit store  
✅ Created multiple slices (Todo and Team)  
✅ Functional reducers with proper actions  
✅ ToDo list with CRUD operations  
✅ Team Management with intern data (name, type, work assigned)  
✅ TypeScript support throughout  
✅ Modern React patterns with hooks  

## 🤝 Contributing

This is an educational project for Redux Toolkit learning. Feel free to experiment and extend the functionality!

## 📄 License

This project is created for educational purposes.
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
