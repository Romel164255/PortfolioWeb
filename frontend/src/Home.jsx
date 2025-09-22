import TechHoneycomb from './TechHoneycomb'; // Assuming TechHoneycomb is in the same folder

function Home() {
  return (
    <div className="home-container" style={{ padding: '2rem', backgroundColor: '#121212', minHeight: '100vh', color: '#E0E0E0', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Intro Section */}
      <div className="intro-section" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }}>
        <h1 style={{ color: '#FF6F00', fontWeight: '700', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Hi, I’m a self-taught web developer transitioning from sales.
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, textAlign: 'center', color: '#CCCCCC' }}>
          I am deeply focused on backend development, building scalable and efficient server-side applications.
          My goal is to advance into machine learning with a specialization in reinforcement learning — combining backend expertise with cutting-edge AI.
        </p>
      </div>

      {/* Honeycomb Tech Stack Section */}
      <div className="tech-stack-section" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <TechHoneycomb />
      </div>
    </div>
  );
}

export default Home;

