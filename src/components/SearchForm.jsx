import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { reset, loadBrands, setPartNumber } from "../store/partsSlice";

const DEBOUNCE_TIMEOUT = 500;

export default function SearchForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const number = value.trim();

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const clearDebounceTimer = () => {
    if (!timerRef.current) return;

    clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  const processSearch = () => {
    if (!number) return;
    clearDebounceTimer();
    dispatch(setPartNumber(number));
    dispatch(loadBrands(number));
  }



  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    processSearch();
  }

  useEffect(() => {
    if (!number) {
      dispatch(reset());
      clearDebounceTimer();
      return;
    }

    dispatch(setPartNumber(number));

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      dispatch(loadBrands(number));
    }, DEBOUNCE_TIMEOUT);

    return () => clearDebounceTimer();
  }, [number, dispatch]);

  return (
    <form className="col" onSubmit={handleSubmit}>
      <label htmlFor="searchInput" className="form-label fw-medium">
        Артикул
      </label>
      <div className="position-relative">
        <input
          ref={inputRef}
          id="searchInput"
          type="search"
          className="form-control text-truncate pe-4"
          placeholder="Введите артикул детали (например, 7160500039S)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {value && (
          <button
            type="reset"
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
    </form>
  );
}
