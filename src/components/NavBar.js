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
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Portfolio</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Link to="/project" className="nav-link">
                        Projects
                    </Link>
                    {user && (
                        <Link to="/new/project" className="nav-link">
                            New
                        </Link>
                    )}
                </Nav>
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
                        <Button onClick={signInWithGoogle}>
                            Login as Hieu
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
