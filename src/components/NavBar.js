import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Portfolio</Navbar.Brand>
            </Container>
        </Navbar>
    );
}
