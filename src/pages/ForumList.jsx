//Tela com todas as publicações

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fotoForum from '../assets/images/fotoForum.jpg';

export default function ForumList() {
  

  //Verifica se tem algum post já guardado no localstorage se nã tiver posta 2 posts aleatórios
  const [posts, setPosts] = useState(() => {
    const initial = localStorage.getItem('forumPosts');
    return initial
      ? JSON.parse(initial)
      : [
          { id: 1, title: "Como substituir açúcar?", author: "Ana L.", date: "Ontem", replies: 3, content: "Estou tentando reduzir o açúcar... alguém tem dicas?" },
          { id: 2, title: "Suplementos são necessários?", author: "Carlos M.", date: "Hoje", replies: 5, content: "Estou na academia há 3 meses..." },
        ];
  });

  //Armazena os posts
  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="container py-2">
      <div className="mb-4">
        {/*Imagem do início da página*/}
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

      {/*Leva para uma página para criar um novo post*/}    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Fórum de Discussões</h1>
        <Link to="/forum/novo" className="btn btn-primary">
          + Novo Tópico
        </Link>
      </div>
      {/*Mostra todos os posts do localstorage*/}
      {posts.map((post) => (
        <Link
          to={`/forum/${post.id}`}
          key={post.id}
          className="text-decoration-none"
        >
          <div className="card mb-3 p-3 hover-shadow">
            <h5 className="text-primary">{post.title}</h5>
            <p className="text-secondary">
              Por {post.author} • {post.date}
            </p>
            <p className="text-muted">{post.replies} respostas</p>
          </div>
        </Link>
      ))}
    </div>
  );
}