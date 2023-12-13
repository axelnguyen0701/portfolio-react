import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { auth, signInWithGoogle, logout } from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { Sun, SunFill } from "react-bootstrap-icons";
export default function NavBar({ setTheme }) {
    const [user, loading, error] = useAuthState(auth);
    //theme context
    const theme = useContext(ThemeContext);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#1e9d9d" }}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Portfolio
                </Navbar.Brand>
                <Nav>
                    {!loading && !!user ? (
                        <div>
                            <span>Hello {user.displayName}</span>
                            <Button
                                variant="secondary"
                                onClick={logout}
                                className="mx-3"
                                name="log-out"
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={signInWithGoogle}
                            variant="link"
                            style={{ color: "black" }}
                            name="log-in"
                        >
                            Login as Hieu
                        </Button>
                    )}
                    <Button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        variant={theme}
                        name="dark-mode"
                    >
                        {theme === "dark" ? <SunFill /> : <Sun />}
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}
