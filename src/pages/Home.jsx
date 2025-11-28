import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fotoHome from "../assets/images/fotoHome.jpg";
import fotoForum from "../assets/images/fotoForum.jpg";
import fotoIMC from "../assets/images/fotoIMC.png";
import fotoCalorias from "../assets/images/fotoCalorias.jpg";

export default function Home() {
  const [posts, setPosts] = useState([]);

  //Puxa os posts do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("forumPosts");
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  // Pega os 3 posts mais recentes
  // Pega os 3 posts mais recentes
const recentPosts = Array.isArray(posts) ? posts.slice(0, 3) : [];

// Se tiver menos de 3 posts, preenche com placeholders
const displayPosts = recentPosts.length > 0
  ? recentPosts
  : [
      { id: 999, title: "Como substituir açúcar?", author: "Ana L.", date: "Ontem", replies: 3 },
      { id: 998, title: "Suplementos são necessários?", author: "Carlos M.", date: "Hoje", replies: 5 },
      { id: 997, title: "Melhor horário para água?", author: "Juliana R.", date: "Há 2 dias", replies: 8 },
    ];

// Garanta que displayPosts tenha 3 elementos
if (displayPosts.length < 3) {
  const placeholders = [
    { id: 996, title: "Qual a melhor fruta para o café da manhã?", author: "Autor desconhecido", date: "Há 3 dias", replies: 2 },
    { id: 995, title: "Como fazer uma refeição balanceada?", author: "Autor desconhecido", date: "Há 4 dias", replies: 1 },
    { id: 994, title: "Dicas para comer saudável no trabalho", author: "Autor desconhecido", date: "Há 5 dias", replies: 0 },
  ];
  while (displayPosts.length < 3) {
    displayPosts.push(placeholders[displayPosts.length]);
  }
}

        // Função para converter timestamp em string legível
    const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
    };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Bem-vindo ao NutriLife</h1>
      <p className="text-center text-secondary mb-5">
        Seu espaço para aprender, compartilhar e transformar sua alimentação.
      </p>

      <div className="row g-4">
        {/* Card descritivo do blog */}
        <div className="col-md-12">
          <div className="card h-100">
            <img
              src={fotoHome}
              className="card-img-top"
              alt="Alimentação saudável"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center">Sobre o blog</h5>
              <p className="card-text text-secondary">
                O NutriLife nasceu com um propósito claro: tornar o conhecimento
                sobre nutrição acessível a todos. Sabemos que muitas informações
                valiosas estão trancadas atrás de paywalls ou cursos caros e
                queremos mudar isso. Este blog é uma comunidade aberta, onde
                você pode aprender, compartilhar experiências e encontrar apoio.
                Porque saúde é um direito, não um luxo.
              </p>
              <p className="card-text text-secondary">
                Aqui, você pode tirar dúvidas, celebrar conquistas e se conectar
                com pessoas que compartilham da mesma jornada. Porque cuidar de
                si não deveria depender de quanto você pode pagar e ninguém
                precisa fazer isso sozinho.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* Grid em Bootstrap */}
      <div className="row g-4">
        {/* Coluna Esquerda - Post 1 (destaque maior na borda)  */}
        <div className="col-md-4">
          <Link to="/forum" className="text-decoration-none">
            <div className="card h-100" style={{ border: "2px solid #1976D2" }}>
              <img
                src={fotoForum}
                className="card-img-top"
                alt="Alimentação saudável"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Fórum</h5>
                <p className="card-text text-secondary">
                  Ele é reservado para publicações voltadas para a nutrição com
                  dicas e até perguntas especificas sobre alimentação. Clique e
                  saiba mais!
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Coluna Central - Post 2 */}
        <div className="col-md-4">
          <Link to="/imc" className="text-decoration-none">
            <div className="card h-100">
              <img
                src={fotoIMC}
                className="card-img-top"
                alt="Alimentação saudável"
                style={{
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">IMC</h4>
                <p className="card-text text-secondary">
                  Calcule o seu indice de massa corporal e saiba o nivel que
                  está. Clique e saiba mais!
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Coluna Direita - Post 3 */}
        <div className="col-md-4">
          <Link to="/calorias" className="text-decoration-none">
            <div className="card h-100">
              <img
                src={fotoCalorias}
                className="card-img-top"
                alt="Alimentação saudável"
                style={{
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "bottom",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Calorias</h5>
                <p className="card-text text-secondary">
                  Tenha o total de calorias da sua refeição pelo peso, voltado
                  para auxiliar no bulking e no cutting. Clique e saiba mais!
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <h2 className="text-center mb-4">Publicações recentes do fórum</h2>
      {/* Layout em Grid (Bootstrap) */}
      <div className="row g-4">
        {/* Coluna Esquerda - Post 1 */}
        <div className="col-md-4">
          <Link
            to={`/forum/${displayPosts.id}`}
            className="text-decoration-none"
          >
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {displayPosts[0].title || "Post em destaque"}
                </h5>
                <p className="card-text text-secondary">
                  Por {displayPosts[0].author || "Autor desconhecido"} •{" "}
                  {(formatDate(displayPosts[0].date)? displayPosts[0].date : "Data desconhecida") || "Data desconhecida"}
                </p>
                <span className="text-muted">
                  {displayPosts[0].replies || 0} respostas
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Coluna Central - Post 2 */}
        <div className="col-md-4">
          <Link
            to={`/forum/${displayPosts.id}`}
            className="text-decoration-none"
          >
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {displayPosts[1].title || "Post em destaque"}
                </h5>
                <p className="card-text text-secondary">
                  Por {displayPosts[1].author || "Autor desconhecido"} •{" "}
                  {formatDate(displayPosts[1].date) ? displayPosts[1].date : "Data desconhecida"}
                </p>
                <span className="text-muted">
                  {displayPosts[1].replies || 0} respostas
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Coluna Direita - Post 3 (destaque maior) */}
        <div className="col-md-4">
          <Link
            to={`/forum/${displayPosts[2].id}`}
            className="text-decoration-none"
          >
            <div className="card h-100" style={{ border: "2px solid #1976D2" }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {displayPosts[2].title || "Post em destaque"}
                </h5>
                <p className="card-text text-secondary">
                  Por {displayPosts[2].author || "Autor desconhecido"} •{" "}
                  {formatDate(displayPosts[2].date) ? displayPosts[2].date : "Data desconhecida"}
                </p>
                <span className="text-muted">
                  {displayPosts[2].replies || 0} respostas
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Botão para ver todos os posts */}
      <div className="text-center mt-5">
        <Link to="/forum">
          <button className="btn btn-primary">Ver todos os posts</button>
        </Link>
      </div>

      <br />
    </div>
  );
}
