import { Box, Button, Icon, IconButton } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import TeacherSubjectCard from '../../components/TeacherSubjectCard'
import { getMarkByStudentAndSubjectService } from '../../utils/marksServices'
import { getSubjectsByTeacherRef } from '../../utils/subjectsServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'

export default function StudentMarkForTeacher({ studentData, subjectData, setOpenModal }) {
    const navigate = useNavigate()
    const [openAddMarkModal, setOpenAddMarkModal] = useState(false)
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getMarksBystudentAndSubject = async () => {
        const userData = await getUserFromLocalStorage()
        console.log("testtttttttttt:::", userData);
        const subjectsRes = await getMarkByStudentAndSubjectService(studentData?.id, subjectData?.id)
        if (!subjectsRes?.success) {
            console.log("testtttttt::err::", subjectsRes);
            return
        }
        console.log("testtttttt::suc::", subjectsRes);

        setAllsubjects(subjectsRes?.data?.marks)
    }
    useEffect(() => {
        getMarksBystudentAndSubject()
    }, [])
    return (
        <View
            style={styles.container}
        >
            <IconButton
                style={{
                    marginLeft: "auto",
                    marginRight: 2
                }}
                onPress={() => setOpenModal(false)}
                icon={(props) => <Icon name={"close"} style={{ fontSize: 30, color: 'black' }} {...props} />}
            ></IconButton>
            <Button
                title="Add mark"
                onPress={() => {
                    setOpenAddMarkModal(true)
                }}
                style={{
                    margin: 24,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: "#193c71"
                }}
            />

            <Modal
                animationType="slide"
                // transparent={true}
                visible={openAddMarkModal}
                onRequestClose={() => {
                    setOpenModal(!openModal);
                }}>
                <AddMark
                    subjectData={subjectData}
                    studentData={studentData}
                    setOpenModal={setOpenAddMarkModal}
                />
            </Modal>

            {allSubjects.length == 0 ? <Text>no marks available</Text>

                : <FlatList
                    // style={{ marginBottom: 0 }}
                    data={allSubjects}
                    style={{
                        // marginTop: 60,
                        padding: 8,
                        paddingRight: 16,
                        display: 'flex',
                    }}
                    renderItem={({ item, idx }) => (
                        <View
                            style={{
                                height: 70,
                                borderBottomColor: 'black',
                                backgroundColor: '#193c71',
                                margin: 8,
                                width: '45%',
                                borderRadius: 8,
                                display: 'flex',
                                // padding:24,
                                justifyContent: 'center',
                                alignItems: 'start',
                                padding: 16
                            }}
                        >
                            <Text style={{ color: 'white', padding: 4 }}>Exam Type: {item?.examType} </Text>

                            <Text style={{ color: 'white', padding: 4 }}>Mark : {item?.mark}</Text>
                        </View>
                    )}
                    numColumns={2}
                />

            }
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        marginTop: 40,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
    },
});
