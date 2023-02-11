
import firebase from '../database/firebaseConfig';
const homewrokRef = firebase.firestore().collection('homeworks');
const studentHomeworkref = firebase.firestore().collection('StudentHomeworks');


//subject will have those field {id, subjectName, teacherref, grade}

export const addHomewrokToDb = (homeworkData) => {
    const res = homewrokRef.add({
        ...homeworkData
    }).then((res) => {
        return { success: true, data: { message: "homework added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getHomeworks = async () => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getHomeworksByTeacherRef = async (teacherId) => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.where("teacher_r.id", "==", teacherId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getHomeworksBySubjectId = async (SubjectId) => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.where("SubjectId", "==", SubjectId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getHomeworksByGrade = async (grade) => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.where("subject_r.grade", "==", '7').get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error22::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const addStudenthomeWroktoDb = (homeworkData) => {
    const res = studentHomeworkref.add({
        ...homeworkData
    }).then((res) => {
        return { success: true, data: { message: "subject added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something went Wrong" }
        });

    return res
}
export const getStudentHomeworksBySubjectId = async (SubjectId) => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.where("SubjectId", "==", SubjectId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }
}
export const getStudentHomeworksBySubjectIdAndStudentId = async (SubjectId, studentId) => {
    try {
        const homeworks = []

        const snapshot = await homewrokRef?.where("SubjectId", "==", SubjectId).where("studentId", "==", studentId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }
}
export const getSubmittedHomeWroksByStudentRef = async (studentId) => {
    try {
        const homeworks = []
        console.log("stuid::", studentId);
        const snapshot = await studentHomeworkref?.where("student_r.id", "==", studentId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }
}
export const getSubmittedHomeWroksByHomewrokRef = async (homewrkId) => {
    try {
        const homeworks = []
        console.log("stuid::", homewrkId);
        const snapshot = await studentHomeworkref?.where("homework_r.id", "==", homewrkId).get()
        if (snapshot.empty) {
            return { success: true, data: { homeworks: [], message: "no homeworks in the DB" } }
        }

        snapshot.forEach(doc => {
            homeworks.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { homeworks: homeworks, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }
}