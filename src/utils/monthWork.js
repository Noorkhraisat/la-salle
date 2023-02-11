
import firebase from '../database/firebaseConfig';
const subjectref = firebase.firestore().collection('monthWork');
//marks will have those field {id, mark, teacher_r, student_r,subject_r,examType}
export const creatework = (workData) => {
    const res = subjectref.add({
        ...workData
    }).then((res) => {
        return { success: true, data: { message: "work added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getworksByTeacher = async (teacher_r) => {
    try {
        const marks = []

        const snapshot = await subjectref?.where("teacher_r.id", "==", teacher_r).get()
        if (snapshot.empty) {
            return { success: true, data: { works: [], message: "no works in the DB" } }
        }

        snapshot.forEach(doc => {
            marks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });
        return { success: true, data: { works: marks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }
    }

}

