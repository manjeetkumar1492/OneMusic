import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./components/SearchBox";
import HomeScreen from "./screens/HomeScreen";
import MusicPlayer from "./components/MusicPlayer";
import SongScreen from "./screens/SongScreen";
import { Col, Row } from "react-bootstrap";
import '../src/index.css'
import { useContext } from "react";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";

const App = ()=> {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    // console.log(state);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    // navigate('/signin');
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
        <Navbar sticky="top" bg="black" data-bs-theme="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
          
           <div className="brand">
            {/* <i className="fa fa-play-circle fa-2x"></i> */}

  <h3>🎵OneMusic</h3>
  </div>
  </Navbar.Brand>
      </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <br/>

            <SearchBox/>
            <Nav className="me-auto w-100 justify-content-end">

            <Link to="/playlist" className="nav-link">
                    Playlist
                  </Link>
                  
                  {userInfo ? (
                    <NavDropdown title={userInfo} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                       
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) 
                  : 
                  (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}

                  
                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<HomeScreen />}/>
                <Route path="/music/kesariya" element={<MusicPlayer/>}/>
                <Route path="/song/:slug" element={<SongScreen />} />
              </Routes>
            </Container>
          </main>
          <MusicPlayer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
