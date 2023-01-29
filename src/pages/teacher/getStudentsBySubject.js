import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'
import { getStudentsByGrade, getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'

export default function GetStudentsBySubject() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        console.log("subjectDatasubjectData::", subjectData);
        const studentData = await getUserFromLocalStorage()
        const subjectsRes = await getStudentsByGrade({ grade: subjectData?.grade })
        if (!subjectsRes?.success) { return }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.users)
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
                transparent={true}
                visible={openModal}
                onRequestClose={() => {
                    setOpenModal(!openModal);
                }}>
                <AddMark
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
                {allSubjects?.length == 0
                    ? <Text>no Subjects :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
                        data={allSubjects}
                        renderItem={({ item, idx }) => (
                            <Pressable
                                onPress={() => {
                                    setSelectedStudent(item)
                                    setOpenModal(true)
                                }}
                            >
                                <Text>{(item?.specialNumber || item?.email)}</Text>
                            </Pressable>
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
