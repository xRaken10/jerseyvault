export type Liga =
  | 'Premier League'
  | 'La Liga'
  | 'Serie A'
  | 'Bundesliga'
  | 'Ligue 1'
  | 'Liga MX';

export type TipoManga = 'Manga corta' | 'Manga larga';

export interface Product {
  id: number;
  slug: string;
  liga: Liga;
  equipo: string;
  tipo: TipoManga;
  nombre: string;
  thumbnail: string;
  url: string;
  imagenes: string[];
}
