import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { updateProject } from "../../services/projects";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import UnauthPage from "../Error/UnauthPage";
import MarkdownEditor from "../Markdown/MarkdownEditor";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import app from "../../services/firstore";

export default function ProjectEdit() {
    const project = useLoaderData();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [selectedFile, setSelectedFile] = useState();
    const [percent, setPercent] = useState(0);

    const [link, setLink] = useState(project.link);
    // eslint-disable-next-line no-unused-vars
    const [url, setUrl] = useState(project.url);
    const navigate = useNavigate();

    const uploadFile = () => {
        const storage = getStorage(app);
        //Get the ref first
        const storageRef = ref(storage, `/files/${selectedFile.name}`);
        //Create task
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        //Listener
        uploadTask.on(
            "state_chaqnged",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
                console.log(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(async (_url) => {
                    //After get the link then return the img url
                    await updateProject({
                        name,
                        description,
                        link,
                        url: _url,
                        id: project.id,
                    });
                    setName("");
                    setDescription("");
                    setLink("");
                    navigate("/project");
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!!selectedFile) {
            uploadFile();
        } else {
            await updateProject({
                name,
                description,
                link,
                url,
                id: project.id,
            });
            setName("");
            setDescription("");
            setLink("");
            navigate("/project");
        }
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

                <Form.Group>
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Image src={url} style={{ maxWidth: "100%" }} />
                    <Form.Label>Image of the project</Form.Label>
                    <Form.Control
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        type="file"
                        accept="/image/*"
                    />
                    <div>{percent}</div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <MarkdownEditor
                        value={description}
                        setValue={setDescription}
                    />
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
