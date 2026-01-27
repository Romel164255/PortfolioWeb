import { useState } from "react";
import { createComment } from "../../services/comments";

function CommentForm({ onAdd, parentId = null }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);

    const res = await createComment({
      name,
      message,
      parent_id: parentId,
    });

    onAdd(res.data);

    setName("");
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
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

      <button disabled={loading}>
        {loading ? "Posting..." : parentId ? "Reply" : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
