import { useEffect, useState } from "react";
import Maze from "../components/Maze";
import { getComments } from "../services/comments";
import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";

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
    getComments()
      .then((res) => setComments(res.data))
      .catch(() => {}); // graceful — page still works without comments

    fetch("/api/track-visit", { method: "POST" }).catch(() => {});
  }, []);

  const handleAdd = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleReply = (parentId, reply) => {
    setComments((prev) => [reply, ...prev]);
  };

  return (
    <div className="home-container">
      {/* Intro */}
      <div className="intro-section">
        <h1>Hi, I&apos;m a self-taught web developer transitioning from sales.</h1>
        <p>
          I am deeply focused on backend development, building scalable and
          efficient server-side applications. My goal is to advance into machine
          learning with a specialization in reinforcement learning.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="tech-stack-section">
        <Maze />
      </div>

      {/* Comments */}
      <section className="comments-section">
        <h2>Leave a message</h2>
        <CommentForm onAdd={handleAdd} />
        <CommentList
          comments={buildCommentTree(comments)}
          onReply={handleReply}
        />
      </section>
    </div>
  );
}

export default Home;
