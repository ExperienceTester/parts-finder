import { formatPrice } from "../utils/formatPrice";
import { minPrice } from "../utils/minPrice";

export default function OfferItem({ item }) {
  return (
    <div className="list-group-item px-0 py-1 d-flex justify-content-between align-items-center">
      <div>
        <div className="mb-1">
          <span className="fw-semibold text-dark fs-6">
            [{item.number}] {item.name}
          </span>
        </div>
        <div className="text-muted small">
          {item.brand} &bull; {item.count} шт.
        </div>
      </div>

      <div className="fw-bold text-dark fs-6 text-nowrap ms-3">
        {formatPrice(minPrice(item.warehouses))}
      </div>
    </div>
  );
}
