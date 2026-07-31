import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import { CartProvider } from '../../context/CartContext';
import { WishlistProvider } from '../../context/WishlistContext';

export default function MainLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CartDrawer />
      </WishlistProvider>
    </CartProvider>
  );
}
