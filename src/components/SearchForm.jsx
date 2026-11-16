import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { reset, loadBrands, setPartNumber } from "../store/partsSlice";

export default function SearchForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const number = value.trim();
  const inputRef = useRef(null);

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!number) {
      dispatch(reset());
      return;
    }

    dispatch(setPartNumber(number));

    const timerHandle = setTimeout(() => dispatch(loadBrands(number)), 500);
    return () => clearTimeout(timerHandle);
  }, [number, dispatch]);

  return (
    <div className="col">
      <label htmlFor="searchInput" className="form-label fw-medium">
        Артикул
      </label>
      <div className="position-relative">
        <input
          ref={inputRef}
          id="searchInput"
          type="text"
          className="form-control text-truncate pe-4"
          placeholder="Введите артикул детали (например, 7160500039S)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {value && (
          <button
            type="button"
            className="btn-close position-absolute top-50 end-0 translate-middle-y me-2 p-1"
            aria-label="Очистить"
            onClick={handleClear}
            style={{
              width: "0.5em",
              height: "0.5em",
              backgroundSize: "0.5em",
            }}
          />
        )}
      </div>
    </div>
  );
}
