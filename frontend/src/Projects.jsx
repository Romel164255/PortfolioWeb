function Projects() {
  const projectList = [
    {
      id: 1,
      title: 'Project One',
      description: 'Description for project one goes here.',
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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {/* Add other project details/buttons here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
