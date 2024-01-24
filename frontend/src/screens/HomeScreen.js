import React, { useEffect, useReducer, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Music from '../components/Music'
import { Helmet } from "react-helmet-async";
import '../index.css'
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, songs: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, songs }, dispatch] = useReducer(reducer, {
    songs: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("https://one-music-7snl.onrender.com/api/songs");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        // console.log(result.data);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
      // console.log(result);
      // setProducts(result.data);
    };
    fetchData();
  }, []);



  return (
    <div className='main-home'>
      <Helmet>
        <title>OneMusic</title>
      </Helmet>   

        <hr/>
        <h1>Listen Again</h1>
        <br/>
        <div className='musics'>
            <Row>
                {songs.map((music) => (
                <Col xs={6} lg={2} className="mb-3" key={music.slug}>
                    <Music music={music} />
                </Col>
                ))}
            </Row>
        </div>
        <br/><br/><br/><br/><br/>
    </div>
  )
}

export default HomeScreen