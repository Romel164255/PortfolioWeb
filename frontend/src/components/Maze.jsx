import expressImg from '../assets/express.png';
import nodejsImg from '../assets/nodejs.png';
import postgressImg from '../assets/postgress.png';
import reactImg from '../assets/react.png';
// Import other images as needed

const techStacks = [
  { id: 1, name: 'React', img: reactImg },
  { id: 2, name: 'Node.js', img: nodejsImg },
  { id: 3, name: 'Express', img: expressImg },
  { id: 4, name: 'Postgres', img: postgressImg },
  // Add more stacks as needed with imported images
];

function Maze() {
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

export default Maze;
