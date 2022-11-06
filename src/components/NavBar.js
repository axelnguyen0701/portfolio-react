import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Portfolio</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Link to="/project" className="nav-link">
                        Projects
                    </Link>
                    <Link to="/new/project" className="nav-link">
                        New
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
