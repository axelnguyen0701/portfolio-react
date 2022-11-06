import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import app from "../services/firstore";
import { addProject } from "../services/projects";

export default function ProjectForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [stacks, setStacks] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [percent, setPercent] = useState(0);

    const handleFilePicked = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = () => {
        const storage = getStorage(app);
        //Get the ref first
        const storageRef = ref(storage, `/files/${selectedFile.name}`);
        //Create task
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        //Listener
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    const project = { name, link, stacks, url, description };
                    //After get the link then add the project to firestore
                    addProject(project);
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        uploadFile();
        setName("");
        setDescription("");
        setLink("");
        setStacks("");
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
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image of the project</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFilePicked}
                        accept="/image/*"
                    />
                </Form.Group>
                <p>Percent uploaded: {percent}%</p>
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
