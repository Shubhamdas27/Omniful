# E-Commerce React Frontend

A simple e-commerce frontend built with React, Redux Toolkit, and React Router DOM.

## Features

- **Product Listing**: Browse products with name, image, price, and category
- **Shopping Cart**: Add items to cart with quantity management
- **Cart Management**: View cart items, update quantities, and remove items
- **Responsive Design**: Mobile-friendly interface
- **State Management**: Redux Toolkit for cart state
- **Routing**: React Router DOM for navigation

## Tech Stack

- **React**: Frontend framework with functional components and hooks
- **Redux Toolkit**: State management for cart functionality
- **React Router DOM**: Client-side routing
- **Vite**: Build tool and development server
- **CSS**: Custom styling with responsive design

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with cart count
│   ├── ProductCard.jsx     # Individual product display
│   └── CartItem.jsx        # Cart item with quantity controls
├── pages/
│   ├── Home.jsx            # Product listing page
│   └── Cart.jsx            # Shopping cart page
├── redux/
│   ├── store.js            # Redux store configuration
│   └── cartSlice.js        # Cart state management
├── data/
│   └── products.js         # Dummy product data
└── App.jsx                 # Main app with routing
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Overview

### Home Page (/)
- Display grid of products
- Each product shows image, name, price, and category
- "Add to Cart" button for each product
- Responsive grid layout

### Cart Page (/cart)
- Show all items in cart
- Quantity controls (increase/decrease)
- Remove items from cart
- Total price calculation
- "Buy Now" button (clears cart)
- "Clear Cart" button

### Redux State Management
- `addToCart`: Add new items or increase quantity
- `removeFromCart`: Remove items completely
- `updateQuantity`: Update item quantity
- `clearCart`: Empty the entire cart

## Product Categories

The app includes dummy data for various product categories:
- Clothing (T-shirts, Jeans)
- Footwear (Sneakers)
- Groceries (Bananas, Bread, Milk)
- Electronics (Headphones, Phone Case)

## Responsive Design

The application is responsive and works well on:
- Desktop screens
- Tablets
- Mobile devices

## Future Enhancements

- User authentication
- Product search and filtering
- Product categories page
- Checkout process
- Order history
- Product reviews
