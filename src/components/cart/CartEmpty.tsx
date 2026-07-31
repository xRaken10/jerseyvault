import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';

interface CartEmptyProps {
  onClose: () => void;
}

export function CartEmpty({ onClose }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
      <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 border border-gray-100 dark:border-white/10">
        <ShoppingBag className="w-9 h-9 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tu pedido está vacío</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[220px] mb-8">
        Explora el catálogo y agrega las camisetas que quieras cotizar.
      </p>
      <Link to="/catalogo" onClick={onClose} className="w-full">
        <Button fullWidth>Explorar catálogo</Button>
      </Link>
    </div>
  );
}
