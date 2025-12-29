import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { openProductModal } = useCart();

  return (
    <div 
      // Added: hover:scale-105 for scaling up on hover
      // Modified: transition-shadow to transition-all to smoothly animate both shadow and scale
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => openProductModal(product)}
    >
      {/* Keep image container to prevent scaling content from overflowing the card bounds immediately */}
      <div className="h-48 overflow-hidden rounded-t-lg"> {/* Added rounded-t-lg to match parent */}
        <img 
          src={product.imageSrc} 
          alt={product.name}
          // The image itself doesn't need hover effects here if the whole card scales
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-green-600 dark:text-green-400 font-bold">
          ${product.price.toFixed(2)}
          {product.unit && <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{product.unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;