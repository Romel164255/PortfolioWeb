const techStacks = [
  { id: 1, name: 'react', img: './assets/react.png' },
  { id: 2, name: 'Node.js', img: '/images/node.png' },
  { id: 3, name: 'Express', img: '/images/express.png' },
  { id: 4, name: 'MongoDB', img: '/images/mongodb.png' },
  { id: 5, name: 'Python', img: '/images/python.png' },
  { id: 6, name: 'TensorFlow', img: '/images/tensorflow.png' },
  // Add more stacks as needed
];

function TechHoneycomb() {
  return (
    <div className="honeycomb-container">
      {techStacks.map(({ id, name, img }) => (
        <div key={id} className="hex">
          <div className="hex-in">
            <img src={img} alt={name} title={name} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TechHoneycomb;
