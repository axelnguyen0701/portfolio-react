import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import app from "../services/firstore";

export default function ProjectForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [stacks, setStacks] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setName("");
        setDescription("");
        setLink("");
        setStacks("");

        const db = getFirestore(app);
        try {
            const docRef = await addDoc(collection(db, "projects"), {
                name,
                description,
                link,
                stacks: [stacks],
            });
        } catch (e) {
            alert(e);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Form style={{ width: "50%", textAlign: "start" }}>
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
                <Button
                    className="text-center my-2"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
