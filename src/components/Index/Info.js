import { Button, Container } from "react-bootstrap";
import background from "./background.svg";
import "./Info.css";
import Projects from "../Projects/Projects";
import About from "../About/About";
export default function Info() {
    return (
        <>
            <Container
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                }}
                fluid
                className="h-100 d-flex flex-column justify-content-center typewriter"
            >
                <div style={{ fontSize: "28px" }}>Hi,</div>
                <h1>I'm Axel Nguyen</h1>
                <h4>Full-stack developer</h4>
                <p className="mt-3">I fancy creating things from thin air</p>

                <Button
                    style={{ maxWidth: "50%", alignSelf: "center" }}
                    href="#projects"
                    variant="dark"
                    className="button mt-4"
                >
                    See my projects
                </Button>
            </Container>
            <Projects />
            <About />
        </>
    );
}
