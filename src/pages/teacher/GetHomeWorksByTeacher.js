import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'
import { getHomeworksByTeacherRef } from '../../utils/homewrokServices'
import { getStudentsByGrade, getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'
import HomeWorkCard from '../../components/HomeWorkCard'
import AddHomework from './AddHomework'
import TeacherHomeworkCard from '../../components/TeacherHomeworkCard'

export default function GetHomeWorksByTeacher() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        console.log("subjectDatasubjectData::", subjectData);
        const userData = await getUserFromLocalStorage()
        const subjectsRes = await getHomeworksByTeacherRef(userData?.id)
        if (!subjectsRes?.success) { return }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.homeworks)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                visible={openModal}
                onRequestClose={() => {
                    setOpenModal(!openModal);
                }}>
                <AddHomework
                    subjectData={subjectData}
                    studentData={selectedStudent}
                    setOpenModal={setOpenModal}
                />
            </Modal>
            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around'
                }}
            >
                <Button
                    title="add homework"
                    onPress={() => { setOpenModal(true) }}
                />
                {allSubjects?.length == 0
                    ? <Text>no Subjects :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
                        data={allSubjects}
                        renderItem={({ item, idx }) => (
                            <TeacherHomeworkCard
                                homework={item}
                            />
                        )}
                        //Setting the number of column
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </Box>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
