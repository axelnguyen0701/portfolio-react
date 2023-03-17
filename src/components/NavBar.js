import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { auth, signInWithGoogle, logout } from "../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export default function NavBar() {
    const [user, loading, error] = useAuthState(auth);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#1e9d9d" }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Brand as={Link} to="/">
                        Portfolio
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/project">
                            Projects
                        </Nav.Link>

                        {user && (
                            <Nav.Link as={Link} to="/new/project">
                                New
                            </Nav.Link>
                        )}

                        <Nav.Link as={Link} to="/about">
                            About Me
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Nav>
                    {!loading && !!user ? (
                        <div>
                            <span>Hello {user.displayName}</span>
                            <Button
                                variant="secondary"
                                onClick={logout}
                                className="mx-3"
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={signInWithGoogle} variant="dark">
                            Login as Hieu
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
