import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

const Navigation = (props) => {
  const handleLogout = () => {};

  return (
    <div style={{ textAlign: "center" }} className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">D&D PAL</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/character">Character</Nav.Link>
            <Nav.Link href="/resources">Resources</Nav.Link>
            <Nav.Link onClick={handleLogout} href="/">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.isLoggedin,
  };
};

export default connect(mapStateToProps, null)(Navigation);
