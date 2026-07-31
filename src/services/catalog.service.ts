import type { Product, Liga } from '../types/product';
import type { CatalogFilters } from '../types/catalog';

// Cache to store the dynamically loaded JSON and prevent multiple network requests
let catalogCache: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
  if (catalogCache) return catalogCache;
  const { default: data } = await import('../data/catalog.json');
  catalogCache = data.products as Product[];
  return catalogCache;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}

export async function getProductsByLiga(liga: Liga): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.liga === liga);
}

export async function getLigas(): Promise<Liga[]> {
  const products = await getProducts();
  const ligas = new Set(products.map(p => p.liga));
  return Array.from(ligas);
}

export async function getEquiposByLiga(liga: Liga): Promise<string[]> {
  const products = await getProducts();
  const equipos = new Set(
    products.filter(p => p.liga === liga).map(p => p.equipo)
  );
  return Array.from(equipos).sort();
}

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  return products.filter(p => {
    if (filters.liga && p.liga !== filters.liga) return false;
    if (filters.equipo && p.equipo !== filters.equipo) return false;
    if (filters.tipo && p.tipo !== filters.tipo) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.equipo.toLowerCase().includes(q) ||
        p.liga.toLowerCase().includes(q) ||
        p.tipo.toLowerCase().includes(q)
      );
    }
    return true;
  });
}
