import { useDispatch, useSelector } from "react-redux";
import { selectBrand, loadOffers } from "../store/partsSlice";

export default function Brands() {
  const dispatch = useDispatch();
  const { brands, partNumber } = useSelector((state) => state.parts);

  const setBrand = (value) => {
    dispatch(selectBrand(value));
    dispatch(loadOffers({ number: partNumber, brand: value }));
  };

  return !brands.items?.length ? null : (
    <div className="col-12 col-md-4">
      <label htmlFor="searchBrand" className="form-label fw-medium">
        Бренд
      </label>
      <select
        id="searchBrand"
        className={`form-select ${!brands.selected ? "text-body-secondary" : ""}`}
        onChange={(e) => setBrand(e.target.value)}
        value={brands.selected ?? ""}
      >
        <option value="" disabled hidden>
          Выберите бренд...
        </option>
        {brands.items.map((item) => (
          <option key={item} className="text-body">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
