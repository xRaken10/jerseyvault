import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { getProducts, getLigas } from "../../services/catalog.service";
import type { Product, Liga } from "../../types/product";
import PieceCard from "./PieceCard";
import PieceModal from "./PieceModal";
import { SelectMenu } from "../ui/SelectMenu";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 40;

export default function ArchiveGrid() {
  const [allPieces, setAllPieces] = useState<Product[]>([]);
  const [ligas, setLigas] = useState<Liga[]>([]);
  
  // Filters
  const [activeLiga, setActiveLiga] = useState<Liga | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  
  // Modal State
  const [selectedPiece, setSelectedPiece] = useState<Product | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setAllPieces(data);
      const l = await getLigas();
      setLigas(l);
    }
    load();
  }, []);

  // Filter pieces natively (memoized and debounced)
  const filteredPieces = useMemo(() => {
    return allPieces.filter((p) => {
      if (activeLiga !== "Todas" && p.liga !== activeLiga) return false;
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.equipo.toLowerCase().includes(q) ||
          p.liga.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allPieces, activeLiga, debouncedQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeLiga, debouncedQuery]);

  const totalPages = Math.ceil(filteredPieces.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePieces = filteredPieces.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="archive" className="w-full py-24 px-6 max-w-[1400px] mx-auto min-h-screen flex flex-col">
      
      {/* Exploration Tools Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Archivo Digital
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Explorando {filteredPieces.length} piezas documentadas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Buscar por equipo, liga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Custom Premium Liga Filter */}
          <div className="w-full sm:w-48 relative z-[60]">
            <SelectMenu 
              value={activeLiga === "Todas" ? "Todas las Ligas" : activeLiga}
              options={["Todas las Ligas", ...ligas]}
              onChange={(val) => setActiveLiga(val === "Todas las Ligas" ? "Todas" : val as Liga)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredPieces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {visiblePieces.map((piece, i) => (
            <PieceCard 
              key={piece.id} 
              piece={piece} 
              index={i} 
              onClick={setSelectedPiece} 
            />
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-lg">No se encontraron piezas en el archivo.</p>
        </div>
      )}

      {/* Classic Pagination Component */}
      {totalPages > 1 && (
        <div className="mt-24 pt-8 border-t border-gray-100 dark:border-white/10 flex items-center justify-between pb-12">
          <button 
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{currentPage}</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-400">{totalPages}</span>
          </div>

          <button 
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Piece Modal Portal */}
      <PieceModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </section>
  );
}
