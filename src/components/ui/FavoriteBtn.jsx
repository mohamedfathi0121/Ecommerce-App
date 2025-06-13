import toast from 'react-hot-toast';
import { useWishlist } from '../../context/WishListContext';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';
import { FaHeart ,  FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ productId }) => {
  const { wishlist, toggleWishlistItem, loading } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(
    wishlist.some(item => item._id === productId)
  );

  useEffect(() => {
  setIsLiked(wishlist.some(item => item._id === productId));
}, [wishlist, productId]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      await toggleWishlistItem(productId);
      setIsLiked(!isLiked); // Toggle the local state
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      type="button"
      className="btn btn-link p-0 border-0"
      style={{ 
        fontSize: '1.5rem',
        color: isLiked ? '#dc3545' : '#6c757d',
        transition: 'color 0.3s ease'
      }}
    >
      {loading ? '...' : (isLiked ? <FaHeart style={{ color: 'black' }} /> :<FaRegHeart style={{ color: 'black' }}/> )}
    </button>
  );
};

export default WishlistButton;