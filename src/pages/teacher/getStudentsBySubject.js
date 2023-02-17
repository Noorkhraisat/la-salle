import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useLocation, useNavigate } from 'react-router-native'
import StudentCard from '../../components/StudentCard'
import { getStudentsByGrade, getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'
import StudentMarkForTeacher from './StudentMarkForTeacher'

export default function GetStudentsBySubject() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const getSubjects = async () => {
        setLoading(true)
        console.log("subjectDatasubjectData::", subjectData);
        const studentData = await getUserFromLocalStorage()
        const subjectsRes = await getStudentsByGrade({ grade: subjectData?.grade })
        if (!subjectsRes?.success) {
            setLoading(false)
            return
        }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.users)
        setLoading(false)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <>

            {
                loading
                    ? <Spinner
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />

                    : <View
                        style={styles.container}
                    >
                        <Modal
                            animationType="slide"
                            // transparent={true}
                            visible={openModal}
                            onRequestClose={() => {
                                setOpenModal(!openModal);
                            }}>
                            <StudentMarkForTeacher
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
                                            style={{
                                                display: "flex",
                                                alignItems: 'center',
                                            }}
                                        >
                                            <StudentCard
                                                studentData={item}
                                            />
                                        </Pressable>
                                    )}
                                    //Setting the number of column
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            }
                        </Box>
                    </View>}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
