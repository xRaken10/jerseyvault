import type { Product } from '../types/product';

export function getCategoria(product: Product): 'player' | 'retro' | 'standard' {
  const name = product.nombre.toLowerCase();
  if (name.includes('player') || name.includes('jugador')) return 'player';
  if (name.includes('retro')) return 'retro';
  return 'standard';
}
