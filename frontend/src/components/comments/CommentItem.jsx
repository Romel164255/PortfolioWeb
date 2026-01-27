import { useState } from "react";
import CommentForm from "./CommentForm";

function CommentItem({ comment, onReply }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);

  return (
    <div className="comment">
      <strong>{comment.name}</strong>
      <p>{comment.message}</p>

      <div className="comment-actions">
        <button onClick={() => setReplying(!replying)}>Reply</button>

        {comment.replies.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies
              ? "Hide replies"
              : `View ${comment.replies.length} replies`}
          </button>
        )}
      </div>

      {replying && (
        <CommentForm
          parentId={comment.id}
          onAdd={(reply) => {
            onReply(comment.id, reply);
            setReplying(false);
            setShowReplies(true);
          }}
        />
      )}

      {showReplies && (
        <div className="replies">
          {comment.replies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
