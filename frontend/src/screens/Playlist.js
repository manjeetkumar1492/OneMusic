import React, { useContext } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store';


const Playlist = () => {
    const { state} = useContext(Store);
  const { playlist } = state;
  return (
    <div style={{paddingLeft: "70px"}}>
            <h1>Songs</h1>
            <div>
                <div className='scroll-container'>
                <ListGroup>
  {playlist.playlistItems.map((music) => (
    <Link to={`/song/${music.slug}`} key={music.slug}>
      <ListGroup.Item className='listgs listg' key={music.slug}>
        <div className='song-info-next'>
          <div className='image-container'>
            <img src={`${music.image}50x50.jpg`} alt={music.name} />
          </div>
          <div className='text-container'>
            <div className='song-name' title={music.name}>
              {music.name.length > 20 ? music.name.slice(0, 20) + '...' : music.name}
            </div>
            <div className='singer-name' title={music.artist}>
              {music.artist.length > 20 ? music.artist.slice(0, 20) + '...' : music.artist}
            </div>
          </div>
        </div>
      </ListGroup.Item>
    </Link>
  ))}
</ListGroup>

                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
  )
}

export default Playlist