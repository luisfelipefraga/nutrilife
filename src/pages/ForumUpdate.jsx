import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ForumUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Carrega o post pelo ID
  useEffect(() => {
    const saved = localStorage.getItem('forumPosts');
    if (saved) {
      const posts = JSON.parse(saved);
      const post = posts.find(p => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [id]);
  //Permite usar a tecla 'Enter' para submeter
  const handleSubmit = (e) => {
    e.preventDefault();
    //Valida se o valor é nulo
    if (!title.trim() || !content.trim()) {
      alert('Preencha título e conteúdo.');
      return;
    }

    // Carrega todos os posts
    const saved = localStorage.getItem('forumPosts');
    let posts = [];
    try {
      if (saved) posts = JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao carregar posts:", e);
      posts = [];
    }

    // Atualiza o post com o ID correspondente
    const updatedPosts = posts.map(p => {
      if (p.id === parseInt(id)) {
        return {
          ...p,
          title: title.trim(),
          content: content.trim(),
          date: Date.now() // Atualiza a data para "Agora"
        };
      }
      return p;
    });

    // Salva no localStorage
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));

    // Redireciona para o post editado
    navigate(`/forum/${id}`);
  };

  return (
    <div className="container py-5">
      <Link to={`/forum/${id}`} className="btn btn-outline-secondary mb-4">
        ← Voltar ao Post
      </Link>

      <div className="card p-4">
        <h2>Editar Tópico</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Como substituir açúcar?"
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
          <button type="submit" className="btn btn-primary me-2">Salvar Alterações</button>
          <Link to={`/forum/${id}`} className="btn btn-secondary">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}