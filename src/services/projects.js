import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import app from "./firstore";

const db = getFirestore(app);

export async function getProjects() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = [];
    querySnapshot.forEach((doc) => {
        projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
}

export async function getProject({ params }) {
    const docRef = doc(db, "projects", params.id);
    const docSnap = await getDoc(docRef);

    return { ...docSnap.data(), id: params.id };
}

export async function addProject({ name, description, link, url }) {
    try {
        const docRef = await addDoc(collection(db, "projects"), {
            name,
            description,
            link,
            url,
        });
        return docRef;
    } catch (e) {
        console.error(e);
    }
}

export async function updateProject({ name, description, link, url, id }) {
    const projectRef = doc(db, "projects", id);

    await updateDoc(projectRef, {
        name,
        description,
        link,
        url,
    });
}

export async function deleteProject({ params }) {
    await deleteDoc(doc(db, "projects", params.id));
}
