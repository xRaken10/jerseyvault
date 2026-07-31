import type { Product, Liga } from '../types/product';

// Cache to store the dynamically loaded JSON and prevent multiple network requests
let catalogCache: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
  if (catalogCache) return catalogCache;
  const res = await fetch('/catalog.json');
  const data = await res.json();
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


