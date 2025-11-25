// Página que calcula as calorias totais
import { useState, useEffect } from "react";
//Importa todos os alimentos armazenados no arquivo JSON
import alimentosData from "../data/alimentos.json";
import fotoCalorias from "../assets/images/fotoCalorias.jpg";

export default function Calorias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlimentos, setSelectedAlimentos] = useState([]);
  const [filteredAlimentos, setFilteredAlimentos] = useState(alimentosData);
  const [invalidInputs, setInvalidInputs] = useState({});

  // Filtra alimentos conforme digita
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAlimentos(alimentosData);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredAlimentos(
        alimentosData.filter((alimento) =>
          alimento.nome.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm]);

  // Adicionar alimento à refeição
  const addToMeal = (alimento) => {
    const exists = selectedAlimentos.find((item) => item.id === alimento.id);
    if (exists) {
      // Incrementa 100g se já existe
      setSelectedAlimentos(
        selectedAlimentos.map((item) =>
          item.id === alimento.id
            ? { ...item, gramas: item.gramas + 100 }
            : item
        )
      );
    } else {
      // Adiciona novo com 100g padrão
      setSelectedAlimentos([
        ...selectedAlimentos,
        { ...alimento, gramas: 100 },
      ]);
    }
    setSearchTerm(""); // Limpa busca após adicionar
  };

  // Atualizar quantidade
  const updateQuantity = (id, newGrams) => {
    // Se for vazio, define como null
    if (newGrams === "") {
      setSelectedAlimentos(
        selectedAlimentos.map((item) =>
          item.id === id ? { ...item, gramas: null } : item
        )
      );
      return;
    }

    const grams = parseInt(newGrams);
    // Se for inválido, mantém o valor anterior ou define null
    if (isNaN(grams) || grams < 1) {
      setSelectedAlimentos(
        selectedAlimentos.map((item) =>
          item.id === id ? { ...item, gramas: null } : item
        )
      );
      return;
    }

    // Atualiza com valor válido
    setSelectedAlimentos(
      selectedAlimentos.map((item) =>
        item.id === id ? { ...item, gramas: grams } : item
      )
    );
  };

  // Remover alimento
  const removeItem = (id) => {
    setSelectedAlimentos(selectedAlimentos.filter((item) => item.id !== id));
  };

  // Calcular total
  const totalCalorias = selectedAlimentos.reduce((total, item) => {
    return total + (item.caloriasPor100g * item.gramas) / 100;
  }, 0);

  return (
    <div className="container py-2">
      <div className="mb-4">
        <img
          src={fotoCalorias}
          alt="Frutas saudáveis"
          className="w-100 rounded"
          style={{
            height: "300px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
      <h1 className="mb-4">Calculadora de Calorias</h1>

      <p className="text-secondary mb-4">
        Pesquise alimentos e monte sua refeição. Todos os dados são locais — sem
        necessidade de internet.
      </p>

      {/* Campo de busca */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: arroz, frango, banana..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de alimentos filtrados */}
      {searchTerm && (
        <div className="mb-4">
          <h5>Resultados para "{searchTerm}"</h5>
          {filteredAlimentos.length === 0 ? (
            <p className="text-muted">Nenhum alimento encontrado.</p>
          ) : (
            <div className="row g-2">
              {filteredAlimentos.map((alimento) => (
                <div key={alimento.id} className="col-12">
                  <div
                    className="p-3 border rounded d-flex justify-content-between align-items-center bg-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => addToMeal(alimento)}
                  >
                    <div>
                      <strong>{alimento.nome}</strong>
                      <br />
                      <small className="text-muted">
                        {alimento.caloriasPor100g} kcal / 100g
                      </small>
                    </div>
                    <button className="btn btn-sm btn-outline-primary">
                      + Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seção: Minha Refeição */}
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">
            Minha Refeição ({selectedAlimentos.length}{" "}
            {selectedAlimentos.length === 1 ? "item" : "itens"})
          </h3>
          {selectedAlimentos.length > 0 && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setSelectedAlimentos([])}
            >
              Limpar tudo
            </button>
          )}
        </div>

        {selectedAlimentos.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-muted mb-3">
              <i className="bi bi-egg fs-1 opacity-50"></i>
            </div>
            <p className="text-muted">
              Pesquise e adicione alimentos acima para começar.
            </p>
          </div>
        ) : (
          <>
            <ul className="list-group mb-4">
              {selectedAlimentos.map((item) => {
                const calorias = (item.caloriasPor100g * item.gramas) / 100;
                return (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.nome}</strong>
                      <div className="text-muted small">
                        {item.gramas}g → {calorias.toFixed(0)} kcal
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="number"
                        className={`form-control ${
                          invalidInputs[item.id] ? "border-danger" : ""
                        }`}
                        value={item.gramas}
                        onChange={(e) =>
                          updateQuantity(item.id, e.target.value)
                        }
                        style={{ width: "80px" }}
                      />
                      <span className="text-muted">g</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="alert alert-success text-center">
              <h4 className="mb-0">
                Total: <strong>{totalCalorias.toFixed(0)} kcal</strong>
              </h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
