//Tela da publicação
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ForumPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Carrega posts do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("forumPosts");
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const post = posts.find((p) => p.id === parseInt(id));

  const handleAddComment = (e) => {
    e.preventDefault();
    //Não libera comentario
    if (!newComment.trim()) return;

    const updatedPosts = posts.map((p) => {
      if (p.id === parseInt(id)) {
        const newCommentObj = {
          id: Date.now(),
          author: "Você",
          text: newComment,
          date: "Agora",
        };
        return {
          ...p,
          comments: [...(p.comments || []), newCommentObj],
          replies: (p.replies || 0) + 1,
        };
      }
      return p;
    });

    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setNewComment("");
  };
  //Cria uma validação com o usuário para excluir o post
  const handleDelete = (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    navigate("/forum"); // volta para a lista
  };

  //Valida se o post existe ou não
  if (!post) {
    return (
      <div className="container py-5">
        <h2>Post não encontrado</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/forum")}
        >
          Voltar ao Fórum
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/forum" className="btn btn-outline-secondary">
        ← Voltar ao Fórum
      </Link>

      <div className="card p-4 mb-4" id="cardPost">
        <h2>{post.title}</h2>
        <p className="text-secondary">
          Por {post.author} • {post.date}
        </p>
        <p>{post.content}</p>
      </div>
      <div className="d-flex gap-2 mb-4">
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(post.id)}
        >
          Excluir Post
        </button>
        <Link to={`/forum/update/${post.id}`} className="btn btn-warning">
          Editar Post
        </Link>
      </div>

      <h4>Comentários ({post.comments?.length || 0})</h4>

      {/* Formulário de comentário */}
      <form onSubmit={handleAddComment} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva seu comentário..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Comentar
        </button>
      </form>
      {/* Lista de comentários */}
      {(post.comments || []).map((comment) => (
        <div key={comment.id} className="card mb-2 p-3">
          <p>{comment.text}</p>
          <small className="text-secondary">
            — {comment.author}, {comment.date}
          </small>
        </div>
      ))}

      {(!post.comments || post.comments.length === 0) && (
        <p className="text-muted">Seja o primeiro a comentar!</p>
      )}
    </div>
  );
}
