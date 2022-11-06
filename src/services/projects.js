import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./firstore";

const db = getFirestore(app);

export async function getProjects() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = [];
    querySnapshot.forEach((doc) => {
        projects.push(doc.data());
    });

    return projects;
}

export async function addProject({ name, description, link, stacks, url }) {
    try {
        const docRef = await addDoc(collection(db, "projects"), {
            name,
            description,
            link,
            stacks: [stacks],
            url,
        });
    } catch (e) {
        alert(e);
    }
}
