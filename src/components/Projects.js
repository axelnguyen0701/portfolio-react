import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import { deleteProject } from "../services/projects";
import { useLoaderData, useNavigate } from "react-router-dom";
export default function Projects() {
    const navigate = useNavigate();
    const projects = useLoaderData();
    const renderedProjects = projects.map((e) => (
        <Card style={{ width: "100%" }} className="my-5" key={e.name}>
            <Card.Img src={e.url} alt="Project Screenshot" />
            <Card.Body>
                <Card.Title>This is project {e.name}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
                <Card.Text>
                    Stacks used:
                    {e.stacks.map((e) => (
                        <span key={e}>{" " + e + " "}</span>
                    ))}
                </Card.Text>
                <Button href={e.link}>Go to app</Button>
                <Button
                    variant="danger"
                    onClick={async () => {
                        await deleteProject({ params: { id: e.id } });
                        navigate("/projects");
                    }}
                >
                    <Trash3Fill />
                </Button>
                <Button variant="warning" href={`/project/edit/${e.id}`}>
                    <PencilFill />
                </Button>
            </Card.Body>
        </Card>
    ));

    return (
        <Container>
            <Row>
                <Col className="justify-content-center align-items-center d-flex flex-column">
                    {renderedProjects}
                </Col>
            </Row>
        </Container>
    );
}
