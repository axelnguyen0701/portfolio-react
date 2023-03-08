import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Github, Linkedin, PencilFill } from "react-bootstrap-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import Avatar from "./Avatar.jpg";
export default function About() {
    const [user, loading, error] = useAuthState(auth);
    const [editMode, setEditMode] = useState(false);

    const about = {
        firstName: "Hieu",
        lastName: "Nguyen",
        nickname: "Axel",
        title: "Software Developer",
        worksAt: [
            {
                name: "MacEwan University",
                link: "https://macewan.ca",
                logo: "data:image/png;base64,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",
            },
            {
                name: "University of Alberta",
                link: "https://ualberta.ca	",
                logo: "https://stemfellowship.org/wp-content/uploads/2020/07/1200px-University_of_Alberta_seal.svg_.png",
            },
        ],
        info: "A MacEwan University's graduate with a curios (and weird) mind. I like to make things convenient as I am sometimes could be so lazy. This page is could act as a CMS for me to showcase new projects or even just to edit these lines of introduction cause sometimes I don't wanna code...",
        socialNetwork: {
            github: {
                link: "https://www.github.com/axelnguyen0701",
                name: "Axel's Repos",
            },
            linkedIn: {
                link: "https://www.linkedin.com/in/hnguyen0701/",
                name: "Hieu Nguyen",
            },
        },
    };

    const renderedWorkPlace = about.worksAt.map((e) => (
        <div className="p-2">
            <img
                src={e.logo}
                alt={`${e.name} logo`}
                style={{ height: "90px" }}
            />
            <div>
                <a href={e.link} target="_blank" rel="noreferrer">
                    {e.name}
                </a>
            </div>
        </div>
    ));

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ width: "50%", alignItems: "center" }}>
                <Card.Header className="align-self-stretch">
                    <span className="ms-2"> About {about.firstName}</span>
                    {user && (
                        <Button
                            className="text-end"
                            style={{ float: "right", fontSize: "12px" }}
                            onClick={(e) => setEditMode(true)}
                        >
                            <PencilFill />
                        </Button>
                    )}
                </Card.Header>
                <Card.Img
                    variant="top"
                    src={Avatar}
                    className="p-2 rounded-circle h-75 w-75"
                />
                <Card.Body>
                    <Card.Title>{`${about.firstName} ${about.lastName} ${
                        !!about.nickname ? "(" + about.nickname + ")" : ""
                    }`}</Card.Title>
                    <Card.Subtitle>
                        <div id="title"> {about.title}</div>
                        <br />
                        <div className="work-places d-flex justify-content-center">
                            {renderedWorkPlace}
                        </div>
                    </Card.Subtitle>
                    <br />
                    <Card.Text className="text-start">{about.info}</Card.Text>
                    <div id="social-links">
                        <Button
                            href={about.socialNetwork.linkedIn.link}
                            target="_blank"
                        >
                            <Linkedin /> {about.socialNetwork.linkedIn.name}
                        </Button>

                        <Button
                            variant="dark"
                            href={about.socialNetwork.github.link}
                            target="_blank"
                        >
                            <Github /> {about.socialNetwork.github.name}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
