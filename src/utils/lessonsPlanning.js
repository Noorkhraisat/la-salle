
import firebase from '../database/firebaseConfig';
const subjectref = firebase.firestore().collection('lessonPlanning');
//marks will have those field {id, mark, teacher_r, student_r,subject_r,examType}
export const createPlan = (PlanData) => {
    const res = subjectref.add({
        ...PlanData
    }).then((res) => {
        return { success: true, data: { message: "Plan added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getPlansByTeacher = async (teacher_r) => {
    try {
        const marks = []

        const snapshot = await subjectref?.where("teacher_r.id", "==", teacher_r).get()
        if (snapshot.empty) {
            return { success: true, data: { plans: [], message: "no Plans in the DB" } }
        }

        snapshot.forEach(doc => {
            marks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });
        return { success: true, data: { plans: marks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }
    }

}

