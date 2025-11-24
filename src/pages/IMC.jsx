import { useState } from 'react';
import fotoIMC from '../assets/images/fotoIMC.png';

export default function IMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = (e) => {
    e.preventDefault();
    //variavéis para o calculo do IMC
    const p = parseFloat(peso);
    const a = parseFloat(altura);

   //Valida se os valores são nulos ou 0
    if (isNaN(p) || isNaN(a) || a <= 0 || p <= 0) {
      alert('Insira valores válidos.');
      return;
    }

    //Calculo do IMC
    const imc = p / (a * a);

    //Classifica o IMC pelo resultado do cálculo 
    let classificacao = '';
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso normal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';
    
    setResultado({ imc: imc.toFixed(1), classificacao });
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
            height: '300px',
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />
      </div>
      <h1 className="mb-4">Calculadora de IMC</h1>
      <p className="text-secondary mb-4">
        O Índice de Massa Corporal (IMC) é uma medida simples para avaliar se seu peso está saudável.
      </p>

      <div className="card p-4">
        <form onSubmit={calcularIMC}>
          <div className="mb-3">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              className="form-control"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              step="0.1"
              min="10" //Define que o minimo de peso aceitavel é 10kg
              required //Diz que é necessário colocar um valor
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Altura (m)</label>
            <input
              type="number"
              className="form-control"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              step="0.01"
              min="0.5" //Define que o minimo de altura aceitavel é 0,5m
              max="2.5" //Define que o máximo de altura aceitavel é 2.5m
              required //Diz que é necessário colocar um valor
            />
          </div>
          <button type="submit" className="btn btn-primary">Calcular IMC</button>
        </form>

        {resultado && (
          <div className="mt-4 p-3 bg-light rounded">
            <h3>Seu IMC é: <strong>{resultado.imc}</strong></h3>
            <p className="mb-0">Classificação: <strong>{resultado.classificacao}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}