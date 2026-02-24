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
      title: 'Project Two',
      description: 'Description for project two goes here.',
    },
    {
      id: 3,
      title: 'Project Two',
      description: 'Description for project two goes here.',
    },
    {
      id: 4,
      title: 'Project Two',
      description: 'Description for project two goes here.',
    },
    {
      id: 5,
      title: 'Project Two',
      description: 'Description for project two goes here.',
    },
    {
      id: 6,
      title: 'Project Two',
      description: 'Description for project two goes here.',
    },
    // Add more projects here later as needed
  ];

  return (
  <div className="homepage-1">
    <div className="projects-grid">
      {projectList.map((project) => (
        <div key={project.id} className="project-card">

          <img 
            src={project.image} 
            alt={project.title} 
            className="project-image"
          />

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <div className="tech-stack">
            {project.tech.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-buttons">
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              Live Demo
            </a>

            <a href={project.githubLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}

export default Projects;
