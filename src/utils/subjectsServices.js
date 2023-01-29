
import firebase from '../database/firebaseConfig';
const subjectref = firebase.firestore().collection('subjects');

//subject will have those field {id, subjectName, teacherref, grade}

export const addSubjectToDb = (subjectData) => {
    const res = subjectref.add({
        ...subjectData
    }).then((res) => {
        return { success: true, data: { message: "subject added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getSubjects = async () => {
    try {
        const subjects = []

        const snapshot = await subjectref?.get()
        if (snapshot.empty) {
            return { success: true, data: { subjects: [], message: "no subjects in the DB" } }
        }

        snapshot.forEach(doc => {
            subjects.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { subjects: subjects, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getSubjectsByGrade = async (grade) => {
    try {
        const subjects = []

        const snapshot = await subjectref?.where("grade", "==", grade).get()
        if (snapshot.empty) {
            return { success: true, data: { subjects: [], message: "no subjects in the DB" } }
        }

        snapshot.forEach(doc => {
            subjects.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { subjects: subjects, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getSubjectsByTeacherRef = async (teacherRef) => {
    try {
        console.log("test::try");

        const subjects = []

        const snapshot = await subjectref?.where("teacher_r", "==", teacherRef).get()
        if (snapshot.empty) {
            return { success: true, data: { subjects: [], message: "no subjects in the DB" } }
        }

        snapshot.forEach(doc => {
            subjects.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });
        console.log("test::sucess");
        return { success: true, data: { subjects: subjects, message: "" } }

    } catch (e) {
        console.log("test::sucess");

        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}