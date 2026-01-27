function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id}>
          <strong>{c.name}</strong>
          <p>{c.message}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
