import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./firstore";

export default async function getProjects() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = [];
    querySnapshot.forEach((doc) => {
        projects.push(doc.data());
    });

    return projects;
}
