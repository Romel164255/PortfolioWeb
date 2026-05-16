import smokeVideo from "../assets/smoke.mp4";

function Projects() {

  const projectList = [
    // your existing project array unchanged
  ];

  return (

    <div className="projects-page">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="page-video-bg"
      >
        <source
          src={smokeVideo}
          type="video/mp4"
        />
      </video>

      <div className="page-overlay"></div>

      <div className="homepage-1">

        <div className="projects-grid">

          {projectList.map((project)=>(

            <div
              key={project.id}
              className="project-card"
            >

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              )}

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">

                {project.tech.map(
                  (tech,index)=>(
                  <span
                    key={index}
                    className="tech-badge"
                  >
                    {tech}
                  </span>
                ))}

              </div>

              <div className="project-buttons">

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Projects;