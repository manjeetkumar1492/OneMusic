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
  const [currentTrack, setTrackIndex] = React.useState(0);
  const [playlist, setplaylist] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
//   console.log(`slug = ${slug}`);
  

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

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart } = state;
  const addToPlaylistHandler = async () => {
    // console.log('cart = ' + JSON.stringify(cart));
    // console.log('product = ' + JSON.stringify(product));
    // const existItem = cart.cartItems.find((x) => x._id === product._id);
    // // console.log('existItem = ' + JSON.stringify(existItem));
    // const quantity = existItem ? existItem.quantity + 1 : 1;
    // // console.log(`quantity = ${quantity}`);
    // const { data } = await axios.get(`http://localhost:5000/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert("Sorry, the product is out of stock");
    //   return;
    // }
    // ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    // navigate("/cart");
    console.log("added to playlist");
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
        </div>
      </Col>
      <Col md={4}>
        <div style={{marginLeft: "40px"}}>
            <h1>Up Next</h1>
            <div>
                <div className='scroll-container'>
                    <ListGroup>
                        {playlist.map((music) => (
                            <Link to={`/song/${music.slug}`}>
                            <ListGroup.Item className='listg' key={music.slug}>
                            <div className='song-info-next'>
                                <div className='image-container'>
                                    <img src={`${music.image}50x50.jpg`} />
                                    
                                </div>
                                <div className='text-container'>
                                    <div className='song-name'>
                                    {music.name}
                                    </div>
                                    <div className='singer-name'>
                                    {music.artist}
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
          
      
      </Col>
    </Row>
  );
};

export default SongScreen;
