import { useState } from "react";
import CommentForm from "./CommentForm";

function countTotalReplies(comment) {
  if (!comment.replies || comment.replies.length === 0) return 0;

  return comment.replies.reduce(
    (total, reply) => total + 1 + countTotalReplies(reply),
    0
  );
}

function CommentItem({ comment, onReply }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);

  // ✅ JS logic goes here
  const totalReplies = countTotalReplies(comment);

  return (
    <div className="comment">
      <strong>{comment.name}</strong>
      <p>{comment.message}</p>

      <div className="comment-actions">
        <button onClick={() => setReplying(!replying)}>Reply</button>

        {totalReplies > 0 && (
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies
              ? "Hide replies"
              : `View ${totalReplies} ${
                  totalReplies === 1 ? "reply" : "replies"
                }`}
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
