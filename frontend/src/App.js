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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Playlist from "./screens/Playlist";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import AdminRoute from "./components/AdminRoute";
import SongListScreen from "./screens/SongListScreen";

const App = ()=> {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    // console.log(state);
    localStorage.removeItem("userInfo");
    // navigate('/signin');
    window.location.href = "/signin";
  };


  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="top-center" limit={1} />
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
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Song History</NavDropdown.Item>
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

{userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/songlist">
                        <NavDropdown.Item>Songs</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
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
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen />} />

                <Route
                path="/admin/songlist"
                element={
                  <AdminRoute>
                    {" "}
                    <SongListScreen />{" "}
                  </AdminRoute>
                }
              />
              </Routes>
            </Container>
          </main>
          <MusicPlayer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
