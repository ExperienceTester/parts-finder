import { useEffect, useState, useRef } from "react";
import OfferItem from "./OfferItem";
import { useSelector } from "react-redux";

const STEP = 5;

export default function Offers() {
  const { items, status } = useSelector((state) => state.parts.offers);
  const brand = useSelector((state) => state.parts.brands.selected);

  if (!items?.length || status !== "success") return null;
  return <OffersList brand={brand} items={items} />;
}

function OffersList({ items, brand }) {
  const [limit, setLimit] = useState(STEP);
  const ctRef = useRef(null);

  const visibleItems = (items ?? []).slice(0, limit);

  const handleShowMore = () => {
    setLimit((prev) => prev + STEP);
  };

  useEffect(() => setLimit(STEP), [items]);
  useEffect(() => {
    if (limit >= STEP && ctRef.current) {
      ctRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [limit]);

  return (
    <div className="container my-4 p-0" ref={ctRef}>
      <div className="mb-3">
        <h5 className="fw-bold mb-1 text-dark">Предложения для {brand}</h5>
        <p className="text-muted small mb-4">
          {`Показаны ${limit >= items.length ? items.length : `первые ${limit}`} из ${items?.length} позиций`}
        </p>
      </div>

      <div className="list-group list-group-flush overflow-auto pe-2">
        {visibleItems.map((offer, idx) => (
          <OfferItem key={`${offer.goodsID}-${idx}`} item={offer} />
        ))}
      </div>

      {limit < items.length && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="btn btn-primary py-2 rounded-3 fw-medium"
          >
            Показать ещё {Math.min(STEP, items.length - limit)}
          </button>
        </div>
      )}
    </div>
  );
}
