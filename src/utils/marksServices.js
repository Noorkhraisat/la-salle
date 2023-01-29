
import firebase from '../database/firebaseConfig';
const subjectref = firebase.firestore().collection('marks');
//marks will have those field {id, mark, teacher_r, student_r,subject_r,examType}
export const createMark = (markData) => {
    const res = subjectref.add({
        ...markData
    }).then((res) => {
        return { success: true, data: { message: "mark added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getMarks = async () => {
    try {
        const marks = []

        const snapshot = await userDbRef?.get()
        if (snapshot.empty) {
            return { success: true, data: { marks: [], message: "no marks in the DB" } }
        }

        snapshot.forEach(doc => {
            marks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });
        return { success: true, data: { marks: marks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }
    }

}
export const getMarksByStudent = async (student_r) => {
    try {
        const marks = []

        const snapshot = await userDbRef?.where("student_r", "==", student_r).get()
        if (snapshot.empty) {
            return { success: true, data: { marks: [], message: "no marks in the DB" } }
        }

        snapshot.forEach(doc => {
            marks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { marks: marks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getMarkByStudentAndSubject = async (student_r, subject_r) => {
    try {
        const marks = []
        const snapshot = await subjectref
            ?.where("student_r.id", "==", student_r)
            ?.where("subject_r.id", "==", subject_r)
            .get()
        if (snapshot.empty) {
            return { success: true, data: { marks: [], message: "no marks in the DB" } }
        }
        snapshot.forEach(doc => {
            marks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { marks: marks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
