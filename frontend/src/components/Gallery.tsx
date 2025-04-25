import React, { useEffect, useState } from "react";
import { buscarImagens } from "../services";
import "../styles/Gallery.css";

interface Props {
  collection: string;
  bbox?: string;
  datetime?: string;
  onSelect: (selectedIds: string[]) => void;
}

interface ImageItem {
  id: string;
  thumbnailUrl?: string;
  datetime: string;
}

const ITEMS_PER_PAGE = 20;

const Gallery: React.FC<Props> = ({ collection, bbox, datetime, onSelect }) => {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const data = await buscarImagens(collection, bbox, datetime, 100);

        const parsed: ImageItem[] = data.map((item: any) => ({
          id: item.id,
          datetime: item.datetime,
          thumbnailUrl: item.thumbnailUrl,
        }));

        setItems(parsed);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao buscar imagens :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [collection, bbox, datetime]);

  const handleCheckboxChange = (itemId: string) => {
    setSelectedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleEnviar = () => {
    onSelect(selectedIds);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Selecione as imagens com menos nuvens</h2>

      {loading ? (
        <p>Carregando imagens...</p>
      ) : (
        <>
          <div className="gallery-grid">
            {paginatedItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-card ${selectedIds.includes(item.id) ? "selected" : ""
                  }`}
                onClick={() => handleCheckboxChange(item.id)} // ⬅️ clique no card todo
              >
                <img
                  src={item.thumbnailUrl || "/placeholder.png"}
                  alt={item.id}
                  className="gallery-thumbnail"
                />
                <div className="gallery-caption">
                  {index + 1}. {item.id}
                </div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  readOnly // ⬅️ impedimos conflito com clique duplo
                  className="gallery-checkbox"
                  title="Selecionar imagem"
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="gallery-pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={i + 1 === currentPage ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <div className="gallery-submit">
            <button onClick={handleEnviar} disabled={selectedIds.length === 0}>
              Enviar Selecionadas ({selectedIds.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
