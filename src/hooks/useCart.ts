import { useCartContext } from '../context/CartContext';
import { requestQuote as whatsappRequestQuote } from '../services/whatsapp';

export function useCart() {
  const context = useCartContext();
  const totalItems = context.items.reduce((sum, item) => sum + item.quantity, 0);

  const requestQuote = () => {
    if (context.items.length === 0) return;
    whatsappRequestQuote(context.items);
    context.closeCart();
  };

  return {
    ...context,
    totalItems,
    requestQuote,
  };
}
