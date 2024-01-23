import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css'

const MusicCard = ({ music }) => {
  const Img = `${music.image}250x250.jpg`
  // console.log(Img);
  return (
    <Card className="music-card"  style={{ alignItems: 'center', backgroundColor: '#000', color: '#fff', position: 'relative' }}>
      <Link to={`/song/${music.slug}`}>
        <img src={Img} alt={music.name} className="card-img-top" />
        <div className='music-icon' style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <i className="fas fa-play fa-2x custom-play"></i>
        </div>
      </Link>
      <Card.Body>
        <Card.Title>{music.name} | {music.artist}</Card.Title>
      </Card.Body>
    </Card>
  );
};




export default MusicCard;
