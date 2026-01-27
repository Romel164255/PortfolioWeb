import { useState } from "react";
import { createComment } from "../../services/comments";

function CommentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    const res = await createComment({ name, message });
    onAdd(res.data);

    setName("");
    setMessage("");
    setLoading(false);
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
      />
      <button disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
