import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "./background.svg";
import "./Info.css";
export default function Info() {
    return (
        <Container
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
            }}
            fluid
            className="h-100 d-flex flex-column justify-content-between typewriter"
        >
            <div>Hello I am</div>
            <h1>Axel Nguyen</h1>
            <h2>Full-stack developer</h2>
            <p>I fancy creating things from thin air</p>

            <Button
                style={{ maxWidth: "25%", alignSelf: "center" }}
                as={Link}
                to="/project"
                variant="dark"
                className="button"
            >
                See my projects
            </Button>
        </Container>
    );
}
