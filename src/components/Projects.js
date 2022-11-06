import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../services/firstore";

export default function Projects() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "projects"));
            const toBeProjects = [];
            querySnapshot.forEach((doc) => {
                toBeProjects.push(doc.data());
            });
            setLoading(false);
            setProjects(toBeProjects);
        }
        getProjects();
    }, []);

    const renderedProjects = projects.map((e) => (
        <Card style={{ width: "100%" }} className="my-5" key={e.name}>
            <Card.Img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1844b3f60bb%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1844b3f60bb%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.1328125%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"></Card.Img>
            <Card.Body>
                <Card.Title>This is project {e.name}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
                <Card.Text>
                    {e.stacks.map((e) => (
                        <span key={e}>{e + " "}</span>
                    ))}
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
