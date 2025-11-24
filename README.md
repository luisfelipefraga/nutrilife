# 🥗 NutriLife — Fórum de Nutrição e Bem-Estar

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6CAEDF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Um projeto web interativo para compartilhar conhecimentos sobre alimentação saudável, calcular IMC, contar calorias e trocar receitas — tudo em um só lugar!

---

## ✨ Funcionalidades

- ✅ **Fórum interativo**: Criar, visualizar, editar e excluir posts  
- 💬 **Comentários em tempo real** (salvos localmente no `localStorage`)  
- 🥗 **Receitas da comunidade**  (a ser implementado!)
- 📏 **Calculadora de IMC** com classificação automática  
- 🔥 **Calculadora de calorias** com:  
  - Busca por nome de alimentos registrados no JSON 
  - Ajuste de gramagem (base 100g)  
  - Cálculo automático do total  
- 🌐 Interface responsiva (funciona em celular, tablet e desktop)

---

## ▶️ Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão **20.19.0 ou superior**

### Passo a passo
```bash
# 1. Clone ou baixe o projeto
git clone https://github.com/luisfelipefraga/nutrilife.git
cd nutrilife

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Abra o link no navegador
http://localhost:5173