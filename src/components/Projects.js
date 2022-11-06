import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import { deleteProject } from "../services/projects";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
export default function Projects() {
    const projects = useLoaderData();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderedProjects = projects.map((e) => (
        <Card style={{ width: "100%" }} className="my-5" key={e.id}>
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
                <Button variant="danger" onClick={handleShow}>
                    <Trash3Fill />
                </Button>
                <Button variant="warning" href={`/project/edit/${e.id}`}>
                    <PencilFill />
                </Button>
            </Card.Body>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Stop there!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete project {e.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            await deleteProject({ params: { id: e.id } });
                            handleClose();
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
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
