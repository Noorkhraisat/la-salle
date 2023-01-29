import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import SubjectCard from '../../components/SubjectCard'
import { getSubjectsByGrade } from '../../utils/subjectsServices'
import { getUserFromLocalStorage } from '../../utils/usersServices'
import StudentHomeworks from './StudentHomeworks'
import StudentMarks from './StudentMarks'

export default function GetStudentSubject() {
    const [allSubjects, setAllsubjects] = useState([])
    const [whereTogo, setWhereToGo] = useState("homeworks")
    const [openModal, setOpenModal] = useState(false)
    const [subjectId, setSubjectId] = useState("")

    const getSubjects = async () => {
        const studentData = await getUserFromLocalStorage()
        const subjectsRes = await getSubjectsByGrade(studentData?.grade)
        if (!subjectsRes?.success) { return }
        console.log("messagemessagemessage::", subjectsRes?.data);
        setAllsubjects(subjectsRes?.data?.subjects)
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <View
            style={styles.container}
        >

            <Modal
                visible={openModal}
            >
                {/* <StudentMarks
                    setOpenModal={setOpenModal}
                    subjectId={subjectId}
                /> */}
                <StudentHomeworks
                    setOpenModal={setOpenModal}
                    subjectId={subjectId}
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
                                    setSubjectId(item?.id)
                                    setOpenModal(true)
                                }}
                            >
                                <SubjectCard
                                    subject={item}
                                    color={"#193c71"}
                                    icon={"exponent"}
                                />
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
