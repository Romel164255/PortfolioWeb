import { useEffect, useState } from "react";
import Maze from "../components/Maze";
import { getComments } from "../services/comments";
import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";

/* ---------- build nested comment tree ---------- */
function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parent_id) {
      map[c.parent_id]?.replies.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

function Home() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
  getComments().then((res) => setComments(res.data));

  fetch("/api/track-visit", {
    method: "POST",
  });
}, []);
  /* ---------- handle new comments & replies ---------- */
  const handleAdd = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleReply = (parentId, reply) => {
    setComments((prev) => [reply, ...prev]);
  };

  return (
    <div
      className="home-container"
      style={{
        padding: "2rem",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#E0E0E0",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Intro Section */}
      <div
        className="intro-section"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "4rem",
        }}
      >
        <h1
          style={{
            color: "#8ab4f8",
            fontWeight: "700",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Hi, I’m a self-taught web developer transitioning from sales.
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.6,
            textAlign: "center",
            color: "#bdbdbd",
          }}
        >
          I am deeply focused on backend development, building scalable
          and efficient server-side applications. My goal is to advance
          into machine learning with a specialization in reinforcement
          learning.
        </p>
      </div>

      {/* Tech Stack */}
      <div
        className="tech-stack-section"
        style={{ maxWidth: "960px", margin: "0 auto" }}
      >
        <Maze />
      </div>

      {/* Comments */}
      <section style={{ maxWidth: "800px", margin: "4rem auto 0" }}>
        <h2 style={{ marginBottom: "1rem" }}>Leave a message</h2>

        {/* top-level comment */}
        <CommentForm onAdd={handleAdd} />

        {/* nested comments */}
        <CommentList
          comments={buildCommentTree(comments)}
          onReply={handleReply}
        />
      </section>
    </div>
  );
}

export default Home;
