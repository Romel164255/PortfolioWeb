import CommentItem from "./CommentItem";

function CommentList({ comments, onReply }) {
  return (
    <div>
      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default CommentList;
