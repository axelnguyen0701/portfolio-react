import { collection, getFirestore } from "firebase/firestore";
import app from "./firstore";

const db = getFirestore(app);

export async function addAbout({ name, description, link, stacks, url }) {
    try {
        const docRef = await addAbout(collection(db, "projects"), {
            name,
            description,
            link,
            stacks,
            url,
        });
        return docRef;
    } catch (e) {
        console.error(e);
    }
}
