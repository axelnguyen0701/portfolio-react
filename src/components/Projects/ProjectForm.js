import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../services/auth";
import app from "../../services/firstore";
import { addProject } from "../../services/projects";
import UnauthPage from "../Error/UnauthPage";
import MarkdownEditor from "../Markdown/MarkdownEditor";

export default function ProjectForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [percent, setPercent] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [user, loading, error] = useAuthState(auth);

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
                    const project = {
                        name,
                        link,
                        url,
                        description,
                    };
                    //After get the link then add the project to firestore
                    await addProject(project);
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!!selectedFile) {
            console.log(!!selectedFile);
            uploadFile();
        } else {
            await addProject({
                name,
                link,
                url: "",
                description,
            });
        }

        setName("");
        setDescription("");
        setLink("");
        redirect("/");
    };
    if (!user) {
        return <UnauthPage />;
    }
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <h1>Post new portfolio</h1>
            <Form style={{ width: "50%", textAlign: "start" }}>
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
                    <Form.Label>Image of the project</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFilePicked}
                        accept="/image/*"
                    />
                    <p>Percent uploaded: {percent}%</p>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <MarkdownEditor
                        value={description}
                        setValue={setDescription}
                    />
                </Form.Group>

                <Button
                    className="text-center my-3"
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
