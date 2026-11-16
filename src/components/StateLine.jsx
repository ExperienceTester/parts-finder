import { useSelector } from "react-redux";
import {
  selectHasError,
  selectIsEmpty,
  selectIsLoading,
} from "../store/partsSlice";
import Loader from "./Loader";
import Error from "./Error";
import Empty from "./Empty";

export default function StateLine() {
  const isLoading = useSelector(selectIsLoading);
  const errorText = useSelector(selectHasError);
  const isEmptyResult = useSelector(selectIsEmpty);

  return (
    <div className="status mx-auto p-2">
      {isLoading ? (
        <Loader>Выполняется поиск...</Loader>
      ) : errorText ? (
        <Error>{errorText}</Error>
      ) : (
        isEmptyResult && <Empty>К сожалению ничего не нашлось</Empty>
      )}
    </div>
  );
}
