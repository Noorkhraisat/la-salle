import { Box, Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'
import { getHomeworksByTeacherRef, getSubmittedHomeWroksByHomewrokRef } from '../../utils/homewrokServices'
import { getStudentsByGrade, getUserFromLocalStorage } from '../../utils/usersServices'
import AddMark from './addMark'
import HomeWorkCard from '../../components/HomeWorkCard'
import AddHomework from './AddHomework'

export default function SubmittedHomeworks({ homewrokId, setOpenModal }) {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState()
    const subjectData = location?.state?.subjectData
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const getSubjects = async () => {
        console.log("subjectDatasubjectData::", homewrokId);
        const subjectsRes = await getSubmittedHomeWroksByHomewrokRef(homewrokId)
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
            {/* <Modal
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
            </Modal> */}
            <Box
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'space-around'
                }}
            >
                <Button
                    title="clse"
                    onPress={() => { setOpenModal(false) }}
                />
                {allSubjects?.length == 0
                    ? <Text>no Subjssects :(</Text>

                    : <FlatList
                        style={{ marginBottom: 0 }}
                        data={allSubjects}
                        renderItem={({ item, idx }) => (
                            <Text>
                                {item?.student_r?.name}
                            </Text>
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
