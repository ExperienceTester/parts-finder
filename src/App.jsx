import Brands from "./components/Brands";
import Offers from "./components/Offers";
import SearchForm from "./components/SearchForm";
import StateLine from "./components/StateLine";

export default function App() {
  return (
    <div className="container py-2">
      <header className="mb-2 text-center">
        <h1 className="display-5 fw-bold text-dark">Подбор автозапчастей</h1>
        <p className="lead text-muted">
          Двухэтапный поиск номенклатуры и аналогов
        </p>
      </header>

      <main>
        <div className="row g-2">
          <SearchForm />
          <Brands />
        </div>
        <StateLine />
        <Offers />
      </main>
    </div>
  );
}
