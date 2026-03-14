import { useState } from "react";
import { createComment } from "../../services/comments";

function CommentForm({ onAdd, parentId = null }) {
  const [name, setName]       = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await createComment({ name, message, parent_id: parentId });
      onAdd(res.data);
      setName("");
      setMessage("");
    } catch {
      setError("Failed to post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      />
      {error && <p style={{ color: "#cf6679", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Posting…" : parentId ? "Reply" : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
