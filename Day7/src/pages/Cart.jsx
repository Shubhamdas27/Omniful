import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import Notification from '../components/Notification';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);
  const [notification, setNotification] = useState(null);

  const handleBuyNow = () => {
    if (items.length > 0) {
      setNotification({
        message: 'Order placed successfully! 🎉',
        type: 'success'
      });
      setTimeout(() => {
        dispatch(clearCart());
      }, 2000);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setNotification({
      message: 'Cart cleared successfully',
      type: 'success'
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <a href="/" className="continue-shopping">Continue Shopping</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-actions">
                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                <button 
                  className="clear-cart-btn"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Cart;
