function Projects() {
  const projectList = [
    {
      id: 1,
      title: "Full Stack E-Commerce Platform",
      description:
        "A complete e-commerce application with authentication, cart, checkout, admin dashboard and JWT-based authorization.",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
      liveLink: "https://e-commerce-hazel-chi.vercel.app/?page=1",
      githubLink: "https://github.com/Romel164255/E-commerce.git",
      image: "/images/ecommerce.png"
    },
    {
      id: 2,
      title: "Project Two",
      description: "Description for project two goes here."
    },
    {
      id: 3,
      title: "Project Three",
      description: "Description for project three goes here."
    },
    {
      id: 4,
      title: "Project Four",
      description: "Description for project four goes here."
    },
    {
      id: 5,
      title: "Project Five",
      description: "Description for project five goes here."
    },
    {
      id: 6,
      title: "Project Six",
      description: "Description for project six goes here."
    }
  ];

  return (
    <div className="homepage-1">
      <div className="projects-grid">
        {projectList.map((project) => (
          <div key={project.id} className="project-card">

            {/* Image (safe render) */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            )}

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            {/* Tech Stack (SAFE VERSION) */}
            {project.tech?.length > 0 && (
              <div className="tech-stack">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Buttons (safe render) */}
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
  );
}

export default Projects;