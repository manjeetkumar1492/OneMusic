import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Music from '../components/Music'
import '../index.css'
import axios from 'axios'

const HomeScreen = () => {
    const [playlist, setplaylist] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get("http://localhost:5000/api/songs");
            console.log(result.data);
            setplaylist(result.data);
            console.log(playlist);
          } catch (error) {
            console.log("error");
          }
        };
        fetchData();
      }, []);

  return (
    <div className='main-home'>
        <hr/>
        <h1>Listen Again</h1>
        <br/>
        <div className='musics'>
            <Row>
                {playlist.map((music) => (
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