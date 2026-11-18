export default function ErrorMessage({ children }) {
  return (
    <div className="text-center justify-content-center gap-2 text-danger">
      {children}
    </div>
  );
}
