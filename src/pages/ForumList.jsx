// src/pages/ForumList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fotoForum from '../assets/images/fotoForum.jpg';

export default function ForumList() {
  const [posts, setPosts] = useState(() => {
    const initial = localStorage.getItem('forumPosts');
    if (initial) {
      try {
        const parsed = JSON.parse(initial);
        // Filtra apenas posts válidos (com id e title)
        return Array.isArray(parsed)
          ? parsed.filter(post => post && typeof post === 'object' && post.id && post.title)
          : [];
      } catch (e) {
        console.error('Erro ao parsear posts:', e);
        return [];
      }
    }
    return [
      { id: 1, title: "Como substituir açúcar?", author: "Ana L.", date: Date.now(timestamp), replies: 0, content: "Estou tentando reduzir o açúcar... alguém tem dicas?" },
      { id: 2, title: "Suplementos são necessários?", author: "Carlos M.", date: Date.now(timestamp), replies: 0, content: "Estou na academia há 3 meses..." },
      { id: 3, title: "Qual o papel da proteina na alimentação?", author: "José B.", date: Date.now(timestamp), replies: 0, content: "Estou na academia há 3 meses..." },
    ];
  });

  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  }, [posts]);

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
    <div className="container py-2">
      <div className="mb-4">
        <img 
          src={fotoForum} 
          alt="Frutas saudáveis" 
          className="w-100 rounded"
          style={{
            height: '300px',
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Fórum de Discussões</h1>
        <Link to="/forum/novo" className="btn btn-primary">
          + Novo Tópico
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">Nenhum post ainda. Seja o primeiro a criar um tópico!</p>
      ) : (
        posts.map((post) => (
          <Link
            to={`/forum/${post.id}`}
            key={post.id}
            className="text-decoration-none"
          >
            <div className="card mb-3 p-3 hover-shadow">
              <h5 className="text-primary">{post.title}</h5>
              <p className="text-secondary">
                Por {post.author} • {formatDate(post.date)}
              </p>
              <p className="text-muted">{post.replies} respostas</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}