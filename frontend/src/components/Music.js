import { Card } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import '../index.css'

const MusicCard = ({ music }) => {
  const Img = `${music.image}250x250.jpg`
  // console.log(Img);

  return (
    <Card   style={{ alignItems: 'center', backgroundColor: '#000', color: '#fff', position: 'relative' }}>
      <Link to={`/song/${music.slug}`}>
        <div className="music-card" style={{position: "relative", textAlign: 'center'}}>
          <img src={Img} alt={music.name} className="card-img-top" style={{ width: '100%', height: 'auto' }} />
          <div className='music-icon'>
            <i className="fas fa-play fa-2x custom-play"></i>
          </div>
        </div>
      </Link>
      <Card.Body>
        <Card.Title className='singer-name' title={music.name} style={{fontSize: "15px"}}>{music.name.length >15 ? music.name.slice(0, 15) + '...': music.name}</Card.Title>
        <Card.Title className='singer-name' title={music.artist} style={{fontSize: "15px"}}> {music.artist.length >20 ? music.artist.slice(0, 20) + '...': music.artist}</Card.Title>
      </Card.Body>
    </Card>
  );
};




export default MusicCard;
