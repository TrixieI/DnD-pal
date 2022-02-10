import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Character from "./Character";
import Resources from "./Resources";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";

const Navigation = (props) => {
  const handleLogout = () => {};

  return (
    <div style={{ textAlign: "center" }} className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">D&D PAL</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/character">Character</Nav.Link>
            <Nav.Link href="/resources">Resources</Nav.Link>

            {props.isLoggedin === true ? (
              <Nav.Link onClick={handleLogout} href="/login">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<Character />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.isLoggedin,
  };
};

export default connect(mapStateToProps, null)(Navigation);
