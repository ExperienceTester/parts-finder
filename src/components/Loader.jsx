export default function Loader({ children }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
      <div
        className="spinner-border spinner-border-sm text-primary"
        style={{ "--bs-spinner-border-width": "1.5px" }}
        role="status"
      >
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <span>
        <em>{children}</em>
      </span>
    </div>
  );
}
