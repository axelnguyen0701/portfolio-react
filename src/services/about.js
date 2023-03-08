import { collection, getFirestore } from "firebase/firestore";
import app from "./firstore";

const db = getFirestore(app);

export async function addAbout({
    firstName,
    lastName,
    nickname,
    title,
    worksAt,
    info,
    socialNetwork,
}) {
    try {
        const docRef = await addAbout(collection(db, "about"), {
            firstName,
            lastName,
            nickname,
            title,
            worksAt,
            info,
            socialNetwork,
        });
        return docRef;
    } catch (e) {
        console.error(e);
    }
}
