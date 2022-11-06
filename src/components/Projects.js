import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";

export default function Projects() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function setUpProjects() {
            setLoading(false);
            setProjects(await getProjects());
        }
        setUpProjects();
    }, []);

    const renderedProjects = projects.map((e) => (
        <Card style={{ width: "100%" }} className="my-5" key={e.name}>
            <Card.Img src={e.url} alt="Project Screenshot" />
            <Card.Body>
                <Card.Title>This is project {e.name}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
                <Card.Text>
                    <p>
                        Stacks used:
                        {e.stacks.map((e) => (
                            <span key={e}>{" " + e + " "}</span>
                        ))}
                    </p>
                </Card.Text>
                <Button href={e.link}>Go to app</Button>
            </Card.Body>
        </Card>
    ));

    return (
        <Container>
            <Row>
                <Col className="justify-content-center align-items-center d-flex flex-column">
                    {loading ? "loading..." : renderedProjects}
                </Col>
            </Row>
        </Container>
    );
}
