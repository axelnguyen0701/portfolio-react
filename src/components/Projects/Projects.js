import {
    Button,
    Card,
    Col,
    Container,
    Row,
    Modal,
    Dropdown,
} from "react-bootstrap";
import {
    PencilFill,
    ThreeDotsVertical,
    Trash3Fill,
} from "react-bootstrap-icons";
import { deleteProject } from "../../services/projects";
import { Link, useLoaderData } from "react-router-dom";
import { auth } from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
export default function Projects() {
    const projects = useLoaderData();
    const [show, setShow] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [user, loading, erorr] = useAuthState(auth);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderedProjects = projects.map((e) => (
        <Card style={{ width: "100%" }} className="my-5" key={e.id}>
            <Card.Header>
                <strong>{e.name}</strong>
                {user && (
                    <Dropdown className="d-inline mx-3">
                        <Dropdown.Toggle variant="secondary">
                            <ThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as="button">
                                <Link to={`/project/edit/${e.id}`}>
                                    <PencilFill /> Edit
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                as="button"
                                onClick={handleShow}
                                className="text-danger"
                            >
                                <Trash3Fill /> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Card.Header>
            <Card.Img src={e.url} alt="Project Screenshot" />
            <hr />
            <Card.Body>
                <div className="rounded border text-start">
                    <MDEditor.Markdown
                        source={e.description}
                        style={{ padding: "3rem" }}
                    />
                </div>

                <div className="pb-3 mt-3   ">
                    <Button href={e.link}>Go to app</Button>
                </div>
            </Card.Body>
            {user && (
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
            )}
        </Card>
    ));

    return (
        <Container>
            <h1>My Projects</h1>
            <Row>
                <Col className="justify-content-center align-items-center d-flex flex-column">
                    {renderedProjects}
                </Col>
            </Row>
        </Container>
    );
}
