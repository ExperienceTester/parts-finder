import { useEffect, useState } from "react";
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
  const [ limit, setLimit ] = useState(STEP);
  const [ isScrollTopVisible, setScrollTopVisible ] = useState(false);

  const visibleItems = (items ?? []).slice(0, limit);

  const handleShowMore = () => {
    setLimit((prev) => prev + STEP);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    const toggleVisibility = () => {
      setScrollTopVisible(window.scrollY > 200);
    };

    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-3">
        <h5 className="fw-bold mb-1 text-dark">Предложения для {brand}</h5>
        <p className="text-muted small mb-4">
          {`Показаны ${limit >= items.length ? items.length : `первые ${limit}`} из ${items?.length} позиций`}
        </p>
      </div>

      <div className="list-group list-group-flush pe-2">
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

      {isScrollTopVisible && <button
        type="button"
        onClick={handleScrollTop}
        className="btn btn-primary rounded-circle position-fixed end-0 me-4 d-flex align-items-center justify-content-center fw-medium"
        style={{ width: '42px', height: '42px', zIndex: 1050, bottom: '32px' }}
        aria-label="Наверх"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>}
    </div>
  );
}
