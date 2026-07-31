import { useWishlistContext } from '../context/WishlistContext';

export function useWishlist() {
  const context = useWishlistContext();

  const totalWishlist = context.ids.length;

  return {
    ...context,
    totalWishlist,
  };
}
