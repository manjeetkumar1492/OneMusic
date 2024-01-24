import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import '../index.css'
import NextSong from "../components/NextSong";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, song: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SongScreen = () => {

//   console.log(`slug = ${slug}`);
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

const [{ loading, error, song }, dispatch] = useReducer(reducer, {
  song: [],
  loading: true,
  error: "",
});

  

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`https://one-music-7snl.onrender.com/api/songs/slug/${slug}`);
        console.log(`result of SS = ${result}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        // console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { playlist, currentTrack } = state;
  const { playlistItems } = playlist;
  console.log(playlist.playlistItems);

  const addToPlaylistHandler = async () => {
    const existItem = playlist.playlistItems.find((x) => x.slug === song.slug);
    if (existItem) {
      window.alert("Sorry, the song is already added to the playlist");
    } else {
      ctxDispatch({ type: "PLAYLIST_ADD_ITEM", payload: song });
      return;
    }
    // await navigate(`/song/${song.slug}`);
  };
  
  

  const removeFromPlaylistHandler = async (music) => {
    ctxDispatch({ type: "PLAYLIST_REMOVE_ITEM", payload: music });
    navigate(`/song/${music.slug}`);
  };

  const playHandler = async () => {
    // Find the index of the selected song in the playlist
    const selectedIndex = playlistItems.findIndex((song) => song.slug === slug);
    console.log(`selectedIndex = ${selectedIndex}`);
  
    // Set the current track index to the found index or 0 if not found
    ctxDispatch({ type: 'SET_CURRENT_TRACK', payload: selectedIndex >= 0 ? selectedIndex : 0 });
  
    // Optional: You can navigate to the music player or update the UI as needed
    navigate(`/song/${slug}`);
  };
  
  

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <center>
        <img className="img-large responsive-img" src={`${song.image}500x500.jpg`} alt={song.name} />
        </center>
      </Col>
      <Col md={2}>
        <div className="listg" variant="flush">
        
          <div>
            <h3>Song: {song.name}</h3>
          </div>
          <div>
            <h3>Artist: {song.artist}</h3>
          </div>
          
    
          <br/>
          <div className="d-grid">
                      <Button onClick={addToPlaylistHandler} variant="dark">
                        Add to Playlist
                      </Button>
          </div>
          <br/>
          <div className="d-grid">
                      <Button onClick={playHandler} variant="dark">
                        Play
                      </Button>
          </div>
        </div>
      </Col>
      <Col md={4}>
        <div style={{marginLeft: "40px"}}>
            <h1>Up Next</h1>
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
          <div className="remove-btn">
            <Button onClick={() => removeFromPlaylistHandler(music)} variant="dark">
              Remove
            </Button>
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
          
      
      </Col>
    </Row>
  );
};

export default SongScreen;
