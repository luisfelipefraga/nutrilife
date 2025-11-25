import { useState } from "react";
import fotoIMC from "../assets/images/fotoIMC.png";
import fotoTabela from "../assets/images/tabela-imc.png";

export default function IMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const calcularIMC = (e) => {
    e.preventDefault();
    setErro("");
    //Variaveis para cálculo do IMC
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    //Valida se está nulo ou zerado
    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      setErro("Insira valores válidos.");
      setResultado(null);
      return;
    }

    //Valida se é uma altura menor que 0.5m
    if (a < 0.5) {
      setErro("Insira um valor maior que 0.5");
      setResultado(null);
      return;
    }
    //Valida se é uma altura maior que 2.5m
    if (a >= 2.5) {
      setErro("Insira um valor menor que 2.5");
      setResultado(null);
      return;
    }

    //Calculo do IMC
    const imc = p / (a * a);

    //Classifica o grau do IMC
    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    //Define o resultado na variavel
    setResultado({ imc: imc.toFixed(1), classificacao });
    setErro("");
  };

  return (
    <div className="container py-2">
      <div className="mb-4">
        {/*Imagem do início da página*/}
        <img
          src={fotoIMC}
          alt="Frutas saudáveis"
          className="w-100 rounded"
          style={{
            height: "300px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
      <h1 className="mb-4">Calculadora de IMC</h1>
      <p className="text-secondary mb-4">
        O Índice de Massa Corporal (IMC) é uma medida simples para avaliar se
        seu peso está saudável.
      </p>

      {/* Card do cálculo */}
      <div className="card p-4 h-100 d-flex flex-column">
        <form onSubmit={calcularIMC}>
          <div className="mb-3">
            <label htmlFor="peso" className="form-label">
              Peso (kg)
            </label>
            <input
              id="peso"
              type="number"
              step="0.1"
              className="form-control"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 70"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="altura" className="form-label">
              Altura (m)
            </label>
            <input
              id="altura"
              type="number"
              step="0.01"
              className="form-control"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ex: 1.75"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Calcular
          </button>
        </form>

        {erro && <div className="alert alert-danger mt-3">{erro}</div>}

        {resultado && (
          <div className="mt-4 p-3 bg-light rounded mt-auto">
            <h3>
              Seu IMC é: <strong>{resultado.imc}</strong>
            </h3>
            <p className="mb-0">
              Classificação: <strong>{resultado.classificacao}</strong>
            </p>
          </div>
        )}
      </div>
      <br />
      {/* Card da imagem */}
      <div className="card p-4 h-100 d-flex flex-column">
        <h3 className="mb-3 text-center">Referência do IMC</h3>
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <img
            src={fotoTabela}
            alt="Gráfico com faixas de IMC"
            className="img-fluid"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <small className="text-muted text-center mt-2">
          Fonte: Organização Mundial da Saúde (OMS)
        </small>
        <h1 className="text-center mt-5 mb-4">Entenda oque é IMC</h1>
        <p className="text-center text-secondary mb-5 px-3">
          IMC significa Índice de Massa Corporal, uma fórmula simples que
          compara o peso e a altura de uma pessoa para classificar se o peso
          está dentro da faixa considerada ideal, abaixo ou acima do peso. Para
          calculá-lo, basta dividir o peso (em kg) pela altura (em metros)
          elevada ao quadrado.
        </p>
      </div>
    </div>
  );
}
