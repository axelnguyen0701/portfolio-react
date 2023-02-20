import { useLoaderData } from "react-router-dom";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { updateProject } from "../../services/projects";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import UnauthPage from "../Error/UnauthPage";

export default function ProjectEdit() {
    const project = useLoaderData();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [link, setLink] = useState(project.link);
    // eslint-disable-next-line no-unused-vars
    const [url, setUrl] = useState(project.url);
    const [stacks, setStacks] = useState(project.stacks.join(" "));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProject({
            name,
            description,
            link,
            stacks: stacks.split(" "),
            url,
            id: project.id,
        });

        setName("");
        setDescription("");
        setLink("");
        setStacks("");
    };

    if (!user) {
        return <UnauthPage />;
    }
    if (loading) {
        return;
    }
    if (error) {
        return error;
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Form style={{ width: "50%", textAlign: "start" }}>
                <h1 className="text-center">
                    Edit {project.name} to {name}
                </h1>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Label>Link</Form.Label>
                <Form.Control
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <Form.Label>Stack</Form.Label>
                <Form.Control
                    type="text"
                    value={stacks}
                    onChange={(e) => setStacks(e.target.value)}
                />
                <Image src={url} style={{ maxWidth: "100%" }} />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image of the project</Form.Label>
                    <Form.Control type="file" accept="/image/*" />
                </Form.Group>
                <Button
                    onClick={handleSubmit}
                    className="text-center my-2"
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
