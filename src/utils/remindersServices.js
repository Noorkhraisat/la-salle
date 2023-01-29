
import firebase from '../database/firebaseConfig';
const reminderRef = firebase.firestore().collection('announcments');

//subject will have those field {id, subjectName, teacherref, grade}

export const addAnnouncmentToDb = (reminderDaata) => {
    const res = reminderRef.add({
        ...reminderDaata
    }).then((res) => {
        return { success: true, data: { message: "reminder added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getAnnouncmentsFromDb = async () => {
    try {
        const announcments = []

        const snapshot = await reminderRef?.get()
        if (snapshot.empty) {
            return { success: true, data: { announcments: [], message: "no announcments in the DB" } }
        }

        snapshot.forEach(doc => {
            announcments.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { announcments: announcments, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
