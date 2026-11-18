import { useDispatch, useSelector } from "react-redux";
import {
  loadBrands,
  loadOffers,
  selectHasError,
  selectIsEmpty,
  selectIsLoading,
} from "../store/partsSlice";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Empty from "./Empty";

export default function StateLine() {
  const dispatch = useDispatch();
  const { brands, offers, partNumber } = useSelector((state) => state.parts);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectHasError);
  const isEmptyResult = useSelector(selectIsEmpty);

  const handleRetry = () => {
    offers.error
      ? dispatch(loadOffers({ number: partNumber, brand: brands.selected }))
      : dispatch(loadBrands(partNumber));

  }

  return (
    <div className="p-2">
      {isLoading ? (
        <Loader>Выполняется поиск...</Loader>
      ) : error ? (
        <ErrorMessage>
          {error.message}
          {error.retryable && (<div className="mt-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleRetry}
            >
              Повторить запрос
            </button>
          </div>)}
        </ErrorMessage>
      ) : (
        isEmptyResult && <Empty>К сожалению, ничего не нашлось</Empty>
      )}
    </div>
  );
}
