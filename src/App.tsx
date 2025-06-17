import { useState } from "react";
import piecesData from "./data/pieces.json";

type Piece = {
  id: number;
  name: string;
  category: string;
  brand: string;
  carBrands: string[];
  price: number;
  stock: boolean;
  image: string;
  description: string;
};

export default function App() {
  const [pieces] = useState<Piece[]>(piecesData);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [stockFilter, setStockFilter] = useState<null | boolean>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  const filteredPieces = pieces.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true) &&
      (brandFilter ? p.brand === brandFilter : true) &&
      (stockFilter !== null ? p.stock === stockFilter : true)
    );
  });

  const categories = Array.from(new Set(pieces.map((p) => p.category)));
  const brands = Array.from(new Set(pieces.map((p) => p.brand)));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-8xl text-[#00ab6b] uppercase font-bold">PharmAuto</h1>
      <h3 className="text-xl uppercase mb-6 font-light">mini catalogue de pièces automobiles</h3>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher une pièce..."
        className="border border-[#1E1A17] rounded px-3 py-2 w-full mb-4 hover:shadow-lg hover:shadow-[#00ab6b] transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtres */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-[#1E1A17] rounded px-3 py-2 hover:shadow-lg hover:shadow-[#00ab6b] transition"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border border-[#1E1A17] rounded px-3 py-2 hover:shadow-lg hover:shadow-[#00ab6b] transition"
        >
          <option value="">Toutes marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={stockFilter === null ? "" : stockFilter ? "true" : "false"}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") setStockFilter(null);
            else setStockFilter(val === "true");
          }}
          className="border border-[#1E1A17] rounded px-3 py-2 hover:shadow-lg hover:shadow-[#00ab6b] transition"
        >
          <option value="">Tous stocks</option>
          <option value="true">En stock</option>
          <option value="false">Rupture</option>
        </select>
      </div>

      {/* Liste pièces */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPieces.map((piece) => (
          <div
            key={piece.id}
            className="border border-[#1E1A17] rounded shadow p-4 cursor-pointer hover:shadow-lg hover:shadow-[#00ab6b] transition"
            onClick={() => setSelectedPiece(piece)}
          >
            <div className="w-full h-auto mb-2">
              <img
                src={piece.image}
                alt={piece.name}
                className="w-full h-full rounded hover:transform hover:scale-105 transition"
              />
            </div>
            <h2 className="font-semibold text-lg">{piece.name}</h2>
            <p className="text-sm text-gray-600">{piece.brand}</p>
            <p className="text-sm font-bold mt-1">{piece.price} €</p>
            <p
              className={`mt-1 font-semibold ${piece.stock ? "text-green-600" : "text-red-600"
                }`}
            >
              {piece.stock ? "En stock" : "Rupture"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal détails */}
      {selectedPiece && (
        <div
          className="fixed inset-0 bg-[rgba(30,26,23,0.5)] flex items-center justify-center p-4"
          onClick={() => setSelectedPiece(null)}
        >
          <div
            className="bg-white rounded-sm p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-[#00ab6b] hover:text-[#1E1A17]"
              onClick={() => setSelectedPiece(null)}
            >
              <strong>X</strong>
            </button>
            <img
              src={selectedPiece.image}
              alt={selectedPiece.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedPiece.name}</h2>
            <p className="mb-2 text-[#00ab6b]">{selectedPiece.description}</p>
            <p className="font-semibold">
              Marque : <span className="font-normal">{selectedPiece.brand}</span>
            </p>
            <p className="font-semibold">
              Catégorie : <span className="font-normal">{selectedPiece.category}</span>
            </p>
            <p className="font-semibold">
              Prix : <span className="font-normal">{selectedPiece.price} €</span>
            </p>
            <p
              className={`font-semibold ${selectedPiece.stock ? "text-green-600" : "text-red-600"
                }`}
            >
              {selectedPiece.stock ? "En stock" : "Rupture de stock"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
