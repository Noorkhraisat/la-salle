import { AsyncStorage } from 'react-native';
import firebase from '../database/firebaseConfig';

const userDbRef = firebase.firestore().collection('users');
export const addUser = (userData) => {
    const res = userDbRef.add({
        ...userData
    }).then((res) => {
        return { success: true, data: { message: "user added successfuly" } }
    })
        .catch((err) => {
            console.error("Error found: ", err);
            return { success: false, data: {}, errMessage: "something wentWrong" }
        });

    return res
}
export const getUsers = async () => {
    try {
        const users = []

        const snapshot = await userDbRef?.get()
        if (snapshot.empty) {
            return { success: true, data: { users: [], message: "no users in the DB" } }
        }

        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { users: users, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getUserBySpecialNumberAndPassword = async ({ email = "Noor", password = "12345" }) => {
    try {
        const users = []

        const snapshot = await userDbRef
            .where("email", "==", email)
            .where("password", "==", password).get()
        if (snapshot.empty) {
            return { success: false, data: { users: [] }, errMessage: "Special number or password is wrong" }
        }
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { users: users, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getStudentsByGrade = async ({ grade }) => {
    try {
        const users = []

        const snapshot = await userDbRef
            .where("grade", "==", grade).get()
        if (snapshot.empty) {
            return { success: false, data: { users: [] }, errMessage: "no students found" }
        }
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() })
            console.log(doc.id, '=>', doc.data());

        });

        return { success: true, data: { users: users, message: "" } }

    } catch (e) {
        console.log("error::", e);
        return { success: false, data: {}, errMessage: "Something went Wrong" }

    }

}
export const getUserFromLocalStorage = async () => {
    const stringUser = await AsyncStorage.getItem('la-sall-user')
    return JSON.parse(stringUser)

}
export const setUserToLocalStorage = async (user) => {
    await AsyncStorage.setItem('la-sall-user', JSON.stringify(user))

}
