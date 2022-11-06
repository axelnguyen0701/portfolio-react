import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UnauthPage() {
    return (
        <>
            <div className="my-2">You are not authorized. </div>
            <Link to="/">
                <Button>Home</Button>
            </Link>
        </>
    );
}
