import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from "axios";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../index.css';
import { Store } from '../Store';

  

const MusicPlayer = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { playlist, currentTrack } = state;
  const { playlistItems } = playlist;

  console.log(`currentTrack = ${currentTrack}`)
  console.log(`playlist = ${JSON.stringify(playlist)}`)



  // console.log(`${playlistItems[currentTrack]?.name}`);
  // console.log(`${playlistItems[currentTrack]?.image}`);
  // console.log(`${playlistItems[currentTrack]?.audio}`);

const handleClickNext = () => {
  ctxDispatch({ type: 'SET_CURRENT_TRACK', payload: currentTrack < playlist.length - 1 ? currentTrack + 1 : 0 });
};

const handleClickPrevious = () => {
  ctxDispatch({ type: 'SET_CURRENT_TRACK', payload: currentTrack > 0 ? currentTrack - 1 : playlist.length - 1 });
};

const handleEnd = () => {
  ctxDispatch({ type: 'SET_CURRENT_TRACK', payload: currentTrack < playlist.length - 1 ? currentTrack + 1 : 0 });
};

const trimText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

  return (
    <div className="container">
      {/* Audio Player with custom controls */}
   
      <AudioPlayer
        className="custom-audio-player"
        volume="0.5"
        src={playlistItems[currentTrack]?.audio}
        customAdditionalControls={[
          <div
            className='song-info'
            key={`${playlistItems[currentTrack]?.slug}-${currentTrack}`}
            style={{ padding: '0' }}
          >
            <img src={`${playlistItems[currentTrack]?.image}50x50.jpg`} alt={`Cover for ${playlistItems[currentTrack]?.name}`} />
          </div>,
          <div
            key={playlistItems[currentTrack]?.slug}
            className="song-info"
            style={{ paddingLeft: '10px', margin: "0", textAlign: 'left' }} // Adjust textAlign as needed
          >
            <h3 title={playlistItems[currentTrack]?.name}>{trimText(playlistItems[currentTrack]?.name, 20)}</h3>
            <p title={playlistItems[currentTrack]?.artist}>{trimText(playlistItems[currentTrack]?.artist, 20)}</p>
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
