import { useEffect, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const CartModal = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartCount
  } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  useEffect(() => {
    const cartItems = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    }).filter(Boolean);

    setCartProducts(cartItems);
    
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    setSubtotal(total);
  }, [cart]);

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] mx-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {cartCount > 0 ? 'Your Cart' : 'Cart is Empty'}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {cartCount === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Your cart is empty.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartProducts.map(item => (
                <div 
                  key={item.id}
                  className="flex items-center gap-4 p-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <img 
                    src={item.imageSrc} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md max-h-[80px]"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md"
                    >
                      -
                    </button>
                    <span className="w-10 text-center dark:text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 dark:text-white"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartCount > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Subtotal:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-300"
              onClick={() => alert('Checkout functionality would go here')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;