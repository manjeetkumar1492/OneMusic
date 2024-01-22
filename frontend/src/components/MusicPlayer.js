import React, { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../index.css';

  

const MusicPlayer = () => {
  const [currentTrack, setTrackIndex] = React.useState(0);
  const [playlist, setplaylist] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://one-music-7snl.onrender.com/api/songs");
        console.log(result.data);
        setplaylist(result.data);
        console.log(playlist);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(playlist);
  }, [playlist, currentTrack]);

//   console.log(`${playlist[0].name}`);
//   console.log(`${playlist[0].image}`);
//   console.log(`${playlist[0].audio}`);

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack > 0 ? currentTrack - 1 : playlist.length - 1
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (
    <div className="container">
      {/* Audio Player with custom controls */}
   
        <AudioPlayer
          className="custom-audio-player"
          volume="0.5"
          src={playlist[currentTrack]?.audio}
          customAdditionalControls={[
            <div className='song-info' key={`${playlist[currentTrack]?.slug}-${currentTrack}`}>
  <img src={`${playlist[currentTrack]?.image}50x50.jpg`} alt={`Cover for ${playlist[currentTrack]?.name}`} />
</div>,
            <div key={playlist[currentTrack]?.slug} className="song-info">
              <h3>{playlist[currentTrack]?.name}</h3>
              <p>{playlist[currentTrack]?.artist}</p>
            </div>,
          ]}
          showSkipControls
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          onEnded={handleEnd}
          // Try other props!
        />
    </div>
  );
};

export default MusicPlayer;
