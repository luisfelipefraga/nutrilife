import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="NutriLife"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
      </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link strong" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forum">Fórum</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/imc">IMC</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calorias">Calorias</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}