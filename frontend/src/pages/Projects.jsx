import binaryVideo from "../assets/binary.mp4";
import ecommerceImg from "../assets/ecommerce.png";
import cyphrChatImg from "../assets/cyphrChat.png";

function Projects() {
  const projectList = [
    {
      id: 1,
      title: "Full Stack E-Commerce Platform",
      description:
        "A complete e-commerce application with authentication, cart, checkout, admin dashboard and JWT-based authorization.",

      tech: ["React", "TypeScript", "Express", "PostgreSQL", "JWT"],

      liveLink: "https://e-commerce-hazel-chi.vercel.app/?page=1",

      githubLink: "https://github.com/Romel164255/E-commerce.git",

      image: ecommerceImg,
    },

    {
      id: 2,

      title: "URL Shortener Application",

      description:
        "Built a scalable URL shortener implementing Redis caching for O(1) redirect performance, MongoDB for persistent storage, and RESTful API design.",

      tech: ["React", "Node.js", "Express", "MongoDB", "Redis"],

      liveLink: "https://url-shortener-taupe-gamma.vercel.app/",

      githubLink: "https://github.com/Romel164255/url-shortener.git",

      image: "/images/urlshortener.png",
    },

    {
      id: 3,

      title: "Real-Time Chat Application",

      description:
        "A full-stack real-time chat application with Firebase authentication and WebSocket-based messaging and real-time video calling  using Socket.IO and webRTC.",

      tech: [
        "React",
        "Node.js",
        "Express",
        "Socket.IO",
        "PostgreSQL",
        "Firebase Auth",
        "WebRTC",
      ],

      liveLink: "https://chatty-phi-ten.vercel.app/",

      githubLink: "https://github.com/Romel164255/rChat.git",

      image: cyphrChatImg,
    },
  ];

  return (
    <div className="projects-page">
      {/* BACKGROUND VIDEO */}

      <video autoPlay muted loop playsInline className="page-video-bg">
        <source src={binaryVideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}

      <div className="page-overlay"></div>

      {/* CONTENT */}

      <div className="homepage-1">
        <div className="projects-grid">
          {projectList.map((project) => (
            <div key={project.id} className="project-card">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              )}

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {project.tech?.length > 0 && (
                <div className="tech-stack">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-buttons">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}

                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
