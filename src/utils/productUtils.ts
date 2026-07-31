import type { Product } from "../types/product";

/**
 * Single Source of Truth for resolving the primary/cover image of a piece.
 * The application must ALWAYS use this function to get the main image.
 * Never write duplicate fallback logic like `piece.thumbnail || piece.imagenes[0]`.
 */
export function getPrimaryImage(piece: Product | null | undefined): string | undefined {
  if (!piece) return undefined;
  return piece.thumbnail || piece.imagenes[0];
}
