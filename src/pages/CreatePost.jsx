import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Importação correta do Link

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Preencha título e conteúdo.');
      return;
    }

    // Carrega posts existentes (com segurança)
    const saved = localStorage.getItem('forumPosts');
    let posts = [];
    try {
      if (saved) posts = JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao carregar posts:", e);
      posts = [];
    }
    
    // Gera novo ID
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    // Cria novo post
    const newPost = {
      id: newId,
      title: title.trim(),
      content: content.trim(),
      author: "Você",
      date: "Agora",
      replies: 0,
      comments: []
    };

    // Salva
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));

    // Redireciona para o post criado
    navigate(`/forum/${newId}`);
  };

  return (
    <div className="container py-5">
      <Link to="/forum" className="btn btn-outline-secondary mb-4">
        ← Voltar ao Fórum
      </Link>

      <div className="card p-4">
        <h2>Novo Tópico</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Qual a melhor fruta para o café da manhã?"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Conteúdo</label>
            <textarea
              className="form-control"
              id="content"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva sua dúvida ou compartilhe sua experiência..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Postar</button>
        </form>
      </div>
    </div>
  );
}